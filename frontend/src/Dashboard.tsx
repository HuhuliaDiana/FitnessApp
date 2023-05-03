import { useNavigate, useParams } from "react-router-dom";
import { useLocalState } from "./util/useLocalStorage";
import { endOfWeek, startOfWeek } from "date-fns";

const now = new Date();
const formatDateToIsoString = (date: Date) => date.toISOString();

const defaultFrom: string = formatDateToIsoString(
  startOfWeek(now, { weekStartsOn: 1 })
);

const defaultPeriod = `${defaultFrom}`;

const Dashboard = () => {
  console.log(defaultPeriod);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const { id } = useParams();
  function buySubscription() {
    fetch(`/subscription/buy/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      body: JSON.stringify(defaultPeriod),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div className="dashboard">
      <button onClick={() => buySubscription()}>Buy a subscription</button>
    </div>
  );
};

export default Dashboard;
