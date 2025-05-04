import React from 'react';

const TimeNoticeModal = ({ onClose }) => {
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
          paddingTop: '50px',
          width: '334px',
          height: '284px',
          overflow: 'auto',
          position: 'relative',
    
        }}
        onClick={e => e.stopPropagation()}
      >
        <h2 style={{
          fontSize: '24px', 
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '20px',
          color: '#333'
        }}>
          지금은 매칭<br />시간이 아니에요
        </h2>
        
        <p style={{
          textAlign: 'center',
          fontSize: '16px',
          margin: '20px 0',
          color: '#666'
        }}>
          다음 날 오후 12시 이후에<br />다시 시도해 보세요!
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          <button 
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFC3EC',
              color: '#28041d',
              borderRadius: '10px',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
            }}
            onClick={onClose}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeNoticeModal; 