import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import useUser from "../../helpers/use-user";
import {
  isLoggedInUserFollowingProfile,
  toggleFollow,
} from "../../services/firebase";

const Header = ({
  photosCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers = [],
    following = [],
    username: profileUsername,
  },
  followerCount,
  setFollowerCount,
}) => {
  const [isFollowingProfile, setIsFollowingProfile] = useState(null);
  const { user } = useUser();
  const actibeBtnFollow = user.username && profileUsername !== user.username;

  const handleToggleFollow = async () => {
    setIsFollowingProfile(!isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };

  useEffect(() => {
    const isUserFollowingProfile = async () => {
      const isFollowing = await isLoggedInUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(isFollowing);
    };
    if (user?.username && profileUserId) {
      isUserFollowingProfile();
    }
  }, [user.username, profileUserId]);

  console.log(fullName);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        {user.username && (
          <img
            className="rounded-full h-40 w-40 flex"
            alt="profile pic"
            src={`/images/avatars/${profileUsername}.jpg`}
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {actibeBtnFollow && (
            <button
              type="button"
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              onClick={handleToggleFollow}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleToggleFollow();
              }}
            >
              {isFollowingProfile ? "unfollow" : "follow"}
            </button>
          )}
        </div>
        <div className="flex container mt-4">
          {followers === undefined || following === undefined ? (
            <Skeleton count={1} width={366} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold mr-2">{photosCount}</span>
                photos
              </p>
              <p className="mr-10">
                <span className="font-bold mr-2">{followerCount}</span>
                {followers.length === 1 ? "follower" : "followers"}
              </p>
              <p className="mr-10">
                <span className="font-bold mr-2">{following.length}</span>
                following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {fullName ? fullName : <Skeleton count={1} height={24} />}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
