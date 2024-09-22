let canvas = document.getElementById("canvas");
let max_height, startPos, vizWidth, midY;



var numberOfFrequencies = 1;
var inputColor1 = "#5603fc";
var inputColor2 = "#fc0303";
var glow = true;
var fixneon = true;
var NeonColor = "#ffffff";
var glowStrength = 10;
var amplitude = 300;
var spectrumWidth = 2;
var spectrumScale = 1;
var spectrumX = 0.5;
var sprcctrumY = 0.5;
var opacity = 1;

var imgName ="";
var useImg = false;



let glob = { bloom: false, bloomRadius: 10 };
let fill_line_color = "rgb(0,0,0)";
let linesColor = "rgb(255,0,0)";

let isGradient = true;
let MoreColors = true;
let square = true;
let remFilColor = false;
let DrawLine = true;

let ctx = canvas.getContext("2d");
let gradient;

function livelyPropertyListener(name, val)
{
  switch(name) {
	case "MoreColors":
      MoreColors = val;
      break; 
    case "lineColor":
      var color = hexToRgb(val);
      linesColor=`rgb(${color.r},${color.g},${color.b})`;
      gradient = ctx.createLinearGradient(0,midY, 0, max_height);
      gradient.addColorStop(0, fill_line_color);
	  if (MoreColors) 
	  {
		gradient.addColorStop(0.4, inputColor1);
		gradient.addColorStop(0.8, inputColor2);
	  };
      gradient.addColorStop(1, linesColor);
      break;
	
  case "FillLineColor":
      var color = hexToRgb(val);
      fill_line_color = `rgb(${color.r},${color.g},${color.b})`;
      gradient = ctx.createLinearGradient(0,midY, 0, max_height);
      gradient.addColorStop(0, fill_line_color);
	  if (MoreColors) 
	  {
		gradient.addColorStop(0.4, inputColor1);
		gradient.addColorStop(0.8, inputColor2);
	  };
      gradient.addColorStop(1, linesColor);
      break;   
	case "isGradient":
      isGradient = val;
      break; 
    case "square":
      square = val;
      break;   
	case "remFilColor":
      remFilColor = val;
      break; 	 
	case "DrawLine":
      DrawLine = val;
      break; 	  
	  
	case "color1":
		var color = hexToRgb(val);
		inputColor1 = `rgb(${color.r},${color.g},${color.b})`;
		gradient = ctx.createLinearGradient(0,midY, 0, max_height);
        gradient.addColorStop(0, fill_line_color);
		if (MoreColors) 
	    {
			gradient.addColorStop(0.4, inputColor1);
			gradient.addColorStop(0.8, inputColor2);
	    };
        gradient.addColorStop(1, linesColor);
		break; 
	case "color2":
		var color = hexToRgb(val);
		inputColor2 = `rgb(${color.r},${color.g},${color.b})`;
		gradient = ctx.createLinearGradient(0,midY, 0, max_height);
        gradient.addColorStop(0, fill_line_color);
	    if (MoreColors) 
	    {
			gradient.addColorStop(0.4, inputColor1);
			gradient.addColorStop(0.8, inputColor2);
	    };
        gradient.addColorStop(1, linesColor);
		break; 
	case "NeonColor":
		var color = hexToRgb(val);
		NeonColor = `rgb(${color.r},${color.g},${color.b})`;
		break; 
	case "background":
		document.body.style.backgroundColor = val;
		break; 
	case "glow":
		glow = val;
		break; 
	case "fixneon":
		fixneon = val;
		break; 
	case "glowStrength":
		glowStrength = val;
		break; 
	case "amplitude":
		amplitude = val;
		break; 
	case "spectrumWidth":
		spectrumWidth = val;
		break; 
	case "spectrumScale":
		spectrumScale = Number(val)/100;
		break; 
	case "spectrumX":
		spectrumX = val/100;
		break; 
	case "spectrumY":
		spectrumY = val/100;
		break; 
	case "useImg":
		if(val){
            document.getElementById("backgroundImg").style.display = "inline";
        }
        else{
            document.getElementById("backgroundImg").style.display = "none";
        }
		break; 
	case "imgPath":
		imgName = val;
        document.getElementById("backgroundImg").setAttribute("src", "/"+val);
		break; 
	case "opacity":
		opacity = val/100;
		break; 
  }
}

function setSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let Wwidth = Math.round(window.innerWidth * spectrumScale);
  let Wheight = Math.round((window.innerHeight/2+amplitude) *spectrumScale);
  canvas.width = Wwidth;
  canvas.height = Wheight;
  
  max_height = (window.innerHeight * 0.5 );
  startPos = (window.innerWidth * 0.1 );
  vizWidth = (window.innerWidth * 0.8 );
  midY = canvas.height - canvas.height / 4;

	
  gradient = ctx.createLinearGradient(0,midY, 0, max_height);
  gradient = ctx.createLinearGradient(0,midY, 0, max_height);
  gradient.addColorStop(0, fill_line_color);
  if (MoreColors) 
	{
		gradient.addColorStop(0.4, inputColor1);
		gradient.addColorStop(0.8, inputColor2);
	};
  gradient.addColorStop(1, linesColor);

}

window.onload = () => {
  setSize();
};

window.onresize = () => {
  setSize();
};

function livelyAudioListener(audioArray) 
{
  maxVal = 1;
  for (var x of audioArray) {
    if (x > maxVal) maxVal = x;
  }
  maxVal *= 500/amplitude;

  const offSet = (vizWidth / audioArray.length)*spectrumScale;
  const arrMid = (audioArray.length / 2);
  ctx.fillStyle = fill_line_color;				  
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.lineJoin = "round";
  ctx.moveTo(startPos - offSet * 3, midY);
  ctx.lineTo(startPos, midY);
  let posInLine = -1;
  for (var x = 0; x < audioArray.length; x++) {
    posInLine++;
    ctx.lineTo(
      startPos + offSet * posInLine,
      midY - (audioArray[x] / maxVal) * max_height
    );
    if (square)
      ctx.lineTo(
        startPos + offSet * (posInLine + 1),
        midY - (audioArray[x] / maxVal) * max_height
      );
  }
  
  
  
  if (!remFilColor)
  {
	ctx.lineTo(startPos + offSet * (posInLine + (square ? 1 : 0)), midY);
	ctx.lineTo(startPos + offSet * (posInLine + (square ? 4 : 3)), midY);
	if (isGradient)
		ctx.fillStyle = gradient;
	
	gradient = ctx.createLinearGradient(0,midY, 0, max_height);
  gradient = ctx.createLinearGradient(0,midY, 0, max_height);
  gradient.addColorStop(0, fill_line_color);
  if (MoreColors) 
	{
		gradient.addColorStop(0.4, inputColor1);
		gradient.addColorStop(0.8, inputColor2);
	};
  gradient.addColorStop(1, linesColor);
	
	ctx.fill();
	
  };
  
  renderLine(linesColor);
}



function renderLine(color) {
  
  ctx.lineWidth = spectrumWidth;
  ctx.strokeStyle = color;
  ctx.globalAlpha = opacity;
  
  canvas.style.left = Math.round((window.innerWidth*spectrumX-canvas.width/2))+"px";
  canvas.style.top = Math.round((window.innerHeight*spectrumY-canvas.height))+"px";
  
    
	
	if (glow) {
    ctx.shadowBlur = glowStrength;
    ctx.shadowColor = NeonColor; 
	if (fixneon)
		ctx.clearRect(0, canvas.height, canvas.width, -((canvas.height)/4));
	
	}else{
        ctx.shadowBlur = 0;
    }
	
	if (DrawLine)
		ctx.stroke();
  
}



function interpolateColor(c0, c1, f){
    let color1 = c0.split(",");
    let color2 = c1.split(",");

    let r = Math.round(Number(color1[0])+ (Number(color2[0])-Number(color1[0]))*f);
    let g = Math.round(Number(color1[1])+ (Number(color2[1])-Number(color1[1]))*f);
    let b = Math.round(Number(color1[2])+ (Number(color2[2])-Number(color1[2]))*f);

    let rHex = Number(r).toString(16);
    if (rHex.length < 2) {
        rHex = "0" + rHex;
    }

    let gHex = Number(g).toString(16);
    if (gHex.length < 2) {
        gHex = "0" + gHex;
    }

    let bHex = Number(b).toString(16);
    if (bHex.length < 2) {
        bHex = "0" + bHex;
    }

    let out = "#"+rHex+gHex+bHex;
    
    return out;
}


function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}