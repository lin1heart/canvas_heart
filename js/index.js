var drawing = document.getElementById("drawing"); //获取canvas元素
var cheight = document.body.scrollHeight;
var cwidth = document.body.scrollWidth;
drawing.width = cwidth; //设置画布大小
drawing.height = cheight;
if (drawing.getContext){  //获取绘图上下文
    var content = drawing.getContext("2d"),
        radian = 0,   //设置初始弧度
        radian_add = Math.PI/180;  //设置弧度增量
    content.beginPath();  //开始绘图
    var drawWidth = cwidth/2;
    var drawHeight = cheight/2;
    content.translate(drawWidth,drawHeight);  //设置绘图原点
	var list1 = [];
	var list2 = [];
	while(radian <= (Math.PI*2)){  //每增加一次弧度，绘制一条线
		radian += radian_add;
		X = getX(radian);
		Y = getY(radian);
		list1.push({x:X,y:Y});
		//求边缘点 0,0到x,y 边缘矩形4条边
		if (X != 0 && Y < 0 && (Y/X < -1||Y/X > 1)){//y = -drawHeight            	
			A = -drawHeight*X/Y;
			B = -drawHeight;
		}else if (Y != 0 && X > 0 && (Y/X > -1&&Y/X < 1)){// x=drawWidth
			A = drawWidth;
			B = Y/X*drawWidth;
		}else if (X != 0 && Y > 0 && (Y/X < -1 || Y/X > 1)){//y=drawHeight
			A = drawHeight*X/Y;
			B = drawHeight;
		}else {//x=-drawWidth
			A = -drawWidth;
			B = -drawWidth*Y/X;
		}
		list2.push({a:A,b:B});
	}
	draw();
}
var interVal;
var time = 0;
function draw(){
	var size = list1.length;
	time ++;
	if(size > 0){
		// content.save();
		var j = Math.floor(Math.random()*size);
		content.beginPath();
		content.moveTo(list2[j].a,list2[j].b);
		content.lineTo(list1[j].x,list1[j].y);
		var grd = content.createLinearGradient(list2[j].a,list2[j].b,list1[j].x,list1[j].y)//渐变起始和结束坐标
	　　 grd.addColorStop(0,"green");//渐变颜色
		grd.addColorStop(0.3,"yellow");
		grd.addColorStop(0.6,"red")
		grd.addColorStop(1,"blue");
		content.lineWidth=3;
		content.strokeStyle = grd;
		content.stroke();
		list1.splice(j,1)
		list2.splice(j,1)
		size--;
		// content.restore();
		if (time < 5){
			draw();
		}else{
			time = 0;
			interVal = window.requestAnimationFrame(draw);
		}
		// setTimeout(function(){draw(content,list1,list2);},ti);
	}else {
		window.cancelAnimationFrame(interVal);
	}
}

function getX(t){  //获取心型线的X坐标
    return 9*(16*Math.pow(Math.sin(t),3))
}

function getY(t){  //获取心型线的Y坐标
    return -9*(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))
}
