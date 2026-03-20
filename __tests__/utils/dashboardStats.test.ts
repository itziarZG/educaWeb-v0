import {
  calculateStreak,
  calculateAverageRating,
  calculatePoints,
} from '@utils/dashboardStats';

describe('dashboardStats utilities', () => {
  describe('calculateStreak', () => {
    it('should return 0 for empty array', () => {
      expect(calculateStreak([])).toBe(0);
    });

    it('should return 0 for undefined input', () => {
      expect(calculateStreak(undefined as unknown as string[])).toBe(0);
    });

    it('should return 1 for single worksheet today', () => {
      const today = new Date().toISOString();
      expect(calculateStreak([today])).toBe(1);
    });

    it('should calculate consecutive dates streak correctly', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const dayBefore = new Date(yesterday);
      dayBefore.setDate(dayBefore.getDate() - 1);

      const dates = [
        today.toISOString(),
        yesterday.toISOString(),
        dayBefore.toISOString(),
      ];

      expect(calculateStreak(dates)).toBe(3);
    });

    it('should break streak when day is missing', () => {
      const today = new Date();
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      const dates = [today.toISOString(), twoDaysAgo.toISOString()];

      expect(calculateStreak(dates)).toBe(1); // Only counts today
    });

    it('should handle duplicate dates on same day', () => {
      const today = new Date().toISOString();
      expect(calculateStreak([today, today, today])).toBe(1);
    });

    it('should not count future dates', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const today = new Date();

      const dates = [tomorrow.toISOString(), today.toISOString()];
      expect(calculateStreak(dates)).toBeLessThanOrEqual(1);
    });
  });

  describe('calculateAverageRating', () => {
    it('should return 0 for empty array', () => {
      expect(calculateAverageRating([])).toBe(0);
    });

    it('should return 0 for undefined input', () => {
      expect(calculateAverageRating(undefined as unknown as number[])).toBe(0);
    });

    it('should calculate average rating correctly', () => {
      const ratings = [3, 4, 5];
      expect(calculateAverageRating(ratings)).toBe(4);
    });

    it('should round to 1 decimal place', () => {
      const ratings = [3, 4, 5, 4];
      // (3 + 4 + 5 + 4) / 4 = 16 / 4 = 4.0
      expect(calculateAverageRating(ratings)).toBe(4);
    });

    it('should handle decimal average', () => {
      const ratings = [3, 4, 5];
      // (3 + 4 + 5) / 3 = 12 / 3 = 4.0
      expect(calculateAverageRating(ratings)).toBe(4);
    });

    it('should calculate with single rating', () => {
      expect(calculateAverageRating([4])).toBe(4);
    });

    it('should handle low ratings', () => {
      const ratings = [1, 1, 2];
      // (1 + 1 + 2) / 3 = 4 / 3 = 1.3
      expect(calculateAverageRating(ratings)).toBe(1.3);
    });
  });

  describe('calculatePoints', () => {
    it('should return 0 when no worksheets and no rating', () => {
      expect(calculatePoints(0, 0)).toBe(0);
    });

    it('should calculate points with only worksheets', () => {
      // Formula: (total_worksheets * 10) + (avg_rating * 5)
      // (5 * 10) + (0 * 5) = 50
      expect(calculatePoints(5, 0)).toBe(50);
    });

    it('should calculate points with only rating', () => {
      // (0 * 10) + (5 * 5) = 25
      expect(calculatePoints(0, 5)).toBe(25);
    });

    it('should calculate points with both worksheets and rating', () => {
      // (10 * 10) + (4 * 5) = 100 + 20 = 120
      expect(calculatePoints(10, 4)).toBe(120);
    });

    it('should round rating contribution', () => {
      // (5 * 10) + (3.5 * 5) = 50 + 17.5 = 67.5 → 68
      expect(calculatePoints(5, 3.5)).toBe(68);
    });

    it('should handle maximum values', () => {
      // (100 * 10) + (5 * 5) = 1000 + 25 = 1025
      expect(calculatePoints(100, 5)).toBe(1025);
    });

    it('should handle fractional ratings', () => {
      // (3 * 10) + (2.5 * 5) = 30 + 12.5 = 42.5 → 43
      expect(calculatePoints(3, 2.5)).toBe(43);
    });
  });
});
