import Head from "next/head";
import styles from "./layout.module.css";
import Link from "next/link";

export const siteTitle = "Next.js Sample Website";

function MenuRenderer({ nodes, path = '', level = 0 }) {
  if (!nodes || nodes.length === 0) {
    return null;
  }

  return (
    <ul className={level === 0 ? styles.menuMainList : styles.menuSubList}>
      {nodes.map((node) => (
        <li
          key={node.path}
          className={level === 0 ? styles.menuMainItem : styles.menuSubItem}
        >
          <Link href={`/articles${level === 0 ? '' : path}/${node.path}`}>{node.title}</Link>
          {node.childs && node.childs.length > 0 && (
            <MenuRenderer nodes={node.childs} path={`${level === 0 ? '' : path}/${node.path}`} level={level + 1} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Layout({ children, menu }) {
  console.log("menu",menu)
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
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
        <MenuRenderer nodes={menu} />
      </nav>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
