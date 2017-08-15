var scale = 1;

function drawScene(){
    tempIndex = 0;
    var myNode = document.getElementById("svg-container");
    while (myNode.firstChild) { myNode.removeChild(myNode.firstChild); }
    scale = Math.min( (document.getElementById("svg-container").offsetHeight-55) / maxHeight, 
        (document.getElementById("svg-container").offsetWidth-55) / maxWidth);
    scale += scale * (zoom / 10);
    var element = doSvgOuter(Patterns.pattern[patternIndex].w, Patterns.pattern[patternIndex].h, 0, 0);    
    element.appendChild( doRect(Patterns.pattern[patternIndex].w, Patterns.pattern[patternIndex].h, "gray") );    
    traverse(element, Patterns.pattern[patternIndex].shelves);
}

function traverse(ele, arr) {  
    for (var i in arr) {  
        if (arr[i].shelves) {
            var element = doSvg(arr[i].w, arr[i].h, arr[i].x, arr[i].y);
            element.appendChild( doRect(arr[i].w, arr[i].h, "gray", false) );            
            ele.appendChild( element );            
            traverse(element, arr[i].shelves);            
        } else {             
            var element = doSvg(arr[i].w, arr[i].h, arr[i].x, arr[i].y);
            element.appendChild( doRect(arr[i].w, arr[i].h, "lightgray", true) );
			element.onmouseover = function() { 
				var svg = ele.getElementsByTagName('rect');	
				for (i=0;i < svg.length;i++) { 
					svg[i].setAttributeNS(null, "stroke", "red");
					svg[i].setAttribute('stroke-width',"2px");
				}
			}
			element.onmouseout = function() { 
				var svg = ele.getElementsByTagName('rect');
				for (i=0;i < svg.length;i++) { 
					svg[i].setAttributeNS(null, "stroke", "black"); 
					svg[i].setAttribute('stroke-width',"1px");
				}
			} 
            ele.appendChild( element );
        }
    }
}	

function doSvgOuter(w,h, x, y) {    
    var element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    element.setAttribute('id','PATTERN');
    element.setAttribute('width', w * scale);
    element.setAttribute('height', h * scale);
    element.setAttribute('x', x * scale );
    element.setAttribute('y', y * scale);
    element.setAttribute('viewBox',"0 0 " + w * scale + " " + h * scale);    
    document.getElementById("svg-container").appendChild( element );    
    return element;	
}

function doSvg(w,h, x, y) {    
    var element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    element.setAttribute('width', w * scale);
    element.setAttribute('height', h * scale);
    element.setAttribute('x', x * scale);
    element.setAttribute('y', y * scale);
	element.setAttribute('viewBox',"0 0 " + w * scale + " " + h * scale);    
    document.getElementById("svg-container").appendChild( element );    
    return element;	
}

function doRect(w, h, color, flag, tempIndex2) {            
    var element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    element.setAttribute('width', w * scale);
    element.setAttribute('height', h * scale);
    element.setAttribute('stroke', "black");
    element.setAttribute('stroke-width',"1px");
    element.setAttribute('fill', color);    
    if (flag) {
        element.setAttribute('id', "svgItem" + tempIndex++);
        var tit = document.createElementNS("http://www.w3.org/2000/svg", "title");
        tit.innerHTML = w + 'x' + h;
        element.appendChild(tit);	
    }  	
    return element;
}
