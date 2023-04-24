import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SelectClub from "./pages/SelectClub";
import ClubSubscriptions from "./pages/ClubSubscriptions";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="login" exact element={<Login requestedLocation={null} />} />
      <Route path="register" element={<Register />} />
      <Route path="select-club" exact element={<SelectClub />} />
      <Route path="club-subscriptions" exact element={<ClubSubscriptions />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
