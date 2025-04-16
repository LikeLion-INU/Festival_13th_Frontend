import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./styles/globalStyles";
import Home from "./pages/home/Home";
import SelectQuestion from "./pages/selectQuestion/SelectQuestion";

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <SelectQuestion /> {/* 일단은 라우터 안 넣고 이렇게 했슴다 */}
      </AppContainer>
    </>
  );
}

export default App;
