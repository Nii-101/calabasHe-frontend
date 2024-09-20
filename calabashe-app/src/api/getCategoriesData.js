import axios from "axios";

export const fetchDoctors = async (page=1) => {
  try {
    const response = await axios.get(`https://calabashe-api.onrender.com/api/doctors/?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching doctors:', error);
  }
};

export const fetchFacilities = async () => {
  try {
    const response = await axios.get('https://calabashe-api.onrender.com/api/facilities/');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching facilities:', error);
  }
};

export const fetchServices = async () => {
  try {
    const response = await axios.get('https://calabashe-api.onrender.com/api/services/');
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

export const fetchReviewCount = async () => {
  try {
    const response = await axios.get('https://calabashe-api.onrender.com/api/reviews/combined-reviews/');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching reviewCount:', error);
    throw error;
  }
};

export const fetchCurrentReviews = async () => {
  try {
    const response = await axios.get('https://calabashe-api.onrender.com/api/reviews/combined-reviews/');
    console.log(response)
    return response.data.results.reviews;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};