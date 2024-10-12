import React from "react";
import { Link } from "react-router-dom";
import Text from "../Text";

// Define the type for the props
interface CardProps {
  id: string;
  title: string;
  description: string;
  imageCover: string;
}

const Card: React.FC<CardProps> = ({ id, title, description, imageCover }) => {
  return (
    <Link
      to={"/article/" + id}
      className="flex cursor-pointer justify-between gap-20"
    >
      {/* Text Content */}
      <div className="flex flex-col gap-4 p-8">
        <Text variant="subtitle">{title}</Text>
        <Text variant="description" className="line-clamp-5">
          {description}
        </Text>
      </div>

      {/* Image Cover */}
      <img
        src={imageCover}
        alt="article-cover"
        className="aspect-video h-fit w-[30rem] rounded-3xl object-cover"
      />
    </Link>
  );
};

export default Card;
