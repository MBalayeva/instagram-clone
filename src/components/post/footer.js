import React from "react";

const Footer = ({ username, caption }) => {
  return (
    <div className="flex p-4 pb-1">
      <div className="font-bold">{username}</div>
      <div className="ml-2">{caption}</div>
    </div>
  );
};

export default Footer;
