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

// const getRandomNumInRange = (min, max) => {
//   return Math.floor(Math.random() * (max - min) + min);
// };

// const pickSlotTimes = (times) => {
//   // Get a random number that will indicate how many time slots we pick
//   const timesToPick = getRandomNumInRange(0, times.length);

//   // If the random picked is the maximum possible then return all times
//   if (timesToPick === times.length - 1) {
//     return times;
//   }

//   let timesPicked = [];

//   // Loop until we have picked specified number of times
//   while (timesToPick !== timesPicked.length - 1) {
//     // Get a new index and time
//     const index = getRandomNumInRange(0, times.length);
//     const selectedTime = times[index];
//     // If we already picked that time we continue
//     // as we don't want duplicated
//     if (timesPicked.includes(selectedTime)) continue;
//     // Keep the time
//     timesPicked.push(selectedTime);
//   }

//   // We need to sort the times, as they may not be in a correct order
//   return timesPicked.sort();
// };

const PickDateTimeOfPTSession = (props) => {
  const [times, setTimes] = useState([]);
  const trainerId = props.parentToChild.trainerId;
  const [bookingDate, setBookingDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookingTimes, setBookingTimes] = useState([]);
  const timeSlotCacheRef = useRef(new Map());
  const [ptSessionsOfTrainer, setPtSessionsOfTrainer] = useState();
  const [sessionHoursReserved, setSessionHoursReserved] = useState();
  const accessToken = localStorage.getItem("accessToken");
  const [localBookingDate, setLocalBookingDate] = useState();

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
          console.log(localBookingDate)
          if (localBookingDate) {
            dataFilteredByChosenDate = data.filter(
              (d) => d.sessionDate === localBookingDate
            );
            console.log("dataFilteredByChosenDate");
            console.log(dataFilteredByChosenDate);
          }
          const array = dataFilteredByChosenDate.map(
            (d) => d.startSessionTime + " - " + d.endSessionTime
          );
          console.log("array");
          console.log(array);
          setSessionHoursReserved(array);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (sessionHoursReserved) {
      const extract = allTimes.filter((t) => !sessionHoursReserved.includes(t));
      setTimes(extract);
    }
    if (bookingDate) {
      console.log(moment(bookingDate).add(1,"days").toISOString().split("T")[0])
    }
  }, [sessionHoursReserved, bookingDate]);

  useEffect(() => {
    getPTSessionByTrainerId();
  }, [bookingDate]);

  useEffect(() => {
    // Bail out if there is no date selected
    if (!bookingDate) return;

    // Get time slots from cache
    let newBookingTimes = timeSlotCacheRef.current.get(
      bookingDate.toDateString()
    );

    // If we have no cached time slots then pick new ones
    if (!newBookingTimes) {
      newBookingTimes = times.sort();
      // Update cache with new time slots for the selected date

      timeSlotCacheRef.current.set(bookingDate.toDateString(), newBookingTimes);
    }

    setBookingTimes(newBookingTimes);
  }, [bookingDate]);

  const onDateChange = (e) => {
    setSelectedTimeSlot(null);
    setLocalBookingDate(moment(e.value).add(1,"days").toISOString().split("T")[0])
    setBookingDate(e.value);
  };
  useEffect(() => {
    if (selectedTimeSlot !== null) {
      props.onSelectDateTime({
        localDate: bookingDate.toISOString().split("T")[0],
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
          min={new Date(moment())}
          max={new Date(moment().add(5, "days"))}
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
