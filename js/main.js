const size = 2000;

const cnv = document.createElement("canvas");
cnv.setAttribute("id", "myCanvas");
cnv.setAttribute("width", size);
cnv.setAttribute("height", size);
cnv.style.backgroundColor = '#ccc';
cnv.style.height = '100vh';
cnv.style.margin = '0 auto';
cnv.style.display = 'block';
document.body.appendChild(cnv);

const ctx = cnv.getContext("2d");

const f1 = (x,y) => ({
  x: 0,
  y: 0.16*y
})

const f2 = (x,y) => ({
  x: 0.85*x + 0.04*y,
  y: -0.04*x + 0.85*y + 1.6
})

const f3 = (x,y) => ({
  x: 0.2*x-0.26*y,
  y: 0.23*x+0.22*y+1.6
})

const f4 = (x,y) => ({
  x: -0.15*x+0.28*y,
  y: 0.26*x+0.24*y+0.44
})

/**
 * ? Возвращает следующую рандомную координату
 * @param {number} x 
 * @param {number} y 
 */
function getNextValue(x,y){
  const random = Math.random()*100;
  if(random<1) return f1(x,y);
  if(random<86) return f2(x,y);
  if(random<93) return f3(x,y);
  return f4(x,y);
}

/**
 * ? Переводит число из одного диапазона в другой диапазон
 * @param {number} n 
 * @param {number} start1 
 * @param {number} stop1 
 * @param {number} start2 
 * @param {number} stop2 
 */
const scale = function(n, start1, stop1, start2, stop2) {
  const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  if (start2 < stop2) {
    return Math.max(Math.min(newval, stop2), start2)
  } else {
    return Math.max(Math.min(newval, start2), stop2)
  }
}

/**
 * ? Рисует точку по заданным координатам
 * @param {number} x 
 * @param {number} y 
 */
function drawPoint(x, y){
  ctx.fillStyle = '#000';
  const px = scale(x, -3, 3, 0, size);
  const py = scale(y, 0, 10, size, 0);
  ctx.fillRect(px, py, 1, 1);
}

let x = 0;
let y = 0;

setInterval(()=>{
  for(let i = 0; i < 2000; i++){
    drawPoint(x, y);
    let nextVal = getNextValue(x, y);
    x=nextVal.x;
    y=nextVal.y;
  }
},100)