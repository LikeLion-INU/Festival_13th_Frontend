import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./styles/globalStyles";
import Home from "./pages/home/Home";
import SelectQuestion from "./pages/selectQuestion/SelectQuestion";
import Result from "./pages/result/Result";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppContainer = styled.div`
  width: 100%;
  max-width: 500px; /* 최대 너비 설정 */
  margin: 0 auto;
  overflow-x: hidden;
  position: relative;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/questions" element={<SelectQuestion />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </AppContainer>
      </Router>
    </>
  );
}

export default App;
