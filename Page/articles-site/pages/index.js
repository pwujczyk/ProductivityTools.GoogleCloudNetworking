import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function Home({ articles }) {
  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={`/articles/${article.slug}`}>
              <a>
                <h2>{article.frontmatter.title}</h2>
                <p>By {article.frontmatter.author} on {article.frontmatter.date}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  // Get files from the articles dir
  const files = fs.readdirSync(path.join('articles'));

  // Get slug and frontmatter from files
  const articles = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.md', '');

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('articles', filename),
      'utf-8'
    );
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      articles: articles.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)),
    },
  };
}
