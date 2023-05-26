import { Button, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import { FaLock, FaMailBulk, FaPhoneAlt, FaIdCardAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [isFailedRegister, setIsFailedRegister] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async () => {
    try {
      fetch("/user", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({ firstname, lastname, email, phone, password }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            setIsFailedRegister(true);
          }
          return Promise.reject("Invalid register attempt.");
        })
        .then(() => {
          navigate("/login");
        })
        .catch((message) => {
          console.log(message);
        });
    } catch (e) {
      setIsFailedRegister(true);
      console.log("Error:", e);
    }
  };

  return (
    <div className="login-page">
      <div className="floating">
        <img src="/login.svg" alt="image" style={{ width: "80%" }} />
      </div>
      <div className="login-form">
        <div className="component-login">
          <div className="app-name">Fit & Repeat</div>
          <Form
            name="basic"
            className="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Row>
              <Col style={{ width: "100%" }}>
                <Row className="row-mail">
                  <FaIdCardAlt style={{ fontSize: "40px", color: "#A9A9A9" }} />
                  <Form.Item
                    style={{ width: "80%" }}
                    name="firstname"
                    validateFirst={true}
                    rules={[
                      {
                        required: true,
                        message: "Please input your firstname!",
                      },
                      {
                        min: 2,
                        message: "Firstname must have at least 2 characters.",
                      },
                    ]}
                  >
                    <Input
                      style={{ height: "40px" }}
                      placeholder="your firstname *"
                    />
                  </Form.Item>
                </Row>
                <Row className="row-mail">
                  <FaIdCardAlt style={{ fontSize: "40px", color: "#A9A9A9" }} />
                  <Form.Item
                    style={{ width: "80%" }}
                    name="lastname"
                    rules={[
                      {
                        required: true,
                        message: "Please input your lastname!",
                      },
                      {
                        min: 2,
                        message: "Lastname must have at least 2 characters.",
                      },
                    ]}
                  >
                    <Input
                      style={{ height: "40px" }}
                      placeholder="your lastname *"
                    />
                  </Form.Item>
                </Row>
                <Row className="row-mail">
                  <FaMailBulk style={{ fontSize: "40px", color: "#A9A9A9" }} />
                  <Form.Item
                    name="email"
                    style={{ width: "80%" }}
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { type: "email", message: "Please input your email!" },
                    ]}
                  >
                    <Input style={{ height: "40px" }} placeholder="email *" />
                  </Form.Item>
                </Row>
                <Row className="row-mail">
                  <FaPhoneAlt style={{ fontSize: "40px", color: "#A9A9A9" }} />

                  <Form.Item
                    name="phone"
                    style={{ width: "80%" }}
                    rules={[
                      {
                        required: true,
                        message: "Please input a phone number!",
                      },
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
                    <Input style={{ height: "40px" }} placeholder="phone *" />
                  </Form.Item>
                </Row>
                <Row className="row-password">
                  <FaLock style={{ fontSize: "40px", color: "#A9A9A9" }} />
                  <Form.Item
                    name="password"
                    style={{ width: "80%" }}
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="set password *"
                      autoComplete="current-password"
                      style={{ height: "40px" }}
                    />
                  </Form.Item>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                {isFailedRegister && <p>User with email already exists!</p>}
              </Col>
            </Row>
            <Row
              style={{
                display: "flex",
                "justify-content": "space-between",
                "margin-top": "10%",
                width: "100%",
                height: "50px",
                "padding-left": "13%",
                "padding-right": "13%",
              }}
            >
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-button"
                  style={{
                    height: "100%",
                    width: "130px",
                    "background-color": "#006E7F",
                  }}
                >
                  Sign up
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  className="login-button"
                  style={{
                    height: "100%",
                    width: "130px",
                    "background-color": "white",
                    color: "#006E7F",
                  }}
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
