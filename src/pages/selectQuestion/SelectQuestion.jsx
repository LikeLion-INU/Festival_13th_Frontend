import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaArrowLeft } from "react-icons/fa";

/* 
4/17
UI 구현 완료
남은거: 백엔드 통신 처리, 마지막 질문 이후 페이지 넘어가기(라우터)
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
  padding: 2vh 5vw;
  border-radius: 1vh;
  word-break: keep-all;
  white-space: normal;
  text-align: center;

  border: ${({ isSelected }) =>
    isSelected ? "solid rgb(255, 195, 236, 1)" : "none"};
  background-color: ${({ isSelected }) =>
    isSelected ? "white" : "rgb(255, 195, 236, 1)"};
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
          style={{ visibility: index === 0 ? "hidden" : "visible" }} // 첫 번째 질문일 때 이전 화살표 안 보이게
          onClick={handlePrevQuestion}
        >
          <FaArrowLeft />
        </Arrow>
      </ArrowContainer>
      {index === totalQuestion - 1 &&
        isSelected !== null && ( // 마지막 질문 선택돼야 완료 버튼 표시
          <FinishButton
            onClick={() => console.log("결과 페이지 이동 로직 넣는 자리")}
          >
            완료
          </FinishButton>
        )}
    </Container>
  );
};

export default SelectQuestion;
