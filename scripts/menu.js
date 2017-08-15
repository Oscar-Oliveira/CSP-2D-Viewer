"use strict"

var tempIndex;

function CreateMenu() {    
    tempIndex = 0;    
    if (patternIndex == -1) { return; }    
    var b = document.getElementById('box-list');
    var i=0;
    while (true) {
        var x = document.getElementById(i++);
        if (x) { b.removeChild(x); }
        else { break; }
    }    
    var myNode = document.getElementById("box-items");
    while (myNode.firstChild) { myNode.removeChild(myNode.firstChild); }
    for (i=0; i < Patterns.pattern.length; ++i) {
        document.getElementById('box-list').appendChild( CreateBoxMenu(i, Patterns.pattern[i]) );            
        if (i == patternIndex) { CreateItemsMenu(Patterns.pattern[i]); }
    }  
}

function doP(text, className) {            
    var element = document.createElement('p');
    element.textContent = text;
    element.className = className;            
    return element;
}

function doPre(text, className) {            
    var element = document.createElement('pre');
    element.textContent = text;
    element.className = className;            
    return element;
}

function doA(text, className) {            
    var element = document.createElement('a');
    element.textContent = text;
    element.href = text;
    element.className = className;            
    return element;
}

function CreateBoxMenu(index, pattern) {    
    maxWidth = pattern.w > maxWidth ? pattern.w : maxWidth;
    maxHeight = pattern.h > maxHeight ? pattern.h : maxHeight;    
    var iDiv = document.createElement('div');
    iDiv.id = index;    
    iDiv.className = index == patternIndex ? 'box box1' : 'box box0';
    var iDiv2 = document.createElement('div');    
    iDiv2.className = index == patternIndex ? 'boxInfo itemInfo' : 'boxInfo';  
    var text = "Pattern " + index;    
    if (index == patternIndex) {                
        var img = document.createElement('img'); 
        img.src = "images/save.png";
        img.className = "imgRotated";        
        img.onclick = function (){        
            if (document.getElementById("canvasArea").style.display != "block") {
               document.getElementById("canvasArea").style.display = "block";
                canvg('canvas', document.getElementById('svg-container').innerHTML); 
            } else { document.getElementById("canvasArea").style.display = "none";  }
        };        
        iDiv2.appendChild( img );
    }       
    iDiv2.appendChild( doP(text, 'boxTitle') );
    text =  'Size: ' + pattern.w + "x" + pattern.h;         
    iDiv2.appendChild( doP( text, 'boxText') );
    text = 'Trim loss: ' + pattern.tl; 
    iDiv2.appendChild( doP(text, 'boxText') );
    text = 'Frequency: ' + pattern.f; 
    iDiv2.appendChild( doP(text, 'boxText') ); 
    text = 'Orientation: ' + pattern.o; 
    iDiv2.appendChild( doP(text, 'boxText') ); 
    iDiv.appendChild(iDiv2);  
    iDiv.onclick = function() { chnBox(index); };
    return iDiv;
}

function itemSelected(index, flag) {
    var svg = document.getElementById("svgItem" + index);
    svg.setAttributeNS(null, "fill", flag ? "#8b0000" : "lightgray");
}

function CreateItemsMenu(shelf) {    
    if (shelf.shelves) {
        for (var j=0; j < shelf.shelves.length; ++j) { CreateItemsMenu(shelf.shelves[j]); }
    } else { document.getElementById('box-items').appendChild( CreateItem( shelf ) ); }
}

function CreateItem(item) {        
    var iDiv = document.createElement('div');    
    iDiv.id = "Item" + tempIndex;
    var t = tempIndex;    
    iDiv.onmouseover = function() { itemSelected(t, true); }
    iDiv.onmouseout = function() { itemSelected(t, false); } 
    iDiv.className = 'box box1';
    var iDiv2 = document.createElement('div');    
    iDiv2.className = 'boxInfo itemInfo'; 
    if (item.r == 1) {                
        var img = document.createElement('img'); 
        img.src = "images/rotated.png";
        img.className = "imgRotated";
        iDiv2.appendChild( img );
    }   
    // var text = "Item ";
    // iDiv2.appendChild( doP(text, 'boxTitle') );
    var text =  'Item: ' + item.w + "x" + item.h;
    iDiv2.appendChild( doP( text, 'boxTitle') );
    text =  'Position: ' + item.x + "x" + item.y;
    iDiv2.appendChild( doP( text, 'boxText') );
    iDiv.appendChild(iDiv2); 
    tempIndex++;
    return iDiv;
}

function chnBox(index) {    
    if (patternIndex != index && document.getElementById("canvasArea").style.display == "block") { 
        document.getElementById("canvasArea").style.display = "none"; 
    }    
    patternIndex = index;
    CreateMenu();
    drawScene();
}