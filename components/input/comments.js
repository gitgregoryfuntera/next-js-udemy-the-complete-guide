import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const notificationCtx = useContext(NotificationContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/comments/${eventId}`);
      const data = await response.json();
      console.log("🚀 ~ file: comments.js ~ line 21 ~ fetchComments ~ data", data);
      setComments(data);
      setIsLoading(false);
    } catch (e) {
      console.log("🚀 ~ file: comments.js ~ line 22 ~ fetchComments ~ e", e);
      setIsLoading(false);
    }
  };

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    console.log(
      "🚀 ~ file: comments.js ~ line 17 ~ addCommentHandler ~ commentData",
      commentData
    );
    notificationCtx.showNotification({
      title: 'Please wait',
      message: 'Please wait submitting comment',
      status: 'pending',
    });
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
      const response = await fetch(`/api/comments/${eventId}`, options);
      const dataStatus = await response.status;
      const data = await response.json();
      console.log(
        "🚀 ~ file: comments.js ~ line 30 ~ addCommentHandler ~ data",
        data
      );
      if (dataStatus !== 201) {
        throw new Error(`Error: adding comment`);
      }

      notificationCtx.showNotification({
        title: 'Success',
        message: 'Successfully added new comment',
        status: 'success',
      });

      fetchComments();
    } catch (e) {
      console.log(
        "🚀 ~ file: comments.js ~ line 30 ~ addCommentHandler ~ e",
        e
      );
      notificationCtx.showNotification({
        title: 'Error',
        message: e.message,
        status: 'error'
      });
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} isLoading={isLoading}/>}
    </section>
  );
}

export default Comments;
