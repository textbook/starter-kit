import React, { useEffect, useState } from "react";

import { getMessage } from "./service";

export function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    getMessage().then(setMessage);
  }, []);

  return (
    <div data-qa="message">{message}</div>
  );
}

export default App;
