import PTSession from "../components/PTSession";

const PTSessionByTrainer = (props) => {
  const bookingsPT = props.parentToChild.data;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {bookingsPT &&
        bookingsPT.map((bookingPT) => {
          return <PTSession key={bookingPT.id} parentToChild={bookingPT} />;
        })}
    </div>
  );
};
export default PTSessionByTrainer;
