import React, { useCallback, useState } from "react";
import { useStyles } from "./styles";
import {Button,Grid,Box,TextField,Card,Typography,Container,} from "@material-ui/core";
import { REG_HOUSE,BUILDING,REG_CYRILLIC,REG_PASSWORD,regEmailLogin, REG_STREET} from "../../../shared/helpers/constants";
import { Avatar } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";

const defaultValues = {
  firstName: "",
  lastName: "",
  addrIndex: "",
  secondName: "",
  email: "",
  addrCity: "",
  addrStreet: "",
  password: "",
  addrHouse: "",
  addrStructure: "",
  addrApart: "",
  userName: "",
  avatar: "",
};

export default function FormPropsTextFields() {
  const classes = useStyles();
  const [values, setValues] = useState(defaultValues);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidIndex, setIsInvalidIndex] = useState(false);
  const [isInvalidApartment, setIsInvalidApartment] = useState(false);
  const [isInvalidStreet, setIsInvalidStreet] = useState(false);
  const [isInvalidHouse, setIsInvalidHouse] = useState(false);
  const [isInvalidBuilding, setIsInvalidBuilding] = useState(false);

  const fetchNickname = useCallback(async () => {
    try {
      const data = await fetch(
        `http://back.nanossau.xyz/registration/generateNickname`
      );
      const response = await data.json();
      setValues((prevValues) => ({
        ...prevValues,
        userName: response.userName,
        avatar: response.userName.slice(0, 1),
      }));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchAvatar = useCallback(async () => {
    try {
      const data = await fetch(
        `http:///back.nanossau.xyz/registration/generateAvatar?nickName=${values.userName}`
      );
      const response = await data.json();
      setValues((prevValues) => ({
        ...prevValues,
        avatar: `data:image/bmp;base64${response}`,
      }));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `http://localhost:8080/registration`;
    let requestOptions = {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const helpFunction = (string, regexp) => {
    return string.match(regexp) ? false : true;
  };

  const validateStreet = () =>
    setIsInvalidStreet(helpFunction(values.addrStreet, REG_STREET));
  const validateEmail = () =>
    setIsInvalidEmail(helpFunction(values.email, regEmailLogin));
  const validatePassword = () =>
    setIsInvalidPassword(helpFunction(values.password, REG_PASSWORD));
  const validateIndex = () => {
    setIsInvalidIndex(values.addrIndex.length !== 6);
  };
  const validateApartment = () => {
    setIsInvalidApartment(values.addrApart.length > 3);
  };
  const validateHouse = () => {
    setIsInvalidHouse(helpFunction(values.addrHouse, REG_HOUSE));
  };
  const validateBuilding = () => {
    setIsInvalidBuilding(helpFunction(values.addrStructure, BUILDING));
  };

  const handleChangeNumberField = useCallback(
    (prop) => (event) => {
      setValues((values) => ({ ...values, [prop]: event?.target.value }));
    },
    [setValues]
  );
  const handleChangeTextField = useCallback(
    (prop) => (event) => {
      setValues((values) => ({ ...values, [prop]: event?.target.value }));
    },
    [setValues]
  );

  return (
    <div className={classes.regForm}>
      <form onSubmit={handleSubmit}>
        <CssBaseline />
        <Container fixed>
          <Card variant="outlined" sx={{ bgcolor: "#ffddc1", height: "102vh" }}>
            <Box m={2}>
              <Grid container flexDirection="row" flexWrap="nowrap">
                <Grid
                  item
                  container
                  flexDirection="column"
                  className={classes.wrapper}
                  alignItems="center"
                >
                  <Grid item className={classes.field}>
                    <Box m={2}>
                      <TextField
                        value={values.lastName}
                        error={
                          values.lastName.length > 50 ||
                          values.lastName.match(REG_CYRILLIC)
                        }
                        onChange={handleChangeTextField("lastName")}
                        className={classes.field}
                        required
                        id="outlined-required"
                        type="text"
                        label="Фамилия"
                        helperText="Ввод только букв кириллицы до 50 символов"
                      />
                    </Box>
                  </Grid>
                  <Grid item className={classes.field}>
                    <Box m={2}>
                      <TextField
                        className={classes.field}
                        required
                        error={
                          values.firstName.length > 25 ||
                          values.firstName.match(REG_CYRILLIC)
                        }
                        value={values.firstName}
                        onChange={handleChangeTextField("firstName")}
                        helperText="Ввод только букв кириллицы до 25 символов"
                        id="outlined-required"
                        type="text"
                        label="Имя"
                        defaultValue="Сергей"
                      />
                    </Box>
                  </Grid>
                  <Grid item className={classes.field}>
                    <Box m={2}>
                      <TextField
                        className={classes.field}
                        error={
                          values.secondName.length > 25 ||
                          values.secondName.match(REG_CYRILLIC)
                        }
                        value={values.secondName}
                        onChange={handleChangeTextField("secondName")}
                        helperText="Ввод только букв кириллицы до 25 символов"
                        type="text"
                        id="outlined-required"
                        label="Отчество"
                      />
                    </Box>
                  </Grid>
                  <Grid item className={classes.field}>
                    <Box m={2}>
                      <TextField
                        className={classes.field}
                        value={values.userName}
                        onChange={handleChangeTextField("userName")}
                        required
                        helperText="Ввод букв кириллицы, латиницы, кроме знаков математических действий и спецсимволы; ДОЛЖНО БЫТЬ УНИКАЛЬНЫМ"
                        id="outlined-required"
                        label="Желаемый ник"
                        type="text"
                      />
                      <Button variant="contained" onClick={fetchNickname}>
                        Сгенерировать ник
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item className={classes.field}>
                    <Box m={2}>
                      <TextField
                        className={classes.field}
                        required
                        error={isInvalidEmail}
                        type="email"
                        value={values.email}
                        onBlur={validateEmail}
                        onChange={handleChangeTextField("email")}
                        helperText="На этот адрес будет отправлено письмо для подтверждения"
                        id="outlined-disabled"
                        label="e-mail"
                      />
                    </Box>
                  </Grid>
                  <Grid item className={classes.field}>
                    <Box m={2}>
                      <TextField
                        required
                        value={values.password}
                        className={classes.field}
                        error={isInvalidPassword}
                        onBlur={validatePassword}
                        id="outlined-password-input"
                        onChange={handleChangeTextField("password")}
                        label="Password"
                        type="password"
                        helperText="Длиной не менее 8 символов, включать не менее одной заглавной и прописной буквы, хотя бы одну цифру. не должен содержать спецсимволы"
                        autoComplete="current-password"
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  flexDirection="column"
                  alignItems="center"
                  className={classes.wrapper}
                >
                  <Grid item className={classes.field}>
                    <Box m={2}>
                      <TextField
                        className={classes.field}
                        required
                        error={isInvalidIndex}
                        onBlur={validateIndex}
                        id="outlined-required"
                        label="Индекс"
                        helperText="6 цифр"
                        type="number"
                        onChange={handleChangeNumberField("addrIndex")}
                        value={values.addrIndex}
                      />
                    </Box>
                  </Grid>
                  <Grid item className={classes.field}>
                    <Box m={2}>
                      <TextField
                        className={classes.field}
                        required
                        error={
                          values.addrCity.length > 15 ||
                          values.addrCity.match(REG_CYRILLIC)
                        }
                        value={values.addrCity}
                        onChange={handleChangeTextField("addrCity")}
                        id="outlined-required"
                        label="Город"
                        type="text"
                        helperText="Ввод только букв кириллицы до 15 символов"
                      />
                    </Box>
                  </Grid>
                  <Grid item className={classes.field}>
                    <Box m={2}>
                      <TextField
                        className={classes.field}
                        error={values.addrStreet.length > 25 || isInvalidStreet}
                        value={values.addrStreet}
                        onBlur={validateStreet}
                        onChange={handleChangeTextField("addrStreet")}
                        required
                        id="outlined-required"
                        label="Улица"
                        type="text"
                        helperText="Ввод букв кириллицы, цифры, знак тире, длина до 25 символов"
                      />
                    </Box>
                  </Grid>
                  <Grid item className={classes.field}>
                    <Box m={2}>
                      <TextField
                        className={classes.field}
                        error={values.addrHouse.length > 5 || isInvalidHouse}
                        value={values.addrHouse}
                        onChange={handleChangeTextField("addrHouse")}
                        onBlur={validateHouse}
                        helperText="Цифры и, возможно, 1 буква (кириллица), например, 11а, длина до 5 символов"
                        id="outlined-required"
                        label="Номер дома"
                        type="text"
                      />
                    </Box>
                  </Grid>
                  <Grid item className={classes.field}>
                    <Box m={2}>
                      <TextField
                        className={classes.field}
                        id="outlined-required"
                        label="Номер строения"
                        type="text"
                        helperText="При вводе допускается буква (кириллица) и число до 2 знаков"
                        error={isInvalidBuilding}
                        value={values.addrStructure}
                        onChange={handleChangeTextField("addrStructure")}
                        onBlur={validateBuilding}
                      />
                    </Box>
                  </Grid>
                  <Grid item className={classes.field}>
                    <Box m={2}>
                      <TextField
                        className={classes.field}
                        id="outlined-required"
                        helperText="при вводе допускается число до 3 знаков"
                        label="Номер квартиры"
                        type="number"
                        onChange={handleChangeNumberField("addrApart")}
                        value={values.addrApart}
                        error={isInvalidApartment}
                        onBlur={validateApartment}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Avatar
                      alt="Аватар"
                      src={values.avatar}
                      sx={{ width: "50px", height: "50px" }}
                    >
                      {values.avatar}
                    </Avatar>
                    <Button onClick={fetchAvatar}>Cгенерировать Аватар</Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Box m={2}>
                  <Typography>
                    «Нажимая эту кнопку, вы подтверждаете Пользовательское
                    соглашение и даёте согласие на обработку персональных
                    данных»
                  </Typography>
                </Box>
                <Box m={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.buttonReg}
                  >
                    Зарегистрироваться
                  </Button>
                </Box>
              </Grid>
              <Typography>* - поля, обязательные к заполнению</Typography>
            </Box>
          </Card>
        </Container>
      </form>
    </div>
  );
}
