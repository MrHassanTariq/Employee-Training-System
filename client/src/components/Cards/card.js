import React, { Component } from "react";

class Card extends Component {
  state = {};
  render() {
    return (
      <div class="container">
        <div id="contentCards" class="card">
          <img
            id="cardImage"
            class="card-img-top"
            src={this.props.path}
            alt="Card image"
          />
          <div class="card-body">
            <h4 class="card-title">
              {this.props.cardFor}:{this.props.value}
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
