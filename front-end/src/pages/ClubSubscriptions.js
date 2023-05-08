import { Button } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MembershipType from "../components/MembershipType";
function ClubSubscriptions() {
  const location = useLocation();

  const accessToken = localStorage.getItem("accessToken");
  const id = location.state.id;
  const name = location.state.name;
  const [subscriptions, setSubscriptions] = useState(null);
  const firstLabel = "See all available memberships for the club";
  const [label, setLabel] = useState(firstLabel);
  const [expandList, setExpandList] = useState(true);

  const getSubscriptionsForClub = (endPath) => {
    try {
      fetch(`http://localhost:8080/api/club/${id}/subscriptions/${endPath}`, {
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
    getSubscriptionsForClub("");
  }, []);

  return (
    <>
      <div>You chose {name} </div>
      <Link to="/buy-membership">Modify</Link>
      <div>
        {subscriptions &&
          subscriptions.map((subscription) => {
            return (
              <MembershipType
                key={subscription.id}
                parentToChild={{ subscription: subscription, clubId: id }}
              />
            );
          })}
      </div>
      <Button
        onClick={() => {
          if (expandList) {
            getSubscriptionsForClub("all");
            setLabel("See memberships of the club");
          } else {
            getSubscriptionsForClub("");
            setLabel(firstLabel);
          }
          setExpandList(!expandList);
        }}
      >
        {label}
      </Button>
    </>
  );
}
export default ClubSubscriptions;
