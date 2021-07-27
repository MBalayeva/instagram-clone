import React, { useState, useContext } from "react";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";

const AddComment = ({ docId, comments, setComments, commentInput }) => {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    setComments([{ displayName, comment }, ...comments]);
    setComment("");

    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({ comments: FieldValue.arrayUnion({ displayName, comment }) });
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        method="post"
        className="pl-0 pr-5 flex justify-between"
        onClick={(e) =>
          comment.legth > 1 ? handleSubmitComment(e) : e.preventDefault()
        }
      >
        <input
          type="text"
          aria-label="add a comment"
          className="text-sm text-gray-base mr-3 py-5 px-4 w-full"
          placeholder="Leave a comment"
          value={comment}
          autoComplete="off"
          onChange={(e) => setComment(e.target.value)}
          name="add-comment"
          ref={commentInput}
        />

        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          type="submit"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddComment;
