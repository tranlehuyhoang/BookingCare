import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import { postVerifyRetrievePassword } from "../../services/userService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { colors } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  retrieveBackground: {
    background:
      "linear-gradient(135deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%);",
    height: "100vh",
  },
  container: {
    maxWidth: "400px",
    borderRadius: "10px",
    background: "#fff",
    position: "absolute",
    margin: "auto",
    top: 0,
    bottom: 0,
    right: "20px",
    left: "20px",
    height: "400px",
  },
  content: {
    padding: "30px",
  },
  titleRetrieve: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: "24px",
    marginBottom: "30px",
    color: "#000",
  },
  loginform: {
    margin: "10px 0",
    color: "#000",
  },
  textField: {
    width: "100%",
  },
  margin: {
    marginRight: theme.spacing(1),
  },
  btnRetrieve: {
    textAlign: "center",
  },
  ButtonbtnRetrieve: {
    width: "100%",
    background:
      "linear-gradient(135deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%)",
    margin: "15px 0",
    height: "40px",
    borderRadius: "5px",
    outline: "none",
    border: "none",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    textTransform: "none",
  },
}));

const RetrievePassword = () => {
  const { isLoggedIn, userInfo, language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  }));

  let history = useHistory();
  const [values, setValues] = React.useState({
    newPassword: "",
    showNewPassword: false,
    confirmNewPassword: "",
    showConfirmNewPassword: false,
    email: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };

  const handleClickShowConfirmNewPassword = () => {
    setValues({
      ...values,
      showConfirmNewPassword: !values.showConfirmNewPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    document.title = "Retrieve Password";
    let params = new URLSearchParams(window.location.search);
    if (params.has("tokenUser") && params.has("email")) {
      let tokenUser = params.get("tokenUser");
      let emailUser = params.get("email");
      setValues({ ...values, email: emailUser });
    }
  }, []);

  const handleRetrievePassword = async () => {
    console.log(
      "values.newPassword.trim().localeCompare(values.confirmNewPassword.trim())",
      values.newPassword.trim().localeCompare(values.confirmNewPassword.trim())
    );
    if (
      values.newPassword
        .trim()
        .localeCompare(values.confirmNewPassword.trim()) === 0
    ) {
      let params = new URLSearchParams(window.location.search);
      if (params.has("tokenUser") && params.has("email")) {
        let tokenUser = params.get("tokenUser");
        let emailUser = params.get("email");
        let res = await postVerifyRetrievePassword({
          tokenUser: tokenUser,
          email: emailUser,
          newPassword: values.newPassword,
        });

        if (res && res.errCode === 0) {
          if (language == "en") {
            toast.success("Retrieve password succeed!");
          } else {
            toast.success("Lấy lại mật khẩu thành công!");
          }
          history.push("/login");
        } else {
          if (language == "en") {
            toast.error("Retrieve password error!");
          } else {
            toast.error("Lấy lại mật khẩu thất bại!");
          }
        }
      }
    } else {
      if (language == "en") {
        toast.error("New password and confirm new password do not match!");
      } else {
        toast.error("Mật khẩu mới và xác nhận mật khẩu mới không khớp!");
      }
    }
  };
  const classes = useStyles();
  return (
    <>
      <div className={classes.retrieveBackground}>
        <Grid container spacing={1} className={classes.container}>
          <Grid container spacing={1} className={classes.content}>
            <Grid item xs={12}>
              <Typography variant="h4" className={classes.titleRetrieve}>
                <FormattedMessage id={"login.retrieve-pass"} />
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.loginform}>
              <TextField
                className={clsx(classes.margin, classes.textField)}
                id="standard-textarea"
                label="Email"
                InputProps={{
                  readOnly: true,
                }}
                // placeholder="Placeholder"
                multiline
                maxRows={12}
                value={values.email}
                onChange={handleChange("email")}
              />
            </Grid>
            <Grid item xs={12} className={classes.loginform}>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">
                  <FormattedMessage id={"login.new-pass"} />
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={values.showNewPassword ? "text" : "password"}
                  value={values.newPassword}
                  onChange={handleChange("newPassword")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showNewPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} className={classes.loginform}>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">
                  <FormattedMessage id={"login.confirm-new-pass"} />
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={values.showConfirmNewPassword ? "text" : "password"}
                  value={values.confirmNewPassword}
                  onChange={handleChange("confirmNewPassword")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmNewPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showConfirmNewPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} className={classes.btnRetrieve}>
              <Button
                variant="contained"
                className={classes.ButtonbtnRetrieve}
                onClick={() => handleRetrievePassword()}
              >
                <FormattedMessage id={"login.retrieve"} />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default RetrievePassword;
