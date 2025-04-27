import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

/* 
4/17
UI 구현 완료
남은거: 글꼴 적용, 백엔드 통신 처리, 마지막 질문 이후 페이지 넘어가기(라우터)
*/

// 페이드인 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const AnimatedContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${props => props.fadeOut ? fadeOut : fadeIn} ${props => props.duration || '1s'} ease forwards;
  animation-delay: ${props => props.delay || '0s'};
  opacity: ${props => props.fadeOut ? 1 : 0};
`;


// 전체 컨테이너
const Container = styled.div`
  position: relative;
  background-color: white;
  height: 90vh;
  width: 100vw;
  padding: 3vh 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

// 프로세스바 컨테이너
const ProcessBarContainer = styled.div`
  width: 100%;
  height: 1vh;
  background-color: #eee;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  width: ${(props) => props.percent}%;
  background-color: rgb(255, 195, 236, 1);
  transition: width 0.3s ease-in-out;
`;

// 질문 컨테이너
const QuestionContainer = styled.div`
  position: absolute;
  width: 70%;
  top: 10vh;
  left: 7vh;
  animation: ${fadeIn} 1s ease-in-out;
`;

const QuestionNumber = styled.div`
  color: grey;
  font-size: 4.5vw;
`;

const Question = styled.div`
  font-size: 6.5vw;
  font-weight: bold;
  word-break: keep-all;
  white-space: normal;
`;

// 선택 박스 컨테이너
const SelectContainer = styled.div`
  margin-top: 22vh;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in-out;
  animation-delay: 0.7s;
  animation-fill-mode: backwards;
`;

const SelectBox = styled.button`
  height: 19vh;
  width: 72vw;
  font-size: 6vw;
  padding: 2vh 7vw;
  border-radius: 1vh;
  word-break: keep-all;
  white-space: normal;
  text-align: center;

  border: ${({ isSelected }) =>
    isSelected ? "none" : "solid 2.5px rgb(255, 195, 236, 1)"};
  background-color: ${({ isSelected }) =>
    isSelected ? "rgb(255, 195, 236, 1)" : "white"};
  transition: 0.5s ease;
`;

const VsText = styled.div`
  margin-top: 2vh;
  margin-bottom: 2vh;
  font-size: 4vw;
`;

// 이전 버튼 컨테이너
const ArrowContainer = styled.div`
  position: absolute;
  bottom: 7vh;
  padding-right: 80vw;
`;

const Arrow = styled.button`
  width: 12vw;
  background-color: white;
  font-size: 5vw;
  color: grey;
`;

// 완료 버튼
const FinishButton = styled.button`
  position: absolute;
  bottom: 6.2vh;
  right: 5vw;
  background-color: white;
  color: black;
  font-size: 4.5vw;
  padding: 1.2vh 30vw;
  border: none;
  border-radius: 1vh;
  box-shadow: 0px 0px 10px lightgray;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const SelectQuestion = () => {
  const [index, setIndex] = useState(0); // 현재 질문 인덱스
  const [isSelected, setIsSelected] = useState(null); // 버튼 클릭 여부
  const totalQuestion = 5; // 질문 개수
  const percent = ((index + 1) / totalQuestion) * 100; // 질문 진행도(%)
  const [showCompleteMessage, setShowCompleteMessage] = useState(false); // 완료 메시지 표시 상태
  const [fadeOut, setFadeOut] = useState(false); // 페이드아웃 효과를 위한 상태
  const questions = [
    {
      question: "연인과의 연락 빈도는?",
      choices: [
        "연락은 3시간에 한 번도 충분하다",
        "연락은 30분에 한 번도 부족하다",
      ],
    },
    {
      question: "나의 연애 스타일은?",
      choices: ["말없이 스킨십만 하는 연애", "스킨십 없이 말만 하는 연애"],
    },
    {
      question: "데이트하면서 밥을 먹는다면?",
      choices: ["맛집 웨이팅 2시간", "근처 아무 곳이나 가기"],
    },
    {
      question: "연인과 싸웠다면?",
      choices: ["일단 서로 시간을 가지고 생각한다", "마주보며 계속 얘기한다"],
    },
    {
      question: "선호하는 데이트는?",
      choices: ["쉴틈없이 빡빡한 데이트", "여유로운 널널한 데이트"],
    },
  ];
  const currentQuestion = questions[index]; // 현재 질문
  const navigate = useNavigate();

  const handleIsSelect = (choiceIndex) => {
    setIsSelected(choiceIndex);

    if (index < totalQuestion - 1) {
      // 마지막 질문에서는 완료 버튼으로만 이동 (자동 이동 X)
      setTimeout(() => {
        setIndex((prev) => prev + 1);
        setIsSelected(null);
      }, 1000);
    }
  };

  const handlePrevQuestion = () => {
    // 이전 질문으로
    if (index > 0) {
      setIndex((index) => index - 1);
      setIsSelected(null); // 선택 초기화
    }
  };

  // 완료 버튼 클릭 시 완료 메시지 표시 후 홈 화면으로 이동
  const handleFinish = () => {
    // 완료 메시지 표시
    setShowCompleteMessage(true);
    
    // 3초 후 홈 화면으로 이동
    setTimeout(() => {
      setFadeOut(true); // 페이드아웃 효과 적용
      
      // 페이드아웃 후 홈으로 이동
      setTimeout(() => {
        navigate('/');
      }, 1000); // 페이드아웃 시간 후 이동
    }, 2000); // 메시지 표시 시간
  };

  // 완료 메시지 컴포넌트
  const CompletionMessage = () => (
    <AnimatedContainer fadeOut={fadeOut} duration="1s" delay="0.2s" style={{height: '100vh', justifyContent: 'center'}}>
      <div style={{ 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          marginBottom: '20px',
          color: '#28041d'
        }}>
          모든 선택이<br /> 완료되었어요!
        </h1>
       
      </div>
    </AnimatedContainer>
  );

  // 완료 메시지가 표시 중이면 완료 화면 렌더링
  if (showCompleteMessage) {
    return (
      <Container>
        <CompletionMessage />
      </Container>
    );
  }

  // 기존 질문 화면 렌더링
  return (
    <Container>
      <ProcessBarContainer>
        <Progress percent={percent} />
      </ProcessBarContainer>
      <QuestionContainer key={`q-${index}`}>
        <QuestionNumber>Q{index + 1}.</QuestionNumber>
        <Question>{currentQuestion.question}</Question>
      </QuestionContainer>
      <SelectContainer key={`s-${index}`}>
        <SelectBox
          isSelected={isSelected === 0}
          onClick={() => handleIsSelect(0)}
        >
          {currentQuestion.choices[0]}
        </SelectBox>
        <VsText>VS</VsText>
        <SelectBox
          isSelected={isSelected === 1}
          onClick={() => handleIsSelect(1)}
        >
          {currentQuestion.choices[1]}
        </SelectBox>
      </SelectContainer>
      <ArrowContainer>
        <Arrow
          style={{ visibility: index === 0 ? "hidden" : "visible" }}
          onClick={handlePrevQuestion}
        >
          <FaArrowLeft />
        </Arrow>
      </ArrowContainer>
      {index === totalQuestion - 1 &&
        isSelected !== null && (
          <FinishButton onClick={handleFinish}>
            완료
          </FinishButton>
        )}
    </Container>
  );
};

export default SelectQuestion;
