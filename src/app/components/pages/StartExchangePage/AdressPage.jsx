import React, { useCallback, useState } from "react";
import { useStyles } from "./style";
import { Grid, Box, TextField } from "@material-ui/core";
import {
  REG_STREET,
  REG_CYRILLIC,
  REG_HOUSE,
  BUILDING,
} from "../../../shared/helpers/constants";

const defaultValues = {
  firstName: "",
  lastName: "",
  addrIndex: "",
  secondName: "",
  addrCity: "",
  addrStreet: "",
  addrHouse: "",
  addrStructure: "",
  addrApart: "",
};

export default function FormAdressPage({ userChange, user }) {
  const classes = useStyles();
  const [values, setValues] = useState(defaultValues);
  const [isInvalidIndex, setIsInvalidIndex] = useState(false);
  const [isInvalidApartment, setIsInvalidApartment] = useState(false);
  const [isInvalidStreet, setIsInvalidStreet] = useState(false);
  const [isInvalidHouse, setIsInvalidHouse] = useState(false);
  const [isInvalidBuilding, setIsInvalidBuilding] = useState(false);

  const helpFunction = (string, regexp) => {
    return string.match(regexp) ? false : true;
  };

  const validateStreet = () =>
    setIsInvalidStreet(helpFunction(values.addrStreet, REG_STREET));
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

  return (
    <div className={classes.regForm}>
      <form>
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
                    className={classes.field}
                    size="small"
                    required
                    error={
                      user.addrCity.length > 15 ||
                      user.addrCity.match(REG_CYRILLIC)
                    }
                    onChange={(e) => userChange("addrCity", e.target.value)}
                    value={user.addrCity}
                    name="addrCity"
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
                    size="small"
                    error={user.addrStreet.length > 25 || isInvalidStreet}
                    value={user.addrStreet}
                    onBlur={validateStreet}
                    name="addrStreet"
                    onChange={(e) => userChange("addrStreet", e.target.value)}
                    required
                    id="outlined-required"
                    label="??????????"
                    type="text"
                    helperText="???????? ???????? ??????????????????, ??????????, ???????? ????????, ?????????? ???? 25 ????????????????"
                  />
                </Box>
              </Grid>
              <Grid item container flexDirection="row" justifyContent="left">
                <Grid item>
                  <Box m={2}>
                    <TextField
                      required
                      size="small"
                      id="outlined-required"
                      label="????????????????"
                      type="text"
                      helperText="?????? ?????????? ?????????????????????? ?????????? (??????????????????) ?? ?????????? ???? 2 ????????????"
                      error={isInvalidBuilding}
                      value={user.addrStructure}
                      onChange={(e) =>
                        userChange("addrStructure", e.target.value)
                      }
                      name="addrStructure"
                      onBlur={validateBuilding}
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box m={2}>
                    <TextField
                      required
                      size="small"
                      error={user?.addrHouse?.length > 5 || isInvalidHouse}
                      value={user?.addrHouse}
                      name="addrHouse"
                      onChange={(e) => userChange("addrHouse", e.target.value)}
                      onBlur={validateHouse}
                      helperText="?????????? ??, ????????????????, 1 ?????????? (??????????????????), ????????????????, 11??, ?????????? ???? 5 ????????????????"
                      id="outlined-required"
                      label="??????"
                      type="text"
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box m={2}>
                    <TextField
                      size="small"
                      id="outlined-required"
                      helperText="?????? ?????????? ?????????????????????? ?????????? ???? 3 ????????????"
                      label="????????????????"
                      type="number"
                      name="addrApart"
                      onChange={(e) => userChange("addrApart", e.target.value)}
                      value={user.addrApart}
                      error={isInvalidApartment}
                      onBlur={validateApartment}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid item className={classes.field}>
                <Box m={2}>
                  <TextField
                    className={classes.field}
                    required
                    size="small"
                    name="addrIndex"
                    error={isInvalidIndex}
                    onBlur={validateIndex}
                    id="outlined-required"
                    label="????????????"
                    helperText="6 ????????"
                    type="number"
                    onChange={(e) => userChange("addrIndex", e.target.value)}
                    value={user.addrIndex}
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
                    size="small"
                    value={user.userLastName}
                    name="userLastName"
                    error={
                      user.userLastName?.length > 50 ||
                      user.userLastName?.match(REG_CYRILLIC)
                    }
                    onChange={(e) => userChange("userLastName", e.target.value)}
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
                    size="small"
                    error={
                      user.userFirstName?.length > 25 ||
                      user.userFirstName?.match(REG_CYRILLIC)
                    }
                    value={user.userFirstName}
                    onChange={(e) =>
                      userChange("userFirstName", e.target.value)
                    }
                    name="userFirstName"
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
                    required
                    className={classes.field}
                    error={
                      user.userSecondName?.length > 25 ||
                      user.userSecondName?.match(REG_CYRILLIC)
                    }
                    value={user.userSecondName}
                    size="small"
                    onChange={(e) =>
                      userChange("userSecondName", e.target.value)
                    }
                    name="userSecondName"
                    helperText="???????? ???????????? ???????? ?????????????????? ???? 25 ????????????????"
                    type="text"
                    id="outlined-required"
                    label="????????????????"
                    defaultValue="????????????????????????"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
}
