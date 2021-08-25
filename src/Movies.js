import React from "react";
import Card from "react-bootstrap/Card";

class Movies extends React.Component {
  render() {
    return (
      <>
        <h1>Top 20 Movies</h1>
        <div>
          {this.props.movie.map((value, idx) => (
            <Card
              id="Movies"
              bg="Dark"
              key={idx}
              style={{ width: "30rem" }}
              border="Dark"
            >
              <Card.Body>
                <Card.Text id="movieTitle">{value.title}</Card.Text>
                <Card.Text>
                  <img
                    src={`https://image.tmdb.org/t/p/w154/${value.imageUrl}`}
                    alt={this.props.searchQuery}
                  />
                </Card.Text>
                <Card.Text>Released On: {value.releasedOn}</Card.Text>
                <Card.Text id="popular">Overview: {value.overView}</Card.Text>
                <Card.Text>Popularity Rating: {value.popularity}</Card.Text>
                <Card.Text>Average Votes: {value.averageVotes}</Card.Text>
                <Card.Text>Total Votes: {value.totalVotes}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </>
    );
  }
}

export default Movies;
