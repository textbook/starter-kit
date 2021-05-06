import React from 'react'
import RegistrationPage from "../RegistrationPage/RegistrationPage"
import { Link } from "react-router-dom";

function LandingPage() {
    return (
      <div>
        <h1>This Is The Landing Page</h1>
        <Link to="/Registration">
          <button type="button">Register</button>
        </Link>
        <Link to="/Login">
          <button type="button">Login</button>
        </Link>
      </div>
    );
}

export default LandingPage
