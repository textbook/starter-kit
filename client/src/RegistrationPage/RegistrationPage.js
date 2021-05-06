import React from 'react'
import { Link } from "react-router-dom";

function RegistrationPage() {
    return (
      <div>
        <h1>This is the Registration page</h1>
        <Link to="/">
          <button type="button">Back</button>
        </Link>
      </div>
    );
}

export default RegistrationPage
