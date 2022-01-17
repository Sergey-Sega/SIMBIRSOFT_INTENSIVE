import React, { useState } from "react";
import {
  Container,
  List,
  ListSubheader,
  Collapse,
  Button,
  Card,
} from "@material-ui/core";

import TitleBoxs from "./TitleBoxs";
import ItemBoxs from "./ItemBoxs";

const CategoriesFields = ({ state, categoryChange, value, fieldName }) => {
  const [openedCategories, setOpenedCategories] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(value);

  const handleCategoryClick = ({ categoryName }) => {
    if (openedCategories.includes(categoryName)) {
      setOpenedCategories(
        openedCategories.filter((item) => item !== categoryName)
      );
    } else {
      setOpenedCategories([...openedCategories, categoryName]);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    if (selectedCheckboxes.includes(name)) {
      setSelectedCheckboxes(selectedCheckboxes.filter((item) => item !== name));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, name]);
    }

    categoryChange(fieldName, selectedCheckboxes);
  };

  const handleResetAll = () => {
    setSelectedCheckboxes([]);
  };

  return (
    <Card variant="outlined" sx={{ bgcolor: "#ffddc1", height: "100%" }}>
      <Container
        sx={{
          width: "100%",
          maxHeight: "700px",
          height: "100%",
          overflow: "auto",
          bgcolor: "#BDB76B",
        }}
      >
        <List
          sx={{
            overflow: "auto",
            maxHeight: "300px",
            width: "100%",
            height: "100%",
            bgcolor: "#DEB887",
          }}
          component="nav"
          aria-labelledby="categories-label"
          subheader={
            <ListSubheader
              component="div"
              id="categories-subheader"
              sx={{ bgcolor: "#BDB76B" }}
            >
              Категории
            </ListSubheader>
          }
        >
          <Button
            sx={{
              color: "#2E8B57",
              size: "small",
              marginTop: "1px",
            }}
            variant="text"
            name="reset"
            onClick={handleResetAll}
          >
            ✖ Сбросить всё
          </Button>
          {state &&
            state.map((list, index) => (
              <div>
                <TitleBoxs
                  item={list}
                  key={index}
                  onClick={handleCategoryClick}
                />
                {list.categorySet.map((categoryItem, index) => (
                  <Collapse
                    in={openedCategories.includes(list.categoryName)}
                    timeout="auto"
                  >
                    <ItemBoxs
                      name={categoryItem}
                      key={index}
                      checked={selectedCheckboxes.includes(categoryItem)}
                      onChange={handleCheckboxChange}
                    />
                  </Collapse>
                ))}
              </div>
            ))}
        </List>
      </Container>
    </Card>
  );
};

export default CategoriesFields;
