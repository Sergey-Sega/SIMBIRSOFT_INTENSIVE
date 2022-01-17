import React from "react";
import {
  List,
  ListItemButton,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

const ItemBoxs = ({ name, checked, onChange }) => {
  return (
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }}>
          <FormControlLabel
            label={name}
            control={
              <Checkbox
                checked={checked}
                color="default"
                onChange={onChange}
                name={name}
              />
            }
          />
        </ListItemButton>
      </List>
  );
};

export default ItemBoxs;
