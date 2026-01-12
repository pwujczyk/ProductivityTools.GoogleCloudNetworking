import Head from "next/head";
import styles from "./layout.module.css";
import Link from "next/link";
import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/router";

export const siteTitle = "Next.js Sample Website";

function MenuRenderer({ nodes, parentPath = '', level = 0, expandedPaths, toggleExpand }) {
  const router = useRouter();
  if (!nodes || nodes.length === 0) {
    return null;
  }

  return (
    <ul className={level === 0 ? styles.menuMainList : styles.menuSubList}>
      {nodes.map((node) => {
        const itemPath = `/articles${parentPath}/${node.path}`;
        const absolutePath = `${parentPath}/${node.path}`;
        const isActive = router.asPath === itemPath;
        const hasChildren = node.childs && node.childs.length > 0;
        const isExpanded = expandedPaths.has(absolutePath);

        // Indentation: 24px base for level 0, +16px per level
        const paddingLeft = `${24 + level * 16}px`;

        return (
          <li
            key={node.path}
            className={level === 0 ? styles.menuMainItem : styles.menuSubItem}
          >
            <div className={styles.menuItemRow}>
              {hasChildren && (
                <button
                  className={`${styles.chevron} ${isExpanded ? styles.chevronExpanded : ''}`}
                  onClick={() => toggleExpand(absolutePath)}
                  style={{ left: `${paddingLeft.replace('px', '') - 20}px` }}
                  aria-label={isExpanded ? "Collapse" : "Expand"}
                />
              )}
              <Link
                href={itemPath}
                className={`${styles.menuItemLink} ${isActive ? styles.activeLink : ''}`}
                style={{ paddingLeft }}
              >
                {node.title}
              </Link>
            </div>
            {hasChildren && isExpanded && (
              <MenuRenderer
                nodes={node.childs}
                parentPath={absolutePath}
                level={level + 1}
                expandedPaths={expandedPaths}
                toggleExpand={toggleExpand}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function Layout({ children, menu }) {
  const categories = useMemo(() => Object.keys(menu), [menu]);
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("");
  const [expandedPaths, setExpandedPaths] = useState(new Set());
  const isMounted = useRef(false);

  // Helper to get all nested paths that have children
  const getAllExpandablePaths = useMemo(() => {
    const paths = new Set();
    const traverse = (nodes, currentPath) => {
      nodes.forEach(node => {
        const fullPath = `${currentPath}/${node.path}`;
        if (node.childs && node.childs.length > 0) {
          paths.add(fullPath);
          traverse(node.childs, fullPath);
        }
      });
    };
    if (activeTab && menu[activeTab]) {
      traverse(menu[activeTab], `/${activeTab}`);
    }
    return paths;
  }, [activeTab, menu]);

  const toggleExpand = (path) => {
    setExpandedPaths(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedPaths(new Set(getAllExpandablePaths));
  };

  const collapseAll = () => {
    setExpandedPaths(new Set());
  };

  useEffect(() => {
    if (!isMounted.current && categories.length > 0) {
      const currentCategory = categories.find(cat => router.asPath.startsWith(`/articles/${cat}`));
      setActiveTab(currentCategory || categories[0] || "");
      isMounted.current = true;
    }
  }, [categories, router.asPath]);

  const lastPathRef = useRef(router.asPath);

  useEffect(() => {
    // Sync tab with URL only when navigation happens (URL changes)
    if (lastPathRef.current !== router.asPath) {
      const currentCategory = categories.find(cat => router.asPath.startsWith(`/articles/${cat}`));
      if (currentCategory) {
        setActiveTab(currentCategory);
      }
      lastPathRef.current = router.asPath;
    }
  }, [router.asPath, categories]);

  // Auto-expand parents of the current link on navigation
  useEffect(() => {
    if (router.asPath && router.asPath.startsWith('/articles/')) {
      const pathParts = router.asPath.replace('/articles/', '').split('/');
      const newExpanded = new Set(expandedPaths);
      let current = '';
      pathParts.forEach((part, index) => {
        if (index < pathParts.length - 1) { // Don't expand the leaf itself if it's not a parent we know about
          current += '/' + part;
          newExpanded.add(current);
        }
      });
      if (newExpanded.size !== expandedPaths.size) {
        setExpandedPaths(newExpanded);
      }
    }
  }, [router.asPath]);

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <nav className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.tabButton} ${activeTab === category ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(category)}
            >
              {category.replace(/^\./, '').toUpperCase()}
            </button>
          ))}
        </div>
        <div className={styles.actionButtons}>
          <button onClick={expandAll} className={styles.actionButton}>Expand all</button>
          <button onClick={collapseAll} className={styles.actionButton}>Collapse all</button>
        </div>
        <div className={styles.menuContainer}>
          {activeTab && menu[activeTab] && (
            <MenuRenderer
              nodes={menu[activeTab]}
              parentPath={`/${activeTab}`}
              expandedPaths={expandedPaths}
              toggleExpand={toggleExpand}
            />
          )}
        </div>
      </nav>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
