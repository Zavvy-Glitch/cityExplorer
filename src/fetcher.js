import axios from 'axios';


const getLocation = async (searchQuery, lat, lon) => {
  try {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITYKEY}&q=${searchQuery}&format=json`;
    const response = await axios.get(API);
    console.log(response.data)
    return response.data[0];
  } catch (error) {
    window.alert("ERROR: Unable to Complete your Request", error);
  }
};

const getWeather = async (searchQuery) => {
  try {
    // const weather = `http://localhost:3333/weather?searchQuery=${this.state.searchQuery}`;
    const weather = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${searchQuery}`;
    const responseWeather = await axios.get(weather);
    console.log(responseWeather.data);
    return responseWeather.data;
  } catch (error) {
    window.alert("ERROR: Unable to Complete your Request", error);
  }
};

const getMovies = async (searchQuery) => {
  try {
    // const movies = `http://localhost:3333/movies?searchQuery=${this.state.searchQuery}`;
    const movies = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${searchQuery}`;
    const responseMovie = await axios.get(movies);
    return responseMovie.data;
  } catch (error) {
    window.alert("ERROR: Unable to Complete your Request", error);
  }
};

const functions = {getLocation, getWeather, getMovies}

export default functions;