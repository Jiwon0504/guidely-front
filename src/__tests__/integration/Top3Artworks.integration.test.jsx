import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Top3Artworks from '../../components/Top3Artworks';

// 실제 fetch를 mock하여 실제 API 흐름을 시뮬레이션
global.fetch = jest.fn();

// config 모킹
jest.mock('../../api/config', () => ({
  ARTWORK_STATS: 'https://test-artwork-stats.example.com',
  EXHIBITION: 'https://test-exhibition.example.com'
}));

describe('Top3Artworks Integration Tests', () => {
  beforeEach(() => {
    fetch.mockClear();
    console.log = jest.fn();
    console.error = jest.fn();
    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('전체 API 플로우 테스트', () => {
    it('Top3 ID 가져오기 → 각 작품 상세정보 가져오기 → 렌더링 순서로 동작한다', async () => {
      const mockTop3Ids = [101, 102, 103];
      const mockArtworkDetails = [
        {
          id: 101,
          title: '통합테스트 작품 1',
          description: '첫 번째 작품 설명',
          image: 'https://example.com/artwork1.jpg'
        },
        {
          id: 102,
          title: '통합테스트 작품 2',
          description: '두 번째 작품 설명',
          image: 'https://example.com/artwork2.jpg'
        },
        {
          id: 103,
          title: '통합테스트 작품 3',
          description: '세 번째 작품 설명',
          image: 'https://example.com/artwork3.jpg'
        }
      ];

      // 1. Top3 ID API 응답 mock
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTop3Ids,
      });

      // 2. 각 작품 상세정보 API 응답 mock (3번 호출)
      mockArtworkDetails.forEach(artwork => {
        fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => artwork,
        });
      });

      render(<Top3Artworks />);

      // 로딩 상태 확인
      expect(screen.getByText('작품 정보를 불러오는 중...')).toBeInTheDocument();

      // 데이터 로드 완료 후 렌더링 확인
      await waitFor(() => {
        expect(screen.getByText('통합테스트 작품 1')).toBeInTheDocument();
        expect(screen.getByText('통합테스트 작품 2')).toBeInTheDocument();
        expect(screen.getByText('통합테스트 작품 3')).toBeInTheDocument();
      });

      // API 호출 순서 및 횟수 확인
      expect(fetch).toHaveBeenCalledTimes(4); // 1 + 3
      
      // 첫 번째 호출: Top3 IDs
      expect(fetch).toHaveBeenNthCalledWith(1, 
        expect.stringContaining('/api/stats/top3'),
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
      );

      // 2-4번째 호출: 각 작품 상세정보
      expect(fetch).toHaveBeenNthCalledWith(2,
        expect.stringContaining('/api/artworks/101'),
        expect.objectContaining({ method: 'GET' })
      );
      expect(fetch).toHaveBeenNthCalledWith(3,
        expect.stringContaining('/api/artworks/102'),
        expect.objectContaining({ method: 'GET' })
      );
      expect(fetch).toHaveBeenNthCalledWith(4,
        expect.stringContaining('/api/artworks/103'),
        expect.objectContaining({ method: 'GET' })
      );
    });

    it('Top3 API 실패 시 전체 플로우가 더미 데이터로 fallback 된다', async () => {
      // Top3 ID API 실패
      fetch.mockRejectedValueOnce(new Error('Top3 API failed'));

      render(<Top3Artworks />);

      // 더미 데이터로 렌더링되는지 확인
      await waitFor(() => {
        expect(screen.getByText('금관(백제)')).toBeInTheDocument();
        expect(screen.getByText('반가사유상')).toBeInTheDocument();
        expect(screen.getByText('청자 상감운학문 매병')).toBeInTheDocument();
      });

      // Top3 API만 호출되고 개별 작품 API는 호출되지 않음
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('API 실패 시 에러 상태를 표시하지 않고 더미 데이터를 표시한다', async () => {
      // Top3 ID API 성공, 개별 작품 API 실패
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [1, 2, 3],
      });

      // 모든 개별 작품 API 실패
      fetch.mockRejectedValueOnce(new Error('Artwork 1 failed'));
      fetch.mockRejectedValueOnce(new Error('Artwork 2 failed'));
      fetch.mockRejectedValueOnce(new Error('Artwork 3 failed'));

      render(<Top3Artworks />);

      // 개별 더미 데이터로 렌더링되는지 확인
      await waitFor(() => {
        expect(screen.getByText('작품 1')).toBeInTheDocument();
        expect(screen.getByText('작품 2')).toBeInTheDocument();
        expect(screen.getByText('작품 3')).toBeInTheDocument();
      });

      // 4번 호출 (1번 Top3 + 3번 개별 작품)
      expect(fetch).toHaveBeenCalledTimes(4);
    });

    it('일부 작품 상세정보 API 실패 시 해당 작품만 더미 데이터로 처리된다', async () => {
      const mockTop3Ids = [201, 202, 203];

      // Top3 ID API 성공
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTop3Ids,
      });

      // 첫 번째 작품: 성공
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 201,
          title: '성공한 작품',
          description: '성공 설명',
          image: 'success.jpg'
        }),
      });

      // 두 번째 작품: 실패
      fetch.mockRejectedValueOnce(new Error('Artwork 202 failed'));

      // 세 번째 작품: 성공
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 203,
          title: '또 다른 성공 작품',
          description: '또 다른 성공 설명',
          image: 'success2.jpg'
        }),
      });

      render(<Top3Artworks />);

      await waitFor(() => {
        // 성공한 작품들
        expect(screen.getByText('성공한 작품')).toBeInTheDocument();
        expect(screen.getByText('또 다른 성공 작품')).toBeInTheDocument();
        
        // 실패한 작품은 더미 데이터로 표시
        expect(screen.getByText('작품 202')).toBeInTheDocument();
      });
    });
  });

  describe('좋아요 기능 통합 테스트', () => {
    it('좋아요 버튼 클릭 시 실제 API 호출이 이루어진다', async () => {
      // 초기 데이터 로드 설정
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [1, 2, 3],
      });

      // 작품 상세정보 로드
      [1, 2, 3].forEach(id => {
        fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            id,
            title: `작품 ${id}`,
            description: `설명 ${id}`,
            image: `image${id}.jpg`
          }),
        });
      });

      render(<Top3Artworks />);

      await waitFor(() => {
        expect(screen.getByText('작품 1')).toBeInTheDocument();
      });

      // 좋아요 API 응답 설정
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: '좋아요 완료' }),
      });

      // 좋아요 버튼 클릭
      const likeButtons = screen.getAllByText('좋아요 ❤️');
      fireEvent.click(likeButtons[0]);

      // 좋아요 API 호출 확인
      await waitFor(() => {
        expect(fetch).toHaveBeenLastCalledWith(
          expect.stringContaining('/api/likes'),
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ artworkId: 1 })
          })
        );
      });

      expect(window.alert).toHaveBeenCalledWith('좋아요가 추가되었습니다!');
    });
  });

  describe('에러 복구 시나리오', () => {
    it('API 호출 횟수가 올바른지 확인한다', async () => {
      // 첫 번째 시도: 성공
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [1, 2, 3],
      });

      [1, 2, 3].forEach(id => {
        fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            id,
            title: `작품 ${id}`,
            description: `설명 ${id}`,
            image: `image${id}.jpg`
          }),
        });
      });

      render(<Top3Artworks />);

      // 성공적인 렌더링 확인
      await waitFor(() => {
        expect(screen.getByText('작품 1')).toBeInTheDocument();
        expect(screen.getByText('작품 2')).toBeInTheDocument();
        expect(screen.getByText('작품 3')).toBeInTheDocument();
      });

      // 총 4번 호출되었는지 확인 (1번 Top3 + 3번 개별 작품)
      expect(fetch).toHaveBeenCalledTimes(4);
    });
  });
}); 