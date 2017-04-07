import React from "react";
import "./loadingIndicator.css";

export default class LoadingIndicator extends React.Component {
  constructor({ text }) {
    super();

    this.state = {
      characters: text.split(""),
      percentComplete: 0
    };

    this.renderCharacter = this.renderCharacter.bind(this);

    setTimeout(this.update.bind(this), 100);
  }

  update() {
    this.setState(
      {
        percentComplete: this.state.percentComplete + 1
      },
      () => {
        if (this.state.percentComplete < 100) {
          setTimeout(this.update.bind(this), Math.random() * 100);
        }
      }
    );
  }

  renderCharacter(char, index, arr) {
    const position = index / arr.length * 100;
    const segmentLength = 1 / arr.length * 100;

    const opacity = this.state.percentComplete < position
      ? 0
      : this.state.percentComplete >= position + segmentLength
          ? 1
          : (this.state.percentComplete - position) / segmentLength;

    return (
      <span
        className="loading-indicator__character"
        key={`loadingCharacter${index}`}
        style={{ opacity }}
      >
        {char}
      </span>
    );
  }

  render() {
    return (
      <div className="loading-indicator">
        <div className="loading-indicator__container">
          {this.state.characters.map(this.renderCharacter)}
          <div
            className="loading-indicator__progress-bar"
            style={{ width: `${this.state.percentComplete}%` }}
          />
        </div>
      </div>
    );
  }
}
