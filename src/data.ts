export const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    stroke: 'black',
    strokeWidth: 2,
    id: 'rect1',
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    stroke: 'black',
    strokeWidth: 2,
    id: 'rect2',
  },
];

export const initialLines = [
  {
    x: 20,
    y: 200,
    points: [0, 0, 100, 0, 100, 100],
    tension: 0.5,
    closed: true,
    stroke: 'black',
    fillLinearGradientStartPoint: { x: -50, y: -50 },
    fillLinearGradientEndPoint: { x: 50, y: 50 },
    fillLinearGradientColorStops: [0, 'red', 1, 'yellow'],
  },
];

type AlbumKeys = 'artist' | 'title' | 'releaseDate' | 'recordingType';

type Album = { [key in AlbumKeys]?: string };

const album: Album = {
  artist: '12',
  title: '2',
  recordingType: '1',
};

console.log(album);
