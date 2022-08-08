import PostGrid from "../posts/post-grid";
import classes from "./styles.module.css";

const FeaturedPosts = ({ posts }) => {
  return (
    <section>
      <h2>Featured Posts</h2>
      <PostGrid posts={posts} />
    </section>
  );
};

export default FeaturedPosts;
