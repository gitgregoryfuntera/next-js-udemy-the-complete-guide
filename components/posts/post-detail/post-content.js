import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import ReactMarkdown from 'react-markdown';
const DUMMY_POST = {
  title: "Getting Started NextJS",
  date: "2022-08-08",
  image: "getting-started-nextjs.png",
  slug: "getting-started-nextjs",
  content: "# This is a first post",
};
const PostContent = () => {
  const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;
  return (
    <article className={classes.content}>
      <PostHeader title={DUMMY_POST.title} image={imagePath} />
      <ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
