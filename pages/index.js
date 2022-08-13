import FeaturedPosts from "../components/featured-posts";
import Hero from "../components/hero";
import { getFeaturedPosts } from "../lib/posts-util";


const HomePage = ({posts}) => {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export default HomePage;

export const getStaticProps = () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 60,
  };
};
