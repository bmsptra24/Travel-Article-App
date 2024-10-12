import { Link, useLocation } from "react-router-dom";
import Text from "../Text";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  console.log({ pathname });

  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      className={`${isOpen ? "-left-[180px]" : "left-0"} bg-neutral absolute bottom-0 top-0 flex h-full flex-col border-b border-r md:sticky md:left-0`}
    >
      <button
        className={`bg-accent absolute -right-10 top-0 h-fit w-fit p-4 transition-all md:hidden`}
      >
        {isOpen ? ">" : "<"}
      </button>
      <Link to={""}>
        <Text
          className={`${pathname === "/dashboard" ? "bg-primary hover:bg-primary cursor-default" : ""} cursor-pointer px-10 py-4 transition-all hover:bg-slate-200`}
        >
          Dashboard
        </Text>
      </Link>
      <Link to={"article"}>
        <Text
          className={`${pathname.includes("/dashboard/article") ? "bg-primary hover:bg-primary cursor-default" : ""} cursor-pointer px-10 py-4 transition-all hover:bg-slate-200`}
        >
          Article
        </Text>
      </Link>
      <Link to={"category"}>
        <Text
          className={`${pathname.includes("/dashboard/category") ? "bg-primary hover:bg-primary cursor-default" : ""} cursor-pointer px-10 py-4 transition-all hover:bg-slate-200`}
        >
          Category
        </Text>
      </Link>
    </div>
  );
};

export default Sidebar;
