import AllPosts from "../../components/posts/all-posts";

const DUMMY_POSTS = [
  {
    title: "Getting Started NextJS",
    date: "2022-08-08",
    image: "getting-started-nextjs.png",
    slug: "getting-started-nextjs",
    excerpt: "Getting Started NextJS sample excerpt",
  },
  {
    title: "NextJS File Based Routing",
    date: "2022-09-08",
    image: "nextjs-file-based-routing.png",
    slug: "nextjs-file-based-routing",
    excerpt: "NextJS File Based Routing sample excerpt",
  },
];
const AllPostsPage = () => {
  return (
    <>
      <AllPosts posts={DUMMY_POSTS} />
    </>
  );
};

export default AllPostsPage;
