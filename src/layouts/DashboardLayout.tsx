import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <main className="font-raleway min-h-svh">
      {/* Navbar */}
      <Navbar />

      {/* Children */}
      <section className="relative flex">
        {/* Side Bar */}
        <Sidebar />

        {/* Content */}
        <Outlet />
      </section>
    </main>
  );
};

export default DashboardLayout;
