import React, { useState } from "react";
import { ModalLogIn } from "../Forms/Modal/ModalLogIn";
import logo from "./logo.png";
import { AppBar, Box, CssBaseline, Grid } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { ButtonGroup } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";

export const Header = () => {
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <CssBaseline />
      <Box>
        <AppBar style={{height:"12.5%"}}>
          <Toolbar>
            <Grid container>
              <Link to="/">
                <Button
                  variant="contained"
                  style={{ backgroundImage: "./logo.png" }}
                >
                  <img src={logo} alt="logo" style={{width:"75%", height:"75%"}} />
                </Button>
              </Link>
            </Grid>
            <Grid
              container
              flexDirection="row-reverse"
              alignItems="center"
              color="black"
            >
              <ButtonGroup variant="contained">
                <Button onClick={handleClickOpenModal}>Авторизация</Button>
                <ModalLogIn openModal={openModal} setOpenModal={setOpenModal} />
                <Link to="/Registration" style={{ textDecoration: "none" }}>
                  <Button variant="contained">Регистрация</Button>
                </Link>
              </ButtonGroup>
            </Grid>
          </Toolbar>

          <Toolbar>
            <Grid container flexDirection="row" justifyContent="space-around">
              <Grid item>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button variant="contained" className={classes.button}>
                    Главная
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/StartExchangePage" style={{ textDecoration: "none" }}>
                <Button variant="contained" className={classes.button}>
                  Начать обмен
                </Button>
                </Link>
              </Grid>
            <Grid item>
                <Button variant="contained" className={classes.button}>
                  Мои обмены
                </Button>
              </Grid>
               <Grid item>
                <Button variant="contained" className={classes.button}>
                  Задать вопрос
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <Box marginTop="10%"></Box>
    </>
  );
};
