var xmlhttp = new XMLHttpRequest();
var url = "https://lab-5-server-7umyo.ondigitalocean.app/readDB";
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    console.log(myArr);
    myFunction(myArr);
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
  var out = "";
  var i;
  for (i = 0; i < arr.length; i++) {
    out += arr[i].name + ':' + arr[i].score + '<br>';
  }
  document.getElementById("holder").innerHTML = out;
}
