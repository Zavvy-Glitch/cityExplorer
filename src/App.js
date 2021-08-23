import React from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      location: {},
      map: "",
    };
  }

  getLocation = async (e) => {
    e.preventDefault();
    try {
      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITYKEY}&q=${this.state.searchQuery}&format=json`;
      const response = await axios.get(API);
      this.setState({ location: response.data[0] });

      const map = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITYKEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=18`;
      const respond = await axios.get(map);
      this.setState({ map: respond.config.url });
    } catch {
      window.alert("ERROR: Unable to geocode");
    }
  };

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
          <Form.Text>
            <div id="letters">
            Location: {this.state.location.display_name}
            </div>
            <div id="letters">
            Longitude: {this.state.location.lon}
            </div>
            <div id="letters">
            Latitude: {this.state.location.lat}
            </div>
          </Form.Text>
        </Form>
        {this.state.location.place_id &&
        <div id="cardMap">
        <Card>
          <Card.Img variant="top" src={this.state.map} />
        </Card>
        </div>
          }
      </>
    );
  }
}
export default App;
