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


 import {EarthTrajectory, MarsTrajectory, kindaReal} from './realData';
 import realData from './data.json';
 console.log(realData);
const initialDate = new Date('01/01/2018').getTime();
const fakeTimeStamps = [];
const numberSegments = 38;
for (let i = 0; i < numberSegments; i++) {
  fakeTimeStamps.push(initialDate + i * 86400000); // fill it with one day interval
};

const generateCirclePoints = (radius, numberSegments) => {
  const segments = [];
  for (let i = 0; i < numberSegments; i++) {
    segments.push({
      x: radius * Math.cos((2 * Math.PI / numberSegments) * i),
      y: radius * Math.sin((2 * Math.PI / numberSegments) * i),
      z: 1,
    })
  }
  return segments;
}
const fakeBodies = [
  //{id: 1, alias: 'Mercury', positions: generateCirclePoints(1, fakeTimeStamps.length)},
  //{id: 2, alias: 'Venus', positions: generateCirclePoints(2, fakeTimeStamps.length)},
  //{id: 3, alias: 'Earth', positions: EarthTrajectory},
  {id: 4, alias: 'Mars', positions: MarsTrajectory},
  //{id: 5, alias: 'Jupiter', positions: generateCirclePoints(5, fakeTimeStamps.length)},
  //{id: 6, alias: 'Saturn', positions: generateCirclePoints(6, fakeTimeStamps.length)},
  //{id: 7, alias: 'Uranus', positions: generateCirclePoints(7, fakeTimeStamps.length)},
  //{id: 8, alias: 'Neptune', positions: generateCirclePoints(8, fakeTimeStamps.length)},
  //{id: 9, alias: 'Pluto', positions: generateCirclePoints(9, fakeTimeStamps.length)},
  //{id: 10, alias: 'Sun', positions: generateCirclePoints(0, fakeTimeStamps.length)},
];

const basicPath = '/planets/hires';
const lowResPath = '/planets/lowre';
const extension = '.jpg';
export const mockData = {timestamps: realData.timestamps, bodies: realData.bodies};


export const planetRadiuses = {
  Mercury: { radius: 2440, texture: `${basicPath}/8k_mercury${extension}`},
  Venus: { radius: 6051.84, texture: `${basicPath}/8k_venus_surface${extension}`},
  Earth: { radius:6378.137, texture: `${basicPath}/8k_earth_daymap${extension}`},
  Mars: {radius:3389.92, texture: `${basicPath}/8k_mars${extension}`},
  Jupiter: {radius:71492, texture: `${basicPath}/8k_jupiter${extension}`},
  Saturn: {radius:60268, texture: `${basicPath}/8k_saturn${extension}`},
  Uranus: {radius:25559, texture: `${lowResPath}/2k_uranus${extension}`},
  Neptune: {radius:24766, texture: `${lowResPath}/2k_neptune${extension}`},
  Pluto: {radius:1188.3, texture: `${basicPath}/8k_pluto${extension}`},
  //Sun: {radius:695700, texture: `${basicPath}/8k_sun${extension}`},
}

