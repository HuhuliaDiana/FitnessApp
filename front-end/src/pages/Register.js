import { Button, Col, Form, Input, Row } from "antd";
import { useState } from "react";
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
              label="Firstname"
              name="firstname"
              validateFirst={true}
              rules={[
                { required: true, message: "Please input your firstname!" },
                {
                  min: 2,
                  message: "Firstname must have at least 2 characters.",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Lastname"
              name="lastname"
              rules={[
                { required: true, message: "Please input your lastname!" },
                {
                  min: 2,
                  message: "Lastname must have at least 2 characters.",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please input your email!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please input a phone number!" },
                {
                  pattern: new RegExp(
                    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i
                  ),
                  message: "Please input a valid phone number!",
                },
                {
                  max: 10,
                  message: "Phone number cannot have more than 10 digits!",
                },
              ]}
            >
              <Input />
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
            {isFailedRegister && <p>User with email already exists!</p>}
          </Col>
        </Row>
        <Row>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default Register;
