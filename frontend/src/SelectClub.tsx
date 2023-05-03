import { FC, useEffect } from "react";
import { useLocalState } from "./util/useLocalStorage";
import { Button } from "antd";

const SelectClub: FC = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  function getClubs() {
    fetch("/club", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "get",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Could not get list of clubs");
      })
      .then((data) => {
        console.log(data);
      })
      .catch((message) => {
        console.log(message);
      });
  }
    return <div className="select-club">
      <Button onClick={getClubs}>Get clubs</Button>
  </div>;
};
export default SelectClub;
