import '../styles/grey-box.css';

function GreyBox() {
  return (
    <div className="grey-box">
      <div className="Playlist-Title">
        <img src="https://i.scdn.co/image/ab67616d00001e022a038d3bf875d23e4aeaa84e" className="Playlist-Image"></img>
        <h1>Billie Eilish - Happier Than Ever</h1>
      </div>
      <div className="Song-List">
        <div className="Song">
          <img src="https://i.scdn.co/image/ab67616d00001e022a038d3bf875d23e4aeaa84e" className="Song-Image"></img>
          <h3>Happier Than Ever</h3>
        </div>
        <div className="Song">
          <img src="https://i.scdn.co/image/ab67616d00001e022a038d3bf875d23e4aeaa84e" className="Song-Image"></img>
          <h3>Happier Than Ever</h3>
        </div>
      </div>
    </div>
  );
}

export default GreyBox;
