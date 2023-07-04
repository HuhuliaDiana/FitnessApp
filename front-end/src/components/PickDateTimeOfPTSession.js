import { DatePicker } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";

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
  const [bookingDate, setBookingDate] = useState();
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
    let bkgTimes = bookingTimes;
    let timeSlot = selectedTimeSlot;

    if (bookingTimes.length == 0) {
      setBookingTimes(allTimes);
      bkgTimes = allTimes;
    }
    setSelectedTimeSlot(null);
    timeSlot = null;
    setLocalBookingDate(
      moment(new Date(e)).toISOString().split("T")[0]
    );
    setBookingDate(new Date(e));

    console.log(moment(new Date(e)).toISOString().split("T")[0])

    props.onBookingTimes({
      bookingTimes: bkgTimes,
      selectedTimeSolt: timeSlot,
      localBookingDate: moment(new Date(e))
        .toISOString()
        .split("T")[0],
      bookingDate: new Date(e),
    });
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
      const max = new Date(moment(minDate).add(5, "days"));
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

    } else {
      setBookingTimes(allTimes.sort());
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
    <div>
      <DatePicker
        defaultValue={bookingDate}
        onChange={onDateChange}
        disabledDate={(d) => d.isBefore(minDate) || d.isAfter(maxDate)}
      />
    </div>
  );
};

export default PickDateTimeOfPTSession;
