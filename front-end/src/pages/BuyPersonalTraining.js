import { useLocation } from "react-router-dom";

const BuyPersonalTraining = () => {
  const location = useLocation();
  const trainingId = location.state.trainingId;
  console.log(trainingId);
  const trainerName= location.state.trainerName;
  console.log(trainerName);
  return <div></div>;
};
export default BuyPersonalTraining;
