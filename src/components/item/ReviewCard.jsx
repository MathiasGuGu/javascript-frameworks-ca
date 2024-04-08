import React from "react";
import Rating from "./Rating";

const ReviewCard = ({ review }) => {
  return (
    <div
      className="flex flex-col gap-2 even:bg-zinc-50 px-3 py-3"
      key={review.id}
    >
      <p className="text-md font-light">{review.username}</p>
      <Rating rating={review.rating} />
      <p className="text-md font-light">{review.description}</p>
    </div>
  );
};

export default ReviewCard;
