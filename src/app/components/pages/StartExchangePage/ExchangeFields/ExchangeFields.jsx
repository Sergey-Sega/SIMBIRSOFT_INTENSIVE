import React, { useState, useCallback } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container, TextField, Card } from "@material-ui/core";
import {
  LAT_CYR,
  ISBN,
  BOOK_TITLE,
} from "../../../../shared/helpers/constants";
import CategoriesFields from "../CategoriesFields/СategoriesFields";

const defaultValues = {
  authorFirstName: "",
  authorLastName: "",
  bookName: "",
  isbn: "",
  yearPublishing: "",
};

const ExchangeFields = ({ authorChange, author, state, setState }) => {
  const [values, setValues] = useState(defaultValues);

  const [isInvalidFirstName, setIsInvalidFirstName] = useState(false);
  const [isInvalidLastName, setIsInvalidLastName] = useState(false);
  const [isInvalidBookTitle, setIsInvalidBookTitle] = useState(false);
  const [isInvalidISBN, setIsInvalidISBN] = useState(false);
  const [isInvalidYearPublication, setIsInvalidYearPublication] =
    useState(false);

  const helpFunction = (string, regexp) => {
    return string.match(regexp) ? false : true;
  };

  const validateFirstName = () =>
    setIsInvalidFirstName(helpFunction(values.authorFirstName, LAT_CYR));
  const validateLastName = () =>
    setIsInvalidLastName(helpFunction(values.authorLastName, LAT_CYR));
  const validateBookTitle = () =>
    setIsInvalidBookTitle(helpFunction(values.bookName, BOOK_TITLE));
  const validateISBN = () => {
    setIsInvalidISBN(helpFunction(values.isbn, ISBN));
  };
  const validateYearPublication = () => {
    setIsInvalidYearPublication(values.yearPublishing > 2021);
  };

  return (
    <>
      <CssBaseline />
      <Container
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "row",
          flexWrap: "nowrap",
          alignContent: "flexStart",
          justifyContent: "space-between",
          alignItems: "flexStart",
        }}
      >
        <Card variant="outlined" sx={{ bgcolor: "#ffddc1", height: "100%" }}>
          <Container
            sx={{
              width: "100%",
              bgcolor: "#BDB76B",
            }}
          >
            <TextField
              required
              margin="normal"
              size="small"
              label="Автор"
              name="authorLastName"
              placeholder="Фамилия"
              onChange={(e) => authorChange("authorLastName", e.target.value)}
              value={author?.authorLastName}
              error={author?.authorLastName.length < 50 || isInvalidLastName}
              onBlur={validateLastName}
              sx={{
                flexBasis: "40%",
                flexGrow: 6,
                marginRight: "1vh",
                marginTop: "3vh",
              }}
            />

            <TextField
              size="small"
              margin="normal"
              placeholder="Имя"
              name="authorFirstName"
              onChange={(e) => authorChange("authorFirstName", e.target.value)}
              value={author?.authorFirstName}
              error={author.authorFirstName.length < 20 || isInvalidFirstName}
              onBlur={validateFirstName}
              sx={{
                flexBasis: "40%",
                flexGrow: 1,
                marginTop: "3vh",
              }}
            />

            <TextField
              required
              margin="normal"
              size="small"
              label="Название книги"
              name="bookName"
              placeholder="Название книги"
              onChange={(e) => authorChange("bookName", e.target.value)}
              value={author?.bookName}
              error={author.bookName.length > 50 || isInvalidBookTitle}
              onBlur={validateBookTitle}
              sx={{
                width: "90%",
                marginTop: "3vh",
              }}
            />

            <TextField
              margin="normal"
              label="ISBN"
              size="small"
              placeholder="978-5-93673-265-2"
              name="isbn"
              onChange={(e) => authorChange("isbn", e.target.value)}
              value={author?.isbn}
              error={isInvalidISBN}
              onBlur={validateISBN}
              sx={{
                marginRight: "1vh",
                flexBasis: "40%",
                flexGrow: 6,
                marginTop: "3vh",
              }}
            />

            <TextField
              required
              margin="normal"
              size="small"
              label="Год издания"
              placeholder="2012"
              name="yearPublishing"
              onChange={(e) => authorChange("yearPublishing", e.target.value)}
              value={author?.yearPublishing}
              error={isInvalidYearPublication}
              onBlur={validateYearPublication}
              sx={{
                flexBasis: "40%",
                flexGrow: 1,
                marginTop: "3vh",
              }}
            />
          </Container>
        </Card>
        <Container>
          <CategoriesFields
            state={state}
            categoryChange={authorChange}
            value={author.offerCategorySet}
            fieldName="offerCategorySet"
          />
        </Container>
      </Container>
    </>
  );
};

export default ExchangeFields;
