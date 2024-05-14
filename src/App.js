import React from "react";
import ReactDOM from "react-dom/client";
import Body from "./components/Body";
import store from "./store";
import { Provider } from "react-redux";
const AppLayout = () => {
  return (
    <>
      <Body />
    </>
  );
};

export default AppLayout;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AppLayout />
  </Provider>
);
