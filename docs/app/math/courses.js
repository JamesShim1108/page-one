// Courses whose pages get the calculator and math keys.
export const MATH_COURSE_IDS = Object.freeze(["precalculus", "algebra2"]);

export const isMathCourse = (courseId) =>
  MATH_COURSE_IDS.includes(String(courseId || ""));
