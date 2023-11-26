import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';
import { fetchArtist } from '../src/script';

export const handlers = [
    http.get('https://api.spotify.com/v1/search', ({ params }) => {
        return HttpResponse.json({
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
                "name": "string",
                "popularity": 0,
                "type": "artist",
                "uri": "string"
              }
            ]
          })
    }
    ),
];

const worker = setupWorker(...handlers)
worker.start()

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// fetch mock data without session key
function getMockData() {
    const spotifyData = 
}

test("Function makes correct API call"), async () => {
    const result = await fetchArtist('Rick Astley');
    const expectedValue = "2"
    expect(result).toEqual(expectedValue);
}