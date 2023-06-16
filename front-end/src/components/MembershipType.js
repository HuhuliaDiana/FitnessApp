import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const MembershipType = (props) => {
  const navigate = useNavigate();
  const subscription = props.parentToChild.subscription;
  const clubId = props.parentToChild.clubId;
  const id = subscription.id;
  const subPeriodName = subscription.subscriptionPeriod.name;
  const array = subPeriodName.split("_");
  let formattedSubscriptionPeriodName = "";
  array.forEach((a) => {
    formattedSubscriptionPeriodName += a + " ";
  });
  return (
    <div
      style={{
        "box-shadow": "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        width: "25%",
        "margin-bottom": "50px",
        padding: "20px",
        fontWeight: "bold",
      }}
    >
      <p style={{ color: "#B22727",fontSize:"20px" }}>{subscription.membership.name}</p>
      <p style={{ color: "#006E7F" }}>{formattedSubscriptionPeriodName}</p>
      <p style={{ color: "#EE5007",fontSize:"20px"  }}>{subscription.price} EUR</p>
      <Button
        style={{
          backgroundColor: "#006E7F",
          color: "white",
          "margin-top": "20px",
          height: "35px",
          fontFamily: "'Montserrat', sans-serif",
        }}
        onClick={() => {
          navigate(`/membership/${id}/${clubId}`);
        }}
      >
        Continue
      </Button>
    </div>
  );
};
export default MembershipType;
