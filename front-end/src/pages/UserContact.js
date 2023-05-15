import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import MenuBar from "../components/MenuBar";

const UserContact = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [clubsAllowAccess, setClubsAllowAccess] = useState([]);
  const [user, setUser] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (
      user &&
      (firstname !== user.firstname ||
        lastname !== user.lastname ||
        phone !== user.phone ||
        email !== user.email)
    )
      setDisabled(false);
    else setDisabled(true);
  }, [firstname, lastname, email, phone]);
  const getCurrentUser = () => {
    try {
      fetch(`http://localhost:8080/api/user`, {
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
          return Promise.reject("Cannot get current user.");
        })
        .then((data) => {
          setUser(data);
          setFirstname(data.firstname);
          setLastname(data.lastname);
          setPhone(data.phone);
          setEmail(data.email);
          setDisabled(true);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const getClubsAllowAccess = () => {
    try {
      fetch(`http://localhost:8080/api/club/available`, {
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
          return Promise.reject("Cannot fetch clubs.");
        })
        .then((data) => {
          setClubsAllowAccess(data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const onFinish = () => {
    try {
      fetch(`http://localhost:8080/api/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "put",
        body: JSON.stringify({ firstname, lastname, email, phone }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject("Cannot get current user.");
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getClubsAllowAccess();
    getCurrentUser();
  }, []);

  return (
    <div className="parent">
      <MenuBar></MenuBar>
      <div className="child">
        <div className="contact">
          {user && (
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Firstname"
                    name="firstname"
                    validateFirst={true}
                    rules={[
                      {
                        min: 2,
                        message: "Firstname must have at least 2 characters.",
                      },
                    ]}
                  >
                    <Input
                      defaultValue={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Lastname"
                    name="lastname"
                    rules={[
                      {
                        min: 2,
                        message: "Lastname must have at least 2 characters.",
                      },
                    ]}
                  >
                    <Input
                      defaultValue={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { type: "email", message: "Please input your email!" },
                    ]}
                  >
                    <Input
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                      {
                        pattern: new RegExp(
                          /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i
                        ),
                        message: "Please input a valid phone number!",
                      },
                      {
                        max: 10,
                        message:
                          "Phone number cannot have more than 10 digits!",
                      },
                    ]}
                  >
                    <Input
                      defaultValue={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                      disabled={disabled}
                      type="primary"
                      htmlType="submit"
                    >
                      Update
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          )}
        </div>
        <div>
          {clubsAllowAccess &&
            clubsAllowAccess.map((club) => {
              return <p key={club.id}>{club.name}</p>;
            })}
        </div>
      </div>
    </div>
  );
};
export default UserContact;
