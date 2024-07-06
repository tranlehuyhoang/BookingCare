import { useRef, useState, useEffect } from "react";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useGoogleAuth } from "../../containers/Auth/resources/googleAuth.js";

export default function Logout() {
  const { signOut } = useGoogleAuth();

  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = () => {
    dispatch(actions.processLogout()); //mapDispathToProps
    // signOut();
    history.push("/home");
  };

  return <></>;
}
