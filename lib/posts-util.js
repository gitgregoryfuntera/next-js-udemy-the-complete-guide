import fs from "fs";
import path from "path";

import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "posts");

const getPostData = (fileName) => {
  const filePath = path.join(postsDir, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, ""); // removes file extension

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
};

const getAllPosts = () => {
  const postsFiles = fs.readdirSync(postsDir);

  const allPosts = postsFiles
    .map((postFile) => {
      return getPostData(postFile);
    })
    .sort((postA, postB) => (postA.date > postB.date ? -1 : 1));

  return allPosts;
};

const getFeaturedPosts = () => {
  const allPosts = getAllPosts();

  return allPosts.filter((post) => post.isFeatured);
};

export { getPostData, getPostData, getFeaturedPosts };
