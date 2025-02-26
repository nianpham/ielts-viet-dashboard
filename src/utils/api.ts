const BASE_URL = "https://api.farmcode.io.vn/v1";
// const BASE_URL = 'http://localhost:8000/api/v1';

export const API = {
  //SLIDER
  GET_ALL_SLIDER: `${BASE_URL}/ielts-viet/slider/`,
  CREATE_SLIDER: `${BASE_URL}/ielts-viet/slider/`,
  DELETE_SLIDER: `${BASE_URL}/ielts-viet/slider`,
  //BLOG
  GET_ALL_BLOG: `${BASE_URL}/ielts-viet/blog/`,
  CREATE_BLOG: `${BASE_URL}/ielts-viet/blog/`,
  UPDATE_BLOG: `${BASE_URL}/ielts-viet/blog`,
  DELETE_BLOG: `${BASE_URL}/ielts-viet/blog`,
  GET_BLOG_BY_ID: `${BASE_URL}/ielts-viet/blog`,
  //REVIEWS
  GET_ALL_REVIEW: `${BASE_URL}/slider`,
  CREATE_REVIEW: `${BASE_URL}/slider`,
  UPDATE_REVIEW: `${BASE_URL}/slider`,
  DELETE_REVIEW: `${BASE_URL}/slider`,
  GET_REVIEW_BY_ID: `${BASE_URL}/slider`,
  //TIMEKEEPING
  GET_ALL_TEACHER: `${BASE_URL}/slider`,
};
