import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Dashboard,
  HomeLayout,
  Landing,
  Login,
  Logout,
  Register,
} from "./pages";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./pages/Navbar";
import FindFriends from "./pages/FindFriends";
import Questionaire from "./pages/Questionaire";
import DummyPage from "./pages/DummyPage";
import Loader from "./pages/Loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Questionaire/>,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "findFriends",
        element: <FindFriends />,
      },
      {
        path: "questionaire",
        element: <Dashboard/>,
      },
      {
        path: "resultPage",
        element:  <DummyPage/>,
      },
      {
        path: "loader",
        element:  <Loader/>,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
