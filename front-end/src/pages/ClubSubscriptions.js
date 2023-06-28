import { Button } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MembershipType from "../components/MembershipType";
import MenuBar from "../components/MenuBar";

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
    <div className="parent">
      <MenuBar></MenuBar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div
          style={{
            "box-shadow": "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            padding: "3px",
          }}
        >
          <p
            style={{
              "font-size": "120%",
              "font-weight": "bold",
              "margin-left": "15px",
              color: "#006E7F",
            }}
          >
            Welcome to Fit & Repeat
          </p>
        </div>
        <div className="child">
          <div
            style={{
              "box-shadow": "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              display: "flex",
              "flex-direction": "row",
              "justify-content": "space-between",
            }}
          >
            <div
              style={{
                "margin-top": "auto",
                "margin-bottom": "auto",
                "margin-left": "20px",
              }}
            >
              Club memberships
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <p>
                You chose <b style={{ color: "#006E7F" }}>{name}</b>
              </p>
              <Link
                style={{
                  "margin-top": "auto",
                  textDecoration: "none",
                  "margin-bottom": "auto",
                  "margin-left": "20px",
                  "margin-right": "20px",
                }}
                to="/buy-membership"
              >
                Modify
              </Link>
            </div>
          </div>

          <div
            style={{
              "box-shadow": "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              "margin-top": "100px",
              display: "flex",
              width: "80%",
              "margin-left": "10%",
            }}
          >
            <div style={{ width: "50vh", margin: "auto" }}>
              <img
                src="/memberships_page.svg"
                alt="image"
                style={{ width: "80%", padding: "50px" }}
              />
            </div>
            <div
              style={{
                "box-shadow":
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                width: "80%",
                display: "flex",
                padding: "50px",
                justifyContent: "space-between",
                "flex-wrap": "wrap",
              }}
            >
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
          </div>
          <Button
            style={{
              backgroundColor: "#EE5007",
              color: "white",
              "margin-top": "40px",
              "margin-bottom": "40px",
              "font-size": "100%",
              height: "45px",
              fontFamily: "'Montserrat',sans-serif",
              fontSize: "17px",
            }}
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
        </div>
      </div>
    </div>
  );
}
export default ClubSubscriptions;
