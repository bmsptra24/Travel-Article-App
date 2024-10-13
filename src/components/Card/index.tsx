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
      className="flex cursor-pointer flex-col items-center justify-between gap-2 md:flex-row md:gap-20"
    >
      {/* Text Content */}
      <div className="flex flex-col gap-4 md:p-8">
        <Text variant="subtitle">{title}</Text>
        <Text variant="description" className="line-clamp-5">
          {description}
        </Text>
      </div>

      {/* Image Cover */}
      <img
        src={imageCover}
        alt="article-cover"
        className="aspect-video h-fit w-full rounded-3xl object-cover md:w-[20rem] lg:w-[30rem]"
      />
    </Link>
  );
};

export default Card;
