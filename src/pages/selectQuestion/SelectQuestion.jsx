import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

/* 
4/17
UI 구현 완료
남은거: 백엔드로 데이터 보내기, 마지막 질문 이후 페이지 넘어가기(라우터), 선택 안 하고 넘어가려 하면 막기
물어볼거: 마지막 질문에서 결과보기 버튼 띄워야 되는지?
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
  padding: 5vh 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

// 질문 컨테이너
const QuestionContainer = styled.div`
  position: absolute;
  top: 8vh;
  left: 54%;
  transform: translateX(-50%);
  width: 90%;
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
  margin-top: 18vh;
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

// 이전/다음 버튼 컨테이너
const ArrowContainer = styled.div`
  margin-top: 8vh;
  margin-bottom: 2vh;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 5vw;
  padding-right: 5vw;
`;

const Arrow = styled.button`
  width: 10vw;
  height: 5vh;
  background-color: white;
  font-size: 5vw;
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

  const handleIsSelect = (index) => {
    // 버튼 클릭 여부 판단 함수
    setIsSelected(index);
  };

  const handlePrevQuestion = () => {
    // 이전 질문으로
    if (index > 0) {
      setIndex((index) => index - 1);
      setIsSelected(null); // 선택 초기화
    }
  };

  const handleNextQuestion = () => {
    // 다음 질문으로
    if (index < totalQuestion - 1) {
      setIndex((index) => index + 1);
      setIsSelected(null); // 선택 초기화
    } else {
      // 완료 페이지로 이동
    }
  };

  return (
    <Container>
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
        <Arrow onClick={handleNextQuestion}>
          <FaArrowRight />
        </Arrow>
      </ArrowContainer>

      <ProcessBarContainer>
        <Progress percent={percent} />
      </ProcessBarContainer>
    </Container>
  );
};

export default SelectQuestion;
