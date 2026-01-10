import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');
const contentDirectory = path.join(process.cwd(), 'content');

export function getMenuTree() {
  const buildDirTree = (directory) => {
    const tree = [];
    const items = fs.readdirSync(directory, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory() && item.name !== 'images') {
        const subDirPath = path.join(directory, item.name);
        let title = item.name;
        const readmePath = path.join(subDirPath, 'index.md');

        if (fs.existsSync(readmePath)) {
          const readmeContent = fs.readFileSync(readmePath, 'utf8');
          const firstLine = readmeContent.split('\n')[0].trim();
          if (firstLine) {
            title = firstLine.replace(/^#\s*/, '');
          }
        }
        const children = buildDirTree(subDirPath);
        tree.push({
          path: item.name,
          title: title,
          childs: children,
        });
      }
    }
    return tree;
  };

  const menu = {};
  if (fs.existsSync(contentDirectory)) {
    const categories = fs.readdirSync(contentDirectory, { withFileTypes: true });
    for (const category of categories) {
      if (category.isDirectory()) {
        menu[category.name] = buildDirTree(path.join(contentDirectory, category.name));
      }
    }
  }

  return menu;
}

export function getSortedPostsData() {
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

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}



export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
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
    id,
    contentHtml,
    ...matterResult.data,
  };
}