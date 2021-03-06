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
                        label="??????????????"
                        helperText="???????? ???????????? ???????? ?????????????????? ???? 50 ????????????????"
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
                        helperText="???????? ???????????? ???????? ?????????????????? ???? 25 ????????????????"
                        id="outlined-required"
                        type="text"
                        label="??????"
                        defaultValue="????????????"
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
                        helperText="???????? ???????????? ???????? ?????????????????? ???? 25 ????????????????"
                        type="text"
                        id="outlined-required"
                        label="????????????????"
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
                        helperText="???????? ???????? ??????????????????, ????????????????, ?????????? ???????????? ???????????????????????????? ???????????????? ?? ??????????????????????; ???????????? ???????? ????????????????????"
                        id="outlined-required"
                        label="???????????????? ??????"
                        type="text"
                      />
                      <Button variant="contained" onClick={fetchNickname}>
                        ?????????????????????????? ??????
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
                        helperText="???? ???????? ?????????? ?????????? ???????????????????? ???????????? ?????? ??????????????????????????"
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
                        helperText="???????????? ???? ?????????? 8 ????????????????, ???????????????? ???? ?????????? ?????????? ?????????????????? ?? ?????????????????? ??????????, ???????? ???? ???????? ??????????. ???? ???????????? ?????????????????? ??????????????????????"
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
                        label="????????????"
                        helperText="6 ????????"
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
                        label="??????????"
                        type="text"
                        helperText="???????? ???????????? ???????? ?????????????????? ???? 15 ????????????????"
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
                        label="??????????"
                        type="text"
                        helperText="???????? ???????? ??????????????????, ??????????, ???????? ????????, ?????????? ???? 25 ????????????????"
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
                        helperText="?????????? ??, ????????????????, 1 ?????????? (??????????????????), ????????????????, 11??, ?????????? ???? 5 ????????????????"
                        id="outlined-required"
                        label="?????????? ????????"
                        type="text"
                      />
                    </Box>
                  </Grid>
                  <Grid item className={classes.field}>
                    <Box m={2}>
                      <TextField
                        className={classes.field}
                        id="outlined-required"
                        label="?????????? ????????????????"
                        type="text"
                        helperText="?????? ?????????? ?????????????????????? ?????????? (??????????????????) ?? ?????????? ???? 2 ????????????"
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
                        helperText="?????? ?????????? ?????????????????????? ?????????? ???? 3 ????????????"
                        label="?????????? ????????????????"
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
                      alt="????????????"
                      src={values.avatar}
                      sx={{ width: "50px", height: "50px" }}
                    >
                      {values.avatar}
                    </Avatar>
                    <Button onClick={fetchAvatar}>C???????????????????????? ????????????</Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Box m={2}>
                  <Typography>
                    ???????????????? ?????? ????????????, ???? ?????????????????????????? ????????????????????????????????
                    ???????????????????? ?? ?????????? ???????????????? ???? ?????????????????? ????????????????????????
                    ??????????????
                  </Typography>
                </Box>
                <Box m={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.buttonReg}
                  >
                    ????????????????????????????????????
                  </Button>
                </Box>
              </Grid>
              <Typography>* - ????????, ???????????????????????? ?? ????????????????????</Typography>
            </Box>
          </Card>
        </Container>
      </form>
    </div>
  );
}
