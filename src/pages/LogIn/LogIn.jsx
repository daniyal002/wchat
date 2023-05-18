import React from "react";
import style from "./LogIn.module.css";
import Form from "../../components/Form/Form";
const LogIn = ({
  idInstance,
  setIdInstance,
  apiTokenInstance,
  setApiTokenInstance,
}) => {
  return (
    <div className={style.logIn}>
      <div className="container">
        <Form
          idInstance={idInstance}
          setIdInstance={setIdInstance}
          apiTokenInstance={apiTokenInstance}
          setApiTokenInstance={setApiTokenInstance}
        />
      </div>
    </div>
  );
};

export default LogIn;
