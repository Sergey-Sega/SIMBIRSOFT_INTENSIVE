import React from "react";
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  TextField,
} from "@material-ui/core";

export const AuthFields = ({
  email,
  emailError,
  emailDirty,
  password,
  passwordDirty,
  passwordError,
  handleEventBlur,
  handleEmailValid,
  handlePasswordValid,
  handleChangeForm,
}) => {
  return (
    <div className="authFields">
      <DialogTitle id="form-dialog-title">Авторизация</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Авторизуйтесь, чтобы войти в приложение:
        </DialogContentText>
        {emailDirty && emailError && (
          <div style={{ color: "red" }}>{emailError}</div>
        )}
        <TextField
          value={email}
          onBlur={handleEventBlur}
          onChange={handleEmailValid}
          name="email"
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
        />
        {passwordDirty && passwordError && (
          <div style={{ color: "red" }}>{passwordError}</div>
        )}
        <TextField
          value={password}
          onBlur={handleEventBlur}
          onChange={handlePasswordValid}
          name="password"
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
        />
        <Link
          component="button"
          variant="body2"
          underline="hover"
          onClick={handleChangeForm}
        >
          Забыли пароль?
        </Link>
      </DialogContent>
    </div>
  );
};
