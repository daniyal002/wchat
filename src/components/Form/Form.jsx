import React from "react";
import style from "./Form.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = ({}) => {
  const [status, setStatus] = React.useState("");
  const [error, setError] = React.useState("");
  const [idInstance, setIdInstance] = React.useState("");
  const [apiTokenInstance, setApiTokenInstance] = React.useState("");
  const [youPhone, setYourPhone] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("+7");

  const getStatus = async () => {
    try {
      const response = await axios.get(
        `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
      );

      setStatus(response.data);

      console.log(status);
    } catch (error) {
      console.log(error);
      setError("Укажите правильные данные или такой Инстанции не существует");
    }
  };
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    getStatus();
    localStorage.setItem("idInstance", idInstance);
    localStorage.setItem("apiTokenInstance", apiTokenInstance);
    localStorage.setItem("phone", [countryCode, youPhone]);
    event.preventDefault();
  };

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.form__idInstance}>
          <label htmlFor="idInstance" className={style.form__idInstance_label}>
            idInstance:
          </label>
          <input
            type="text"
            name="idInstance"
            required
            className={style.form__input}
            onChange={(e) => setIdInstance(e.target.value)}
          />
        </div>

        <div className={style.form__apiTokenInstance}>
          <label
            htmlFor="apiTokenInstance"
            className={style.form__apiTokenInstance_label}
          >
            apiTokenInstance:
          </label>
          <input
            type="text"
            name="apiTokenInstance"
            required
            className={style.form__apiTokenInstance_input}
            onChange={(e) => setApiTokenInstance(e.target.value)}
          />
        </div>
        <div className={style.form__phone}>
          <label htmlFor="phone" className={style.form__phone_label}>
            Ваш номер телефона:
          </label>
          <div className={style.form__phone_select_input}>
            <select
              className={style.form__phone_select}
              name="coutryCode"
              id="coutryCode-select"
              onChange={(e) => setCountryCode(e.target.value)}
            >
              <option value="+7">+7</option>
              <option value="+7">+1</option>
              <option value="+7">+1246</option>
              <option value="+7">+55</option>
            </select>
            <input
              type="tel"
              name="phone"
              required
              className={style.form__phone_input}
              onChange={(e) => setYourPhone(e.target.value)}
            />
          </div>
        </div>
        <button className={style.form__btn} type="submit">
          Войти
        </button>
        {status ? (
          navigate("/Main", { replace: true })
        ) : (
          <p className={style.form__error}>{error}</p>
        )}
      </form>
    </>
  );
};

export default Form;
