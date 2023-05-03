import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";

const MenuBar = () => {
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
    getItem("Dashboard", "1", <HomeOutlined />),
    getItem("Buy membership", "2"),
    getItem("Schedule", "3"),
    getItem("Booked classes", "4"),
    getItem("Personal Training", "5"),
    getItem("Your profile", "sub1", <UserOutlined />, [
      getItem("Contact", "6"),
      getItem("Memberships", "7"),
      getItem("Bookings history", "8"),
    ]),
  ];
  const onClick = (key) => {
    console.log(key);
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
