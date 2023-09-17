import React from 'react';
import '../styles/statview.css';


function statview() {
  return (
    <div className="statview">
      <ul>
        <li><p>Danceability</p><p>100%</p></li>
        <li><p>Energy</p><p>100%</p></li>
        <li><p>Loudness</p><p>100%</p></li>
        <li><p>Positivity</p><p>100%</p></li>
      </ul>
    </div>
  );
}

export default statview;