/**
 * canvas canvas的dom对象
 * bezierCtrlNodesArr 控制点数组，包含x，y坐标
 * color 曲线颜色
 */
var BezierMaker = function(canvas, bezierCtrlNodesArr, color) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.bezierCtrlNodesArr = bezierCtrlNodesArr ? bezierCtrlNodesArr : []
    this.color = color ? color: '#ffffff'
    this.bezierArr = []
    this.ctrlDrawIndex = 0
    this.ctrlNodesArr=[];
}
BezierMaker.prototype.bezier = function(t) { //贝塞尔公式调用
    var x = 0,
        y = 0,
        bezierCtrlNodesArr = this.bezierCtrlNodesArr,
        n = bezierCtrlNodesArr.length - 1,
        self = this
    bezierCtrlNodesArr.forEach(function(item, index) {
        if(!index) {
            x += item.x * Math.pow(( 1 - t ), n - index) * Math.pow(t, index)
            y += item.y * Math.pow(( 1 - t ), n - index) * Math.pow(t, index)
        } else {
            x += self.factorial(n) / self.factorial(index) / self.factorial(n - index) * item.x * Math.pow(( 1 - t ), n - index) * Math.pow(t, index)
            y += self.factorial(n) / self.factorial(index) / self.factorial(n - index) * item.y * Math.pow(( 1 - t ), n - index) * Math.pow(t, index)
        }
    })
    return {
        x: x,
        y: y
    }
}
BezierMaker.prototype.drawBezier = function() { //通过控制点算出实时xy值渲染到canvas 
    var nodeArr = this.bezierCtrlNodesArr
    if(nodeArr.length === 2) {
        console.warn('Control nodes should be more then two!')
        var startNode = nodeArr[0],
            endNode = nodeArr[1]
        this.ctx.moveTo(startNode.x, startNode.y)
        this.ctx.lineTo(endNode.x, endNode.y)
        this.ctx.strokeStyle = this.color
        this.ctx.stroke()
    } else if(nodeArr.length === 3) {
        var startNode = nodeArr[0],
            ctrlNode = nodeArr[1],
            endNode = nodeArr[2]
        this.ctx.beginPath()
        this.ctx.moveTo(startNode.x, startNode.y)
        this.ctx.quadraticCurveTo(ctrlNode.x, ctrlNode.y, endNode.x, endNode.y)
        this.ctx.strokeStyle = this.color
        this.ctx.stroke()
    } else if(nodeArr.length === 4) {
        var startNode = nodeArr[0],
            ctrlNodeA = nodeArr[1],
            ctrlNodeB = nodeArr[2],
            endNode = nodeArr[3]
        this.ctx.beginPath()
        this.ctx.moveTo(startNode.x, startNode.y)
        this.ctx.bezierCurveTo(ctrlNodeA.x, ctrlNodeA.y, ctrlNodeB.x, ctrlNodeB.y, endNode.x, endNode.y)
        this.ctx.strokeStyle = this.color
        this.ctx.stroke()
    } else {
        var self = this
        for(i = 0; i < 1; i+=0.01) {
            this.bezierArr.push(this.bezier(i))
        }
        var objct=[]
        this.bezierArr.forEach(function(obj, index) {

            if (index) {
                var startX = self.bezierArr[index - 1].x,
                    startY = self.bezierArr[index - 1].y,
                    x = obj.x,
                    y = obj.y
                self.ctx.beginPath()
                self.ctx.moveTo(startX, startY)
                self.ctx.lineTo(x, y)
                self.ctx.strokeStyle = self.color
                self.ctx.stroke()
                var oj={startx:parseInt(startX),starty:parseInt(startY),x:parseInt(x),y:parseInt(y)}
                objct.push(oj);
               // console.log();
            }
        })

        console.log("objct:",objct);
        this.ctrlNodesArr=objct;
        return objct
    }

}
BezierMaker.prototype.factorial = function(num) { //递归阶乘
    if (num <= 1) {
        return 1;
    } else {
        return num * this.factorial(num - 1);
    }
}

BezierMaker.prototype.drawball = function() { // 画一个运动的小球

    for (var i = 0; i < 100; i++) {
        window.requestAnimationFrame(function(){
            console("动画；；",i);
        })
    };

    return
   var self = this
            var item = this.ctrlNodesArr
            var ctrlAx = item.startx,
                ctrlAy = item.starty,

                x = item.x,
                y = item.y,
                ox = 0,
                oy = 0
            if(ctrlDrawIndex === 0) {
                ox = 0
                oy = 0
            } else {
                ox = ctrlNodesArr[ctrlDrawIndex - 1].nowX
                oy = ctrlNodesArr[ctrlDrawIndex - 1].nowY
            }
            if(item.t > 1) {
                ctrlDrawIndex++
            }else {

                self.ctx.beginPath()
                self.ctx.arc(ballX, ballY, 10, 0, Math.PI * 2, false)
                self.ctx.fill()
            }
            if(ctrlDrawIndex !== ctrlNodesArr.length) {
                window.requestAnimationFrame(newMap.drawBall.bind(self))
            }
}
