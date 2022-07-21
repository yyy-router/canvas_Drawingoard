/**  @type {HTMLCanvasElement}*/
const clear = document.querySelector('#clear');
const save = document.querySelector('#identify');
const downLoadLink = document.createElement('a');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let startPot = { x: undefined, y: undefined };
let isPainting = false;
function addBacColor() {
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f0f0f0'
    ctx.fill();
}
// 划线函数
function drawLine({ startX, startY, endX, endY }) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.lineCap = 'round';
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.closePath();
}
// 获取鼠标初始位置事件
canvas.addEventListener('mousedown', (e) => {
    startPot.x = e.offsetX;
    startPot.y = e.offsetY;
    isPainting = true;
});
// 监听鼠标移动事件
canvas.addEventListener('mousemove', (e) => {
    let endX = e.offsetX;
    let endY = e.offsetY;
    if (isPainting && typeof startPot.x === 'number' && typeof startPot.y === 'number') {
        drawLine({
            startX: startPot.x,
            startY: startPot.y,
            endX,
            endY
        });
        startPot.x = endX;
        startPot.y = endY;
    }
});
// 鼠标抬起事件
canvas.addEventListener('mouseup', () => {
    isPainting = false;
    startPot = { x: undefined, y: undefined };
})
// 清除面板
clear.addEventListener('click', () => {
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
})
// 保存函数
save.addEventListener('click', () => {
    downLoadLink.href = canvas.toDataURL();
    downLoadLink.download = '图片';
    downLoadLink.click();
    downLoadLink.remove();
})
addBacColor();

