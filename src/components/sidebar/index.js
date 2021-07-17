import React from "react";
import useUser from "../../helpers/use-user";
import User from "./User";
import Suggestions from "./Suggestions";

const Sidebar = () => {
  const {
    user: { username, userId, fullName },
  } = useUser();

  return (
    <>
      <User username={username} fullName={fullName} />
      <Suggestions id={userId} />
    </>
  );
};

export default Sidebar;
