import { useEffect, useState, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";

const useUser = () => {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getUserObjByUserId = async () => {
      const [result] = await getUserByUserId(user.uid);
      setActiveUser(result);
    };

    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return { user: activeUser };
};

export default useUser;
