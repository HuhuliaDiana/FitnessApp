import { Button } from "antd";
const MembershipType = (props) => {
  const subscription = props.parentToChild;
  console.log(subscription);
  return (
    <div>
      <p>
        {subscription.membership.name} {subscription.subscriptionPeriod.name}
      </p>
      <p>{subscription.price}</p>
      <Button>Choose</Button>
    </div>
  );
};
export default MembershipType;
