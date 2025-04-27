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
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questions" element={<SelectQuestion />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
