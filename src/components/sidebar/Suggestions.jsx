import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { getSuggestedUsers } from "../../services/firebase";
import SuggestedUsers from "./SuggestedUsers";

const Suggestions = ({ userId, following, loggedInUserDocId }) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedUsers() {
      const res = await getSuggestedUsers(userId, following);
      setProfiles(res);
    }

    if (userId) {
      suggestedUsers();
    }
  }, [userId]);

  return !profiles ? (
    <Skeleton count={1} height={150}></Skeleton>
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => {
          return (
            <SuggestedUsers
              key={profile.docId}
              spDocId={profile.docId}
              userId={userId}
              userName={profile.username}
              profileId={profile.userId}
              loggedInUserDocId={loggedInUserDocId}
            />
          );
        })}
      </div>
    </div>
  ) : null;
};

export default Suggestions;
