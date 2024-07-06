import React from "react";
import { useGoogleLogin } from "react-use-googlelogin";

const GoogleAuthContext = React.createContext();

export const GoogleAuthProvider = ({ children }) => {
  const googleAuth = useGoogleLogin({
    //clientId: process.env.GOOGLE_CLIENT_ID, // Your clientID from Google.
    //GOOGLE_CLIENT_ID
    clientId:
      "534954374195-407bdjlges42rlg2e2msn8ej8jtmutfb.apps.googleusercontent.com", // Your clientID from Google.
    isSignedIn: true,
  });

  return (
    <GoogleAuthContext.Provider value={googleAuth}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleAuth = () => React.useContext(GoogleAuthContext);
