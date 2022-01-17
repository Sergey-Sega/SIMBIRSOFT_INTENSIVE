import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(() => ({
  button: {
    paddingRight: 8,
    color: "#fff",
    "&:hover": {
      borderBottom: "2px solid #fff",
    },
  },
}));
