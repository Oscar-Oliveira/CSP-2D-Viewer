"use strict"

var JSONTODRAW = "";

var drop_zone_text_ok = "Drop File Here";
var drop_zone_text_error = "Drop JSON file";
 
handleFileSelectMSG(true, drop_zone_text_ok);
document.getElementById('drop-zone').addEventListener('dragover', handleDragOver, false);
document.getElementById('drop-zone').addEventListener('drop', handleFileSelect, false);

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files; 
    if (files.length == 1) {
        var file = files[0];
 
        var ext = (/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name) : undefined;
         
        if (ext == "json" ) {        
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onloadend = function(e) {  
                JSONTODRAW = reader.result;
				maxWidth = 0; maxHeight = 0, zoom = 0;
				document.getElementById("slider2").value = 0;
                InitNewProblem();             
				handleFileSelectMSG(true, file.name);  
            };
        } else { handleFileSelectMSG(false, drop_zone_text_error); }
    }
    else { handleFileSelectMSG(false, drop_zone_text_error); }
}
 
function handleFileSelectMSG(flag, text) { 
    document.getElementById('drop-zone-file').className = flag ? "drop-zone-ok" : "drop-zone-error";
    document.getElementById('drop-zone-file').textContent = text;   
}
 
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; 
    handleFileSelectMSG(true, drop_zone_text_ok);
}

var getQueryString = function ( field, url ) {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
};
 
function DownloadJSON() {
    var textToWrite = demoJson;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = "example.json"; 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.URL != null) {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    } else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
}

var demoJson = `{"pattern": [	 
    { "x":0,"y":0,"w":120,"h":80,"f":3,"tl":0,"o":"Vertical","shelves": [ 
        {"x":0,"y":0,"w":120,"h":80,"shelves": [
            {"x":0,"y":0,"w":120,"h":10,"r":1}, 
            {"x":0,"y":10,"w":120,"h":40,"shelves":[
                {"x":0,"y":0,"w":80,"h":40}, 
                {"x":80,"y":0,"w":10,"h":40}, 
                {"x":90,"y":0,"w":30,"h":40}
            ]}, 
            {"x":0,"y":50,"w":120,"h":30,"shelves": [
                {"x":0,"y":0,"w":60,"h":30}, 
                {"x":60,"y":0,"w":40,"h":30}
            ]}
        ]}
    ]}, 
    { "x":0,"y":0,"w":120,"h":120,"f":10,"tl":0,"o":"Horizontal","shelves": [
        {"x":0,"y":0,"w":120,"h":10}, 
        {"x":15,"y":25,"w":25,"h":25,"r":1}, 
        {"x":50,"y":30,"w":15,"h":55},
        {"x":75,"y":25,"w":25,"h":25},
        {"x":10,"y":90,"w":100,"h":15}
    ]}
]}`;

var qs = getQueryString('data');
if (qs != null) {    
    handleFileSelectMSG(false, "URL DATA AVAILABLE");    
    JSONTODRAW = decodeURIComponent(qs);    
    document.getElementById('drop-zone').onclick = clickToParseData;    
}

qs = getQueryString('demo');
if (qs != null) { 
    if (qs == "true") {
        handleFileSelectMSG(false, "DEMO AVAILABLE");
        document.getElementById('drop-zone').onclick = clickToDemo;
    }    
}

function clickToParseData() {
    handleFileSelectMSG(true, "URL DATA");    
    InitNewProblem();    
}

function clickToDemo() {
    handleFileSelectMSG(true, "DEMO"); 
    JSONTODRAW = demoJson; 
    InitNewProblem();    
}

function InitNewProblem() {    
    if (validadeJSON) {        
        var error = false;        
        try { Patterns = JSON.parse(JSONTODRAW); } 
        catch(e) { 
            handleFileSelectMSG(false, "JSON PARSE ERROR");
            console.error(e.message); 
            error = true;
        }     
        if (!error) {        
            require(["dojox/json/schema"], function () {                
                var result = dojox.json.schema.validate(Boxes, schema);
                if (!result.valid)  {
                    console.error("property : " + result.errors[0].property + "\nmessage :  "+ result.errors[0].message);                  
                    handleFileSelectMSG(false, "JSON PARSE ERROR");
                } else { DrawNewProblem(); }                 
            });
        }
    } else {
        Patterns = JSON.parse(JSONTODRAW);
        DrawNewProblem()
    }
}

function DrawNewProblem() { 
    patternIndex = 0;
    CreateMenu();
    drawScene();
}