import { useNavigate } from "react-router-dom";

const Trainer = (props) => {
  const navigate = useNavigate();

  const trainer = props.parentToChild;
  return (
    <div
      onClick={() => {
        navigate(`/trainer/${trainer.id}`);
      }}
    >
      <p>{trainer.name}</p>
    </div>
  );
};
export default Trainer;
