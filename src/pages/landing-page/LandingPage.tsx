import { Link } from "react-router-dom";
import Text from "../../components/Text";
import { useState } from "react";

const LandingPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <main className="relative flex h-[90%] flex-grow flex-col items-center justify-center">
        <Link
          to={"login"}
          className="absolute z-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Text variant="title" className="cursor-pointer text-neutral">
            Explore now!
          </Text>
        </Link>
        <img
          src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="nature-bg"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-black transition-all"
          style={{ opacity: isHovered ? 0.2 : 0.5 }}
        ></div>
      </main>
    </div>
  );
};

export default LandingPage;
