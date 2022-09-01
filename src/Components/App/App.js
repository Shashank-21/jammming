import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "Favourites",
      playlistTracks: [],
    };
  }
  addTrack = (track) => {
    for (let presentTrack of this.state.playlistTracks) {
      if (track.id === presentTrack.id) return;
    }
    this.setState({
      playlistTracks: [...this.state.playlistTracks, track],
    });
  };

  removeTrack = (track) => {
    const tracksToKeep = this.state.playlistTracks.filter((trackToRemove) => {
      return track.id !== trackToRemove.id;
    });
    this.setState({ playlistTracks: tracksToKeep });
  };

  updatePlaylistName = (name) => {
    this.setState({ playlistName: name });
  };

  savePlaylist = () => {
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({ playlistName: "New Playlist", playlistTracks: [] });
    });
  };

  search = (term) => {
    Spotify.search(term).then((searchResults) => {
      this.setState({ searchResults });
    });
  };

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
