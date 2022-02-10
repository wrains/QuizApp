//declare variable question counter
let qNum = 1;
let corrNum = 0;
//add document object to display question number that the user is on
//derive the last number from length of array looking for .question-text class

let placementInQuiz = document.createElement('h3');
let parentContainer = document.getElementsByClassName('ecomm-quiz')[0];
let quizTitle = document.getElementsByClassName('quiz-title')[0];
let answers = [];
let correctAnswers = [];

//set correct answers array
correctAnswers = document.getElementsByClassName('correct-ans');
console.log(correctAnswers);

// console.log(parentContainer, quizTitle);
placementInQuiz.style.marginLeft = '25px';
quizTitle.parentNode.insertBefore(placementInQuiz, quizTitle.nextSibling);
placementInQuiz.textContent = `Question ${qNum} of ${document.querySelectorAll(".content-body").length}\:`;

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

if (qNum === 1) {
    document.getElementById('back-button').style.visibility = 'hidden'
}


function advQuestion(curr2) {

    //removes show-active
    let contentBodies = document.getElementsByClassName('content-body');

    for (let contentBody of contentBodies) {
        contentBody.classList.remove('show-active');
    }

    //add the show-active to the next question
    if (qNum === 2) {
        let q2 = document.getElementById('q2-body');
        console.log(q2);
        q2.classList.add('show-active');
        document.getElementById('back-button').style.visibility = 'visible'
    } else if (qNum === 3) {
        let q3 = document.getElementById('q3-body');
        console.log(q3);
        q3.classList.add('show-active');
        document.getElementById('back-button').style.visibility = 'visible'
    }
    else if (qNum === 1) {
        let q1 = document.getElementById('q1-body');
        console.log(q1);
        q1.classList.add('show-active');
        document.getElementById('back-button').style.visibility = 'hidden'
    }



}




//click listener for next button to increase qNum and switch the show-active property to the next question
let buttonNext = document.querySelectorAll('button')[1];
buttonNext.addEventListener('click', function (curr1) {

    let currInputs = document.getElementsByClassName('show-active')[0].getElementsByClassName('radio-buttons')
    let numChecked = 0;
    // for (const currInput of currInputs) {
    for (let ind = 0; ind < currInputs.length; ind++) {
        if (currInputs[ind].checked) {
            numChecked++;
            answers[ind] = currInputs[ind];
            console.log(answers[ind], 'array at index of stored answers');
            console.log(answers, 'whole array');
        }
    }

    if (numChecked < 1) {
        alert('Please Select an Answer');
    }

    //testing var values
    // console.log(currInputs, "currinputs for the questions radio selections");
    // console.log(numChecked);

    if (qNum < 3 & numChecked >= 1 & curr1.currentTarget.id === 'adv-button') {
        qNum++;
        numChecked = 0;
        placementInQuiz.textContent = `Question ${qNum} of ${document.querySelectorAll(".content-body").length}\:`;
        advQuestion(curr1);
        //function to advance to next question

    } else if (qNum < 3 & numChecked >= 1 & curr1.currentTarget.id === 'back-button') {
        qNum--;
        numChecked = 0;
        placementInQuiz.textContent = `Question ${qNum} of ${document.querySelectorAll(".content-body").length}\:`;
        advQuestion(curr1);
        //function to go back to last question

    }
    else if (qNum >= document.querySelectorAll(".content-body").length) {
        //calculate correct score percentage
        let corrects = document.querySelectorAll("input[value='correct']")
        for (const correct of corrects) {
            if (correct.checked) {
                corrNum++;
            } else {
                //do nothing
            }
        }


        let percent = corrNum / qNum * 100;
        percent = percent.toFixed(2);


        let contentBodies = document.getElementsByClassName('content-body');

        for (let contentBody of contentBodies) {
            contentBody.classList.add('show-active');
        }


        let percReport = document.createElement('h2');
        quizTitle.appendChild(percReport);
        percReport.textContent = `You got ${percent}% Correct`;
        percReport.style.color = 'green';
        percReport.style.textAlign = 'center';

        //hide placement in quiz, next button, timer
        placementInQuiz.style.visibility = 'hidden';
        buttonNext.style.visibility = 'hidden';
        buttonBack.style.visibility = 'hidden';
        document.getElementById('timer').style.visibility = 'hidden';
        let correctDivs = document.getElementsByClassName('correct-choice');
        for (const correctDiv of correctDivs) {
            correctDiv.style.backgroundColor = "#A9D8A9"

        }
        //add a button to retry
        let retryButton = document.createElement('button');
        retryButton.textContent = 'Try Again';
        parentContainer.appendChild(retryButton);
        retryButton.style.marginLeft = '25px';

        retryButton.addEventListener('click', function () {
            window.location.replace("index.html");
        })
        console.log(answers, 'print answers array');
    }
})

//function to go back to last question
let buttonBack = document.querySelectorAll('button')[0];
buttonBack.addEventListener('click', function (curr1) {

    qNum--;
    placementInQuiz.textContent = `Question ${qNum} of ${document.querySelectorAll(".content-body").length}\:`;
    advQuestion(curr1);

})


//current state on this file is that the arrays do not fill in correctly on the answers
//Not sure why - would need to research. Look up other quiz apps to compare
