import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import '@progress/kendo-theme-default/dist/all.css';  
import BookPTSession from "./pages/BookPTSession";
import BookedClassesHistory from "./pages/BookedClassesHistory";
import BookingClasses from "./pages/BookingClasses";
import BuyPersonalTraining from "./pages/BuyPersonalTraining";
import ClassesSchedule from "./pages/ClassesSchedule";
import ClubSubscriptions from "./pages/ClubSubscriptions";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PersonalTraining from "./pages/PersonalTraining";
import Register from "./pages/Register";
import SelectClub from "./pages/SelectClub";
import TrainerPage from "./pages/TrainerPage";
import TrainingClassDetails from "./pages/TrainingClassDetails";
import UpgradeMembership from "./pages/UpgradeMembership";
import UserContact from "./pages/UserContact";
import UserMembership from "./pages/UserMembership";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="login" exact element={<Login requestedLocation={null} />} />
      <Route path="home" element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="buy-membership" exact element={<SelectClub />} />
      <Route path="club-subscriptions" exact element={<ClubSubscriptions />} />
      <Route path="schedule">
        <Route path="" element={<ClassesSchedule />}></Route>
        <Route path=":id" exact element={<TrainingClassDetails />}></Route>
      </Route>
      <Route path="/bookings" element={<BookingClasses />}></Route>
      <Route path="/personal-training" element={<PersonalTraining />}></Route>
      <Route path="/trainer/:id" element={<TrainerPage />}></Route>
      <Route path="/buy-training" element={<BuyPersonalTraining />}></Route>
      <Route
        path="/bookings-history"
        element={<BookedClassesHistory />}
      ></Route>
      <Route path="/membership" element={<UserMembership />}></Route>
      <Route path="/upgrade-membership" element={<UpgradeMembership />}></Route>
      <Route path="/contact" element={<UserContact />}></Route>
      <Route path="/book-PT" element={<BookPTSession />}></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
