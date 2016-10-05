/*global alert, myapp, window, document, chrome, console*/
var myapp = {};

myapp.model = function (view, controller) {
    'use strict';
    var theApp = "empty";


    function reorderArray(theArray) {
        var index = theArray.length, temporaryValue, randomIndex;

        while (0 !== index) {
            randomIndex = Math.floor(Math.random() * index);
            index -= 1;

            temporaryValue = theArray[index];
            theArray[index] = theArray[randomIndex];
            theArray[randomIndex] = temporaryValue;
        }
        return theArray;
    }

    this.displayNextQuestion = function () {
        //Checking prev questions
        var theModel = controller.returnModel();
        if (document.querySelector('input[name="choices"]:checked').value === "A") {
            theModel.checkAns(0);
        }
        if (document.querySelector('input[name="choices"]:checked').value === "B") {
            theModel.checkAns(1);
        }
        if (document.querySelector('input[name="choices"]:checked').value === "C") {
            theModel.checkAns(2);
        }
        if (document.querySelector('input[name="choices"]:checked').value === "D") {
            theModel.checkAns(3);
        }

        theApp.incrQuestionNo();

        view.resetRadButt();

        if (theApp.returnQuestionNo() >= theApp.quizLength) {
            theModel.endQuiz();
            return;
        }
		
		
        var question = theApp.theQuiz.returnQuestion(theApp.returnQuestionNo());

        view.changeQuestNum(theApp.returnQuestionNo() + 1);
		var questDiv = document.getElementById('question');
		questDiv.innerHTML = question.answer;

        view.changeChoiA(question.choices[0].text);
        view.changeChoiB(question.choices[1].text);
        view.changeChoiC(question.choices[2].text);
        view.changeChoiD(question.choices[3].text);
    };

    this.checkAns = function (choice) {
        console.log(theApp.theQuiz.questions[theApp.returnQuestionNo()].choices[choice]);
        if (theApp.theQuiz.questions[theApp.returnQuestionNo()].choices[choice].correct === true) {
            theApp.theQuiz.questions[theApp.returnQuestionNo()].setCorrect();
        }
    };

    //Stats Class
    var Stats = function (newNumRight, newNumTotal, newTime) {
        this.numRight = newNumRight;
        this.numTotal = newNumTotal;
        this.time = newTime;
    },

        //Create quiz
        Choice = function (newText, newCorr) {
            this.correct = newCorr;
            this.text = newText;
            console.log(this);
        },

        Question = function () {
			this.answer = ""
            this.choices = [];
            this.correct = false;
			//CHANGE THIS

            this.audio = theApp.allQuestions[theApp.returnQuestionNo()];
            console.log(theApp.returnQuestionNo());
            console.log(this.audio);
            console.log(theApp.allQuestions);
			
			this.answer = this.audio.q
            this.choices.push(new Choice(this.audio.a1, true));
			this.choices.push(new Choice(this.audio.a2, false));
			this.choices.push(new Choice(this.audio.a3, false));
            this.choices.push(new Choice(this.audio.a4, false));

            this.choices = reorderArray(this.choices);
            delete this.audio;

            this.setCorrect = function () {
                this.correct = true;
            };
        },

        Quiz = function () {
            var i;
            this.questions = [];
            theApp.resetQuestionNo();
            for (i = 0; i < theApp.quizLength; i += 1) {
                this.questions.push(new Question());
                theApp.incrQuestionNo();
            }
            theApp.resetQuestionNo();
            this.questions = reorderArray(this.questions);
            console.log(this.questions);
        },

        TheApp = function () {
            this.currentQuestion = 0;
            this.quizLength = 10;
            this.allQuestions = [];
            this.report = [];
            this.theQuiz = null;
        };

    Quiz.prototype.returnQuestion = function (questNo) {
        return this.questions[questNo];
    };

    TheApp.prototype.returnQuestionNo = function () {
        return this.currentQuestion;
    };

    TheApp.prototype.wordsLength = function () {
		//CHANGE THIS
		//find amount of questions and return them
    };

    TheApp.prototype.resetQuestionNo = function () {
        this.currentQuestion = 0;
    };

    TheApp.prototype.incrQuestionNo = function () {
        this.currentQuestion += 1;
    };

    TheApp.prototype.reorderAudio = function () {
        this.allQuestions = reorderArray(this.allQuestions);
    };

    TheApp.prototype.returnLastReport = function () {
        if (theApp.report.length > 0) {
            return 'You got ' + theApp.report[theApp.report.length - 1].numRight + ' of ' + theApp.report[theApp.report.length - 1].numTotal + ' correct in ' + theApp.report[theApp.report.length - 1].time + ' seconds!';
        }
        return "no reports";
    };

    TheApp.prototype.returnAllReport = function () {
        var i, string = "Your Previous tests:<br/>";
        if (theApp.report.length > 0) {
             //check this later
            for (i = 0; i < theApp.report.length; i += 1) {
                string = string + theApp.report[i].numRight + ' of ' + theApp.report[i].numTotal + ' correct in ' + theApp.report[i].time + ' seconds! <br/>';
            }
            return string;
        }
        return "no reports";
    };

    TheApp.prototype.createQuiz = function () {
        theApp.theQuiz = new Quiz();
        theApp.resetQuestionNo();
        theApp.reorderAudio();
        
        console.log("create quiz");
        console.log(theApp);

        var question = theApp.theQuiz.returnQuestion(theApp.returnQuestionNo());

        view.changeQuestNum(theApp.returnQuestionNo() + 1);
		var questDiv = document.getElementById('question');
		
		questDiv.innerHTML = question.answer;
		console.log(question.answer);
        view.changeChoiA(question.choices[0].text);
        view.changeChoiB(question.choices[1].text);
        view.changeChoiC(question.choices[2].text);
        view.changeChoiD(question.choices[3].text);
    };

    TheApp.prototype.loadallQuestions = function () {
        theApp.allQuestions = [];
        theApp.allQuestions.push({q: "What speed must you slow down too if you see an accident sign while driving?", a1: "20km", a2: "30km", a3: "40km", a4: "10km"});
		theApp.allQuestions.push({q: "When can you pass another vehicle? ", a1: "When you have a clear line of sight of at least 100 meters ahead of you", a2: "When you think there are no other cars coming", a3: "While rounding a corner, as it will give you more room to get past", a4: "When the car in front turns on it's hazard lights to let you past"});
		theApp.allQuestions.push({q: "When should you apply the 4 second rule?", a1: "In hazardous conditions, such as wet or icy roads", a2: "To ensure you have 4 seconds to pass a car", a3: "When you are 4 seconds away from a corner start indicating", a4: "Start indicating 4 seconds before you change lanes"});
		theApp.allQuestions.push({q: "What does a painted white diamond on the road mean? ", a1: "You are approaching a pedestrian crossing", a2: "You are approaching a give way sign", a3: "A stop sign is coming up", a4: "A diamond store is nearby"});
		theApp.allQuestions.push({q: "When coming up to a stop sign, where should you stop? ", a1: "Where you can see vehicles coming from all directions", a2: "1 meter behind the line ", a3: "1 meter in front of the line ", a4: "Halfway over the line"});
		theApp.allQuestions.push({q: "You are driving and feeling extremely tired, what should you do? ", a1: "Pull over and rest", a2: "Keep going, but get to your destination as quickly as possible ", a3: "Take long blinks", a4: "Spray your face with water and turn your music up to stay awake "});
		theApp.allQuestions.push({q: "What should you do if you miss your exit on the motorway?", a1: "Use the next exit ", a2: "Pull over and reverse back to the exit ", a3: "Do a U-turn at the next possible gap ", a4: "Pull over and put your hazard lights on "});
		theApp.allQuestions.push({q: "When must you signal if you are going to turn?", a1: "3 seconds before you make the turn", a2: "10 seconds before you make the turn ", a3: "When there is another car waiting for you to turn ", a4: "When there are pedestrians waiting to cross "});
		theApp.allQuestions.push({q: "When must you turn on your headlights? ", a1: "When visibility is less than 100m ", a2: "When it is past 6pm ", a3: "When a car is coming towards you at night ", a4: "All of the above "});
		theApp.allQuestions.push({q: "When can you stop on a motorway? ", a1: "Only in an emergency ", a2: "When you miss your exit ", a3: "If there is a duckling crossing the road", a4: "When you need a place to park "});
		theApp.allQuestions.push({q: "What should entrances into public car parks be treated as? ", a1: "Intersections", a2: "A normal turn ", a3: "A roundabout ", a4: "A motorway off ramp"});
		theApp.allQuestions.push({q: "What type of light do you want to use in fog?", a1: "Low beam", a2: "Fog lights", a3: "High beam ", a4: "No lights "});
		theApp.allQuestions.push({q: "What should you do after driving through surface water?", a1: "Pump your brakes a few times to dry them out ", a2: "Speed up to dry your wheels out ", a3: "Stop and air out your tires ", a4: "Put your handbrake on while driving "});
		theApp.allQuestions.push({q: "You are driving and your mobile phone rings, what should you do? ", a1: "Pull over to the side of the road to answer the phone ", a2: "Answer it, but keep your eyes on the road ", a3: "Answer it, but put it on speaker ", a4: "Answer it, but hold it low so no one can see "});
		theApp.allQuestions.push({q: "What should you do if a vehicle starts to pass you?", a1: "Move over to the left to allow them to pass ", a2: "Speed up and don't let them pass ", a3: "Honk your horn ", a4: "Come to a complete stop and let them pass "});
		theApp.allQuestions.push({q: "You are required to undergo a breath screening test when requested by? ", a1: "A police officer", a2: "A member of the public ", a3: "A doctor", a4: "An ambulance officer "});
		theApp.allQuestions.push({q: "If anybody is hurt in a crash, the driver must tell a police officer as soon as possible but within? ", a1: "24 Hours", a2: "36 Hours ", a3: "48 Hours", a4: "56 Hours"});
		theApp.allQuestions.push({q: "When turning right at a roundabout, you must?", a1: "Indicate right before entering the roundabout", a2: "Indicate left before entering the roundabout", a3: "Not indicate at any time on the roundabout ", a4: "Indicate right when leaving the roundabout"});
		theApp.allQuestions.push({q: "When turning left into a driveway, slow down and? ", a1: "Signal for 3 seconds or more and if the driveway is clear then enter", a2: "Check the driveway is clear and enter ", a3: "Signal only if there is a vehicle behind you and enter ", a4: "Signal only if another vehicle is coming towards you and enter"});
		theApp.allQuestions.push({q: "You may stop on a motorway only?", a1: "If there is an emergency", a2: "To let down or pick up passengers", a3: "To make a U-turn ", a4: "To stop and take a photo "});
		theApp.allQuestions.push({q: "A white diamond painted on the road means that you are coming up to? ", a1: "A pedestrian crossing", a2: "Traffic signals ", a3: "A roundabout", a4: "An Intersection"});
		theApp.allQuestions.push({q: "After driving through surface water, you should? ", a1: "Pump your vehicle brakes gently", a2: "Not brake for the next 500 metres ", a3: "Brake heavily 2 or 3 times ", a4: "Stop and wait for your vehicle to dry out "});
		theApp.allQuestions.push({q: "If you are driving and you want to use a cellphone you should? ", a1: "Pull over and stop to use the cellphone when it is safe to do so", a2: "Slow down to answer the call when it is safe to do so ", a3: "Answer the call at the next set of traffic signals ", a4: "Stop in the flush median to answer calls when it is safe to do so "});
		theApp.allQuestions.push({q: "When there are farm animals coming towards you on the road, you should? ", a1: "Slow down and pull over to the side of the road", a2: "Sound your vehicle horn loudly until the animals move ", a3: "Get a passenger to clear a path through the animals ", a4: "Ask the farmer to move the animals quickly "});
		theApp.allQuestions.push({q: "What should you do if the vehicle behind you wishes to pass? ", a1: "Move as far to the left side of the road as is safe", a2: "Speed up so that they will not need to pass ", a3: " Move to the centre so that they cannot pass ", a4: "Move as far to the right side of the road as is safe "});
		theApp.allQuestions.push({q: "You have a restricted licence. A condition for driving at night without a supervisor is that you MUST NOT drive between? ", a1: "10 pm and 5 am* ", a2: "11 pm and 7 am ", a3: "7 pm and 8 am ", a4: "8 pm and 8 am "});
		theApp.allQuestions.push({q: "What may you do at traffic signals if there is a green arrow pointing to the right and a red light showing at the same time? ", a1: "You may turn right", a2: "You may go straight ahead ", a3: "You must stop until all lights turn green ", a4: "You may turn left or right "});
		theApp.allQuestions.push({q: "What should you do when following another vehicle in wet conditions? ", a1: "Apply the 4-second rule", a2: "Drive closer to the vehicle so that you can follow in its tracks ", a3: "Drive with your vehicle handbrake on ", a4: "Apply the 2-second rule "});
		theApp.allQuestions.push({q: "When driving at night, which vehicle lights should you turn on?", a1: "Headlights", a2: "Park lights ", a3: "Interior lights ", a4: "Hazard lights "});
		theApp.allQuestions.push({q: "What is the safest way to drive up to intersections? ", a1: "At such a speed that you can stop if you have to", a2: "Looking to the left ", a3: "Travelling at the speed limit ", a4: "Looking to the right "});
		theApp.allQuestions.push({q: "How close can you park your vehicle to the approach side of a pedestrian crossing where no broken yellow lines have been marked? ", a1: "6 metres", a2: "5 metres", a3: "4 metres ", a4: "3 metres"});
		theApp.allQuestions.push({q: "What is the maximum distance a load may overhang your vehicle behind the rear axle? ", a1: "4 metres", a2: "5 metres ", a3: "6 metres", a4: "7 metres "});
		theApp.allQuestions.push({q: "Your vehicle has a current warrant of fitness but a rear red stop light is not working. What do you do? ", a1: "Have the fault repaired immediately", a2: "Continue to drive the vehicle ", a3: "Only use the vehicle during daylight hours ", a4: "Only use the vehicle in a 50 km/h speed area "});
		theApp.allQuestions.push({q: "If your car is more than 6 years old, you must renew its warrant of fitness every?", a1: "6 months", a2: "12 months ", a3: "9 months ", a4: "3 months"});
		theApp.allQuestions.push({q: "A warrant of fitness is to show? ", a1: "That the vehicle was roadworthy at the time of checking", a2: "How many times the vehicle has crashed ", a3: "If the driver has had any crashes ", a4: "The year the vehicle was made "});
		theApp.allQuestions.push({q: "If yellow traffic signals are flashing it means? ", a1: "The traffic signals are not working, apply the give way rules", a2: "Emergency vehicles are about to come through ", a3: "Vehicles may only proceed straight ahead and not turn ", a4: "That a crash has just happened"});
		theApp.allQuestions.push({q: "What is the least distance of clear road you must have in front of you when you have finished passing another vehicle?", a1: "100 metres", a2: "200 metres", a3: "150 metres ", a4: "50 metres "});
		theApp.allQuestions.push({q: "When passing a bus displaying a School sign that has stopped to let children on or off, what should your speed be? ", a1: "20kph", a2: "50kph ", a3: "70 kph ", a4: "100kph "});
		theApp.allQuestions.push({q: "When a flock of sheep are coming towards you on a country road, you should? ", a1: "Slow down or pull over to the side of the road", a2: "Sound the horn on your vehicle to move them ", a3: "Turn on your vehicle hazard lights and continue driving ", a4: "Turn on your vehicle headlights and then continue driving "});
		theApp.allQuestions.push({q: "In wet or frosty conditions, what rule should you use to judge a safe following distance? ", a1: "The 4 Second rule", a2: "The 3 Second rule ", a3: "The 2 Second rule ", a4: "The 1 Second rule"});
		theApp.allQuestions.push({q: "Who is responsible for making a child under 14 years use a safety belt or a safety seat in a vehicle? ", a1: "The driver of the vehicle", a2: "The child ", a3: "The owner of the vehicle ", a4: "The child’s parents "});
		theApp.allQuestions.push({q: "When can you park your vehicle on the right-hand side of the road? ", a1: "In a one-way street where you may park on both sides of the road", a2: "If you are not parked over a fire hydrant ", a3: "Up to 1 metre from an intersection ", a4: "In a two-way street "});
		theApp.allQuestions.push({q: "What does a blue reflector placed on the road mean?", a1: "Fire Hydrant", a2: "The left side of the road", a3: "No Passing", a4: "The centre of the road"}); 
		theApp.allQuestions.push({q: "How can small amounts of alcohol affect your driving?", a1: "It will alter your senses", a2: "You can judge your speed more easily", a3: "Your driving reactions will be quicker", a4: "Your driving improves"}); 
		theApp.allQuestions.push({q: "You are driving at night and see a vehicle coming towards you with its headlights on high beam. Where should you be looking?", a1: "At the left side of the road", a2: "At the vehicle coming towards your", a3: "At the far right of the road", a4: "At the center of the road"}); 
		theApp.allQuestions.push({q: "What must you do when you come up to a red light showing at traffic signals?", a1: "Stop and wait until it changes to a green light", a2: "Go on slowly if no other traffic is coming", a3: "Stop and then go on carefully", a4: "Stop only if other vehicles are coming from the right"}); 
		theApp.allQuestions.push({q: "What should you do if you are driving and become sleepy?", a1: "Move off to the left of the road and have a rest", a2: "Keep on driving but use a lower gear", a3: "Drive on the far left side of the road", a4: "Speed up so that you can get home quickly"}); 
		theApp.allQuestions.push({q: "If you tow another vehicle, what is the maximum distance allowed between the two vehicles?", a1: "4 metres", a2: "2 metres", a3: "3 metres ", a4: "1 metre"}); 
		theApp.allQuestions.push({q: "What is the minimum tread depth required for car tyres? ", a1: "1.5 mm", a2: "1.0 mm", a3: "0.5 mm", a4: "2.00 mm"}); 
		theApp.allQuestions.push({q: "At night, a towed vehicle must?", a1: "Have a red light at the back", a2: "Have its hazard lights on", a3: "Be sounding its horn", a4: "Be travelling slower than 50 km/h "}); 
		theApp.allQuestions.push({q: "Your vehicle has a current warrant of fitness but a rear red stop light is not working. What do you do? ", a1: "Have the fault repaired immediately", a2: "Continue to drive your vehicle", a3: "Only use your vehicle in a 50 km/h speed area", a4: "Only use your vehicle during daylight hours"}); 
		theApp.allQuestions.push({q: "The \"speed limit\" means? ", a1: "The Fastest speed you can drive in good conditions", a2: "The Average speed you can drive in good conditions ", a3: "The Fastest speed you can drive, except when overtaking ", a4: "The Slowest speed you can drive in good conditions "}); 
		theApp.allQuestions.push({q: "You are driving past a line of parked cars. You notice a ball bouncing out into the road ahead. What do you do? ", a1: "Slow down and be prepared to stop for children", a2: "Slow down and move to the right-hand side of the road ", a3: "Keep driving at the same speed and flash the vehicle’s headlights ", a4: "Keep driving at the same speed"}); 
		theApp.allQuestions.push({q: "A vehicle should not send out visible smoke for more than? ", a1: "10 seconds", a2: "8 seconds", a3: "5 seconds", a4: "3 seconds"}); 
		theApp.allQuestions.push({q: "You are driving on a road with marked lanes and you are in the lane with an arrow showing a left turn only. What must you do?", a1: "Turn left", a2: "Not signal", a3: "Turn right", a4: "Drive straight ahead"}); 
		theApp.allQuestions.push({q: "When would you use the 2-second rule?", a1: "When following another vehicle", a2: "When reversing from a carpark", a3: "When parking your vehicle", a4: "When signaling for a right turn"}); 
	};
	
    this.getTheApp = function () {
        return theApp;
    };

    this.setTheApp = function (newApp) {
        theApp = newApp;
    };

    this.endQuiz = function () {
        var newNumRight = 0,
            newNumTotal = theApp.quizLength,
            newTime = 5,
            i;

        for (i = 0; i < theApp.quizLength; i += 1) {
            if (theApp.theQuiz.questions[i].correct) {
                newNumRight += 1;
            }
        }
        view.hideQuiz();

        theApp.report.push(new Stats(newNumRight, newNumTotal, view.returnTime()));

        //Make stats
        chrome.storage.sync.set({'stats': theApp.report}, function () {});
        //Display Stats
        console.log(theApp.report[theApp.report.length - 1]);

        view.changeResultsPara(theApp.returnLastReport());

        view.goToQuizEnd();
    };

    //Create the app object which holds quizes and other info
    theApp = new TheApp();
    theApp.loadallQuestions();
    chrome.storage.sync.get('stats', function (data) {
        if (data.stats === undefined) {
            chrome.storage.sync.set({'stats': []}, function () {});
            theApp.report = [];
            chrome.storage.sync.get('stats', function (data) {
                console.log(data.stats);
                theApp.report = data.stats;
            });
        } else {
            theApp.report = data.stats;
        }
    });
};