import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import MenuBar from "../components/MenuBar";

const UserContact = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [user, setUser] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [disabled, setDisabled] = useState(true);
  const [activeBtnStyle, setActiveBtnStyle] = useState(null);
  useEffect(() => {
    if (
      user &&
      (firstname !== user.firstname ||
        lastname !== user.lastname ||
        phone !== user.phone ||
        email !== user.email)
    ) {
      setActiveBtnStyle({
        "background-color": "#006E7F",
        color: "white",
        fontFamily: "'Montserrat',sans-serif",
      });
      setDisabled(false);
    } else {
      setDisabled(true);
      setActiveBtnStyle({
        fontFamily: "'Montserrat',sans-serif",
      });
    }
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
    getCurrentUser();
  }, []);

  return (
    <div className="parent">
      <MenuBar></MenuBar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div
          style={{
            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            padding: "3px",
          }}
        >
          <p
            style={{
              fontSize: "120%",
              fontWeight: "bold",
              marginLeft: "15px",
            }}
          >
            Welcome to Fit & Repeat
          </p>
        </div>

        <div className="child">
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              display: "flex",
              height: "50px",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                marginLeft: "20px",
              }}
            >
              Update your contact data
            </div>
          </div>
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              marginTop: "50px",
              display: "flex",
              padding: "20px",
              flexDirection: "column",
              width: "30%",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div>
              <img
                alt="image"
                src="/contact.svg"
                style={{ width: "50%", padding: "20px" }}
              ></img>
            </div>
            {user && (
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "center",
                }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Col style={{ border: "", width: "60%" }}>
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
                      style={{ fontFamily: "'Montserrat',sans-serif" }}
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
                      style={{ fontFamily: "'Montserrat',sans-serif" }}
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
                      style={{ fontFamily: "'Montserrat',sans-serif" }}
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
                      style={{ fontFamily: "'Montserrat',sans-serif" }}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "40px",
                    }}
                  >
                    <Button
                      disabled={disabled}
                      type="primary"
                      htmlType="submit"
                      style={activeBtnStyle}
                    >
                      Update
                    </Button>
                  </Form.Item>
                </Col>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserContact;
