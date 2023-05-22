import React from "react";
import "./Header.css";
import axios from "axios";
const Header = () => {
  const [idInstance, setIdInstance] = React.useState(
    localStorage.getItem("idInstance")
  );
  const [apiTokenInstance, setApiTokenInstance] = React.useState(
    localStorage.getItem("apiTokenInstance")
  );
  const [youPhone, setYourPhone] = React.useState(
    localStorage.getItem("phone")
  );

  const [youPhoneValide, setYourPhoneValide] = React.useState();
  const [avatarUrl, setAvatarUrl] = React.useState("");

  React.useEffect(() => {
    const getAvatar = async () => {
      try {
        let validPhone = youPhone.replace("+", "");
        validPhone = validPhone.replace(",", "");
        setYourPhoneValide(validPhone);

        const url = `https://api.green-api.com/waInstance${idInstance}/getAvatar/${apiTokenInstance}`;

        const payload = {
          chatId: `${validPhone}@c.us`,
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
  }, []);

  return (
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <img src={avatarUrl} alt="Avatar" className="logo_img" />
          <div className="logo_title">+{youPhoneValide}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
