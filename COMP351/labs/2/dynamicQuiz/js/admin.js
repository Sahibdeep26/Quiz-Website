const addQuestions = e => {
    let answerArr = [];
    for (let i = 1; i < 5; i++) {
        answerArr.push(document.getElementById(`option${i}`).value)
    }

    let radios = document.getElementsByName('Answer');
    let radioVal = 0;

    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            radioVal = radios[i].value;
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }
    let formData = {
        quesHead: document.getElementById('question').value,
        quesBody: document.getElementById('question').value,
        answerArray: answerArr,
        correctAnswer: radioVal
    }
    appendToStorage('formData', JSON.stringify(formData));
    console.log(localStorage.getItem('formData'));
    //dispData();
	 countNoOfQuestions();
    //e.preventDefault();
    window.location.reload()
}

function appendToStorage(name, data) {
    // Loading
    var olddata = JSON.parse(localStorage.getItem(name) || "[]");
    console.log("# of items: " + olddata.length);

    olddata.push(data);
    console.log(olddata);

    // Saving
    localStorage.setItem(name, JSON.stringify(olddata));

}

function saveQuiz() {
    alert("Quiz Saved"); 
}

function deleteFromStorage() {
    var olddata = JSON.parse(localStorage.getItem('formData') || "[]");
    console.log("# of items: " + olddata.length);

    olddata.pop();
    console.log(olddata);

    // Saving
    localStorage.setItem('formData', JSON.stringify(olddata));
    countNoOfQuestions();
}

function deleteItems() {
    // Clear localStorage items 
    localStorage.clear();
    var olddata = JSON.parse(localStorage.getItem('formData') || "[]");
    console.log("# of items: " + olddata.length);
    console.log(olddata);
    // Saving
    localStorage.setItem('formData', JSON.stringify(olddata));
    countNoOfQuestions();
}

function countNoOfQuestions(){
    var olddata = JSON.parse(localStorage.getItem('formData'));
    console.log("# of items: " + olddata.length);
    var output=document.getElementById('output');
    output.innerHTML=`<h2>Total Questions: ${olddata.length}</h2>`
}

function empty() {
    var questions,option1,option2,option3,option4;
    questions=document.getElementById("question").value;
    option1=document.getElementById('option1').value;
    option2=document.getElementById('option2').value;
    option3=document.getElementById('option3').value;
    option4=document.getElementById('option4').value;
    let radios = document.getElementsByName('Answer');
    let radioVal = 0;

    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            radioVal = radios[i].value;
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }
    if ((questions == "")||(option1 == "")||(option2 == "")||(option3 == "")||(option4 == "")||(radioVal == "0")) {
        alert("Please enter all the information needed for the question");
        return false;
}
else{
    addQuestions();
}
}
console.log(localStorage.getItem('formData'));
countNoOfQuestions();


