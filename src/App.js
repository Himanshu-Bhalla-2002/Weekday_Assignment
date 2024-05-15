import React from "react";
import ReactDOM from "react-dom/client";
import Body from "./components/Body/Body";
import store from "./store";
import { Provider } from "react-redux";
import SideBar from "./components/SideBar/SideBar";
import Header from "./components/Header/Header";
const AppLayout = () => {
  return (
    <>
      <Header />
      <SideBar />
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

// root.render(<AppLayout />);
