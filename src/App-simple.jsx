import React from 'react';

export default function App() {
  return (
    <div style={{ 
      backgroundColor: 'red', 
      color: 'white', 
      padding: '20px',
      fontSize: '24px',
      minHeight: '100vh'
    }}>
      <h1>React 앱 테스트 - 이게 보이면 React는 정상!</h1>
      <p>현재 시간: {new Date().toLocaleString()}</p>
      <button onClick={() => alert('버튼 클릭!')}>
        클릭 테스트
      </button>
    </div>
  );
}
