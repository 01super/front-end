import { Square } from "./core/Square";

function fn(name: number) {
    console.log(name, arguments);
}

fn(1)

const sq = new Square({x:1,y:2}, '');
console.log('sq: ', sq);
// sq.point.x = 23
// sq.color = 12