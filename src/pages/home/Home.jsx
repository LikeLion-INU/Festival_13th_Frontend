import React from "react";
import styled, { keyframes } from "styled-components";
import Button from "../../components/common/Button";
import Lottie from "lottie-react";
// Lottie JSON 파일 직접 import
import animationData from "../../assets/home.json";

// 페이드인 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: white;
`;

const LottieContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Title = styled.div`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  position: absolute;
  top: 30%;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 1s;
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;

const TitleTop = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  margin-bottom: 0.5rem;
`;

const TitleBottom = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;

const SubTitle = styled.p`
  font-size: 1rem;
  color: #666;
  text-align: center;
  position: absolute;
  top: calc(30% + 8rem); /* 두 줄 타이틀에 맞게 위치 조정 */
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 1.5s;
  opacity: 0;
  z-index: 2;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20%;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 2s;
  opacity: 0;
  z-index: 2;
`;

const StyledButton = styled(Button)`
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  background-color: #ff6b6b;
  border-radius: 2rem;

  &:hover {
    background-color: #ff8787;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <LottieContainer>
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice",
            progressiveLoad: false,
          }}
        />
      </LottieContainer>

      <Title>
        <TitleTop>키워드</TitleTop>
        <TitleBottom>이심전심</TitleBottom>
      </Title>
      <SubTitle>나랑 마음이 통하는 사람은 누굴까?</SubTitle>

      <ButtonContainer>
        <StyledButton size="large">시작하기</StyledButton>
      </ButtonContainer>
    </HomeContainer>
  );
};

export default Home;
