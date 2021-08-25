import React from "react";
import "./index.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div class="container">
          <div class="jumbotron">
            <h1 id="header">City Explorer</h1>
            <p id="paragraph"> Explore various cities</p>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
