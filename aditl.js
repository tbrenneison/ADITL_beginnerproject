//set defaults
var coffee = 2;
var goodDay = 5; 
var emails = 0;
var lazyChoices = 0; 
var workDone = 0;
var meetingsLeft = randomizer(5);
var workHoursLeft = 8;

function viewStats() { 
	var isGoodDay; 
	var isProductive = "unproductive"; 
	var managerWatching = randomizer(5); 
	var lazyLevel; 

	if (goodDay >= 8) {
		isGoodDay = "very good";
	}
	else if (goodDay <= 7 && goodDay >= 4) { 
		isGoodDay = "alright"; 
	}
	else if (goodDay <= 3) { 
		isGoodDay = "pretty bad"; 
	}
	else if (goodDay < 0) { 
		isGoodDay = "awful"; 
	}
	if (workDone >= 3) { 
		isProductive = "productive";
	}
	if (managerWatching > 3) { 
		if (lazyChoices => 3) { 
			lazyLevel = "Your manager is watching; you might want to be less lazy."}
			else {
				lazyLevel = "";
			}
		}
		else { 
			lazyLevel = ""; 
		}

		alert("There are " + workHoursLeft + " hours left in the workday.  You've had " + coffee + " cups of coffee and need to attend " + meetingsLeft + " more meetings. \nToday is " + isGoodDay + " so far and you have been " + isProductive + ".\n" + lazyLevel);
	}

	function randomizer(max) { 
		var randomNumber = Math.floor(Math.random()*(max)+1)
		return randomNumber;
	}

	function start(){ 
		arriveWork();
	}

	function arriveWork() { 
		var options = [ 
			"1 - get coffee", 
			"2 - check email", 
			"3 - chat with coworkers", 
		];
		var chooseTask = prompt("You arrive at work and go to your desk.  What's the first thing you do? \n" + options.join("\n"));
		if (chooseTask == "1") { 
			getCoffee();
		}
		else if (chooseTask == "2") { 
			checkEmail();
		}
		else if (chooseTask == "3") { 
			chatWithCoworkers(); 
		}
		else if (chooseTask == null) {
			alert("Are you sure you want to quit the game?"); 
			return;
		}
		else { 
			alert("Sorry, that wasn't a valid option."); 
			arriveWork(); 
		}
	}

	function getCoffee() {
		alert("You go to the diner and refill your coffee mug."); 
		coffee++; 
		var ohNoes = randomizer(100); 
		if (ohNoes > 85) { 
			alert("Your very attractive coworker comes into the diner and startles you.  You spill the coffee on your shirt and embarass yourself."); 
			goodDay--; 
		}
		viewStats();
		whatNext();
	}

	function checkEmail() { 
		var messageNumber = randomizer(40); 
		emails = emails + messageNumber;
		var options = [
			"1 - read them all now", 
			"2 - only read the important-looking ones", 
			"3 - close your inbox and ignore them until later"
		]
		var emailChoice = prompt("You open Outlook and see you have " + emails + " new emails.  What do you want to do? \n" + options.join("\n"));
		if (emailChoice == "1") { 
			alert("You sit down and read through your entire inbox.  Half of the messages don't even apply to you or your job.  When you finish reading, you realize you are five minutes late for a meeting and will have to run to the conference room."); 
			goodDay = goodDay - 2;
			workHoursLeft--;
			attendMeeting();
		}
		else if (emailChoice == "2") {
			lazyChoices++; 
			alert("You skim through your inbox and read the emails that look the most important."); 
		}
		else if (emailChoice == "3") { 
			lazyChoices = lazyChoices + 2;
			alert("You close Outlook, deciding to tackle your inbox later.");  
		}
		viewStats(); 
		whatNext();
	}

	function writeCode() { 
		workDone++;
		lazyChoices--;
		alert("You open up the IDE, spin up the server and crank out some code.");
		workHoursLeft--;
		viewStats(); 
		whatNext(); 
	}

	function reviewPullRequest() {
		workDone++; 
		alert("You review your coworker's code and give them some tips on how to improve it."); 
		workHoursLeft = workHoursLeft - .5; 
		viewStats(); 
		whatNext(); 
	}

	function chatWithCoworkers() { 
		var options = [ 
			"1 - yes", 
			"2 - no"
		]
		var hearStory = prompt("The guys in your pod have a story they want to tell you.  Do you want to hear it?\n" + options.join("\n")); 
		if (hearStory == "1") { 
			alert("The guys tell you a story, but they keep interrupting each other and asking 'clarifying' questions for comedic effect.  Before you know it, you've been talking for half an hour and are late for your meeting."); 
			lazyChoices++; 
			goodDay++;
			workHoursLeft = workHoursLeft - .5; 
			attendMeeting();
		}
		if (hearStory == "2") {
			alert("The guys tell you that you're no fun, and everyone gets back to doing work."); 
			workDone++; 
		}
		viewStats();
		whatNext();
	}

	function checkCalendar() { 
		alert("You check your calendar.  You have " + meetingsLeft + " meetings to attend today."); 
		viewStats(); 
		whatNext();
	}

	function attendMeeting() { 
		if (meetingsLeft == 0) { 
			alert("You arrive at the conference room.  Too late, you realize that you don't actually need to go to this meeting.  You look like an idiot in front of everyone as you back slowly out of the room."); 
			goodDay--; 
			whatNext();
		}
		var dropTimes = randomizer(3);
		var productivityRating = randomizer(10); 
		if (productivityRating > 8) { 
			alert("You spend half an hour in a conference room with your team.  The conference call system drops the call " + dropTimes + " times.  Regardless, the meeting concludes on time and everyone feels accomplished.");
			goodDay++;
			workDone++;
		} 
		else if (productivityRating < 3) {
			alert("You spend two hours in a conference room with no break.  The conference call system drops the call " + dropTimes + " times.  Your manager gets bored and leaves halfway through the meeting, leaving you with the sales guy and three developers from a different team.  This entire experience could have easily been an email.");
			goodDay--;
			workHoursLeft = workHoursLeft - 2;
		}
		else { 
			alert("You spend an hour in a conference room.  The conference call system drops the call " + dropTimes + " times.  There is a break halfway through the meeting and you run into your attractive coworker on the way to refill your coffee.  The meeting ends on time and everyone is generally pleased with the outcome.");
			goodDay++; 
			workHoursLeft--;
		}
		meetingsLeft--;
		viewStats();
		whatNext();
	}

	function whatNext() { 
		if (workHoursLeft <= 0) {
			goHome();
		}
		else {
			var defaultChoices; 
			var options = [ 
				"1 - get coffee", 
				"2 - check email", 
				"3 - check calendar", 
				"4 - write code", 
				"5 - review a pull request", 
				"6 - chat with coworkers", 
				"7 - go to a meeting"
			]
			defaultChoices = prompt("What do you do next? \n" + options.join("\n"));
			if (defaultChoices == "1") { 
				getCoffee(); 
			}
			else if (defaultChoices == "2") { 
				checkEmail(); 
			}
			else if (defaultChoices == "3") { 
				checkCalendar(); 
			}
			else if (defaultChoices == "4") { 
				writeCode(); 
			}
			else if (defaultChoices == "5") { 
				reviewPullRequest(); 
			}
			else if (defaultChoices == "6") { 
				chatWithCoworkers();
			}
			else if (defaultChoices == "7") { 
				if(meetingsLeft > 0) { 
					attendMeeting();
				}
				else { 
					alert("You don't have any meetings to go to today.")
					whatNext();
				}
			}
			else if (defaultChoices == null) {
				alert("Are you sure you want to quit the game?"); 
				return;
			}
			else {
				//input is invalid
				alert("Sorry, that's not an option, try again!");
				whatNext(); 
			}
		}
	}

	function goHome() { 
		alert("Congratulations, you made it through the workday!"); 
		return;
	}


