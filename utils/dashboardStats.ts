/**
 * Calculate consecutive days streak from worksheet creation dates
 * @param dates Array of ISO date strings
 * @returns Number of consecutive days from today going backwards
 */
export function calculateStreak(dates: string[]): number {
  if (!dates || dates.length === 0) return 0;

  // Parse dates and convert to local dates (without time)
  const uniqueDates = new Set(
    dates.map((date) => {
      const d = new Date(date);
      return d.toISOString().split('T')[0];
    })
  );

  // Sort dates in descending order
  const sortedDates = Array.from(uniqueDates).sort().reverse();

  // Get today's date
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  let streak = 0;
  // eslint-disable-next-line prefer-const
  let currentDate = new Date(todayStr);

  for (const dateStr of sortedDates) {
    const checkDate = dateStr;
    const expectedDate = currentDate.toISOString().split('T')[0];

    if (checkDate === expectedDate) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (checkDate < expectedDate) {
      // Gap found, break the streak
      break;
    }
  }

  return streak;
}

/**
 * Calculate average rating from feedback ratings
 * @param ratings Array of ratings (1-5)
 * @returns Average rating rounded to 1 decimal place
 */
export function calculateAverageRating(ratings: number[]): number {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
}

/**
 * Calculate total points based on worksheets and average rating
 * Formula: (total_worksheets * 10) + (avg_rating * 5)
 * @param totalWorksheets Number of worksheets
 * @param avgRating Average rating
 * @returns Total points
 */
export function calculatePoints(
  totalWorksheets: number,
  avgRating: number
): number {
  return totalWorksheets * 10 + Math.round(avgRating * 5);
}
