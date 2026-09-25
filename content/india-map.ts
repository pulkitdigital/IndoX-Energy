/**
 * Simplified, stylised outline of India for the coverage map (lon, lat pairs).
 * Not survey-accurate — decorative only.
 */
export const indiaOutline: [number, number][] = [
  [74.6, 37.0], [75.9, 36.6], [77.8, 35.5], [79.2, 34.4], [78.7, 32.6], [79.3, 31.3], [80.3, 30.6],
  [81.1, 30.0], [82.2, 28.3], [84.1, 27.5], [85.9, 26.7], [88.1, 26.4], [88.2, 27.9], [88.9, 27.3],
  [89.8, 26.7], [92.1, 26.9], [92.0, 27.8], [93.8, 28.8], [95.4, 29.3], [96.6, 29.0], [97.3, 28.2],
  [96.0, 27.3], [95.2, 26.6], [94.6, 25.2], [94.2, 23.8], [93.4, 23.9], [93.2, 22.3], [92.6, 21.9],
  [92.3, 23.6], [91.4, 24.1], [91.9, 25.1], [90.1, 25.2], [89.8, 25.9], [88.6, 26.3], [88.1, 24.6],
  [88.8, 23.3], [89.0, 21.7], [87.2, 21.5], [86.4, 20.1], [85.0, 19.3], [84.1, 18.3], [82.3, 16.9],
  [81.0, 15.9], [80.2, 15.2], [80.3, 13.2], [79.8, 11.5], [79.9, 10.3], [78.9, 9.2], [77.5, 8.1],
  [76.4, 9.4], [75.8, 11.3], [74.9, 12.9], [74.1, 14.8], [73.4, 16.6], [72.9, 19.0], [72.8, 20.9],
  [72.6, 22.2], [71.9, 21.2], [70.8, 20.8], [69.1, 22.3], [68.5, 23.6], [68.8, 24.3], [71.0, 24.6],
  [70.3, 25.7], [69.6, 27.0], [70.6, 28.0], [72.5, 29.9], [73.9, 31.0], [74.6, 32.5], [73.9, 34.4],
];

export type MapPoint = { name: string; lon: number; lat: number };

/**
 * PLACEHOLDER — reference cities only. They do NOT indicate confirmed coverage.
 * Replace with the client's active / expanding regions once confirmed (PRD §9 item 8).
 */
export const mapPoints: MapPoint[] = [
  { name: "Delhi NCR", lon: 77.2, lat: 28.6 },
  { name: "Mumbai", lon: 72.9, lat: 19.1 },
  { name: "Bengaluru", lon: 77.6, lat: 12.97 },
  { name: "Chennai", lon: 80.27, lat: 13.08 },
  { name: "Kolkata", lon: 88.36, lat: 22.57 },
  { name: "Hyderabad", lon: 78.49, lat: 17.39 },
  { name: "Ahmedabad", lon: 72.57, lat: 23.02 },
  { name: "Lucknow", lon: 80.95, lat: 26.85 },
];
