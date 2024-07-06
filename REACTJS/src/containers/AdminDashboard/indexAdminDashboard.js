// scroll bar
import "simplebar/src/simplebar.css";

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-domv6";
import { HelmetProvider } from "react-helmet-async";

//
import AdminDashboard from "./AdminDashboard";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";

// ----------------------------------------------------------------------

// ReactDOM.render(
//   <HelmetProvider>
//     <BrowserRouter>
//       <AdminDashboard />
//     </BrowserRouter>
//   </HelmetProvider>
// );

export default function indexAdminDashboard() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    </HelmetProvider>
  );
}

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
