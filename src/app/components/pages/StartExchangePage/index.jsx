import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container, Box, Button } from "@material-ui/core";
import { Step, Stepper, StepLabel, Card } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import ExchangeFields from "./ExchangeFields/ExchangeFields";
import axios from "axios";

import FormAdressPage from "./AdressPage";
import CategoriesFields from "./CategoriesFields/–°ategoriesFields";
import { CategoryList } from "./CategoriesFields/constants";

const authorDefaultValues = {
  authorFirstName: "",
  authorLastName: "",
  bookName: "",
  isbn: "",
  yearPublishing: "",
  offerCategorySet: [""],
};

const userDefaultValues = {
  userFirstName: "",
  userLastName: "",
  userSecondName: "",
  addrCity: "",
  addrStreet: "",
  addrApart: "",
  addrStructure: "",
  addrIndex: "",
  wishCategorySet: [""],
};

export default function StartExchangePage() {
  const [author, setAuthor] = useState(authorDefaultValues);
  const [user, setUser] = useState(userDefaultValues);
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://back.nanossau.xyz/exchange/getCategories"
      );

      const result =
        response.data && response.data?.length ? response.data : CategoryList;
      setState(result);
    };
    fetchData();
  }, [setState]);

  const handleNext = () => {
    if (activeStep < 2) setActiveStep((currentStep) => currentStep + 1);
  };

  const handleBack = () => {
    if (activeStep !== -1) setActiveStep((currentStep) => currentStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const authorChange = (name, value) => {
    setAuthor({ ...author, [name]: value });
  };

  const userChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const sendData = async () => {
    const data = { ...author, ...user };

    const response = await axios.post(
      "http://back.nanossau.xyz/exchange/sendExchange",
      data
    );

    if (response.status === 200 && response.data) {
      setAuthor(authorDefaultValues);
      setUser(userDefaultValues);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Card variant="outlined" sx={{ bgcolor: "#ffddc1", height: "102vh" }}>
          <Typography variant="h4">–Ď–Ľ–į–Ĺ–ļ –ĺ–Ī–ľ–Ķ–Ĺ–į</Typography>
          <Box>
            <Stepper
              nonLinear
              activeStep={activeStep}
              sx={{ paddingTop: "20px" }}
            >
              <Step sx={{ paddingBottom: "20px" }}>
                <StepLabel variant="contained" onClick={handleStep}>
                  <Typography variant="h6">–•–ĺ—á—É –ĺ–Ī–ľ–Ķ–Ĺ—Ź—ā—Ć</Typography>
                </StepLabel>
              </Step>
              <Step sx={{ paddingBottom: "20px" }}>
                <StepLabel variant="contained" onClick={handleStep}>
                  <Typography variant="h6">–•–ĺ—á—É –Ņ–ĺ–Ľ—É—á–ł—ā—Ć</Typography>
                </StepLabel>
              </Step>
              <Step sx={{ paddingBottom: "20px" }}>
                <StepLabel variant="contained" onClick={handleStep}>
                  <Typography variant="h6">–ź–ī—Ä–Ķ—Ā –ī–ĺ—Ā—ā–į–≤–ļ–ł</Typography>
                </StepLabel>
              </Step>
            </Stepper>
            <Box
              sx={{
                width: "100%",
                maxHeight: "600px",
                height: "100%",
              }}
            >
              <Typography>
                {(() => {
                  switch (activeStep) {
                    case 1:
                      return (
                        <div>
                          <CategoriesFields
                            state={state}
                            categoryChange={userChange}
                            value={user.wishCategorySet}
                            fieldName="wishCategorySet"
                          />
                        </div>
                      );
                    case 2:
                      return (
                        <div>
                          <FormAdressPage userChange={userChange} user={user} />
                        </div>
                      );

                    default:
                      return (
                        <div>
                          <ExchangeFields
                            authorChange={authorChange}
                            author={author}
                            state={state}
                            setState={setState}
                          />
                        </div>
                      );
                  }
                })()}
              </Typography>
            </Box>
            <div>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                {activeStep === 0 ? null : (
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    &#171; –Ě–į–∑–į–ī
                  </Button>
                )}
                <Box sx={{ flex: "1 1 auto" }} />
                {activeStep !== 2 ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleNext}
                    sx={{ mr: 1 }}
                  >
                    –í–Ņ–Ķ—Ä–Ķ–ī &#187;
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={sendData}
                    sx={{ mr: 1 }}
                  >
                    –ü–ĺ–ī—ā–≤–Ķ—Ä–ī–ł—ā—Ć –ī–į–Ĺ–Ĺ—č–Ķ
                  </Button>
                )}
              </Box>
            </div>
          </Box>
        </Card>
      </Container>
    </>
  );
}
