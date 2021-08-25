import React from "react";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";

class Weather extends React.Component {
  render() {
    console.log(this.props.weather);
    return (
      <>
        <h1 id="weatherHeader">Weather Report</h1>
        <div id="weather">
          <Container>
            <Row md={4} className="g-4">
              {this.props.weather.map((value, idx) => (
                <Col>
                  <Card key={idx} style={{width: "17rem", height:"12rem"}}>
                    <Card.Body>
                      <Card.Text>{value.date}</Card.Text>
                      <Card.Text>{value.description}</Card.Text>
                      <Card.Text>{value.temprature}</Card.Text>
                      <Card.Text>{value.uv}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Weather;
