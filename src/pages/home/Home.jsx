import React, { useState, useEffect } from "react";
import animationData from "../../assets/home.json";
// 모듈화된 컴포넌트들 임포트
import InfoModal from "../../components/modal/InfoModal";
import TimeNoticeModal from "../../components/modal/TimeNoticeModal";
import { useNavigate } from 'react-router-dom';
import HomeScreen from "../../components/screens/HomeScreen";

// styles.js에서 스타일 컴포넌트 임포트
import {
  AnimatedContainer,
  HomeContainer,
  BackButton,
  StepContainer,
  InputContainer,
  Label,
  Input,
  GenderContainer,
  GenderButton,
  ButtonContainer,
  StyledButton,
  StepIndicator,
  Step
} from "./styles";

// API 서비스 import 경로 수정
import { checkInstagramId, loginUser, signupUser } from '../../api/auth';

const Home = () => {
  // 상태 관리
  const [step, setStep] = useState(0); // 0: 홈, 1: 인스타그램, 2: 개인정보 동의, 3: 성별 선택
  const [instagram, setInstagram] = useState("");
  const [gender, setGender] = useState(""); // 'male' 또는 'female'
  const [entering, setEntering] = useState(true);
  
  // 추가 상태 변수들
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showAlreadyLoggedInMessage, setShowAlreadyLoggedInMessage] = useState(false);

  // 시간 안내 모달 상태 추가
  const [showTimeNoticeModal, setShowTimeNoticeModal] = useState(false);

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
        
        // 키보드 높이가 일정 값 이상일 때만 적용 (작은 변화 무시)
        setKeyboardHeight(heightDifference > 10 ? heightDifference : 0);
        
        // 키보드가 감지되면 여러 번 업데이트를 시도하여 정확한 위치를 얻음
        if (heightDifference > 10) {
          const updateTimes = [100, 300, 500];
          updateTimes.forEach(delay => {
            setTimeout(() => {
              if (window.visualViewport) {
                const newHeightDiff = window.innerHeight - window.visualViewport.height;
                setKeyboardHeight(newHeightDiff > 0 ? newHeightDiff : 0);
              }
            }, delay);
          });
        }
      }
    };

    // visualViewport 존재 여부 확인 방식 개선
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", resizeHandler);
      
      // 초기 높이 설정을 위해 한 번 호출
      if (window.innerHeight > window.visualViewport.height) {
        const initialDiff = window.innerHeight - window.visualViewport.height;
        setKeyboardHeight(initialDiff > 0 ? initialDiff : 0);
      }
      
      return () => window.visualViewport.removeEventListener("resize", resizeHandler);
    }
  }, []);

  // 인스타그램 입력 핸들러 (로컬 스토리지 저장 추가)
  const handleInstagramChange = (e) => {
    const value = e.target.value;
    setInstagram(value);
  };

  // handleButtonClick 함수 수정 - 특히 step === 1 부분
  const handleButtonClick = async () => {
    const now = new Date();
    const hour = now.getHours();
    
    if (step === 0) {
      // 홈 화면에서 시작하기/결과보기 버튼 클릭
      if (hour >= 18 || hour < 6) {
        // 18시 이후 또는 새벽 6시 이전 - 결과 확인 가능 시간
        // 바로 인스타그램 ID 입력 화면으로 이동
        nextStep();
      } else {
        nextStep();
      }
    } else if (step === 1) {
      // 인스타그램 ID 입력 후 버튼 클릭
      if (instagram.trim()) {
        try {
          if (hour >= 18 || hour < 10) {
            // 18시 이후 - 결과 확인 로직
            const response = await loginUser(instagram);
            
            
            if (response.message === "로그인 성공") {
              // 로그인 성공 시 결과 페이지로 이동
              navigate('/result');
            } else {
              // 17시 이후 신규 사용자 - 매칭 시간 아님 안내
              setShowTimeNoticeModal(true);
              // 홈 화면으로 돌아가기
              setStep(0);
              // 로그인 실패 시 에러 메시지
              // alert(response.message);
            }
          } else {
            // 18시 이전 로직
            const response = await checkInstagramId(instagram);
            
            // 오류 상태 확인 추가
            if (response.status === 'error') {
              alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
              return;
            }
            
            if (response.status === 'success') {
              if (response.isNewUser) {
                // 신규 사용자
                if (hour >= 17) {
                  // 17시 이후 신규 사용자 - 매칭 시간 아님 안내
                  setShowTimeNoticeModal(true);
                  // 홈 화면으로 돌아가기
                  setStep(0);
                } else {
                  // 17시 이전 신규 사용자 - 정상 가입 진행
                  nextStep(); // 개인정보 동의 단계로
                  // localStorage 사용하지 않음 - 세션에 저장됨
                }
              }
              else if (response.status === 'success' || !response.isNewUser) {
                // 기존 가입자지만 답변 미제출 - 질문 페이지로 이동
                alert('기존 가입자지만 답변 미제출 - 질문 페이지로 이동');
                navigate('/questions');
              }
            } else {
              if (response.status === 'done') {
                // 이미 답변 완료했거나 기존 유저인 경우
                setStep(0);
                console.log(response.status);
                //setIsAlreadyLoggedIn(true);
                setShowAlreadyLoggedInMessage(true);
                // 홈 화면으로 돌아가기
              }
            }
          }
        } catch (error) {
          // API 호출 중 발생한 오류 처리
          console.error("API 요청 중 오류 발생:", error);
          alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
    } else if (step === 2) {
      // 개인정보 동의 화면에서 다음 버튼 클릭
      nextStep();
    } else if (step === 3 && gender) {
      // 회원가입 API 호출
      const response = await signupUser(instagram.trim(), gender);
      
      if (response.status === 'success') {
        // 성공 시 다음 단계로
        localStorage.setItem('instagramId', instagram); // 로그인 상태 유지용
        nextStep();
      } else {
        // 실패 시 에러 메시지 표시
        alert(response.message);
        
        // 에러 유형에 따른 추가 처리
        if (response.message === '이미 존재하는 인스타 ID입니다.') {
          // 인스타 ID 중복 시 인스타그램 ID 입력 화면으로 돌아가기
          setStep(1);
          setEntering(true);
        } else if (response.message === '성별 값이 잘못되었습니다. (male/female)') {
          // 성별 값 오류 시 성별 선택 상태 초기화
          setGender("");
        }
      }
    } else if (step === 4) {
      // 준비 완료 단계에서 자동으로 다음 단계로 이동 (useEffect에서 처리)
    } else if (step === 5) {
      // 이미지 단계에서 시작하기 버튼 클릭
      // 인스타그램 ID와 성별 정보 저장
      localStorage.setItem('instagramId', instagram);
      localStorage.setItem('userStatus', 'incomplete');
      navigate('/questions');
    }
  };

  // 버튼 활성화 여부 확인
  const isButtonDisabled = () => {
    if (step === 1) return instagram.trim() === "";
    if (step === 3) return gender === "";
    return false;
  };

  // getButtonText 함수 수정 - 시간에 따라 버튼 텍스트 변경
  const getButtonText = () => {
    const now = new Date();
    const hour = now.getHours();
    
    if (step === 0) {
      if (hour >= 18 || hour < 10) 
      {
        return "결과보기";
      } else {
        return "시작하기";
      }
    } else if (step === 1) {
      return hour >= 18 || hour < 6 ? "결과보기" : "다음";
    } else if (step === 5) {
      return "시작하기";
    } else {
      return "다음";
    }
  };

  // 입력 필드 포커스 핸들러 개선
  const handleInputFocus = () => {
    // 입력 필드에 포커스가 갈 때 문서 전체 스크롤 잠금
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.top = `-${window.scrollY}px`;
    
    // 키보드가 열릴 때 컨테이너를 조정하기 위한 딜레이
    setTimeout(() => {
      // 현재 입력 필드로 스크롤
      const input = document.getElementById('instagram');
      if (input) {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
  };

  // 입력 필드가 포커스를 잃을 때 스크롤 잠금 해제를 위한 함수
  const handleInputBlur = () => {
    const scrollY = document.body.style.top;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.height = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
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
      
      {/* 시간 안내 모달 추가 */}
      {showTimeNoticeModal && 
        <TimeNoticeModal 
          onClose={() => setShowTimeNoticeModal(false)}
        />
      }
      
      {/* step에 따라 다른 화면 표시 */}
      {step === 0 ? (
        <HomeScreen
          animationData={animationData}
          showAlreadyLoggedInMessage={showAlreadyLoggedInMessage}
          setShowInfoModal={setShowInfoModal}
          handleButtonClick={handleButtonClick}
          getButtonText={getButtonText}
          keyboardHeight={keyboardHeight}
        />
      ) : (
        <>
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

          {/* 단계 1: 인스타그램 입력 */}
          <StepContainer entering={entering} hidden={step !== 1}>
            <InputContainer>
              <Label style={{paddingTop:'2rem',paddingBottom: '0',fontSize: '28px', fontWeight: 'bold', textAlign: 'left'}}>인스타그램 아이디</Label>
              <Label style={{opacity: '0.5'}}htmlFor="instagram">@없이 인스타그램 아이디로 로그인해주세요</Label>
              <Input
                id="instagram"
                type="text"
                value={instagram}
                onChange={handleInstagramChange}
                placeholder="아이디를 입력해주세요"
                autoComplete="off"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </InputContainer>
          </StepContainer>

          {/* 단계 2: 개인정보 수집동의 */}
          <StepContainer style={{alignItems: 'flex-start', gap: '0'}} entering={entering} hidden={step !== 2}>
            <Label style={{paddingTop:'2rem',fontSize: '28px', fontWeight: 'bold', textAlign: 'left'}}>개인정보 수집 동의</Label>
            <Label style={{opacity:'0.5',fontSize: '16px',  textAlign: 'left'}}>원활한 매칭을 위해<br />개인정보 수집 동의가 필요해요</Label>
          </StepContainer>

          {/* 단계 3: 성별 선택 */}
          <StepContainer style= {{paddingLeft: '1rem',alignItems: 'flex-start'}}entering={entering} hidden={step !== 3}>
            <h2>성별</h2>
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
          <Label style={{paddingTop:'2rem',fontSize: '28px', fontWeight: 'bold', textAlign: 'left'}}>질문에 대한 답을 <br />선택해주세요</Label>
          <Label style={{fontSize: '16px',  textAlign: 'left'}}>똑같은 답을 선택한 이성과<br />매칭이 이뤄집니다</Label>
          </StepContainer>

          {/* 버튼 컨테이너 */}
          {step !== 4 && (
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
        </>
      )}
    </HomeContainer>
  );
};

export default Home;