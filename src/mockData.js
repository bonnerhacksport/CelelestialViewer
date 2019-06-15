/**
 * Mock data shape
 * interface BodyTimeline {
 *   id:  number;
 *   alias: string;
 *   positions: [] BodyPosition;
 * }
 * interface BodyPosition {
 *   x: number;
 *   y: number:
 *   z: number;
 * }
 * interface TimeSlice {
 *   // data in milliseconds
 *   timestamps: []number;
 *   bodies: [] BodyTimeline
 * }
 */


const fakeTimeStamps = new Array(500).fill(new Date('01/01/2018').getTime());
fakeTimeStamps.map((val, index)=>{
  return val + index * 86400000; // fill it with one day interval
});

const generateCirclePoints = (radius, numberSegments) => {
  const segments = new Array(numberSegments);
  segments.map((val, index ) => {
    return {
      x: radius * Math.cos((2 * Math.PI / numberSegments) * index),
      y: radius * Math.sin((2 * Math.PI / numberSegments) * index),
      z: 1,
    }
  })
  return segments;
}
const fakeBodies = [
  {id: 1, alias: 'Earth', positions: generateCirclePoints(10, fakeTimeStamps.length)},
  {id: 2, alias: 'Mars', positions: generateCirclePoints(100, fakeTimeStamps.length)},
  {id: 3, alias: 'Mercury', positions: generateCirclePoints(1, fakeTimeStamps.length)},
  {id: 4, alias: 'Jupiter', positions: generateCirclePoints(1000, fakeTimeStamps.length)}
];


const mockData = {timestamps: fakeTimeStamps, bodies: fakeBodies};


