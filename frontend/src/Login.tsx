import { Button, Col, Form, Input, Row } from "antd";
import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalState } from "./util/useLocalStorage";

type LoginFormValues = {
  email: string;
  password: string;
};

const Login: FC<{ requestedLocation?: string | null }> = ({
  requestedLocation,
}) => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const navigate = useNavigate();
  const [isFailedLogin, setIsFailedLogin] = useState<boolean>(false);

  const onFinish = async (values: LoginFormValues) => {
    try {
      setIsFailedLogin(false);
      fetch("/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            setIsFailedLogin(true);
          }
          return Promise.reject("Invalid login attempt.");
        })
        .then((data) => {
          const jwt = data.accessToken;
          setJwt(jwt);
          navigate(requestedLocation || '/select-club');
        })
        .catch((message) => {
          console.log(message);
        });
    } catch (e) {
      setIsFailedLogin(true);
      console.log("Error:", e);
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
              <Input autoComplete="username" type="email" />
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
          <Col>
            {isFailedLogin && (
              <p>Oops!You've enetered the username or password wrong!</p>
            )}
          </Col>
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
