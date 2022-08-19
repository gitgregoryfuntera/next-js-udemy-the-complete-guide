import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

const PostDetailPage = ({ post }) => {
  return <PostContent post={post} />;
};

export const getStaticProps = (context) => {
  const {
    params: { slug },
  } = context;
  const post = getPostData(slug);
  return {
    props: {
      post,
    },
    revalidate: 600,
  };
};
export const getStaticPaths = () => {
  const postFiles = getPostsFiles();
  const slugs = postFiles.map((file) => file.replace(/\.md$/, ""));
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export default PostDetailPage;
