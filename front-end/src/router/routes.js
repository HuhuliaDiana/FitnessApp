import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import BookPTSession from "../pages/BookPTSession";
import BookedClassesHistory from "../pages/BookedClassesHistory";
import BookingClasses from "../pages/BookingClasses";
import BookingsPT from "../pages/BookingsPT";
import BookingsPTHistory from "../pages/BookingsPTHistory";
import BuyMembership from "../pages/BuyMembership";
import BuyPersonalTraining from "../pages/BuyPersonalTraining";
import ClassesSchedule from "../pages/ClassesSchedule";
import ClubSubscriptions from "../pages/ClubSubscriptions";
import Clubs from "../pages/Clubs";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PersonalTraining from "../pages/PersonalTraining";
import Register from "../pages/Register";
import RenewMembership from "../pages/RenewMembership";
import SearchClasses from "../pages/SearchClasses";
import SelectClub from "../pages/SelectClub";
import TrainerPage from "../pages/TrainerPage";
import TrainingClassDetails from "../pages/TrainingClassDetails";
import UpgradeMembership from "../pages/UpgradeMembership";
import UserContact from "../pages/UserContact";
import UserMembership from "../pages/UserMembership";
import UserPT from "../pages/UserPT";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="login" exact element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="buy-membership" exact element={<SelectClub />} />
      <Route path="club-subscriptions" exact element={<ClubSubscriptions />} />
      <Route path="membership/:id/:clubId" exact element={<BuyMembership />} />
      <Route path="clubs" exact element={<Clubs />} />
      <Route path="schedule">
        <Route path="" element={<ClassesSchedule />}></Route>
        <Route path=":id" exact element={<TrainingClassDetails />}></Route>
      </Route>
      <Route path="/bookings" element={<BookingClasses />}></Route>
      <Route path="/personal-training" element={<PersonalTraining />}></Route>
      <Route path="/trainer/:id" element={<TrainerPage />}></Route>
      <Route path="/buy-training" element={<BuyPersonalTraining />}></Route>
      <Route path="/my-PT" element={<UserPT />}></Route>
      <Route
        path="/bookings-history"
        element={<BookedClassesHistory />}
      ></Route>
      <Route path="home" element={<Home />} />
      <Route path="/membership" element={<UserMembership />}></Route>
      <Route path="/upgrade-membership" element={<UpgradeMembership />}></Route>
      <Route path="/contact" element={<UserContact />}></Route>
      <Route path="/book-PT" element={<BookPTSession />}></Route>
      <Route
        path="/bookings-PT-history"
        element={<BookingsPTHistory />}
      ></Route>
      <Route path="/bookings-PT" element={<BookingsPT />}></Route>
      <Route path="/search-classes" element={<SearchClasses />}></Route>
      <Route path="/renew-membership" element={<RenewMembership />}></Route>
    </Route>
  )
);

export default router;
