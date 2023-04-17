import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        index path=":id"
        element={
          // <PrivateRoute>
            <Dashboard />
          // </PrivateRoute>
        }
      />
      <Route path="login" element={<Login />} />
    </Route>
  )
);

function App() {

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
