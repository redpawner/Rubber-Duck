import React, { useState } from "react";
import Login from "../login/login";

export default function Register() {
  const [buttonTitle, setButtonTitle] = useState("Create Account");
  return <Login />;
}
