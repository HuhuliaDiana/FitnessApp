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
import ClassesSchedule from "./pages/ClassesSchedule";
import TrainingClassDetails from "./pages/TrainingClassDetails";
import BookingClasses from "./pages/BookingClasses";
import PersonalTraining from "./pages/PersonalTraining";
import TrainerPage from "./pages/TrainerPage";
import BuyPersonalTraining from "./pages/BuyPersonalTraining";
import BookedClassesHistory from "./pages/BookedClassesHistory";
import Home from "./pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="login" exact element={<Login requestedLocation={null} />} />
      <Route path="home" element={<Home/>} />
      <Route path="register" element={<Register />} />
      <Route path="select-club" exact element={<SelectClub />} />
      <Route path="club-subscriptions" exact element={<ClubSubscriptions />} />
      <Route path="schedule">
        <Route path="" element={<ClassesSchedule />}></Route>
        <Route path=":id" exact element={<TrainingClassDetails />}></Route>
      </Route>
      <Route path="/bookings" element={<BookingClasses />}></Route>
      <Route path="/personal-training" element={<PersonalTraining />}></Route>
      <Route path="/trainer/:id" element={<TrainerPage />}></Route>
      <Route path="/buy-training" element={<BuyPersonalTraining />}></Route>
      <Route path="/booked-history" element={<BookedClassesHistory />}></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
