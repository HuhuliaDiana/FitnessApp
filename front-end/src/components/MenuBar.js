import { Menu } from "antd";
import {
  FaAddressCard,
  FaCalendarCheck,
  FaCalendarDay,
  FaHistory,
  FaHome,
  FaHouseUser,
  FaIdCardAlt,
  FaPeopleArrows,
  FaRegArrowAltCircleLeft,
  FaSearch,
  FaUserCircle
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function MenuItem() {
  return (
    <Menu.Item>
      <p>Fitness</p>
    </Menu.Item>
  );
}
const MenuBar = () => {
  const navigate = useNavigate();
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("Home", "/home", <FaHome />),
    getItem("Buy membership", "/buy-membership", <FaAddressCard />),
    getItem("Our clubs", "/clubs", <FaHouseUser />),
    getItem("Class schedule", "/schedule", <FaCalendarDay />),
    getItem("Search classes", "/search-classes", <FaSearch />),
    getItem("Personal Training", null, <FaPeopleArrows />, [
      getItem("My PT", "/my-PT", <FaAddressCard />),
      getItem("Buy PT", "/personal-training", <FaAddressCard />),
      getItem("Book PT session", "/book-PT", <FaAddressCard />),
      getItem("Booked PT sessions", "/bookings-PT", <FaCalendarCheck />),
      getItem("PT sessions history", "/bookings-PT-history", <FaHistory />),
    ]),
    getItem("Your profile", null, <FaUserCircle />, [
      getItem("Contact", "/contact", <FaIdCardAlt />),
      getItem("Membership", "/membership", <FaAddressCard />),
      getItem("Bookings history", "/bookings-history", <FaHistory />),
      getItem("Booked classes", "/bookings", <FaCalendarCheck />),
    ]),
  ];
  const onClick = (key) => {
    navigate(key.key);
  };

  return (
    <div className="menu">
      <div>
        <div className="app-name-home">Fit & Repeat</div>
        <Menu
          onClick={onClick}
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="light"
          style={{ marginTop: "10px" }}
          items={items}
        />
      </div>
      <div
        className="log-out-menu"
        onClick={() => {
          navigate("/login");
        }}
      >
        <FaRegArrowAltCircleLeft style={{ fontSize: "30px" }} />
      </div>
    </div>
  );
};
export default MenuBar;
