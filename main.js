function setup()
{
   canvas=createCanvas(280,280);
   canvas.center();
   background("white");
   canvas.mouseReleased(classifyCanvas);
   synth=window.speechSynthesis;
}

function clearCanvas()
{
    background("white")
}

function preload()
{
    classifier=ml5.imageClassifier('DoodleNet');
}

function draw()
{
    strokeWeight(13);
    stroke("purple");
    if(mouseIsPressed)
    {
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}

function classifyCanvas()
{
   classifier.classify(canvas,gotResult);
}

function gotResult(error,results)
{
    if(error)
    {
        console.log(error)
    }

    else{
        console.log(results);
        document.getElementById("label").innerHTML="Label: "+ results[0].label;
        document.getElementById("confidence").innerHTML="Confidene: "+ Math.round( results[0].confidence*100)+"%";
        utter=new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utter);
    }
}