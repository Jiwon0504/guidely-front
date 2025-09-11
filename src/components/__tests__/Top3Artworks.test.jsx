import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Top3Artworks from '../Top3Artworks';
import * as artworkApi from '../../api/artworkStatisticsApi';

// API 모듈 mock
jest.mock('../../api/artworkStatisticsApi');
jest.mock('../../api/config', () => ({
  ARTWORK_STATS: 'https://test-artwork-stats.example.com',
  EXHIBITION: 'https://test-exhibition.example.com'
}));

// console methods mock
const originalAlert = window.alert;
beforeAll(() => {
  window.alert = jest.fn();
});

afterAll(() => {
  window.alert = originalAlert;
});

describe('Top3Artworks Component', () => {
  const mockArtworks = [
    {
      id: 1,
      title: '테스트 작품 1',
      description: '테스트 설명 1',
      image: 'https://example.com/image1.jpg'
    },
    {
      id: 2,
      title: '테스트 작품 2',
      description: '테스트 설명 2',
      image: 'https://example.com/image2.jpg'
    },
    {
      id: 3,
      title: '테스트 작품 3',
      description: '테스트 설명 3',
      image: 'https://example.com/image3.jpg'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('로딩 상태', () => {
    it('로딩 중일 때 로딩 메시지를 표시한다', async () => {
      // API 호출이 영원히 pending되도록 설정
      artworkApi.fetchTop3ArtworksWithDetails.mockImplementation(
        () => new Promise(() => {}) // never resolves
      );

      render(<Top3Artworks />);

      expect(screen.getByText('인기 작품 TOP 3')).toBeInTheDocument();
      expect(screen.getByText('작품 정보를 불러오는 중...')).toBeInTheDocument();
    });
  });

  describe('성공적인 데이터 로드', () => {
    beforeEach(() => {
      artworkApi.fetchTop3ArtworksWithDetails.mockResolvedValue(mockArtworks);
    });

    it('작품 데이터를 성공적으로 렌더링한다', async () => {
      render(<Top3Artworks />);

      await waitFor(() => {
        expect(screen.getByText('테스트 작품 1')).toBeInTheDocument();
        expect(screen.getByText('테스트 작품 2')).toBeInTheDocument();
        expect(screen.getByText('테스트 작품 3')).toBeInTheDocument();
      });

      expect(screen.getByText('테스트 설명 1')).toBeInTheDocument();
      expect(screen.getByText('테스트 설명 2')).toBeInTheDocument();
      expect(screen.getByText('테스트 설명 3')).toBeInTheDocument();
    });

    it('순위 배지를 올바르게 표시한다', async () => {
      render(<Top3Artworks />);

      await waitFor(() => {
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
      });
    });

    it('작품 이미지를 올바르게 표시한다', async () => {
      render(<Top3Artworks />);

      await waitFor(() => {
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(3);
        expect(images[0]).toHaveAttribute('src', 'https://example.com/image1.jpg');
        expect(images[1]).toHaveAttribute('src', 'https://example.com/image2.jpg');
        expect(images[2]).toHaveAttribute('src', 'https://example.com/image3.jpg');
      });
    });

    it('좋아요 버튼들이 표시된다', async () => {
      render(<Top3Artworks />);

      await waitFor(() => {
        const likeButtons = screen.getAllByText('좋아요 ❤️');
        expect(likeButtons).toHaveLength(3);
      });
    });
  });

  describe('에러 상태', () => {
    beforeEach(() => {
      artworkApi.fetchTop3ArtworksWithDetails.mockRejectedValue(
        new Error('API Error')
      );
    });

    it('에러 메시지를 표시한다', async () => {
      render(<Top3Artworks />);

      await waitFor(() => {
        expect(screen.getByText('작품 정보를 불러오는데 실패했습니다.')).toBeInTheDocument();
      });
    });

    it('다시 시도 버튼을 표시한다', async () => {
      render(<Top3Artworks />);

      await waitFor(() => {
        expect(screen.getByText('다시 시도')).toBeInTheDocument();
      });
    });

    it('다시 시도 버튼 클릭 시 API를 다시 호출한다', async () => {
      render(<Top3Artworks />);

      await waitFor(() => {
        expect(screen.getByText('다시 시도')).toBeInTheDocument();
      });

      // 두 번째 호출에서는 성공하도록 설정
      artworkApi.fetchTop3ArtworksWithDetails.mockResolvedValueOnce(mockArtworks);

      fireEvent.click(screen.getByText('다시 시도'));

      expect(artworkApi.fetchTop3ArtworksWithDetails).toHaveBeenCalledTimes(2);
    });
  });

  describe('좋아요 기능', () => {
    beforeEach(() => {
      artworkApi.fetchTop3ArtworksWithDetails.mockResolvedValue(mockArtworks);
      artworkApi.likeArtwork.mockResolvedValue({ success: true });
    });

    it('좋아요 버튼 클릭 시 API를 호출한다', async () => {
      render(<Top3Artworks />);

      await waitFor(() => {
        expect(screen.getByText('테스트 작품 1')).toBeInTheDocument();
      });

      const likeButtons = screen.getAllByText('좋아요 ❤️');
      fireEvent.click(likeButtons[0]);

      await waitFor(() => {
        expect(artworkApi.likeArtwork).toHaveBeenCalledWith(1);
      });

      expect(window.alert).toHaveBeenCalledWith('좋아요가 추가되었습니다!');
    });

    it('좋아요 API 실패 시 에러 메시지를 표시한다', async () => {
      artworkApi.likeArtwork.mockRejectedValueOnce(new Error('Like failed'));

      render(<Top3Artworks />);

      await waitFor(() => {
        expect(screen.getByText('테스트 작품 1')).toBeInTheDocument();
      });

      const likeButtons = screen.getAllByText('좋아요 ❤️');
      fireEvent.click(likeButtons[0]);

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('좋아요 처리 중 오류가 발생했습니다.');
      });
    });
  });

  describe('이미지 오류 처리', () => {
    it('이미지 로드 실패 시 기본 이미지로 교체된다', async () => {
      const artworksWithoutImage = [
        {
          id: 1,
          title: '이미지 없는 작품',
          description: '이미지가 없는 작품입니다',
          image: 'invalid-image-url.jpg'
        }
      ];

      artworkApi.fetchTop3ArtworksWithDetails.mockResolvedValue(artworksWithoutImage);

      render(<Top3Artworks />);

      await waitFor(() => {
        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument();
        
        // 이미지 에러 이벤트 시뮬레이션
        fireEvent.error(image);
        
        expect(image).toHaveAttribute('src', 'https://via.placeholder.com/300x200?text=No+Image');
      });
    });
  });

  describe('데이터 필드 fallback', () => {
    it('제목이 없을 때 대체 텍스트를 표시한다', async () => {
      const artworksWithoutTitle = [
        {
          id: 1,
          name: '대체 이름',
          description: '설명'
        }
      ];

      artworkApi.fetchTop3ArtworksWithDetails.mockResolvedValue(artworksWithoutTitle);

      render(<Top3Artworks />);

      await waitFor(() => {
        expect(screen.getByText('대체 이름')).toBeInTheDocument();
      });
    });

    it('제목과 이름이 모두 없을 때 기본 텍스트를 표시한다', async () => {
      const artworksWithoutTitleAndName = [
        {
          id: 1,
          description: '설명만 있는 작품'
        }
      ];

      artworkApi.fetchTop3ArtworksWithDetails.mockResolvedValue(artworksWithoutTitleAndName);

      render(<Top3Artworks />);

      await waitFor(() => {
        expect(screen.getByText('제목 없음')).toBeInTheDocument();
      });
    });

    it('설명이 없을 때 기본 텍스트를 표시한다', async () => {
      const artworksWithoutDescription = [
        {
          id: 1,
          title: '제목만 있는 작품'
        }
      ];

      artworkApi.fetchTop3ArtworksWithDetails.mockResolvedValue(artworksWithoutDescription);

      render(<Top3Artworks />);

      await waitFor(() => {
        expect(screen.getByText('설명이 없습니다.')).toBeInTheDocument();
      });
    });
  });

  describe('CSS 클래스', () => {
    beforeEach(() => {
      artworkApi.fetchTop3ArtworksWithDetails.mockResolvedValue(mockArtworks);
    });

    it('순위별 CSS 클래스가 올바르게 적용된다', async () => {
      render(<Top3Artworks />);

      await waitFor(() => {
        const artworkCards = document.querySelectorAll('.artwork-card');
        expect(artworkCards[0]).toHaveClass('rank-1');
        expect(artworkCards[1]).toHaveClass('rank-2');
        expect(artworkCards[2]).toHaveClass('rank-3');
      });
    });
  });
}); 