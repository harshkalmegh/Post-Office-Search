import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "../Component/Index";
import SignIn from "../Login/Login";

function Routing() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
