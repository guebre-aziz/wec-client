import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Topbar from "../components/topbar/Topbar";

export default function PrivateLayout() {
  return (
    <>
      <Topbar />
      <Outlet />
      <Footer />
    </>
  );
}
