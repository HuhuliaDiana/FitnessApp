import { Button, Col, DatePicker, Form, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MenuBar from "../components/MenuBar";
const BuyMembership = () => {
  const clubId = useParams().clubId;
  const accessToken = localStorage.getItem("accessToken");
  const [localDate, setLocalDate] = useState("");
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [county, setCounty] = useState("");

  const id = useParams().id;
  useEffect(() => {
    getSubscriptionById();
  }, [id]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const buyMembership = async () => {
    try {
      fetch(`http://localhost:8080/api/user-subscription/buy`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ id, localDate, clubId }),
        method: "POST",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
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
          setName(data.lastname + " " + data.firstname);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const getSubscriptionById = () => {
    try {
      fetch(`http://localhost:8080/api/subscription/${id}`, {
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
          console.log(response);
        })
        .then((data) => {
          setPrice(data.price);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const onChange = (dateString) => {
    setLocalDate(new Date(dateString).toISOString().split("T")[0]);
  };
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
              color: "#006E7F",
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
              Buy membership
            </div>
          </div>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 30 }}
            style={{
              fontFamily: "'Montserrat',sans-serif",
            }}
            autoComplete="off"
            onFinish={buyMembership}
          >
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                marginTop: "40px",
                display: "flex",
                padding: "20px",
                flexDirection: "column",
                width: "44%",
                justifyContent: "center",
                marginLeft: "28%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "55%",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "5%",
                      fontSize: "18px",
                      color: "#006E7F",
                      fontWeight: "bold",
                    }}
                  >
                    Pick a date to start your subscription
                  </div>
                  <div>
                    <Form.Item
                      validateFirst={true}
                      name="localDate"
                      rules={[
                        {
                          required: true,
                          message: "Please select a date!",
                        },
                      ]}
                    >
                      <DatePicker
                        onChange={onChange}
                        disabledDate={(d) => !d || d.isBefore(new Date())}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div style={{ width: "40%", padding: "20px" }}>
                  <img
                    src="/select-date.svg"
                    alt="image"
                    style={{ width: "70%" }}
                  ></img>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "40px",
                }}
              >
                <div style={{ width: "30%", margin: "auto" }}>
                  <img
                    src="/info-invoice.svg"
                    alt="image"
                    style={{ width: "100%" }}
                  ></img>
                </div>
                <div
                  style={{
                    width: "55%",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  {user && (
                    <div>
                      <p
                        style={{
                          marginBottom: "50px",
                          fontSize: "18px",
                          color: "#006E7F",
                          fontWeight: "bold",
                        }}
                      >
                        Invoice details
                      </p>

                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <Col>
                          <Form.Item label="Name">
                            <Input
                              defaultValue={name}
                              disabled={true}
                              style={{
                                color: "black",
                                fontFamily: "'Montserrat',sans-serif",
                              }}
                            />
                          </Form.Item>
                          <Form.Item label="Email">
                            <Input
                              defaultValue={user.email}
                              disabled={true}
                              style={{
                                color: "black",
                                fontFamily: "'Montserrat',sans-serif",
                              }}
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
                              defaultValue={user.phone}
                              style={{
                                fontFamily: "'Montserrat',sans-serif",
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col style={{ marginLeft: "20px" }}>
                          <Form.Item
                            label="City"
                            name="city"
                            rules={[
                              {
                                required: true,
                                message: "Please input city!",
                              },
                            ]}
                          >
                            <Input
                              style={{
                                fontFamily: "'Montserrat',sans-serif",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                              {
                                required: true,
                                message: "Please input address!",
                              },
                            ]}
                          >
                            <Input
                              style={{
                                fontFamily: "'Montserrat',sans-serif",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            label="County"
                            name="county"
                            rules={[
                              {
                                required: true,
                                message: "Please input county!",
                              },
                            ]}
                          >
                            <Input
                              style={{
                                fontFamily: "'Montserrat',sans-serif",
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "40px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  <div>
                    <p
                      style={{
                        marginBottom: "50px",
                        fontSize: "18px",
                        color: "#006E7F",
                        fontWeight: "bold",
                      }}
                    >
                      Payment
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginRight: "auto",
                      marginLeft: "auto",
                      width: "80%",
                      marginBottom: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>Subscription price:</div>
                    <div style={{ color: "#006E7F", fontWeight: "bold" }}>
                      {price} EUR
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginRight: "auto",
                      marginLeft: "auto",
                      width: "80%",
                      marginBottom: "50px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>Total payment:</div>
                    <div style={{ color: "#006E7F", fontWeight: "bold" }}>
                      {price} EUR
                    </div>
                  </div>
                  <div>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          backgroundColor: "#EE5007",
                          color: "white",
                          padding: "8px",
                          height: "100%",
                          width: "150px",
                          fontFamily: "'Montserrat',sans-serif",
                        }}
                      >
                        Go to payment
                      </Button>
                    </Form.Item>
                  </div>
                </div>

                <div style={{ width: "70%", padding: "20px" }}>
                  <img
                    src="/card.svg"
                    alt="image"
                    style={{ width: "70%" }}
                  ></img>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default BuyMembership;
