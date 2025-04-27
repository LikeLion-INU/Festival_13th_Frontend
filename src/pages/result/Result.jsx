import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// 기존 fadeIn 애니메이션 아래에 fadeOut 애니메이션 추가
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const CelebrationImage = styled.img`
  width: 60%;
  height: 60%;
  object-fit: cover;
  padding-top: 100px;
  padding-bottom: 81px;
`;

// 스타일 컴포넌트
const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: white;
  position: relative;
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

const MatchingText = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #28041d;
  text-align: center;
  animation: ${fadeIn} 2s ease forwards;

  margin-bottom: 30px;
`;

const MatchingInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  margin-top: 40px;
  margin-bottom: 30px;
`;

const InstagramId = styled.div`
  font-size: 28px;
  color: #28041d;
  background-color: #ffc3ec;
  padding: 8px 14px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  margin: 15px 0;
`;

const Message = styled.p`
  font-size: 16px;
  text-align: center;
  color: #28041d;
  margin: 10px 0;
  line-height: 1.5;
`;

// ButtonContainer 수정 - 불필요한 padding 제거
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  z-index: 10;
  padding-top: 600px;
`;

// ActionButton 수정
const ActionButton = styled.button`
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
`;

// PublicAccountNotice 스타일 컴포넌트 추가
const PublicAccountNotice = styled.div`
  width: 85%;
  max-width: 350px;
  position: fixed;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const NoticeTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #28041d;
  text-align: center;
  margin-bottom: 10px;
`;

// NoticeButton을 ActionButton과 동일한 스타일로 변경
const NoticeButton = styled.button`
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
  
  
  &:hover {
    background-color: #ffb5e0;
  }
  
  &:active {
    transform: scale(0.98);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const Result = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [step, setStep] = useState(1);
  const [matchResult, setMatchResult] = useState(null);
 // const [myInstagram, setMyInstagram] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  
  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const savedInstagram = localStorage.getItem('instagramId');
    if (!savedInstagram) {
      navigate('/');
      return;
    }
    
//    setMyInstagram(savedInstagram);
    
    // 매칭 결과 데이터 가져오기
    fetchMatchData(savedInstagram);
    
    // 텍스트 표시 타이밍
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  }, [navigate]);
  
  // 매칭 결과 가져오기 (임시 구현)
  const fetchMatchData = (instagramId) => {
    // API 통신 시뮬레이션
    setTimeout(() => {
      // 70% 확률로 매칭 성공
      const isSuccess = Math.random() > 0.3;
      
      if (isSuccess) {
        setMatchResult({
          success: true,
          matchedId: 'matched_user_' + Math.floor(Math.random() * 1000)
        });
      } else {
        setMatchResult({
          success: false
        });
      }
      
      setLoading(false);
    }, 1000);
  };
  
  // useEffect 내부에 자동 단계 전환 로직 수정
  useEffect(() => {
    if (!loading && matchResult && step === 1) {
      // 페이드아웃 후 다음 단계로 자동 전환
      const timer = setTimeout(() => {
        setFadeOut(true); // 페이드아웃 시작
        
        // 페이드아웃 애니메이션 후 다음 단계로 이동
        setTimeout(() => {
          if (matchResult.success) {
            setStep(2); // 인스타그램 공개 계정 안내 단계로
          } else {
            setStep(4); // 실패 결과 단계로
          }
          setFadeOut(false); // 페이드아웃 초기화
        }, 800); // 페이드아웃 시간
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [loading, matchResult, step]);
  
  // 버튼 클릭 시 단계 전환 함수 수정
  const handleNextStep = () => {
    setFadeOut(true); // 페이드아웃 시작
    
    // 페이드아웃 후 다음 단계로
    setTimeout(() => {
      setStep(3);
      setFadeOut(false); // 페이드아웃 초기화
    }, 800);
  };

  const renderContent = () => {
    if (loading) {
      return null;
    }
    
    switch (step) {
      case 1:
        return (
          <AnimatedContainer fadeOut={fadeOut} duration="1s">
            <MatchingText>
              {matchResult?.success 
                ? "매칭이 완료되었어요!" 
                : "매칭에 실패했어요..."}
            </MatchingText>
          </AnimatedContainer>
        );
      case 2:
        return (
          <AnimatedContainer fadeOut={fadeOut} duration="1s" delay="0.3s">
            <PublicAccountNotice>
              <NoticeTitle>인스타그램 계정이<br />공개 계정이어야 해요</NoticeTitle>
              <Message>공개 계정이면 매칭이 훨씬 쉬워요!</Message>

            
            </PublicAccountNotice>
            <ButtonContainer>
              <NoticeButton onClick={handleNextStep}>
                확인했어요
              </NoticeButton>
            </ButtonContainer>
          </AnimatedContainer>
        );
      case 3:
        return (
          <AnimatedContainer fadeOut={fadeOut} duration="1s" delay="0.3s">
            <MatchingInfo>
              <Message style={{fontSize: '32px', fontWeight: 'bold', color: '#000000'}}>축하해요!</Message>
              <CelebrationImage src="/images/celebration.png" />
              <InstagramId>@{matchResult.matchedId}</InstagramId>
              <Message>매칭된 사람과 멋쟁이 사자처럼 <br/>부스로 오시면 선물을 드려요!</Message>
              <Message style={{fontSize: '12px', fontWeight: 'bold', color: '#28041d',opacity: '0.5'}}>(선착순 한 커플)</Message>

            </MatchingInfo>
          </AnimatedContainer>
        );
      case 4:
        return (
          <AnimatedContainer fadeOut={fadeOut} duration="1s" delay="0.3s">
            <MatchingInfo>
              <Message>
                아쉽게도 이번에는 매칭된 상대가 없어요.<br/>
                다음 기회에 다시 참여해보세요!
              </Message>
            </MatchingInfo>
            <ButtonContainer>
              <ActionButton onClick={() => navigate('/')}>
                홈으로 돌아가기
              </ActionButton>
            </ButtonContainer>
          </AnimatedContainer>
        );
      default:
        return null;
    }
  };
  
  return (
    <ResultContainer>
      {showContent && renderContent()}
    </ResultContainer>
  );
};

export default Result;
