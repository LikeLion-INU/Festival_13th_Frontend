import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

/* 
4/16
로직 제외 UI만 완료
님은거: 질문 뜰 때 페이드인 추가, 첫 페이지엔 이전 버튼 안뜨게, 누르면 다음 질문 로직 짜기, 다른 폰에서도 화면 체크
*/

// 전체 컨테이너
const Container = styled.div`
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
  margin-top: 1vh;
`;

const QuestionNumber = styled.div`
  color: grey;
  font-size: 5vw;
`;

const Question = styled.div`
  font-size: 8vw;
  font-weight: bold;
`;

// 선택 박스 컨테이너
const SelectContainer = styled.div`
  margin-top: 8vh;
  text-align: center;
`;

const SelectBox = styled.button`
  background-color: rgb(255, 195, 236, 1);
  height: 19vh;
  width: 72vw;
  font-size: 6.5vw;
  padding: 5vh 7vw;
  border: none;
  border-radius: 1vh;
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
  const [index, setIndex] = useState(0);
  const total = 5; // 질문 개수
  const percent = ((index + 1) / total) * 100;

  return (
    <Container>
      <QuestionContainer>
        <QuestionNumber>Q1.</QuestionNumber>
        <Question>연인과의 연락 빈도는?</Question>
      </QuestionContainer>

      <SelectContainer>
        <SelectBox>연락은 3시간에 한 번도 충분하다</SelectBox>
        <VsText>VS</VsText>
        <SelectBox>연락은 30분에 한 번도 부족하다</SelectBox>
      </SelectContainer>

      <ArrowContainer>
        <Arrow>
          <FaArrowLeft />
        </Arrow>
        <Arrow>
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
