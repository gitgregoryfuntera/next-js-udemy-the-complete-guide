import { useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    console.log(
      "🚀 ~ file: comments.js ~ line 17 ~ addCommentHandler ~ commentData",
      commentData
    );
    // send data to API
    try {
      const reqBody = JSON.stringify(commentData);
      const options = {
        method: "POST",
        body: reqBody,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("/api/comments", options);
      const data = await response.json();
      console.log(
        "🚀 ~ file: comments.js ~ line 30 ~ addCommentHandler ~ data",
        data
      );
    } catch (e) {
      console.log(
        "🚀 ~ file: comments.js ~ line 30 ~ addCommentHandler ~ e",
        e
      );
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </section>
  );
}

export default Comments;
