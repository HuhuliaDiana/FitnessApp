const PTSession = (props) => {
  const ptSession = props.parentToChild;
  const trainerName = ptSession.userPersonalTraining.personalTrainer.name;
  console.log(ptSession);
  return (
    <div style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", width: "20%" }}>
      <p>{trainerName}</p>
      <p>
        {ptSession.startSessionTime} - {ptSession.endSessionTime}
      </p>
      <p>{ptSession.sessionDate}</p>
    </div>
  );
};
export default PTSession;
