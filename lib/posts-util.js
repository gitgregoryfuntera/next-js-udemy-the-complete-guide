import fs from "fs";
import path from "path";

import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/posts");

const getPostsFiles = () => {
  return fs.readdirSync(postsDir);
};

const getPostData = (postIdentifier) => {
  const postSlug = postIdentifier.replace(/\.md$/, ""); // removes file extension
  const filePath = path.join(postsDir, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
};

const getAllPosts = () => {
  const postsFiles = getPostsFiles();

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

export { getPostData, getAllPosts, getFeaturedPosts, getPostsFiles };
