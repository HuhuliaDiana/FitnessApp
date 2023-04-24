// import { Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useUser } from "./UserProvider";

// const PrivateRoute = (props: any) => {
//   const user = useUser();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isValid, setIsValid] = useState(null);
//   const { children } = props;

//   if (user && user.jwt) {
//     ajax(`/api/auth/validate`, "get", user.jwt).then((isValid) => {
//       setIsValid(isValid);
//       setIsLoading(false);
//     });
//   } else {
//     return <Navigate to="/login" />;
//   }

//   return isLoading ? (
//     <div>Loading...</div>
//   ) : isValid === true ? (
//     children
//   ) : (
//     <Navigate to="/login" />
//   );
// };

// export default PrivateRoute;
