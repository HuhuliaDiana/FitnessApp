import { useEffect, useState } from "react";
import MembershipType from "../components/MembershipType";
import MenuBar from "../components/MenuBar";

const RenewMembership = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [clubId, setClubId] = useState();
  const [memberships, setMemberships] = useState([]);
  const getUserSubscription = () => {
    try {
      fetch(`http://localhost:8080/api/user-subscription`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "get",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject("Cannot fetch user subscription.");
        })
        .then((data) => {
          console.log(data);
          setClubId(data.club.id);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const getMembershipsForRenew = () => {
    try {
      fetch(`http://localhost:8080/api/user-subscription/renew`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "get",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject("Cannot fetch memberships for renew.");
        })
        .then((data) => {
          console.log(data);
          setMemberships(data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserSubscription();
    getMembershipsForRenew();
  }, []);
  return (
    <div
      style={{
        border: "",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {memberships &&
        memberships.map((membership) => {
          return (
            <MembershipType
              key={membership.id}
              parentToChild={{ subscription: membership, clubId: clubId }}
            />
          );
        })}
    </div>
  );
};
export default RenewMembership;
