const mdLayout: Layout[] = [
  { i: "profile", x: 0, y: 0, w: 2, h: 2 },
  { i: "google-map", x: 2, y: 0, w: 1, h: 1 },
  { i: "seeso-sdk", x: 3, y: 0, w: 1, h: 2 },
  { i: "seeso-labs", x: 2, y: 1, w: 1, h: 2 },
  { i: "theme-toggle", x: 3, y: 2, w: 1, h: 1 },
  { i: "instagram", x: 1, y: 1, w: 1, h: 1 },
  { i: "linkedin", x: 0, y: 1, w: 1, h: 1 },
  { i: "aboutme", x: 0, y: 3, w: 2, h: 1 },
  { i: "chat", x: 2, y: 3, w: 2, h: 1 },
];

const smLayout: Layout[] = [
  { i: "profile", x: 0, y: 0, w: 2, h: 2 },
  { i: "google-map", x: 2, y: 0, w: 1, h: 1 },
  { i: "seeso-sdk", x: 2, y: 1, w: 1, h: 2 },
  { i: "seeso-labs", x: 1, y: 3, w: 1, h: 2 },
  { i: "theme-toggle", x: 2, y: 3, w: 1, h: 1 },
  { i: "instagram", x: 0, y: 1, w: 1, h: 1 },
  { i: "linkedin", x: 0, y: 2, w: 1, h: 1 },
  { i: "aboutme", x: 0, y: 4, w: 2, h: 1 },
  { i: "chat", x: 3, y: 4, w: 1, h: 1 },
];

const xxsLayout: Layout[] = [
  { i: "profile", x: 0, y: 0, w: 2, h: 2 },
  { i: "google-map", x: 1, y: 2, w: 1, h: 1 },
  { i: "seeso-sdk", x: 0, y: 2, w: 1, h: 2 },
  { i: "seeso-labs", x: 1, y: 3, w: 1, h: 2 },
  { i: "theme-toggle", x: 0, y: 4, w: 1, h: 1 },
  { i: "instagram", x: 1, y: 6, w: 1, h: 1 },
  { i: "linkedin", x: 0, y: 6, w: 1, h: 1 },
  { i: "aboutme", x: 0, y: 5, w: 2, h: 1 },
  { i: "chat", x: 0, y: 7, w: 2, h: 1 },
];

export const layouts = {
  md: mdLayout,
  sm: smLayout,
  xxs: xxsLayout,
};
