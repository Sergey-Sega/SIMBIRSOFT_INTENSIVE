import React from "react";

import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";

export const RecoveryPass = ({
  email,
  emailError,
  emailDirty,
  handleEmailValid,
  handleEventBlur,
}) => {
  return (
    <div className="RecoveryPassField">
      <DialogTitle id="form-dialog-title">Восстановление пароля:</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Адрес эл.почты, куда мы отправим настройки по сбросу пароля:
        </DialogContentText>
        {emailDirty && emailError && (
          <div style={{ color: "red" }}>{emailError}</div>
        )}
        <TextField
          value={email}
          onChange={handleEmailValid}
          onBlur={handleEventBlur}
          name="email"
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
    </div>
  );
};
