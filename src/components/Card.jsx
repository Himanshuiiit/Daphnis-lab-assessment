import React, { useState } from "react";

const Card = ({ product }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const words = product.description;
  const truncatedDescription = words.slice(0, 150);

  const displayDescription = showFullDescription
    ? product.description
    : truncatedDescription;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img
        className="w-96 h-96 object-contain"
        src={product.image}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.title}</div>
        <p className="text-gray-700 text-base">
          {displayDescription}
          {words.length > 150 && (
            <span
              onClick={toggleDescription}
              className="cursor-pointer font-semibold"
            >
              {showFullDescription ? " Read less" : "...Read more"}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Card;
