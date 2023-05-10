const PTSession = (props) => {
  const ptSession = props.parentToChild;
  const trainerName = ptSession.userPersonalTraining.personalTrainer.name;
  console.log(ptSession);
  return (
    <div>
      <p>{trainerName}</p>
      <p>
        {ptSession.sessionDate}: {ptSession.startSessionTime} -{" "}
        {ptSession.endSessionTime}
      </p>
    </div>
  );
};
export default PTSession;
