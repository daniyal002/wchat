import React from "react";
import style from "./LogIn.module.css";
import Form from "../../components/Form/Form";
const LogIn = () => {
  return (
    <div className={style.logIn}>
      <div className="container">
        <Form />
      </div>
    </div>
  );
};

export default LogIn;
