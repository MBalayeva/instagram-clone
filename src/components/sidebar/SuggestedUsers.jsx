import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/firebase";

const SuggestedUsers = ({
  userName,
  userId,
  profileId,
  spDocId,
  loggedInUserDocId,
}) => {
  const [followed, SetFollowed] = useState(false);

  const hanldeFolllowUsers = async () => {
    SetFollowed(true);
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    await updateFollowedUserFollowers(spDocId, userId, false);
  };

  return !followed ? (
    <div className="flex flex-row items-center justify-between align-center">
      <div className="flex items-center justify-between">
        <img
          src={`images/avatars/${userName}.jpg`}
          alt=""
          className="rounded-full w-8 mr-3"
        />
        <Link to={`p/${userName}`}>{userName}</Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        onClick={hanldeFolllowUsers}
      >
        folllow
      </button>
    </div>
  ) : null;
};

export default SuggestedUsers;
