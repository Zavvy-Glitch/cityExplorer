import React from "react";
import functions from "./fetcher";
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
      lat: [],
      lon: [],
    };
  }

  handleFunction = async (e) => {
    e.preventDefault();
    const locationResult = await functions.getLocation(this.state.searchQuery);
    const weatherResult = await functions.getWeather(this.state.searchQuery);
    const movieResult = await functions.getMovies(this.state.searchQuery);
    this.setState({
      location: locationResult,
      weather: weatherResult,
      movie: movieResult,
      map: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITYKEY}&center=${locationResult.lat},${locationResult.lon}&zoom=18`,
    });
  };

  updateSearch = (e) => this.setState({ searchQuery: e.target.value });

  render() {
    console.log(this.state);
    return (
      <>
        <Form id="form" onSubmit={this.handleFunction}>
          <Form.Control
            size="lg"
            placeholder="Type City to Search Here...."
            onChange={(e) => this.setState({ searchQuery: e.target.value })}
            type="text"
          />
          <Button id="button" type="submit">
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

        {this.state.weather.length > 0 && (
          <Weather
            weather={this.state.weather}
            searchQuery={this.state.searchQuery}
          />
        )}
        {this.state.movie.length > 0 && (
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
