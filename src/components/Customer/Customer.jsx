import React from "react";
import style from "./Customer.module.css";
import axios from "axios";
import avatar from "../../assets/avatar.jpg";

const Customer = ({ numbers, onClick }) => {
  const [idInstance, setIdInstance] = React.useState(
    localStorage.getItem("idInstance")
  );
  const [apiTokenInstance, setApiTokenInstance] = React.useState(
    localStorage.getItem("apiTokenInstance")
  );
  const [avatarUrl, setAvatarUrl] = React.useState("");

  React.useEffect(() => {
    const getAvatar = async () => {
      try {
        const url = `https://api.green-api.com/waInstance${idInstance}/getAvatar/${apiTokenInstance}`;

        const payload = {
          chatId: numbers,
        };

        const headers = {
          "Content-Type": "application/json",
        };

        const response = await axios
          .post(url, payload, { headers })
          .then((data) => setAvatarUrl(data.data.urlAvatar));
      } catch (error) {
        console.log(error);
      }
    };

    getAvatar();
  }, [numbers]);

  const handleButtonClick = () => {
    if (numbers) {
      onClick(numbers);
    }
  };

  return (
    <>
      <li className={style.customer_list_item}>
        <img
          src={avatarUrl ? avatarUrl : avatar}
          alt="Avatar"
          className={style.customer_list_item_img}
        />
        <button
          className={style.customer_list_item_btn}
          onClick={() => handleButtonClick()}
        >
          +{numbers.replace("@c.us", "")}
        </button>
      </li>
      <hr className={style.customer_list_item_hr} />
    </>
  );
};

export default Customer;
