import React from "react";

import {
  ListItemButton,
  ListItemText,
  FormControlLabel,
} from "@material-ui/core";

const TitleBoxs = ({ item, onClick }) => {
  const handleClick = () => {
    onClick(item);
  }

  return (
      <ListItemButton onClick={handleClick}>
        <FormControlLabel
          control={<ListItemText />}
          label={"🗸" + item.categoryName}
        />
        {item.show}
      </ListItemButton>
  );
};

export default TitleBoxs;
