// import React from "react";
// import "./style.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import ReactDOM from "react-dom";
// import Login from "./Components/login.component";

// import App from "./App";

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Profile from "./Components/Profile";
// // const root = createRoot(container);

// ReactDOM.render(
//   <Router>
//     <Navbar />
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/profile" element={<Profile />} />
//     </Routes>
//     {/* <Footer /> */}
//   </Router>,

//   document.getElementById("root")
// );
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
