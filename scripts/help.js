 var z = function () {
    
    var iDiv = document.createElement('div');

    iDiv.appendChild( doP("> Author", 'popupTitle') );
    p = doP("Name: ", 'popupText');

    var element = document.createElement('a');
    element.href = "https://www.linkedin.com/in/oscaroliveira";
    element.textContent = "Óscar Oliveira";
    element.target = "_blank";

    p.appendChild(element, '');
    iDiv.appendChild( p );

    iDiv.appendChild( doP("Email: oscar.m.oliveira@gmail.com", 'popupText') );

    iDiv.appendChild( doP("> Demo", 'popupTitle') );
	
	p = doP("Click the link bellow and then click the drop file zone (top left corner).", 'popupText');
	iDiv.appendChild( p );
	
    p = doP("Link: ", 'popupText');
    p.appendChild(doA("index.htm?demo=true", ''));
    iDiv.appendChild( p );

    var demotext = 'index.htm?data={"pattern":[{"x":0,"y":0,"w":120,"h":120,"f":10,"tl":0,"o":"Horizontal","shelves":[{"x":0,"y":0,"w":120,"h":10},{"x":15,"y":25,"w":25,"h":25,"r":1},{"x":50,"y":30,"w":15,"h":55},{"x":75,"y":25,"w":25,"h":25},{"x":10,"y":90,"w":100,"h":15}]}]}';

    iDiv.appendChild( doP("> URL PARAMATER", 'popupTitle') );
    
	p = doP("Click the link bellow and then click the drop file zone (top left corner).", 'popupText');
	iDiv.appendChild( p );
	 
	p = doP("Example: ", 'popupText');
    p.appendChild(doA(demotext, ''));
    iDiv.appendChild( p );

    iDiv.appendChild( doP("> JSON Example", 'popupTitle') );

    p = document.createElement('p');   
    element = document.createElement('a');
    element.href = "#";
    element.className = "popupText";
    element.textContent = "Download";
    element.onclick = DownloadJSON; 
    p.appendChild(element);        
    iDiv.appendChild( p );

    iDiv.appendChild (doPre(demoJson, 'popupText')) 

    document.getElementById("popup").appendChild(iDiv);
};

document.getElementById("show").onclick = (function() {
    if (document.getElementById("opacity-provider").style.display == "block") {
        document.getElementById("opacity-provider").style.display = "none";
    } else { document.getElementById("opacity-provider").style.display = "block"; }
});

z();