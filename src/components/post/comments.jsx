import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import AddComment from "./addComment";

const Comments = ({ docId, posted, allComments, commentInput }) => {
  const [comments, setComments] = useState(allComments);
  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length >= 2 && (
          <p className="text-gray-base text-xs mb-1 cursor-pointer">
            View all Comments
          </p>
        )}

        {comments.slice(0, 3).map((item) => (
          <p key={`${item.comment}-${item.displayName}`}>
            <Link
              to={`/p/${item.displayName}`}
              className="text-sm font-bold mr-2"
            >
              <span>{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        <p className="text-gray-base uppercase text-xs mt-2 mb-5">
          {formatDistance(posted, new Date())} ago
        </p>
        <AddComment
          docId={docId}
          comments={comments}
          setComments={setComments}
          commentInput={commentInput}
        />
      </div>
    </>
  );
};

export default Comments;
