import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import Lottie from "lottie-react";
import animationData from "../../assets/home.json";
// 모듈화된 컴포넌트들 임포트
import InfoModal from "../../components/modal/InfoModal";
import AlreadyLoggedInMessage from "../../components/message/AlreadyLoggedInMessage";
import TimeNoticeModal from "../../components/modal/TimeNoticeModal";
import { useNavigate } from 'react-router-dom';

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

// 슬라이드 애니메이션
const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;



const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

// 애니메이션이 적용될 컨테이너 추가
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

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  max-height: 100vh;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: white;
  padding: 0 16px;
  box-sizing: border-box;
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

const TitleImage = styled.img`
  position: absolute;
  top: 25%;
  z-index: 2;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 2s;
  opacity: 0;
  max-width: 70%;
  height: auto;

  @media (max-width: 768px) {
    top: 12%;
    max-width: 60%;
  }

  @media (max-width: 480px) {
    top: 25%;
    max-width: 50%;
  }
`;

const BackButton = styled.img`
  position: absolute;
  z-index: 3;
  top: 20px;
  left: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  animation: ${fadeIn} 0.5s ease forwards;

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 16px;
    height: 25px;
    top: 20px;
    left: 20px;
  }
`;

const StepContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin-top: 35%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding-bottom: 80px; // 버튼 높이 + 여백 고려

  animation: ${(props) => (props.entering ? slideIn : slideOut)} 0.5s ease
    forwards;
  ${(props) =>
    props.hidden &&
    css`
      display: none;
    `}
    
  @media (max-width: 768px) {
    margin-top: 30%;
  }
  
  @media (max-width: 480px) {
    margin-top: 25%;
    gap: 1rem;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  padding-left: 1rem;
  padding-bottom: 1rem;
  text-align: left;
  font-size: 16px;

  color: #28041d;

`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 24px;
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;

  &:focus {
    outline: none;
    border-color: #ff8787;
    box-shadow: 0 0 0 2px rgba(255, 135, 135, 0.2);
  }
  
  // 플레이스홀더 스타일 설정
  &::placeholder {
    color: #EEDCE8;
  }
  
  // 크로스 브라우저 호환성을 위한 벤더 접두사
  &::-webkit-input-placeholder {
    color: #EEDCE8;
  }
  
  &::-moz-placeholder {
    color: #EEDCE8;
    opacity: 1;
  }
  
  &:-ms-input-placeholder {
    color: #EEDCE8;
  }
  
  &:-moz-placeholder {
    color: #EEDCE8;
  }
`;

const TermsContainer = styled.div`
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  background-color: #f9f9f9;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  
  @media (max-width: 480px) {
    max-height: 170px;
    font-size: 0.8rem;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const GenderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
`;

const GenderButton = styled.button`
  flex: 1;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 2px solid ${(props) => (props.selected ? "#ff8787" : "#ddd")};
  background-color: ${(props) =>
    props.selected ? "rgba(255, 135, 135, 0.1)" : "white"};
  font-size: 1rem;
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ff8787;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: ${props => props.step === 0 ? 'absolute' : 'fixed'};
  bottom: ${props => props.step === 0 ? '5%' : `calc(20px + ${props.keyboardHeight}px)`};
  left: 0;
  right: 0;
  box-sizing: border-box;
  z-index: 10;
  
  // 첫 화면일 때만 페이드인 애니메이션 적용
  ${props => props.step === 0 && css`
    animation: ${fadeIn} 1s ease forwards;
    animation-delay: 3s;
    opacity: 0;
  `}
`;

const StyledButton = styled.button`
  width: ${props => props.step === 0 ? '80%' : '100%'};
  
  padding: ${props => props.step === 0 ? '0.8rem 2rem' : '0.8rem'};
  font-size: 1.1rem;
  background-color: ${props => props.step === 0 ? '#fefefe' : '#FFC3EC'};
  border-radius:${props => props.step === 0 ? '0.5rem' : '0'};
  border: none;
  color: ${props => props.step === 0 ? '#000' : '#fff'};
  box-shadow:${props => props.step === 0 ? '0 4px 8px rgba(0, 0, 0, 0.15)':'none'};
  transition: all 0.2s ease;
  cursor: pointer;

  &:disabled {
    background-color: #f5f5f5;
    color: #aaa;
    cursor: not-allowed;
  }

  &:active {
    background-color: ${props => props.step === 0 ? '#eedce8' : '#FFC3EC'};
    transform: scale(0.98);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const StepIndicator = styled.div`
  position: absolute;
  top: 5%;
  display: flex;
  gap: 0.5rem;
  z-index: 2;
`;

const Step = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#ff8787" : "#ddd")};
  transition: background-color 0.3s ease;
`;

const Home = () => {
  // 상태 관리
  const [buttonText, setButtonText] = useState("시작하기");
  const [step, setStep] = useState(0); // 0: 홈, 1: 인스타그램, 2: 개인정보 동의, 3: 성별 선택
  const [instagram, setInstagram] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [gender, setGender] = useState(""); // 'male' 또는 'female'
  const [entering, setEntering] = useState(true);
  const [initialAnimationComplete, setInitialAnimationComplete] =
    useState(false);

  // 추가 상태 변수들
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showAlreadyLoggedInMessage, setShowAlreadyLoggedInMessage] = useState(false);
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);

  // 시간 안내 모달 상태 추가
  const [showTimeNoticeModal, setShowTimeNoticeModal] = useState(false);

  // Lottie 애니메이션 참조
  const lottieRef = useRef(null);

  // 키보드 높이를 저장할 상태 추가
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  
  const navigate = useNavigate();
  
  // VisualViewport API를 사용하여 키보드 높이를 감지 - 개선된 버전
  useEffect(() => {
    const resizeHandler = (event) => {
      // 이벤트에서 직접 visualViewport 값을 가져옴
      if (event.target) {
        const heightDifference = window.innerHeight - event.target.height;
        console.log('keyboard height:', heightDifference);
        setKeyboardHeight(heightDifference > 0 ? heightDifference : 0);
      }
    };

    // visualViewport 존재 여부 확인 방식 개선
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", resizeHandler);
      
      // 초기 높이 설정을 위해 한 번 호출
      if (window.innerHeight > window.visualViewport.height) {
        setKeyboardHeight(window.innerHeight - window.visualViewport.height);
      }
      
      return () => window.visualViewport.removeEventListener("resize", resizeHandler);
    }
  }, []);

  // 초기 애니메이션 완료 처리
  const handleAnimationComplete = () => {
    if (!initialAnimationComplete) {
      setInitialAnimationComplete(true);
    }
  };

  // 애니메이션 제어를 위한 useEffect
  useEffect(() => {
    if (initialAnimationComplete && lottieRef.current) {
      // 더 넓은 범위의 프레임을 사용하고 애니메이션이 완전히 끝나기 전에 다시 시작하도록 조정
      lottieRef.current.playSegments([150, 301], true);
    }
  }, [initialAnimationComplete]);

  // 페이지 로드 시 로컬 스토리지에서 인스타그램 값 불러오기
  useEffect(() => {
    const savedInstagram = localStorage.getItem('instagramId');
    if (savedInstagram) {
      setInstagram(savedInstagram);
      setIsAlreadyLoggedIn(true);
    }
    
    // 로그인 상태 및 시간 확인
    checkLoginStatus();
  }, []);
  
  // 로그인 상태와 시간에 따른 메시지 표시 여부 확인
  const checkLoginStatus = () => {
    const savedInstagram = localStorage.getItem('instagramId');
    const now = new Date();
    const hour = now.getHours();
    
    if (savedInstagram && hour < 18 && hour >= 6) {
      setShowAlreadyLoggedInMessage(true);
    } else {
      setShowAlreadyLoggedInMessage(false);
    }
  };
  
  // 1분마다 상태 확인 갱신
  useEffect(() => {
    const interval = setInterval(checkLoginStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  // 시간에 따른 버튼 텍스트 변경 (수정)
  useEffect(() => {
    const updateButtonText = () => {
      const now = new Date();
      const hour = now.getHours();

      if (hour >= 18 || hour < 6) {
        setButtonText("결과보기");
      } else {
        // 이미 로그인했다면 다른 메시지 표시
        if (isAlreadyLoggedIn) {
          setButtonText("18시 이후에 확인하세요");
        } else {
          setButtonText("시작하기");
        }
      }
    };

    updateButtonText();
    const interval = setInterval(updateButtonText, 60000);
    return () => clearInterval(interval);
  }, [isAlreadyLoggedIn]); // isAlreadyLoggedIn 의존성 추가

  // 인스타그램 입력 핸들러 (로컬 스토리지 저장 추가)
  const handleInstagramChange = (e) => {
    const value = e.target.value;
    setInstagram(value);
    
    // 로컬 스토리지에 저장
    localStorage.setItem('instagramId', value);
  };

  // 로그인 데이터 저장
  const saveLoginData = () => {
    try {
      // 인스타그램, 성별 정보를 로컬 스토리지에 저장
      const loginData = {
        instagram,
        gender,
        timestamp: new Date().toISOString(),
      };
      
      localStorage.setItem('festivalLoginData', JSON.stringify(loginData));
      setIsAlreadyLoggedIn(true);
      
      return true;
    } catch (error) {
      console.error('로컬 스토리지 저장 오류:', error);
      return false;
    }
  };

  // 버튼 클릭 핸들러 수정
  const handleButtonClick = () => {
    const now = new Date();
    const hour = now.getHours();
    
    if (step === 0) {
      // 이미 로그인했을 경우
      if (isAlreadyLoggedIn) {
        if (hour >= 18 || hour < 6) {
          // 18시 이후에는 결과 페이지로 이동
          navigate('/result'); // Result 페이지로 이동
        } else {
          // 18시 이전에는 알림 모달 표시
          setShowInfoModal(true);
        }
      } else if (hour >= 17) { // 신규 사용자 & 17시 이후
        // 초기 사용자의 경우 안내 모달 표시
        setShowTimeNoticeModal(true);
      } else {
        // 17시 이전은 정상적으로 가입 진행
        nextStep();
      }
    } else if (step === 1) {
      if (instagram.trim()) {
        nextStep();
      }
    } else if (step === 2) {
      
        nextStep();
      
    } else if (step === 3 && gender) {
      // 모든 필수 정보 입력 완료 - 다음 단계로
      nextStep();
    } else if (step === 4) {
      // 준비 완료 단계에서 이미지 단계로 이동
      nextStep();
    } else if (step === 5) {
      // 이미지 단계에서 로컬 스토리지 저장 및 questions 페이지로 이동
      saveLoginData();
      navigate('/questions');
    }
  };

  // 버튼 활성화 여부 확인
  const isButtonDisabled = () => {
    if (step === 1) return instagram.trim() === "";
    if (step === 3) return gender === "";
    return false;
  };

  // 버튼 텍스트 결정
  const getButtonText = () => {
    if (step === 0) return buttonText;
    if (step === 5) return "시작하기";
    return "다음으로";
  };

  // 입력 필드 포커스 핸들러 개선
  const handleInputFocus = () => {
    // 키보드가 열릴 때 컨테이너를 조정하기 위한 딜레이
    setTimeout(() => {
      // 현재 입력 필드로 스크롤
      const input = document.getElementById('instagram');
      if (input) {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
  };

  // 다음 단계로 이동
  const nextStep = () => {
    setEntering(false);

    setTimeout(() => {
      setStep((prev) => prev + 1);
      setEntering(true);
    }, 500); // 애니메이션 시간과 일치
  };

  // 이전 단계로 이동
  const prevStep = () => {
    setEntering(false);

    setTimeout(() => {
      setStep((prev) => prev - 1);
      setEntering(true);
    }, 500); // 애니메이션 시간과 일치
  };

  // 스텝 4 감지하여 자동 전환을 위한 useEffect 추가
  useEffect(() => {
    // 스텝 4에 도달하면 1.5초 후 자동으로 스텝 5로 전환
    if (step === 4) {
      const timer = setTimeout(() => {
        nextStep(); // 다음 단계로 자동 전환
      }, 1500); // 1.5초 후 실행
      
      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
    }
  }, [step]); // step이 변경될 때마다 실행

  return (
    <HomeContainer>
      {/* 모달 컴포넌트 */}
      {showInfoModal && <InfoModal onClose={() => setShowInfoModal(false)} />}
      
      {/* 시간 안내 모달 추가 - onContinue prop 제거 */}
      {showTimeNoticeModal && 
        <TimeNoticeModal 
          onClose={() => setShowTimeNoticeModal(false)}
        />
      }
      
      {step === 0 && (
        <LottieContainer>
          <Lottie
            animationData={animationData}
            loop={initialAnimationComplete}
            autoplay={true}
            lottieRef={lottieRef}
            onComplete={handleAnimationComplete}
            style={{ width: "100%", height: "100%" }}
            rendererSettings={{
              preserveAspectRatio: "xMidYMid slice",
              progressiveLoad: false,
            }}
            segments={initialAnimationComplete ? [130, 290] : undefined}
          />
        </LottieContainer>
      )}

      {/* 이미 로그인했고 18시 이전인 경우 다른 메시지 표시 */}
      {step === 0 && showAlreadyLoggedInMessage ? (
        <AlreadyLoggedInMessage onShowModal={() => setShowInfoModal(true)} />
      ) : (
        step === 0 && <TitleImage src="/images/title.png" alt="타이틀 이미지" />
      )}

      {/* 뒤로 가기 버튼 - 1단계 이상이고 4단계 미만일 때만 표시 */}
      {step > 1 && step < 4 && (
        <BackButton
          src="/images/back.png"
          alt="뒤로가기"
          onClick={prevStep}
        ></BackButton>
      )}

      {/* 스텝 인디케이터 - 1~3단계에서만 표시 */}
      {step > 0 && step < 4 && (
        <StepIndicator>
          <Step active={step >= 1} />
          <Step active={step >= 2} />
          <Step active={step >= 3} />
        </StepIndicator>
      )}

      {/* 단계 1: 인스타그램 입력 - 핸들러 변경 */}
      <StepContainer entering={entering} hidden={step !== 1}>
        <InputContainer>
          <Label style={{paddingTop:'2rem',paddingBottom: '0',fontSize: '28px', fontWeight: 'bold', textAlign: 'left'}}>인스타그램 아이디</Label>
          <Label htmlFor="instagram">인스타그램 아이디로 로그인해주세요</Label>
          <Input
            id="instagram"
            type="text"
            value={instagram}
            onChange={handleInstagramChange} // 변경된 핸들러 사용
            placeholder="아이디를 입력해주세요"
            autoComplete="off"
            onFocus={handleInputFocus}
          />
        </InputContainer>
      </StepContainer>

      {/* 단계 2: 개인정보 수집동의 */}
      <StepContainer style={{alignItems: 'flex-start', gap: '0'}} entering={entering} hidden={step !== 2}>
        <Label style={{paddingTop:'2rem',paddingLeft:'3rem',fontSize: '28px', fontWeight: 'bold', textAlign: 'left'}}>개인정보 수집 동의</Label>
        <Label style={{paddingLeft:'3rem',fontSize: '16px',  textAlign: 'left'}}>원활한 매칭을 위해<br />개인정보 수집 동의가 필요해요</Label>
      </StepContainer>

      {/* 단계 3: 성별 선택 */}
      <StepContainer entering={entering} hidden={step !== 3}>
        <h2>성별 선택</h2>
        <GenderContainer>
          <GenderButton
            selected={gender === "male"}
            onClick={() => setGender("male")}
          >
            남성
          </GenderButton>
          <GenderButton
            selected={gender === "female"}
            onClick={() => setGender("female")}
          >
            여성
          </GenderButton>
        </GenderContainer>
      </StepContainer>

      {/* 단계 4: 준비 완료 메시지 - 특별한 애니메이션 적용 */}
      <StepContainer entering={true} hidden={step !== 4}>
        <AnimatedContainer duration="0.8s" delay="0.2s">
          <div style={{ textAlign: 'center', marginTop: '30%' }}>
            <h1 style={{ 
              fontSize: '36px', 
              fontWeight: 'bold', 
              marginBottom: '20px',
              color: '#28041d'
            }}>
              모든 준비 완료!
            </h1>
            <p style={{ 
              fontSize: '18px', 
              color: '#666',
              marginTop: '15px'
            }}>
              잠시 후 다음 단계로 이동합니다
            </p>
          </div>
        </AnimatedContainer>
      </StepContainer>

      {/* 단계 5: 이미지 화면 */}
      <StepContainer style={{alignItems: 'flex-start'}} entering={entering} hidden={step !== 5}>
      <Label style={{paddingTop:'2rem',paddingLeft:'3rem',fontSize: '28px', fontWeight: 'bold', textAlign: 'left'}}>질문에 대한 답을 <br />선택해주세요</Label>
      <Label style={{paddingLeft:'3rem',fontSize: '16px',  textAlign: 'left'}}>똑같은 답을 선택한 이성과<br />매칭이 이뤄집니다</Label>
      </StepContainer>

      {/* 버튼 컨테이너 - 조건:
        1. 이미 참가했고 18시 이전인 경우(showAlreadyLoggedInMessage가 true) 버튼 숨김
        2. 그 외의 경우 버튼 표시 */}
      {!showAlreadyLoggedInMessage && step !== 4 && (
        <ButtonContainer step={step} keyboardHeight={keyboardHeight}>
          <StyledButton
            step={step}
            onClick={handleButtonClick}
            disabled={step > 0 && isButtonDisabled()}
          >
            {getButtonText()}
          </StyledButton>
        </ButtonContainer>
      )}
    </HomeContainer>
  );
};

export default Home;