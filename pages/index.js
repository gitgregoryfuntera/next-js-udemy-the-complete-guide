import FeaturedPosts from "../components/featured-posts";
import Hero from "../components/hero";
import { getFeaturedPosts } from "../lib/posts-util";
import Head from "next/head";

const HomePage = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Greg's Blog</title>
        <meta
          name="description"
          content="I post about programming and web development"
        />
      </Head>
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
