import { useState, useEffect, useContext } from "react";
import userContext from "../context/user";
import { getUserByUserId, getPhotos } from "../services/firebase";

const useUsers = () => {
  const [photos, setPhotos] = useState("");
  const {
    user: { uid: userId = "" },
  } = useContext(userContext);

  useEffect(() => {
    const getFollowingUserPhotos = async () => {
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPhotos = [];
      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    };

    getFollowingUserPhotos();
  }, []);

  return { photos };
};

export default useUsers;
