/*jslint browser:true */
/*global alert, myapp*/

myapp.view = function (controller) {
    'use strict';
    //Element Variables
    var btnStart = document.getElementById("butt1"),
        btnStats = document.getElementById("butt2"),
        btnOptions = document.getElementById("butt3"),
        btnQuit = document.getElementById("butt4"),
        btnNextQuestion = document.getElementById("buttNextQuest"),
        btnStatsReturnToMain = document.getElementById("buttReturnToMainStats"),
        buttQuizReturnToMain = document.getElementById("buttReturnToMainQuiz"),
        buttQuizEndReturnToMain = document.getElementById("buttReturnToMainQuizEnd"),
        buttOptionsEndReturnToMain = document.getElementById("buttReturnToMainOptions"),
        buttChangeNum = document.getElementById("buttChangeNum"),
        mainMenu = document.getElementById("main-menu"),
        quizDiv = document.getElementById("quiz"),
        quizEndDiv = document.getElementById("quizEnd"),
        statsDiv = document.getElementById("stats"),
        optionDiv = document.getElementById("options"),
        questionDiv = document.getElementById("Question"),
        questionNumber = document.getElementById("questNo"),
        resultsPara = document.getElementById("results"),
        statsPara = document.getElementById("statsPara"),
        changeQNum = document.getElementById("inputNewNum"),
        radiobutt1 = document.getElementById("rad1"),

        //labels for choices in the quiz
        choiAText = document.getElementById("choiATxt"),
        choiBText = document.getElementById("choiBTxt"),
        choiCText = document.getElementById("choiCTxt"),
        choiDText = document.getElementById("choiDTxt"),
        quizSource = document.getElementById("quizSrc"),
        quizAudio = document.getElementById("quizAudio"),

    //Timer vars
        timerword = document.getElementById('timer'),
        milliseconds = 0,
        seconds = 0,
        minutes = 0,
        t,
        timerCode;

    this.timer = function () {
        var theView = controller.returnView();
        t = setTimeout(theView.add, 10);
    };

    this.add = function () {
        var theView = controller.returnView();
        milliseconds += 1;
        if (milliseconds >= 100) {
            milliseconds = 0;
            seconds += 1;
        }

        if (seconds >= 60) {
            seconds = 0;
            minutes += 1;
        }

        timerCode = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds) + ":" + (milliseconds > 9 ? milliseconds : "0" + milliseconds);
        timerword.textContent = timerCode;
        theView.timer();
    };

    this.returnTime = function () {
        return seconds;
    };

    this.startTimer = function () {
        var theView = controller.returnView();
        theView.timer();
    };

    this.stopTimer = function () {
        clearTimeout(t);
    };
    
    this.changeQuestNum = function (newNum) {
        questionNumber.innerHTML = newNum;
    };
    
    this.resetRadButt = function () {
        radiobutt1.checked = "checked";
    };
    
    this.hideQuiz = function () {
        quizDiv.style.display = "none";
    };
    
    this.changeQuizSrc = function (newSrc) {
        quizSource.src = newSrc;
    };
    
    this.changeResultsPara = function (newStr) {
        resultsPara.innerHTML = newStr;
    };
    
    this.loadAudio = function (newNum) {
        quizAudio.load();
    };
    
    this.changeChoiA = function (newtext) {
        choiAText.innerHTML = newtext;
    };
    this.changeChoiB = function (newtext) {
        choiBText.innerHTML = newtext;
    };
    this.changeChoiC = function (newtext) {
        choiCText.innerHTML = newtext;
    };
    this.changeChoiD = function (newtext) {
        choiDText.innerHTML = newtext;
    };
    
    
    this.clear = function () {
        timerword.textContent = "00:00:00";
        milliseconds = 0;
        seconds = 0;
        minutes = 0;
    };
    //End of timer

    var closeApp = function () {
        window.close();
    };
    
    var goToQuiz = function () {
        mainMenu.style.display = "none";

        controller.createQuiz();
        var theView = controller.returnView();
        quizDiv.style.display = "inline";
        theView.stopTimer();
        theView.clear();
        theView.startTimer();

        quizDiv.style.display = "inline";
    };
    
    this.goToQuizEnd = function () {
        quizEndDiv.style.display = "inline";
    };

    var goToStats = function () {
        mainMenu.style.display = "none";
        statsDiv.style.display = "inline";
        statsPara.innerHTML = controller.returnAllReport();
    };

    var goToOptions = function () {
        mainMenu.style.display = "none";
        optionDiv.style.display = "inline";
    };
    
    var setQuizLength = function () {
        console.log('quiz length changed');
        controller.returnModel().getTheApp().quizLength = changeQNum.value;
    };

    var returnToMain = function () {
        statsDiv.style.display = "none";
        quizDiv.style.display = "none";
        quizEndDiv.style.display = "none";
        optionDiv.style.display = "none";
        mainMenu.style.display = "inline";
    };
    
    //Event Listeners
    btnStart.addEventListener("click", goToQuiz);
    btnStats.addEventListener("click", goToStats);
    btnQuit.addEventListener("click", closeApp);
    btnStatsReturnToMain.addEventListener("click", returnToMain);
    buttQuizReturnToMain.addEventListener("click", returnToMain);
    buttQuizEndReturnToMain.addEventListener("click", returnToMain);
    buttOptionsEndReturnToMain.addEventListener("click", returnToMain);
    btnNextQuestion.addEventListener("click", controller.displayNextQuestion);
    btnOptions.addEventListener("click", goToOptions);
    buttChangeNum.addEventListener("click", setQuizLength );
};