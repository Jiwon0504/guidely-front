import React, { useState, useEffect } from 'react';
import { fetchTop3ArtworksWithDetails, likeArtwork } from '../api/artworkStatisticsApi';
import './Top3Artworks.css';

const Top3Artworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTop3Artworks();
  }, []);

  const loadTop3Artworks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTop3ArtworksWithDetails();
      setArtworks(data);
    } catch (err) {
      setError('작품 정보를 불러오는데 실패했습니다.');
      console.error('Error loading artworks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (artworkId) => {
    try {
      await likeArtwork(artworkId);
      alert('좋아요가 추가되었습니다!');
    } catch (err) {
      console.error('좋아요 실패:', err);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="top3-artworks-container">
        <h2 className="top3-title">인기 작품 TOP 3</h2>
        <div className="loading">작품 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="top3-artworks-container">
        <h2 className="top3-title">인기 작품 TOP 3</h2>
        <div className="error">{error}</div>
        <button onClick={loadTop3Artworks} className="retry-button">
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="top3-artworks-container">
      <h2 className="top3-title">인기 작품 TOP 3</h2>
      <div className="artworks-grid">
        {artworks.map((artwork, index) => (
          <div key={artwork.id} className={`artwork-card rank-${index + 1}`}>
            <div className="rank-badge">{index + 1}</div>
            <div className="artwork-image-container">
              <img 
                src={artwork.image || artwork.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
                alt={artwork.title || artwork.name || '작품 이미지'}
                className="artwork-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />
            </div>
            <div className="artwork-info">
              <h3 className="artwork-title">
                {artwork.title || artwork.name || '제목 없음'}
              </h3>
              <p className="artwork-description">
                {artwork.description || artwork.content || '설명이 없습니다.'}
              </p>
              <button 
                className="like-button"
                onClick={() => handleLike(artwork.id)}
              >
                좋아요 ❤️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top3Artworks; 