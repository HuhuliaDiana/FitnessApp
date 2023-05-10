import { Calendar } from "@progress/kendo-react-dateinputs";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

const allTimes = [
  "07:00 - 08:00",
  "08:00 - 09:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
];

const PickDateTimeOfPTSession = (props) => {
  const trainerId = props.parentToChild.trainerId;
  const startDateOfPT = props.parentToChild.startDateOfPT;
  const noDaysValidity = props.parentToChild.noDaysValidity;
  const [bookingDate, setBookingDate] = useState(null);
  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookingTimes, setBookingTimes] = useState([]);
  const [sessionHoursReserved, setSessionHoursReserved] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const [localBookingDate, setLocalBookingDate] = useState();

  useEffect(() => {
    getPTSessionByTrainerId();
  }, [bookingDate]);

  const onDateChange = (e) => {
    if (bookingTimes.length == 0) {
      setBookingTimes(allTimes);
    }
    setSelectedTimeSlot(null);
    setLocalBookingDate(
      moment(e.value).add(1, "days").toISOString().split("T")[0]
    );
    setBookingDate(e.value);
  };

  const getPTSessionByTrainerId = () => {
    try {
      fetch(`http://localhost:8080/api/pt-session/${trainerId}`, {
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
          return Promise.reject("Cannot get PT sessions by trainer id.");
        })
        .then((data) => {
          let dataFilteredByChosenDate = [];
          if (localBookingDate) {
            dataFilteredByChosenDate = data.filter(
              (d) => d.sessionDate === localBookingDate
            );
          }
          const array = dataFilteredByChosenDate.map(
            (d) => d.startSessionTime + " - " + d.endSessionTime
          );
          setSessionHoursReserved(array);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (startDateOfPT) {
      const min =
        new Date(startDateOfPT) > new Date(moment())
          ? new Date(startDateOfPT)
          : new Date(moment());
      setMinDate(min);
    }
    if (noDaysValidity) {
      const max = new Date(moment(minDate).add(4, "days"));
      const finishDateOfPT = new Date(
        moment(startDateOfPT).add(noDaysValidity, "days")
      );
      if (finishDateOfPT < max) {
        setMaxDate(finishDateOfPT);
      } else {
        setMaxDate(max);
      }
    }
  }, []);
  useEffect(() => {
    if (sessionHoursReserved.length !== 0) {
      const extract = allTimes.filter((t) => !sessionHoursReserved.includes(t));
      setBookingTimes(extract.sort());
    }
  }, [sessionHoursReserved]);

  useEffect(() => {
    if (selectedTimeSlot !== null) {
      props.onSelectDateTime({
        localDate: localBookingDate,
        localTime: selectedTimeSlot.split(" - ")[0],
      });
    }
  }, [selectedTimeSlot]);

  return (
    <div className="k-my-8">
      <div className="k-mb-4 k-font-weight-bold">Book driving slot</div>
      <div className="k-flex k-display-flex k-mb-4">
        <Calendar
          value={bookingDate}
          onChange={onDateChange}
          min={minDate}
          max={maxDate}
        />
        <div className="k-ml-4 k-display-flex k-flex-col">
          {bookingTimes.map((time) => {
            return (
              <button
                key={time}
                className="k-button k-mb-4"
                onClick={(e) => {
                  setSelectedTimeSlot(time);
                }}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>

      {bookingDate && selectedTimeSlot ? (
        <div>
          Selected slot: {bookingDate.toDateString()} at {selectedTimeSlot}
        </div>
      ) : null}
    </div>
  );
};

export default PickDateTimeOfPTSession;
