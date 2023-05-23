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

  const handleClickNumber = (number) => {
    setSelectedNumber(number);
  };

  return (
    <div className={style.main}>
      <Header />
      <div className="container">
        <div className={style.main__interface_menu}>
          <div className={style.main__interface_menu_customer}>
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
              <div>
                <h2>
                  Выбранный контакт: {selectedNumber.replace("@c.us", "")}
                </h2>
                <Chat number={selectedNumber} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
