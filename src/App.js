import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/editProfile/EditProfile";
import Register from "./pages/register/Register";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/404/404";
import PrivateLayout from "./layout/PrivateLayout";
import PublicLayout from "./layout/PublicLayout";
import Notifier from "./components/notifier/Notifier";
import Loading from "./components/loading/Loading";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route index path={"/"} element={<Home />} />
          <Route path={"/profile/:username"} element={<Profile />} />
          <Route path={"/editProfile"} element={<EditProfile />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path={"/register"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Notifier />
      <Loading />
    </BrowserRouter>
  );
}

export default App;
