import axios from "axios";

const SearchData = async (searchParameters) =>{
  try {
    const response = await axios.get(`https://calabashe-api.onrender.com/api/searches/?search_query=${searchParameters}`);
    return response.data.results;
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
}

export const DoctorsSearch = async ({search_query, specialty, location}) => {
  const url = `https://calabashe-api.onrender.com/api/doctors?region=${encodeURIComponent(location)}&specialty=${encodeURIComponent(specialty)}&search_query=${encodeURIComponent(search_query)}`;

  console.log(url);
  try {
    const response = await axios.get(`${url}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
}

export default SearchData;