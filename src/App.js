import React from "react";
import styled from "styled-components";
import GlobalStyle from "./styles/globalStyles";
import Home from "./pages/home/Home";

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
        <Home />
      </AppContainer>
    </>
  );
}

export default App;
