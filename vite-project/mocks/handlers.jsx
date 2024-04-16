import { http, HttpResponse } from 'msw'
 
http.get('searchMock', async () => {
    const result = await fetch(`https://api.spotify.com/v1/search?q=${"Rick Astley"}&type=track`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${"token"}` },
      });  return new HttpResponse.json({
    "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
    "limit": 20,
    "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    "offset": 0,
    "previous": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    "total": 4,
    "items": [
      {
        "external_urls": {
          "spotify": "string"
        },
        "followers": {
          "href": "string",
          "total": 0
        },
        "genres": [
          "Prog rock",
          "Grunge"
        ],
        "href": "string",
        "id": "string",
        "images": [
          {
            "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            "height": 300,
            "width": 300
          }
        ],
        "name": "Rick Astley",
        "popularity": 0,
        "type": "artist",
        "uri": "string"
      }
    ]
  })
})