import React from "react";
import "./Track.css";

class Track extends React.Component {
  renderAction = () => {
    if (this.props.isRemoval)
      return (
        <button className="Track-action" onClick={this.removeTrack}>
          -
        </button>
      );
    return (
      <button className="Track-action" onClick={this.addTrack}>
        +
      </button>
    );
  };

  addTrack = () => {
    this.props.onAdd(this.props.track);
  };

  removeTrack = () => {
    this.props.onRemove(this.props.track);
  };

  render() {
    const { name, artist, album } = this.props.track;
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{name}</h3>
          <p>
            {artist} | {album}
          </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
