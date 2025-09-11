import React from 'react';
import Top3Artworks from '../components/Top3Artworks';

const Top3Page = () => {
  return (
    <div className="top3-page">
      <div className="page-header" style={{
        textAlign: 'center',
        padding: '20px 0',
        marginBottom: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px'
      }}>
        <h1 style={{ margin: '0 0 10px 0', color: '#333' }}>인기 작품</h1>
        <p style={{ margin: 0, color: '#666' }}>가장 많은 사랑을 받은 작품들을 확인해보세요</p>
      </div>
      <Top3Artworks />
    </div>
  );
};

export default Top3Page; 