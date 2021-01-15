Webcam.set({
    width:310,
    height:240,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach(camera);

function capture() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'>";
    })
}
console.log("ml5 version: " + ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/A0DsJjt9P/model.json", model);

function model(){
    console.log("The model is loaded");
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, getResult);
}

function getResult(error , results){
    if (error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("identified_object").innerHTML = results[0].label;
        document.getElementById("accuracy_number").innerHTML = results[0].confidence.toFixed(3)*100  + "%";
        var synth = window.speechSynthesis;
    speech_data = results[0].label;
    var utter_this = new SpeechSynthesisUtterance(speech_data);
    synth.speak(utter_this);
    }
}