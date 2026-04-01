import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export function getSortedArticlesData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(contentDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

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
      if (item.isDirectory() && item.name !== 'images') {
        const currentPath = [...parentPath, item.name];
        paths.push({
          params: {
            slug: currentPath,
          },
        });
        findArticlePaths(path.join(directory, item.name), currentPath);
      }
    }
  };

  if (fs.existsSync(contentDirectory)) {
    findArticlePaths(contentDirectory);
  }

  return paths;
}

function copyImagesToPublicDirectory(markdownPath) {
  const articleDir = path.dirname(markdownPath);
  const sourceImagesDir = path.join(articleDir, "images");

  // Check if the source images directory exists
  if (!fs.existsSync(sourceImagesDir)) {
    return;
  }

  // Determine the destination directory within the public folder.
  // We want to mirror the structure from the 'articles' directory.
  const relativeArticleDir = path.relative(contentDirectory, articleDir);
  const publicDir = path.join(process.cwd(), "public");
  const destImagesDir = path.join(publicDir, relativeArticleDir, "images");

  // Create the destination directory if it doesn't exist
  fs.mkdirSync(destImagesDir, { recursive: true });

  // Copy all files from the source to the destination
  const imageFiles = fs.readdirSync(sourceImagesDir);
  for (const file of imageFiles) {
    const srcFile = path.join(sourceImagesDir, file);
    const destFile = path.join(destImagesDir, file);
    fs.copyFileSync(srcFile, destFile);
  }
}

export async function getArticleData(slug) {
  const fullPath = path.join(contentDirectory, ...slug, `index.md`);
  
  if (!fs.existsSync(fullPath)) {
    // Generate content listing child indexes
    const dirPath = path.join(contentDirectory, ...slug);
    let children = [];
    if (fs.existsSync(dirPath)) {
      children = fs.readdirSync(dirPath, { withFileTypes: true });
    }
    
    let title = slug[slug.length - 1];
    title = title.replace(/^\./, '').toUpperCase(); // Capitalize category names
    
    let markdownContent = `# ${title}\n\n`;
    markdownContent += `## Subcategories\n\n`;
    
    children.forEach(item => {
      if (item.isDirectory() && item.name !== 'images') {
        const childIndexPath = path.join(dirPath, item.name, 'index.md');
        let childTitle = item.name;
        if (fs.existsSync(childIndexPath)) {
          const readmeContent = fs.readFileSync(childIndexPath, 'utf8');
          const firstLine = readmeContent.split('\n')[0].trim();
          if (firstLine) {
            childTitle = firstLine.replace(/^#\s*/, '');
          }
        }
        markdownContent += `- [${childTitle}](/articles/${slug.join('/')}/${item.name})\n`;
      }
    });

    return {
      id: slug.join("/"),
      title: title,
      content: markdownContent,
    };
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  copyImagesToPublicDirectory(fullPath);
  let content = fileContents.replace(
    /(!\[[^\]]*\]\()(?:\.\/)?(images\/)/g,
    `$1/${slug.join("/")}/$2`
  );

  const firstLine = fileContents.split('\n')[0].trim();
  let title = slug[slug.length - 1];
  if (firstLine.startsWith('#')) {
    title = firstLine.replace(/^#\s*/, '');
  }

  return {
    id: slug.join("/"),
    title: title,
    content,
  };
}
