import React, { useState } from 'react';

const InfoModal = ({ onClose }) => {
  // 복사 성공 메시지 상태 추가
  const [showCopySuccess] = useState(false);
  
  // 클립보드에 텍스트 복사하는 향상된 함수
  const copyToClipboard = (text) => {
    // 모던 Clipboard API 지원 확인
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          // 성공 메시지 표시
          alert("클립보드에 복사되었습니다: " + text);
        })
        .catch((err) => {
          console.error("클립보드 복사 실패:", err);
          // 대체 방법 사용
          fallbackCopyToClipboard(text);
        });
    } else {
      // API를 지원하지 않는 경우 대체 방법 사용
      fallbackCopyToClipboard(text);
    }
  };

  // 하위 호환성을 위한 대체 복사 방법
  const fallbackCopyToClipboard = (text) => {
    try {
      // 임시 textarea 요소 생성
      const textArea = document.createElement("textarea");
      textArea.value = text;
      
      // 화면에서 보이지 않게 스타일 지정
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.width = "2em";
      textArea.style.height = "2em";
      textArea.style.padding = "0";
      textArea.style.border = "none";
      textArea.style.outline = "none";
      textArea.style.boxShadow = "none";
      textArea.style.background = "transparent";
      
      document.body.appendChild(textArea);
      
      // iOS에서는 선택 범위 지정 필요
      if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        textArea.contentEditable = true;
        textArea.readOnly = false;
        
        const range = document.createRange();
        range.selectNodeContents(textArea);
        
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.setSelectionRange(0, 999999);
      } else {
        textArea.select();
      }
      
      // 복사 명령 실행
      const successful = document.execCommand("copy");
      
      if (successful) {
        alert("클립보드에 복사되었습니다: " + text);
      } else {
        alert("직접 복사해주세요: " + text);
      }
      
      document.body.removeChild(textArea);
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
      alert("직접 복사해주세요: " + text);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          maxWidth: '80%',
          maxHeight: '70%',
          overflow: 'auto',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* 복사 성공 메시지 */}
        {showCopySuccess && (
          <div style={{
            position: 'absolute',
            top: '50px', // 모달 외부 위쪽에 표시
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '20px',
            fontSize: '14px',
            zIndex: 1010, // 모달의 zIndex보다 높게 설정
          }}>
            복사되었습니다!
          </div>
        )}
        
        <h2 style={{
          fontSize: '24px', 
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          매칭 결과 확인하는 법
        </h2>
        
        <div style={{
          padding: '10px',
          backgroundColor: '#FFE0F4',
          borderRadius: '12px',
          marginBottom: '15px'
        }}>
          <ol style={{ paddingLeft: '25px' }}>
            <li style={{ margin: '10px 0' }}>
              멋쟁이 사자처럼 인스타 팔로우 {' '}
              <div style={{
                display: 'inline-block',
                cursor: 'pointer',
                margin: '0 5px',
                verticalAlign: 'middle'
              }}>
                <img 
                  src="/images/likelion.png" 
                  alt="@likelion_inu" 
                  onClick={() => copyToClipboard('likelion_inu')}
                  style={{
                    height: '30px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    border: 'none'
                  }}
                />
              </div>
            </li>
            <li style={{ margin: '10px 0' }}>18시에 인스타 스토리 확인</li>
            <li style={{ margin: '10px 0' }}>QR코드 접속 후 결과 확인!</li>
          </ol>
          
          <ul style={{ 
            paddingLeft: '25px', 
            listStyleType: 'disc',
            fontSize: '14px',
            color: '#555' 
          }}>
            <li style={{ margin: '8px 0' }}>인스타그램 공개 계정이면 매칭이 훨씬 쉬워요</li>
            <li style={{ margin: '8px 0' }}>다음날 오전 10시까지 확인이 가능해요</li>
          </ul>
        </div>
        
        <button 
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#FFC3EC',
            color: 'white',
            borderRadius: '10px',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px'
          }}
          onClick={onClose}
        >
          <span style={{color: "#28041d"}}>확인</span>
        </button>
      </div>
    </div>
  );
};

export default InfoModal; 