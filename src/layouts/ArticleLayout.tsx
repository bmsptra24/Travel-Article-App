import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const ArticleLayout = () => {
  return (
    <main className="font-raleway">
      {/* Navbar */}
      <Navbar />

      {/* Children */}
      <Outlet />
    </main>
  );
};

export default ArticleLayout;
