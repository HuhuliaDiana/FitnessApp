import "@progress/kendo-theme-default/dist/all.css";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/routes";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function App() {
  // toast.configure()

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
