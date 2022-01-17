import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(() => ({
  wrapper: {
    flex:1,
    },
    field:{
        width: '100%',
    },
    buttonReg: {
      marginRight: 20,
      color: "#fff",
      "&:hover": {
        borderBottom: "2px solid #fff",
      },
      regForm:{
         width: "100%",
        }
    }
}));
