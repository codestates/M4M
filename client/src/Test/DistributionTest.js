import axios from "axios";
import React, { useState } from "react";
require("dotenv").config();

function Test() {
  const [message, setMessage] = useState("test failed");

  // axios
  //   .get(
  //     process.env.REACT_APP_API_URL
  //   )
  //   .then((res) => {
  //     if (res.status === 200) {
  //       setMessage(res.data);
  //     }
  //   })
  //   .catch((err) => console.log(err));

  return <div>{message}</div>;
}

export default Test;
