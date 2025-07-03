import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
 
const postsDirectory = path.join(process.cwd(), 'articles');
 
export function getSortedArticlesData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');
 
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
 
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
 
    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllArticlesIds() {
  const paths = [];

  const findArticlePaths = (directory, parentPath = []) => {
    const items = fs.readdirSync(directory, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory()) {
        findArticlePaths(
          path.join(directory, item.name),
          [...parentPath, item.name]
        );
      } else if (item.name === 'index.md') {
        // A slug must have at least one segment for [...slug].js
        if (parentPath.length > 0) {
          paths.push({
            params: {
              slug: parentPath,
            },
          });
        }
      }
    }
  };

  // Start the search if the articles directory exists.
  if (fs.existsSync(postsDirectory)) {
    findArticlePaths(postsDirectory);
  }

  return paths;
}

export async function getArticleData(slug) {
  const fullPath = path.join(postsDirectory, ...slug, `index.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
 
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
 
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
 
  // Combine the data with the id and contentHtml
  return {
    id: slug.join('/'),
    contentHtml,
    ...matterResult.data,
  };
} 