function loadForm() {
    var nameString = document.getElementById("name").value;
    var score = parseInt(document.getElementById("score").value);

    console.log(`${nameString} : ${score}`);

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    var url = "https://lab-5-server-7umyo.ondigitalocean.app/writeDB";

    // var url = 'http://localhost:8080/writeDB'

    xmlhttp.open("POST", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({ "name": nameString, "score": score }));

    console.log(xmlhttp.responseText);
    document.getElementById("demo").innerHTML = JSON.parse(xmlhttp.responseText).result;
}
