import React from 'react'
import { Link } from "react-router-dom";

function LoginPage() {
    return (
      <div>
        <h1>This is the Login page</h1>
        <Link to="/">
          <button type="button">Back</button>
        </Link>
      </div>
    );
}

export default LoginPage
