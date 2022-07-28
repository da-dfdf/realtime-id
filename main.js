img = "";
status = "";
objects = [];

function preload(){
    
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();

    
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detection Started";
}

function modelLoaded(){
    console.log("model loaded");
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    status = true;

    
     
}
    

function gotResults(error, results){
    if(error){
        console.log(error);
    }

    console.log(results);
    objects = results;
}

function draw(){
    image(video,0,0,380,380);

    if(status != ""){
        

        objectDetector.detect(video, gotResults);
        for(i = 0; i<objects.length; i++){
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("objectNumber").innerHTML = "Number of objects are:" + objects.length;
            fill(r,g,b);
            stroke(r,g,b);
            
            accuracy = floor(objects[i].confidence*100);

            text(objects[i].label + " " + accuracy + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }

    
}