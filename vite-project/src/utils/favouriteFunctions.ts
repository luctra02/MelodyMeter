// TypeScript interface for the Song object
interface Song {
  songName: string;
  artist: string;
  imageURL: string;
}

// Async function to add a song to the favorites list
async function addSongToFavourites(songName: string, artist: string, imageURL: string) {
  // Retrieve the favorites list from local storage
  const favouritesJSON = localStorage.getItem('favourites');
  const favourites = favouritesJSON ? JSON.parse(favouritesJSON) : [];

  // Create a new song object
  const newSong = {
    songName: songName,
    artist: artist,
    imageURL: imageURL || '', // Use optional chaining to avoid errors if imageURL is undefined
  };

  // Add the new song to the favorites list
  favourites.push(newSong);

  // Convert the updated favorites list to JSON and store it in local storage
  const updatedFavourites = JSON.stringify(favourites);
  localStorage.setItem('favourites', updatedFavourites);
}

// Function to remove a song from the favorites list
function removeSongFromFavourites(songName: string, artist: string) {
  // Retrieve the favorites list from local storage
  const favouritesJSON = localStorage.getItem('favourites');
  const favourites: Song[] = favouritesJSON ? JSON.parse(favouritesJSON) : [];

  // Find the index of the song in the favorites list
  const index = favourites.findIndex((song) => song.songName === songName && song.artist === artist);

  // If the song is found, remove it from the favorites list
  if (index !== -1) {
    favourites.splice(index, 1);

    // Convert the updated favorites list to JSON and store it in local storage
    const updatedFavourites = JSON.stringify(favourites);
    localStorage.setItem('favourites', updatedFavourites);
  }
}

// Function to check if a song is in the favorites list
function checkSongInFavourites(songName: string, artist: string) {
  // Retrieve the favorites list from local storage
  const favouritesJSON = localStorage.getItem('favourites');
  const favourites: Song[] = favouritesJSON ? JSON.parse(favouritesJSON) : [];

  // Check if the song is in the favorites list
  const index = favourites.findIndex((song) => song.songName === songName && song.artist === artist);

  // Return true if the song is in the favorites list, otherwise return false
  return index !== -1;
}

// Exporting the utility functions
export { checkSongInFavourites, addSongToFavourites, removeSongFromFavourites };
