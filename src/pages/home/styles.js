import styled, { keyframes, css } from "styled-components";

// === 애니메이션 정의 ===
export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;



// === 애니메이션 컨테이너 ===
export const AnimatedContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${props => props.fadeOut ? fadeOut : fadeIn} ${props => props.duration || '1s'} ease forwards;
  animation-delay: ${props => props.delay || '0s'};
  opacity: ${props => props.fadeOut ? 1 : 0};
`;

// === 로고 및 이미지 ===
export const LogoImage = styled.img`
  width: 50%;
  max-width: 200px;
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

export const LottieContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

// === 단계별 컨테이너 ===
export const StepContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin-top: 35%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding-bottom: 80px;

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

// === 입력 컴포넌트 ===
export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  padding-left: 1rem;
  padding-bottom: 1rem;
  text-align: left;
  font-size: 16px;
  color: #28041d;
`;

export const Input = styled.input`
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
  
  &::placeholder {
    color: #EEDCE8;
  }
`;

export const ErrorMessage = styled.p`
  color: #f44336;
  font-size: 14px;
  margin-top: 4px;
  min-height: 20px;
`;

export const GenderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  gap: 1rem;
  padding-top: 3rem;
`;

export const GenderButton = styled.button`
  flex: 1;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 2px solid ${(props) => (props.selected ? "#FFC3EC" : "#ddd")};
  background-color: ${(props) =>
    props.selected ? "#FFC3EC" : "white"};
  font-size: 1rem;
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #FFC3EC;
  }
`;

// === 버튼 컴포넌트 ===
export const PrimaryButton = styled.button`
  width: 80%;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  background-color: #FFC3EC;
  color: #28041d;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: #ffb5e0;
  }
  
  &:active {
    transform: scale(0.98);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    background-color: #f0f0f0;
    color: #999;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const BackButton = styled.img`
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

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: ${props => props.step === 0 ? 'absolute' : 'fixed'};
  bottom: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  z-index: 10;
  padding-bottom: ${props => props.keyboardHeight > 0 ? 
    `${props.keyboardHeight}px` : '0px'};
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  
  // 첫 화면일 때만 페이드인 애니메이션 적용
  ${props => props.step === 0 && css`
    animation: ${fadeIn} 1s ease forwards;
    animation-delay: 3s;
    opacity: 0;
    box-shadow: none;
    background-color: transparent;
    bottom: 5%;
  `}
`;

// === 인스타그램 ID 디스플레이 ===
export const InstagramIdContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
  cursor: pointer;
  width: 100%;
`;

export const CopyIcon = styled.img`
  position: absolute;
  top: -30px;
  right: 80px;
  width: 95px;
  height: 30px;
`;

export const InstagramId = styled.div`
  font-size: 28px;
  color: #28041d;
  background-color: #ffc3ec;
  padding: 8px 14px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  transition: all 0.2s ease;
  min-width: 180px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  
  &:hover {
    background-color: #ffaee5;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const CopiedMessage = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.3s ease;
`;

// === 질문 선택 페이지 스타일 ===
export const QuestionContainer = styled.div`
  width: 100%;
  padding: 20px;
  margin-top: 20px;
`;

export const QuestionNumber = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #28041d;
  margin-bottom: 10px;
`;

export const Question = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #28041d;
  margin-bottom: 30px;
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;
  gap: 20px;
`;

export const SelectBox = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: ${props => props.isSelected ? '#FFC3EC' : '#f5f5f5'};
  border: 2px solid ${props => props.isSelected ? '#28041d' : 'transparent'};
  box-shadow: ${props => props.isSelected ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)'};
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.isSelected ? '#FFC3EC' : '#f0f0f0'};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// === 결과 페이지 스타일 ===
export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  padding-bottom: 81px;
`;

export const Message = styled.p`
  font-size: ${props => props.size || '18px'};
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  color: ${props => props.color || '#28041d'};
  text-align: center;
  margin: 10px 0;
  line-height: 1.5;
`;

export const CelebrationImage = styled.img`
  width: 80%;
  max-width: 300px;
  margin: 20px 0;
`;

export const MatchingInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  width: 100%;
`;

// StepIndicator와 Step 컴포넌트 추가
export const StepIndicator = styled.div`
  position: absolute;
  top: 5%;
  display: flex;
  gap: 0.5rem;
  z-index: 2;
`;

export const Step = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#FFC3EC" : "#ddd")};
  transition: background-color 0.3s ease;
`;

export const StyledButton = styled.button`
  width: ${props => props.step === 0 ? '80%' : '100%'};
  
  padding: ${props => props.step === 0 ? '0.8rem 2rem' : '0.8rem'};
  font-size: 1.1rem;
  background-color: ${props => props.step === 0 ? '#fefefe' : '#FFC3EC'};
  border-radius:${props => props.step === 0 ? '0.5rem' : '0'};
  border: none;
  color: #28041d
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

// === HomeContainer 추가 (기존 PageContainer와 동일) ===
export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 90vh;
  max-height: 100vh;
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: white;
  padding: 0 16px;
  box-sizing: border-box;
`;

// === TitleImage 추가 (기존 LogoImage와 동일) ===
export const TitleImage = styled.img`
  width: 50%;
  max-width: 200px;
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

