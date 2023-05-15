import { Button, Col, Form, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ requestedLocation }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setErrMsg("");
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
          } else if (!response.ok && response.status === 400) {
            setErrMsg("Missing Username or Password");
          } else if (!response.ok && response.status === 401) {
            setErrMsg("Unauthorized");
          }
          return Promise.reject("Invalid register attempt.");
        })
        .then((data) => {
          const accessToken = data.accessToken;
          localStorage.setItem("accessToken", accessToken);
          setIsLoggedIn(true);
          navigate( requestedLocation || "/home");
        })
        .catch((message) => {
          console.log(message);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Username"
              name="email"
              validateFirst={true}
              rules={[
                { required: true, message: "Please input your username!" },
                { type: "email", message: "Please input a valid email!" },
              ]}
            >
              <Input autoComplete="email" type="email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password autoComplete="current-password" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>{!isLoggedIn && <p>{errMsg}</p>}</Col>
        </Row>
        <Row>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default Login;
