import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

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
    getItem("Home", "/home", <HomeOutlined />),
    getItem("Buy membership", "/buy-membership"),
    getItem("Our clubs", "/clubs"),
    getItem("Class schedule", "/schedule"),
    getItem("Search classes", "/search-classes"),
    getItem("Personal Training", "/training", null, [
      getItem("Buy PT", "/personal-training"),
      getItem("Book PT session", "/book-PT"),
      getItem("Booked PT sessions", "/bookings-PT"),
      getItem("PT sessions history", "/bookings-PT-history"),
    ]),
    getItem("Your profile", null, <UserOutlined />, [
      getItem("Contact", "/contact"),
      getItem("Membership", "/membership"),
      getItem("Bookings history", "/bookings-history"),
      getItem("Booked classes", "/bookings"),
      getItem("Log out", null),
    ]),
  ];
  const onClick = (key) => {
    navigate(key.key);
  };
  return (
    <>
      <Menu
        onClick={onClick}
        className="menu"
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="light"
        items={items}
      />
    </>
  );
};
export default MenuBar;
