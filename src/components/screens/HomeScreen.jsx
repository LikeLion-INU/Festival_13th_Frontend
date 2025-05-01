import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import AlreadyLoggedInMessage from "../message/AlreadyLoggedInMessage";
import { LottieContainer, TitleImage, ButtonContainer, StyledButton } from "../../pages/home/styles";

const HomeScreen = ({
  animationData,
  showAlreadyLoggedInMessage,
  setShowInfoModal,
  handleButtonClick,
  getButtonText,
  keyboardHeight
}) => {
  // 상태 변수 추가
  const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);
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
  
  return (
    <>
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

      {/* 이미 로그인했고 18시 이전인 경우 다른 메시지 표시 */}
      {showAlreadyLoggedInMessage ? (
        <AlreadyLoggedInMessage onShowModal={() => setShowInfoModal(true)} />
      ) : (
        <TitleImage src="/images/title.png" alt="타이틀 이미지" />
      )}

      {/* 버튼 컨테이너 - 이미 참가했을 경우 버튼 숨김 */}
      {!showAlreadyLoggedInMessage && (
        <ButtonContainer step={0} keyboardHeight={keyboardHeight}>
          <StyledButton
            step={0}
            onClick={handleButtonClick}
          >
            {getButtonText()}
          </StyledButton>
        </ButtonContainer>
      )}
    </>
  );
};

export default HomeScreen; 