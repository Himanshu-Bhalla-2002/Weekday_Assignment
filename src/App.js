import React from "react";
import ReactDOM from "react-dom/client";
import Body from "./components/Body";
const AppLayout = () => {
  return (
    <>
      <h1>Himanshu</h1>
      <Body />
    </>
  );
};

export default AppLayout;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
