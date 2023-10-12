import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
const SubmitPage = () => {
  return (
    <div className="contact">
      <h1>Response Submitted</h1>
      <Link to={"/"}>Submit another response</Link>
    </div>
  );
};

export default SubmitPage;
