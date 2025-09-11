import { 
  fetchTop3ArtworkIds, 
  fetchArtworkDetails, 
  fetchTop3ArtworksWithDetails, 
  likeArtwork 
} from '../artworkStatisticsApi';

// config 모킹
jest.mock('../config', () => ({
  ARTWORK_STATS: 'https://test-artwork-stats.example.com',
  EXHIBITION: 'https://test-exhibition.example.com'
}));

// fetch mock
global.fetch = jest.fn();

describe('artworkStatisticsApi', () => {
  beforeEach(() => {
    fetch.mockClear();
    console.log = jest.fn(); // console.log mock
    console.error = jest.fn(); // console.error mock
  });

  describe('fetchTop3ArtworkIds', () => {
    it('성공적으로 Top3 작품 ID를 가져온다', async () => {
      const mockIds = [1, 2, 3];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockIds,
      });

      const result = await fetchTop3ArtworkIds();

      expect(fetch).toHaveBeenCalledWith(
        'https://test-artwork-stats.example.com/api/stats/top3',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      expect(result).toEqual(mockIds);
      expect(console.log).toHaveBeenCalledWith('Top3 작품 ID API 응답:', mockIds);
    });

    it('API 오류 시 더미 데이터를 반환한다', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchTop3ArtworkIds();

      expect(result).toEqual([1, 2, 3]);
      expect(console.error).toHaveBeenCalledWith(
        'Top3 작품 ID를 가져오는 중 오류 발생:',
        expect.any(Error)
      );
    });

    it('HTTP 오류 상태 시 에러를 던진다', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const result = await fetchTop3ArtworkIds();

      expect(result).toEqual([1, 2, 3]);
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('fetchArtworkDetails', () => {
    it('성공적으로 작품 상세 정보를 가져온다', async () => {
      const mockArtwork = {
        id: 1,
        title: '테스트 작품',
        description: '테스트 설명',
        image: 'test-image.jpg'
      };
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockArtwork,
      });

      const result = await fetchArtworkDetails(1);

      expect(fetch).toHaveBeenCalledWith(
        'https://test-exhibition.example.com/api/artworks/1',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      expect(result).toEqual(mockArtwork);
      expect(console.log).toHaveBeenCalledWith('작품 1 상세 정보 API 응답:', mockArtwork);
    });

    it('API 오류 시 더미 데이터를 반환한다', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchArtworkDetails(1);

      expect(result).toEqual({
        id: 1,
        title: '작품 1',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        description: '작품 1의 설명',
      });
      expect(console.error).toHaveBeenCalledWith(
        '작품 1 상세 정보를 가져오는 중 오류 발생:',
        expect.any(Error)
      );
    });
  });

  describe('fetchTop3ArtworksWithDetails', () => {
    it('성공적으로 Top3 작품의 완전한 정보를 가져온다', async () => {
      const mockIds = [1, 2, 3];
      const mockArtworks = [
        { id: 1, title: '작품 1', description: '설명 1', image: 'image1.jpg' },
        { id: 2, title: '작품 2', description: '설명 2', image: 'image2.jpg' },
        { id: 3, title: '작품 3', description: '설명 3', image: 'image3.jpg' }
      ];

      // 첫 번째 fetch: Top3 IDs
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockIds,
      });

      // 나머지 fetch들: 각 작품 상세 정보
      mockArtworks.forEach(artwork => {
        fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => artwork,
        });
      });

      const result = await fetchTop3ArtworksWithDetails();

      expect(fetch).toHaveBeenCalledTimes(4); // 1번 + 3번
      expect(result).toEqual(mockArtworks);
      expect(console.log).toHaveBeenCalledWith('Top3 작품 완전한 정보:', mockArtworks);
    });

    it('API 오류 시 더미 데이터를 반환한다', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchTop3ArtworksWithDetails();

      expect(result).toHaveLength(3);
      expect(result[0]).toHaveProperty('title', '금관(백제)');
      expect(result[1]).toHaveProperty('title', '반가사유상');
      expect(result[2]).toHaveProperty('title', '청자 상감운학문 매병');
      expect(console.error).toHaveBeenCalledWith(
        'Top3 작품 완전한 정보를 가져오는 중 오류 발생:',
        expect.any(Error)
      );
    });

    it('Top3 ID는 성공하지만 개별 작품 API 실패 시 각각 더미 데이터를 반환한다', async () => {
      // Top3 ID API 성공
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [1, 2, 3],
      });

      // 모든 개별 작품 API 실패
      fetch.mockRejectedValueOnce(new Error('Artwork 1 failed'));
      fetch.mockRejectedValueOnce(new Error('Artwork 2 failed'));
      fetch.mockRejectedValueOnce(new Error('Artwork 3 failed'));

      const result = await fetchTop3ArtworksWithDetails();

      expect(result).toHaveLength(3);
      expect(result[0]).toHaveProperty('title', '작품 1');
      expect(result[1]).toHaveProperty('title', '작품 2');
      expect(result[2]).toHaveProperty('title', '작품 3');
    });
  });

  describe('likeArtwork', () => {
    it('성공적으로 작품 좋아요를 추가한다', async () => {
      const mockResponse = { success: true, message: '좋아요 추가됨' };
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await likeArtwork(1);

      expect(fetch).toHaveBeenCalledWith(
        'https://test-artwork-stats.example.com/api/likes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ artworkId: 1 }),
        }
      );
      expect(result).toEqual(mockResponse);
      expect(console.log).toHaveBeenCalledWith('작품 좋아요 API 응답:', mockResponse);
    });

    it('API 오류 시 에러를 던진다', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(likeArtwork(1)).rejects.toThrow('Network error');
      expect(console.error).toHaveBeenCalledWith(
        '작품 좋아요 중 오류 발생:',
        expect.any(Error)
      );
    });

    it('HTTP 오류 상태 시 에러를 던진다', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(likeArtwork(1)).rejects.toThrow('HTTP error! status: 500');
    });
  });
}); 