import { Star, StarHalf } from "lucide-react";
import React from "react";

const Rating = ({ rating, reviews }) => {
  // If rating has .5, then round it to the nearest integer and add 0.5 to the end
  let excess = 0;
  if (rating % 1 !== 0) {
    excess = rating - Math.floor(rating);
    rating = Math.floor(rating);
  }

  if (reviews === 0) {
    return (
      <div className="">
        <p className="text-sm text-zinc-500">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      {[...Array(rating)].map((_, i) => {
        return (
          <div key={i}>
            <Star fill="#e1ad01" stroke="#e1ad01" size={16} strokeWidth={1.5} />
          </div>
        );
      })}
      {!excess &&
        [...Array(5 - rating)].map((_, i) => {
          return (
            <div key={i}>
              <Star size={16} strokeWidth={1.5} />
            </div>
          );
        })}
      {excess && (
        <div>
          <StarHalf
            fill="#e1ad01"
            stroke="#e1ad01"
            size={16}
            strokeWidth={1.5}
          />
        </div>
      )}
      {excess && excess > 0 ? (
        <p className="text-sm text-zinc-500">
          ({parseFloat(excess) + parseFloat(rating)} / 5)
        </p>
      ) : (
        <p className="text-sm text-zinc-500">({rating} / 5)</p>
      )}
      <p className="text-sm text-zinc-500">
        {reviews} {reviews > 1 ? "reviews" : "review"}
      </p>
    </div>
  );
};

export default Rating;
