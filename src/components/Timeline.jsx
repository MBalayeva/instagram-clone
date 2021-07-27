import React from "react";
import Skeleton from "react-loading-skeleton";
import useUsers from "../hooks/use-users";
import Post from "./post";

const Timeline = () => {
  const { photos } = useUsers();
  console.log(photos);

  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton count={4} width={420} height={500}></Skeleton>
      ) : photos?.length > 0 ? (
        photos.map((photo) => <Post key={photo.docId} content={photo} />)
      ) : (
        <p className="text-center text-2xl uppercase">
          follow people to see photos
        </p>
      )}
    </div>
  );
};

export default Timeline;
