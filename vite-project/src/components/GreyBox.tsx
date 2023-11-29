// Importing the style for the component
import '../styles/grey-box.css';

// Functional component for rendering a grey box with playlist information
function GreyBox() {
  // Rendering the component
  return (
    <div className="grey-box">
      {/* Playlist title section */}
      <div className="Playlist-Title">
        {/* Displaying the playlist image */}
        <img src="https://i.scdn.co/image/ab67616d00001e022a038d3bf875d23e4aeaa84e" className="Playlist-Image"></img>
        {/* Displaying the playlist title */}
        <h1>Billie Eilish - Happier Than Ever</h1>
      </div>
      {/* Song list section */}
      <div className="Song-List">
        {/* Individual song entry */}
        <div className="Song">
          {/* Displaying the song image */}
          <img src="https://i.scdn.co/image/ab67616d00001e022a038d3bf875d23e4aeaa84e" className="Song-Image"></img>
          {/* Displaying the song title */}
          <h3>Happier Than Ever</h3>
        </div>
        {/* Another individual song entry */}
        <div className="Song">
          {/* Displaying the song image */}
          <img src="https://i.scdn.co/image/ab67616d00001e022a038d3bf875d23e4aeaa84e" className="Song-Image"></img>
          {/* Displaying the song title */}
          <h3>Happier Than Ever</h3>
        </div>
      </div>
    </div>
  );
}

// Exporting the component as the default export
export default GreyBox;
