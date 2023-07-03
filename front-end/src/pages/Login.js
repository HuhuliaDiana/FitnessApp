import { FaLock, FaMailBulk } from "react-icons/fa";
import { Button, Col, Form, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ requestedLocation }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [errMsg, setErrMsg] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.removeItem("accessToken");
    // setErrMsg("");
  }, [email, password]);

  const onFinish = async ({ email, password }) => {
    try {
      fetch("http://localhost:8080/api/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (!response.ok && response.status === 401) {
            toast.error("Unauthorized", {
              position: toast.POSITION.BOTTOM_CENTER,
              autoClose: 1500,
            });
          }
          return Promise.reject("Invalid register attempt.");
        })
        .then((data) => {
          const accessToken = data.accessToken;
          localStorage.setItem("accessToken", accessToken);
          setIsLoggedIn(true);
          navigate(requestedLocation || "/home");
        })
        .catch((message) => {
          console.log(message);
        });
    } catch (err) {
      console.log(err.message);
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
            className="login"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Row>
              <Col style={{ width: "100%" }}>
                <Row className="row-mail">
                  <FaMailBulk style={{ fontSize: "40px", color: "#A9A9A9" }} />
                  <Form.Item
                    style={{ width: "80%" }}
                    name="email"
                    validateFirst={true}
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                      {
                        type: "email",
                        message: "Please input a valid email!",
                      },
                    ]}
                  >
                    <Input
                      autoComplete="email"
                      placeholder="type your email *"
                      type="email"
                      style={{ height: "40px" }}
                    />
                  </Form.Item>
                </Row>

                <Row className="row-password-login">
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
                      style={{ height: "40px" }}
                      autoComplete="current-password"
                      placeholder="type your password *"
                    />
                  </Form.Item>
                </Row>
              </Col>
            </Row>
            <Row
              style={{
                display: "flex",
                "justify-content": " center",
                "margin-top": "10%",
              }}
            >
              <Form.Item style={{ height: "50px" }}>
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
                  Sign in
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </div>
      </div>
      <ToastContainer style={{ marginLeft: "120px" }} />
    </div>
  );
};

export default Login;
