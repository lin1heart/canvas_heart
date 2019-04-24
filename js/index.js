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
    function heart(){
    	
        if(radian <= (Math.PI*2)){  //每增加一次弧度，绘制一条线
            radian += radian_add;
            X = getX(radian);
            Y = getY(radian);
            //求边缘点 0,0到x,y
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
            content.moveTo(A,B);
            content.lineTo(X,Y);
            var grd = content.createLinearGradient(A,B,X,Y)//渐变起始和结束坐标
　　　　		grd.addColorStop(0,"green");//渐变颜色
			grd.addColorStop(0.3,"yellow");
			grd.addColorStop(0.6,"red")
 			grd.addColorStop(1,"blue");
			content.lineWidth=3;
            content.strokeStyle = grd;
            content.stroke();
            content.save();
            content.beginPath();  //开始绘图
        }
    }
    intervalId = setInterval(heart,100); 
}


function getX(t){  //获取心型线的X坐标
    return 9*(16*Math.pow(Math.sin(t),3))
}

function getY(t){  //获取心型线的Y坐标
    return -9*(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))
}
