import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import MembershipType from "../components/MembershipType";
import { Button } from "antd";
function ClubSubscriptions() {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  const id = location.state.id;
  const name = location.state.name;
  const [subscriptions, setSubscriptions] = useState(null);

  const getSubscriptionsForClub = () => {
    try {
      console.log(id);
      fetch(`http://localhost:8080/api/club/${id}/subscriptions`, {
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
          return Promise.reject("Cannot fetch subscriptions.");
        })
        .then((data) => {
          setSubscriptions(data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSubscriptionsForClub();
  }, []);
  return (
    <>
      <div>You chose {name} </div>
      <Link to="/select-club">Modify</Link>
      <div>
        {subscriptions &&
          subscriptions.map((subscription) => {
            return (
              <MembershipType
                key={subscription.id}
                parentToChild={subscription}
              />
            );
          })}
      </div>
      <Button>See all available memberships</Button>
    </>
  );
}
export default ClubSubscriptions;
