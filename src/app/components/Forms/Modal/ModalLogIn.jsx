import React, { useState } from "react";
import {AuthFields} from "./AuthFields"
import { RecoveryPass } from "./RecoveryPassField.jsx";
import { regEmailLogin } from "../../../shared/helpers/constants.js";
import { Button, DialogActions, Dialog } from "@material-ui/core";


export const ModalLogIn = ({ openModal, setOpenModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `http://localhost:8080/swagger-test/user`;
    let requestOptions = {
      method: "POST",
      body: JSON.stringify({email,password}),
      headers: { "Content-Type" : "application/json"},
      mode : "cors"
      }
      try { 
      const response = await fetch(url, requestOptions)
      const data = await response.json()
      console.log(data)
       } catch (error) {
      console.error(error);
    }
  };

  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [emailError, setEmailError] = useState(
    "Адрес эл.почты не может быть пустым"
  );
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым"
  );

  const [changeForm, SetChangeForm] = useState(true);

  const handleEventBlur = (e) => {
    if (e.target.name === "email") {
      setEmailDirty(true);
    }
    if (e.target.name === "password") {
      setPasswordDirty(true);
    }
  };

  const handleEmailValid = (e) => {
    setEmail(e.target.value);
    if (!regEmailLogin.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный адрес эл.почты");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordValid = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordError("Пароль не должен быть меньше 8 символов");
      if (!e.target.value) {
        setPasswordError("Пароль не может быть пустым");
      }
    } else {
      setPasswordError("");
    }
  };

  const handleChangeForm = () => {
    SetChangeForm(!changeForm);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEmail("");
    setPassword("");
    setEmailDirty(false);
    setPasswordDirty(false);
    SetChangeForm(true);
  };

  return (
    <>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit}>
        {changeForm && (
          <AuthFields
            email={email}
            emailError={emailError}
            emailDirty={emailDirty}
            passwordDirty={passwordDirty}
            password={password}
            passwordError={passwordError}
            handleEventBlur={handleEventBlur}
            handleEmailValid={handleEmailValid}
            handlePasswordValid={handlePasswordValid}
            handleChangeForm={handleChangeForm}
          />
        )}
        {!changeForm && (
          <RecoveryPass
            emailSend={email}
            emailError={emailError}
            emailDirty={emailDirty}
            handleEmailValid={handleEmailValid}
            handleEventBlur={handleEventBlur}
          />
        )}
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleCloseModal}>
            Отмена
          </Button>
          <Button variant="outlined" color="primary" type="submit">
            Отправить
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
