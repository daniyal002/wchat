import React from "react";
import style from "./Main.module.css";
import Header from "../../components/Header/Header";
import axios from "axios";
import Chat from "../../components/Chat/Chat";
import Customer from "../../components/Customer/Customer";

const Main = () => {
  const [messages, setMessages] = React.useState([]);
  const [selectedNumber, setSelectedNumber] = React.useState(null);
  const [idInstance, setIdInstance] = React.useState(
    localStorage.getItem("idInstance")
  );
  const [apiTokenInstance, setApiTokenInstance] = React.useState(
    localStorage.getItem("apiTokenInstance")
  );
  const [customer, setCustomer] = React.useState([]);
  const [phone, setPhone] = React.useState(null);
  const [yourPhoneValide, setYourPhoneValide] = React.useState(null);

  const [countryCode, setCountryCode] = React.useState("+7");
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    const getMessage = async () => {
      try {
        const url = `https://api.green-api.com/waInstance${idInstance}/lastIncomingMessages/${apiTokenInstance}?minutes=10000`;

        const response = await axios.get(url);
        setMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMessage();
  }, [idInstance, apiTokenInstance]);

  React.useEffect(() => {
    const personalChats = messages.filter((message) =>
      message.chatId.endsWith("@c.us")
    );
    const personalChatNumbers = [
      ...new Set(personalChats.map((message) => message.senderId)),
    ];
    setCustomer(personalChatNumbers);
  }, [messages]);

  const sendMessage = async (number, message) => {
    try {
      let validPhone = countryCode + number;
      validPhone = validPhone.replace("+", "");
      validPhone = validPhone.replace(",", "");
      setYourPhoneValide(validPhone);
      const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

      const payload = {
        chatId: yourPhoneValide,
        message: message,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await axios
        .post(url, payload, { headers })
        .then((data) => {
          console.log(data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (number, message) => {
    sendMessage(number, message);
    // event.preventDefault();
  };

  const handleClickNumber = (number) => {
    setSelectedNumber(number);
  };

  return (
    <div className={style.main}>
      <Header />
      <div className="container">
        <div className={style.main__interface_menu}>
          <div className={style.main__interface_menu_customer}>
            <form
              onSubmit={handleSubmit(phone, message)}
              className={style.main__interface_menu_customer_sendMessage_form}
            >
              <p
                className={
                  style.main__interface_menu_customer_sendMessage_form_text
                }
              >
                Отправить новое сообщение
              </p>
              <div
                className={
                  style.main__interface_menu_customer_sendMessage_form_phone
                }
              >
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
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <input
                type="text"
                placeholder="сообщение"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Отправить</button>
            </form>
            <ul className={style.customer_list}>
              {customer.map((number, index) => (
                <Customer
                  key={index}
                  numbers={number}
                  onClick={handleClickNumber}
                />
              ))}
            </ul>
          </div>

          <div className={style.main__interface_menu_chat}>
            {selectedNumber && (
              <>
                <Chat number={selectedNumber} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
