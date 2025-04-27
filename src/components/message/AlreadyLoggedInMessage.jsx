import React from 'react';

const AlreadyLoggedInMessage = ({ onShowModal }) => {
  return (
    <div style={{ 
      position: 'absolute', 
      top: '25%', 
      zIndex: 5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      opacity: 1,
    }}>
      <h1 style={{ 
        fontSize: '32px', 
        fontWeight: 'bold', 
        textAlign: 'center',
        marginBottom: '15px',
        color: '#28041d'
      }}>
        매칭 결과는 <br />오후 6시에<br />확인할 수 있어요
      </h1>
      <button 
        onClick={onShowModal}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '16px',
          textDecoration: 'underline',
          color: '#28041d',
          cursor: 'pointer',
          padding: '5px 10px'
        }}
      >
        확인하는 법
      </button>
    </div>
  );
};

export default AlreadyLoggedInMessage; 