import axios from "axios";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Weather from "./Weather.js";
import Movies from "./Movies.js";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      location: {},
      map: "",
      weather: [],
      movie: [],
    };
  }

  getLocation = async (e) => {
    e.preventDefault();
    try {
      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITYKEY}&q=${this.state.searchQuery}&format=json`;
      const response = await axios.get(API);
      console.log("Location IQ Data:", response);
      this.setState({ location: response.data[0] });

      const map = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITYKEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=18`;
      const respond = await axios.get(map);
      console.log(respond);
      this.setState({ map: respond.config.url });

      // const weather = `http://localhost:3333/weather?searchQuery=${this.state.searchQuery}`;
      const weather = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.searchQuery}`;
      console.log(weather);
      const responseWeather = await axios.get(weather);
      this.setState({ weather: responseWeather.data });

      // const movies = `http://localhost:3333/movies?searchQuery=${this.state.searchQuery}`;
      const movies = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.searchQuery}`
      console.log(movies);
      const responseMovie = await axios.get(movies);
      this.setState({ movie: responseMovie.data });
    } catch {
      window.alert("ERROR: Unable to Complete your Request");
    }
  };

  updateSearch = (e) => this.setState({ searchQuery: e.target.value });

  render() {
    return (
      <>
        <Form id="form" onSubmit={this.getLocation}>
          <Form.Control
            size="lg"
            placeholder="Type City to Search Here...."
            onChange={(e) => this.setState({ searchQuery: e.target.value })}
            type="text"
          />
          <Button id="button" onClick={this.getLocation}>
            Explore!
          </Button>
          <Form.Text id="letters">
            <br />
            Location: {this.state.location.display_name}
            <br />
            Longitude: {this.state.location.lon}
            <br />
            Latitude: {this.state.location.lat}
            <br />
          </Form.Text>
        </Form>

        <Card style={{ width: "40rem" }}>
          <Card.Img id="card" variant="top" src={this.state.map} />
        </Card>

        {this.state.weather.length && (
          <Weather
            weather={this.state.weather}
            searchQuery={this.state.searchQuery}
          />
        )}
        {this.state.movie.length && (
          <Movies
            movie={this.state.movie}
            searchQuery={this.state.searchQuery}
          />
        )}
      </>
    );
  }
}

export default App;
