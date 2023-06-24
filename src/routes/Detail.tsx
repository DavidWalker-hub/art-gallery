import React from "react";
import { useParams } from "react-router-dom";

export const Detail: React.FC = () => {
  const { imageId } = useParams();
  console.log("imageId", imageId);
  return <></>;
};
