let correct = 0;
let totalScore = 0;

function textAreaAdjust() {
    let x = document.getElementsByTagName("TEXTAREA");
    let i;
    for (i = 0; i < x.length; i++) {
        x[i].style.height = "1px";
        x[i].style.height = (1 + x[i].scrollHeight) + "px";
    }
}

function radioDisable(radioNum){
    let rad = document.getElementById(`q${radioNum}radio`);
    for (let i = 0; i < rad.length; i++) {
            rad[i].disabled = true;
    }
}

function radioEvent(quesNum, correctAns) {
    let rad = document.getElementById(`q${quesNum}radio`);
    let prev = null;
    
    for (let i = 0; i < rad.length; i++) {
        rad[i].addEventListener('change', function () {
            (prev) ? console.log(`Previous Val: ${prev.value}`) : null;
            if (this !== prev) {
                prev = this;
            }
            console.log(this.value);

            radioDisable(quesNum);

            let myAlert = document.getElementById('alertHolder-' + quesNum)
            if (this.value == correctAns) {
                myAlert.innerHTML = `<div class="alert alert-success alert-dismissible" role="alert">
                    <strong>Correct Answer!</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
                correct++;
                scoreCard();
            } else {
                myAlert.innerHTML = `<div class="alert alert-danger alert-dismissible" role="alert">
                    <strong>Wrong Answer!</strong> The correct answer is ${correctAns}.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', function (event) {
    let holder = document.getElementById("quizHolder_student");
    let quesData = JSON.parse(localStorage.getItem('formData'));
    // console.log(JSON.parse(quesData[0]));
    let quesData_parsed = [];
    if(quesData == null) {
        holder.innerHTML = `<div class="col-12 alert alert-danger" role="alert">
        <strong>Please Add Some Questions!</strong>
    </div>`;
    } else {
        for (let i = 0; i < quesData.length; i++){
            quesData_parsed.push(JSON.parse(quesData[i]))
        }
    }
    console.log((quesData_parsed));
    if (quesData_parsed.length == 0 || quesData_parsed==undefined || quesData_parsed==null) {
        holder.innerHTML = `<div class="col-12 alert alert-danger" role="alert">
                                <strong>Please Add Some Questions!</strong>
                            </div>`;
    } else {
        for (let i = 0; i < quesData_parsed.length; i++) {
            totalScore = quesData_parsed.length;
            holder.insertAdjacentHTML('beforeend', `
            <div class="question">
                <h4 class="number">
                    Question ${i + 1}
                </h4>
                <div>
                    <textarea id="textarea${i}"  readonly class="form-control" placeholder="No question" name="Question-textarea-${i}">${quesData_parsed[i].quesBody}</textarea>
                </div>
                <div>
                    <br>
                    <form name="ques${i}form" id="q${i}radio">
                        <input type="radio" name="ques${i}" value="1" /> a) ${quesData_parsed[i].answerArray[0]} <br />
                        <input type="radio" name="ques${i}" value="2" /> b) ${quesData_parsed[i].answerArray[1]} <br />
                        <input type="radio" name="ques${i}" value="3" /> c) ${quesData_parsed[i].answerArray[2]} <br />
                        <input type="radio" name="ques${i}" value="4" /> d) ${quesData_parsed[i].answerArray[3]} <br />
                    </form>
                </div>
                <div id="alertHolder-${i}">

                </div>
            </div>
            `);
            radioEvent(i, quesData_parsed[i].correctAnswer);
        }
        textAreaAdjust();
    }

    scoreCard();
    

});

function scoreCard(){
    let resultholder = document.getElementById("result_holder");
    resultholder.innerHTML = `<strong>SCORE: ${correct}/${totalScore}</strong>`
}