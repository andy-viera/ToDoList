import React from "react";
import { Provider } from "react-redux";
import List from "./components/List";
import Home from "./components/Home";
import store from "./redux/configureStore";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/list/:listid" element={<List />}></Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
