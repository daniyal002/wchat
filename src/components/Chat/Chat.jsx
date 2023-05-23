import React from "react";
import style from "./Chat.module.css";
import axios from "axios";
const Chat = ({ number }) => {
  const [idInstance, setIdInstance] = React.useState(
    localStorage.getItem("idInstance")
  );
  const [apiTokenInstance, setApiTokenInstance] = React.useState(
    localStorage.getItem("apiTokenInstance")
  );
  const [chatList, setChatList] = React.useState([]);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    const getChat = async () => {
      try {
        const url = `https://api.green-api.com/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`;

        const payload = {
          chatId: number,
          count: 10,
        };

        const headers = {
          "Content-Type": "application/json",
        };

        const response = await axios
          .post(url, payload, { headers })
          .then((data) => {
            setChatList(data.data.reverse());
            console.log(data.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getChat();
  }, [number]);

  const sendMessage = async (number, message) => {
    try {
      const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

      const payload = {
        chatId: number,
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
  return (
    <ul className={style.chat__list}>
      {chatList.map((chatItem, index) => (
        <div key={index} className={style.chat__list_item}>
          {chatItem.type === "incoming" ? (
            <div className={style.chat__list_item_incoming}>
              <p className={style.chat__list_item_incoming_text}>
                {chatItem.textMessage}
              </p>
            </div>
          ) : (
            <div className={style.chat__list_item_outgoing}>
              <p className={style.chat__list_item_outgoing_text}>
                {chatItem.textMessage}
              </p>
            </div>
          )}
        </div>
      ))}
      <div className={style.chat__list_item} style={{ flexGrow: 1 }}></div>{" "}
      {/* Добавлен пустой элемент с flex-grow: 1 */}
      <div className={style.sendMessage}>
        <input
          type="text"
          className={style.sendMessage__input}
          placeholder="Введите сообщение"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          className={style.sendMessage__btn}
          onClick={() => {
            sendMessage(number, message);
            setMessage("");
          }}
        >
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            class=""
            version="1.1"
            x="0px"
            y="0px"
            enable-background="new 0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
            ></path>
          </svg>
        </button>
      </div>
    </ul>
  );
};

export default Chat;
