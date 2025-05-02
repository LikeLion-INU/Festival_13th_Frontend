import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { getMatchingResult } from '../../api/matching';

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

const ResultImage = styled.img`
  width: 60%;
  height: 60%;
  object-fit: cover;
  padding-top: 80px;
  padding-bottom: 55px;
`;


// 스타일 컴포넌트
const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  box-sizing: border-box;
`;

// 애니메이션이 적용될 컨테이너 추가
const AnimatedContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;

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
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

// InstagramId 컴포넌트 수정 - 클릭 시 복사 기능 추가
const InstagramIdContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
  cursor: pointer;
  width: 100%;
`;

const CopyIcon = styled.img`
    position: absolute;
    top: -30px;
    right: 80px;
    width: 95px;
    height: 30px;
`;

const InstagramId = styled.div`
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



const Message = styled.p`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: #28041d;
  margin: 10px 0;
  line-height: 1.5;
`;

// ButtonContainer 수정 - 불필요한 padding 제거
const ButtonContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  position: absolute;  // relative에서 absolute로 변경
  bottom: 50px;        // 화면 아래에서부터의 거리 설정
  box-sizing: border-box;
  z-index: 10;
`;



// PublicAccountNotice 스타일 컴포넌트 추가
const PublicAccountNotice = styled.div`

  width: 100%;
  max-width: 350px;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  position: fixed;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const NoticeTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #28041d;
  text-align: center;
  margin-bottom: 10px;
`;

// NoticeButton을 ActionButton과 동일한 스타일로 변경
const NoticeButton = styled.button`
  width: 100%;
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
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [step, setStep] = useState(1);
  const [matchResult, setMatchResult] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [error, setError] = useState("");
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const copyTimeoutRef = useRef(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // 함수를 useEffect 내부로 이동
    const fetchMatchResult = async () => {
      try {
        const data = await getMatchingResult();
        
        if (data.message === "로그인된 사용자가 없습니다.") {
          // 로그인 필요 - 홈으로 이동
          setError("로그인이 필요합니다");
          setTimeout(() => {
            navigate('/');
          }, 1500);
          return;
        }
        
        // 매칭 결과 설정
        setMatchResult({
          success: !!data.matchedInstarId,
          matchedId: data.matchedInstarId, 
          myId: data.yourInstarId 
        });
        
        setLoading(false);
      } catch (error) {
        console.error('매칭 결과 조회 중 오류2:', error);
        setError("서버 연결에 실패했습니다2");
        setLoading(false);
        
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    };

    // 페이지 로드 시 매칭 결과 가져오기
    fetchMatchResult();
    
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  }, [navigate]); // navigate만 의존성으로 유지
  
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

  // 클립보드 복사 함수 개선
  const copyToClipboard = (text) => {
    // 이전 타임아웃 제거
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }
    
    // 복사 시도
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          // 성공 시 표시 - 이미 showCopyMessage가 false인 경우에만 설정
          setShowCopyMessage(true);
          
          // 3초 후 메시지 제거
          copyTimeoutRef.current = setTimeout(() => {
            setShowCopyMessage(false);
          }, 3000);
        })
        .catch(err => {
          console.error('클립보드 복사 실패:', err);
          fallbackCopyToClipboard(text);
        });
    } else {
      fallbackCopyToClipboard(text);
    }
  };
  
  // 대체 복사 방법 (기존 코드 유지하되 약간 개선)
  const fallbackCopyToClipboard = (text) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      
      // 스타일 동일하게 유지
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = '0';
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      
      document.body.appendChild(textArea);
      textArea.select();
      
      const successful = document.execCommand('copy');
      if (successful) {
        setShowCopyMessage(true);
        
        // 3초 후 메시지 제거
        copyTimeoutRef.current = setTimeout(() => {
          setShowCopyMessage(false);
        }, 3000);
      }
      
      document.body.removeChild(textArea);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };
  
  // 컴포넌트 언마운트 시 타임아웃 정리
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);
  
  const renderContent = () => {
    if (loading) {
      return (
        <AnimatedContainer fadeOut={fadeOut} duration="1s">
          <MatchingText>결과를 가져오는 중...</MatchingText>
        </AnimatedContainer>
      );
    }
    
    if (error) {
      return (
        <AnimatedContainer fadeOut={fadeOut} duration="1s">
          <MatchingText>{error}</MatchingText>
          <Message>홈 화면으로 이동합니다...</Message>
        </AnimatedContainer>
      );
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
              <Message style={{fontSize: '32px', fontWeight: '700', color: '#000000'}}>축하해요!</Message>
              <ResultImage src="/images/celebration.png" />

              <InstagramIdContainer onClick={() => copyToClipboard(`@${matchResult.matchedId}`)}>
                {showCopyMessage ? (
                  <CopyIcon 
                    src="/images/copysuccess.png"
                    alt="복사 완료"
                  />
                ) : (
                  <CopyIcon 
                    src="/images/copymessage.png"
                    alt="복사하기"
                  />
                )}
                <InstagramId>@{matchResult.matchedId}</InstagramId>
              </InstagramIdContainer>
              <Message>매칭된 사람과 멋쟁이 사자처럼 <br/>부스로 오시면 선물을 드려요!</Message>
              <Message style={{fontSize: '12px', fontWeight: 'bold', color: '#28041d',opacity: '0.5'}}>(선착순 한 커플)</Message>

            </MatchingInfo>
          </AnimatedContainer>
        );
      case 4:
        return (
          <AnimatedContainer fadeOut={fadeOut} duration="1s" delay="0.3s">
            <MatchingInfo>
              <Message style={{fontSize: '32px', fontWeight: '700', color: '#000000'}}>상대를  <br/> 찾지 못했어요.. </Message>
              <ResultImage style={{width: "40%"}}src="/images/fail.png" />
              <ResultImage style={{paddingTop: "0px", width: '90%'}}src="/images/failmessage.png" />

            </MatchingInfo>
            
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
