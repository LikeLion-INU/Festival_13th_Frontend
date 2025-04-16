import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import Lottie from "lottie-react";
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

const TitleImage = styled.img`
  position: absolute;
  top: 15%;
  z-index: 2;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 1s;
  opacity: 0;
  max-width: 70%;
  height: auto;

  @media (max-width: 768px) {
    top: 12%;
    max-width: 60%;
  }

  @media (max-width: 480px) {
    top: 10%;
    max-width: 50%;
  }
`;

const BackButton = styled.img`
  position: absolute;
  z-index: 3;
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
    width: 16px; // 모바일에서 더 작게
    height: 25px;

    top: 5%;
    left: 8%;
  }
`;

const StepContainer = styled.div`
  position: absolute;
  top: 35%;
  width: 80%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  animation: ${(props) => (props.entering ? slideIn : slideOut)} 0.5s ease
    forwards;
  ${(props) =>
    props.hidden &&
    css`
      display: none;
    `}
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.2rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #ff8787;
    box-shadow: 0 0 0 2px rgba(255, 135, 135, 0.2);
  }
`;

const TermsContainer = styled.div`
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  background-color: #f9f9f9;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
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
  position: absolute;
  bottom: 5%;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 0.5s;
  opacity: 0;
  z-index: 2;
`;

const StyledButton = styled.button`
  width: 80%;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  background-color: #fefefe;
  border-radius: 0.5rem;
  color: #000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  cursor: pointer;

  &:disabled {
    background-color: #f5f5f5;
    color: #aaa;
    cursor: not-allowed;
  }

  &:active {
    background-color: #eedce8;
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

  // Lottie 애니메이션 참조
  const lottieRef = useRef(null);

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

  // 시간에 따른 버튼 텍스트 변경
  useEffect(() => {
    const updateButtonText = () => {
      const now = new Date();
      const hour = now.getHours();

      if (hour >= 18 || hour < 6) {
        setButtonText("결과보기");
      } else {
        setButtonText("시작하기");
      }
    };

    updateButtonText();
    const interval = setInterval(updateButtonText, 60000);
    return () => clearInterval(interval);
  }, []);

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

  // 버튼 클릭 핸들러
  const handleButtonClick = () => {
    if (step === 0) {
      nextStep();
    } else if (step === 1) {
      if (instagram.trim()) {
        nextStep();
      }
    } else if (step === 2) {
      if (termsAgreed) {
        nextStep();
      }
    } else if (step === 3) {
      if (gender) {
        // 여기서 데이터 제출 또는 다음 페이지로 이동
        alert(`제출 완료! 인스타그램: ${instagram}, 성별: ${gender}`);
      }
    }
  };

  // 버튼 활성화 여부 확인
  const isButtonDisabled = () => {
    if (step === 1) return instagram.trim() === "";
    if (step === 2) return !termsAgreed;
    if (step === 3) return gender === "";
    return false;
  };

  // 버튼 텍스트 결정
  const getButtonText = () => {
    if (step === 0) return buttonText;
    if (step === 3) return "제출하기";
    return "다음";
  };

  return (
    <HomeContainer>
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

      {/* 뒤로 가기 버튼 - 1단계 이상일 때만 표시 */}
      {step > 1 && (
        <BackButton
          src="/images/back.png"
          alt="뒤로가기"
          onClick={prevStep}
        ></BackButton>
      )}

      {step > 0 && (
        <StepIndicator>
          <Step active={step >= 1} />
          <Step active={step >= 2} />
          <Step active={step >= 3} />
        </StepIndicator>
      )}

      {step === 0 && <TitleImage src="/images/title.png" alt="타이틀 이미지" />}

      {/* 단계 1: 인스타그램 입력 */}
      <StepContainer entering={entering} hidden={step !== 1}>
        <h2>인스타그램 계정</h2>
        <InputContainer>
          <Label htmlFor="instagram">인스타그램 아이디를 입력해주세요</Label>
          <Input
            id="instagram"
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="@없이 입력해주세요"
            autoComplete="off"
          />
        </InputContainer>
      </StepContainer>

      {/* 단계 2: 개인정보 수집동의 */}
      <StepContainer entering={entering} hidden={step !== 2}>
        <h2>개인정보 수집동의</h2>
        <TermsContainer>
          <p>
            개인정보 수집 및 이용 동의서
            <br />
            <br />
            1. 수집하는 개인정보 항목: 인스타그램 계정, 성별
            <br />
            <br />
            2. 수집 및 이용목적: 이심전심 서비스 제공
            <br />
            <br />
            3. 보유 및 이용기간: 서비스 제공 후 즉시 파기
            <br />
            <br />위 개인정보 수집 및 이용에 동의합니다.
          </p>
        </TermsContainer>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            id="terms"
            checked={termsAgreed}
            onChange={(e) => setTermsAgreed(e.target.checked)}
          />
          <Label htmlFor="terms">위 내용에 동의합니다</Label>
        </CheckboxContainer>
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

      <ButtonContainer>
        <StyledButton
          onClick={handleButtonClick}
          disabled={step > 0 && isButtonDisabled()}
        >
          {getButtonText()}
        </StyledButton>
      </ButtonContainer>
    </HomeContainer>
  );
};

export default Home;
