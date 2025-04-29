import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { submitAnswers } from '../../api/survey';
import InfoModal from "../../components/modal/InfoModal";
import animationData from "../../assets/home.json";
import HomeScreen from "../../components/screens/HomeScreen";
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
  height: 100vh;
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
  white-space: pre-line;
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
  const [answers, setAnswers] = useState([]); // 사용자 답변 저장 배열 추가
  const [submitError, setSubmitError] = useState(""); // 에러 메시지 상태 추가
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 중 상태 추가
  const [showTempHomeScreen, setShowTempHomeScreen] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [initialAnimationComplete, setInitialAnimationComplete] = useState(true);
  const lottieRef = useRef(null);
  const [isSelecting, setIsSelecting] = useState(false); // 선택 진행 중 상태 추가
  const questions = [
    {
      question: "연인과의 연락 빈도는?",
      choices: [
        "연락은 3시간에 \n 한 번도 충분하다",
        "연락은 30분에 \n 한 번도 부족하다",
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
    // 이미 선택 중이거나 제출 중이면 추가 클릭 무시
    if (isSelecting || isSubmitting) return;
    
    // 선택 진행 중 상태로 변경
    setIsSelecting(true);
    setIsSelected(choiceIndex);
    
    // 답변 저장
    const answer = {
      questionNumber: index + 1,
      choice: choiceIndex === 0 ? "FIRST" : "SECOND"
    };
    
    // 이미 답변한 질문이면 업데이트, 아니면 새로 추가
    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionNumber !== answer.questionNumber);
      return [...filtered, answer];
    });
    
    if (index < totalQuestion - 1) {
      // 마지막 질문이 아니면 자동으로 다음 질문으로
      setTimeout(() => {
        setIndex((prev) => prev + 1);
        setIsSelected(null);
        // 선택 완료 상태로 변경
        setIsSelecting(false);
      }, 1000);
    } else {
      // 마지막 질문이면 1초 후 선택 상태 해제
      setTimeout(() => {
        setIsSelecting(false);
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

  // 애니메이션 완료 핸들러
  const handleAnimationComplete = () => {
    setInitialAnimationComplete(true);
  };

  // 답변 제출 API 호출 함수 수정
  const handleFinish = async () => {
    // 제출 중 상태로 변경
    setIsSubmitting(true);
    
    // 답변 제출
    const result = await submitAnswers(answers);
    
    if (result.status === 'success') {
      // 성공 시 완료 메시지 표시
      setSubmitError("");
      setShowCompleteMessage(true);
      
      // 3초 후 완료 메시지를 임시 홈 화면으로 전환
      setTimeout(() => {
        setFadeOut(true);
        
        setTimeout(() => {
          setShowCompleteMessage(false);
          setShowTempHomeScreen(true);
          
          // 제출 완료 상태로 변경
          setIsSubmitting(false);
          
          // 20초 후 실제 홈으로 이동
          setTimeout(() => {
            navigate('/');
          }, 30000); 
        }, 1000);
      }, 3000);
    } else {
      // 실패 시 에러 메시지 표시
      setSubmitError(result.message);
      
      // 제출 완료 상태로 변경
      setIsSubmitting(false);
      
      // 로그인 상태가 아닌 경우 홈으로 이동
      if (result.message === "로그인 상태가 아닙니다.") {
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    }
  };

  // 완료 메시지 컴포넌트 수정 - 에러 메시지 추가
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
        
        <p style={{
          fontSize: '16px',
          color: '#555',
          marginTop: '10px'
        }}>
          매칭 결과는 오후 6시에 확인할 수 있어요.
        </p>
      </div>
    </AnimatedContainer>
  );

  // 에러 메시지 컴포넌트 추가
  const ErrorMessage = ({ message }) => message ? (
    <div style={{
      color: 'red',
      textAlign: 'center',
      padding: '10px',
      fontSize: '14px',
      position: 'absolute',
      bottom: '15vh',
      width: '100%'
    }}>
      {message}
    </div>
  ) : null;

  // 임시 홈 화면이 표시 중이면 홈 화면 렌더링
  if (showTempHomeScreen) {
    return (
      <Container>
        <HomeScreen
          animationData={animationData}
          initialAnimationComplete={initialAnimationComplete}
          lottieRef={lottieRef}
          handleAnimationComplete={handleAnimationComplete}
          showAlreadyLoggedInMessage={true} // 항상 메시지 표시
          setShowInfoModal={setShowInfoModal}
          handleButtonClick={() => {}} // 버튼 클릭은 무시
          getButtonText={() => "18시 이후에 확인하세요"} // 버튼 텍스트 고정
          keyboardHeight={0}
        />
        {showInfoModal && <InfoModal onClose={() => setShowInfoModal(false)} />}
      </Container>
    );
  }

  // 완료 메시지가 표시 중이면 완료 화면 렌더링
  if (showCompleteMessage) {
    return (
      <Container>
        <CompletionMessage />
      </Container>
    );
  }

  // 기존 질문 화면 렌더링에 에러 메시지 추가
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
          disabled={isSelecting || isSubmitting}
        >
          {currentQuestion.choices[0]}
        </SelectBox>
        <VsText>VS</VsText>
        <SelectBox
          isSelected={isSelected === 1}
          onClick={() => handleIsSelect(1)}
          disabled={isSelecting || isSubmitting}
        >
          {currentQuestion.choices[1]}
        </SelectBox>
      </SelectContainer>
      
      <ArrowContainer>
        <Arrow
          style={{ visibility: index === 0 ? "hidden" : "visible" }}
          onClick={!isSubmitting ? handlePrevQuestion : undefined}
        >
          <FaArrowLeft />
        </Arrow>
      </ArrowContainer>
      
      {index === totalQuestion - 1 && isSelected !== null && (
        <FinishButton 
          onClick={!isSubmitting ? handleFinish : undefined}
          disabled={isSubmitting}
        >
          {isSubmitting ? "제출 중..." : "완료"}
        </FinishButton>
      )}
      
      {/* 에러 메시지 표시 */}
      <ErrorMessage message={submitError} />
    </Container>
  );
};

export default SelectQuestion;
