# WDI_PROJECT_1

##Simon's Revenge

This project is a more explosive version of the hit 80s game Simon™.

Literally.

![screenshot](https://lh3.googleplayercontent.com/gTSyqyMnfrIOcJrEvbLJbZFBwx3LFFoyifeet_seBuDkd_dnvLJIi0JJrEprsydVCbLWTkejib8ZoLfbQXRobuWpPwlKP8J9zIEq-v8S-C9B2haPbElDauI5096soZhUT8mWHqe07W7fa3YfFnT-KcIYsJi22cCG4SUqFMgA5ybJStrORGI5cyInUmlEayMunZhvjLJqbb9kC7oaR_JRrHXRhJ5wZXPVRombj8KGgM5ukpY9lJexf_Wf9fM4xlGYNc5PiKDv4SbVUPA4GdLLIGsOhrA7vx5C4Sq7j1XyEW-oQzbfyXQSxG0eJyNsHRa05nfT1oWxd5V-bXMSHLlmr2xU7q83qQl7vmeFvO7_Ua5ymZeMiX6kGMbhjiTOP0yo7FMfBIeKPRveoJtkQj1avnbPbKXAiaY7ONQnlIxT1-Jp-hTnxoxF8WiCRCmsBAzx4QsOVaXu1QDPRc7CPWCdU7G9kyM3w7CzCvkye6isbM8a_8606nYTTYkLSy0i2UBIu1OuMdzVgIoydpiq4dTfh4Hf6CiYeU4Z6yqxIBIRC0t1NxlaQ_kny3WD6yRajID164KS_iVz=w1065-h733)

Simon has gotten fed up of people making clones of his  game and sent a special gift to just for you!

The aim of the game is simple. 

Press the **"Defuse"** button.

Use your mouse to try to keep the bomb from exploding by matching the sequence with you mouse and try to delay the inevitable.

If you are **Correct**, you delay the bomb by 10 seconds and get 10 points.

If you are **Wrong**, lose 10 points and speed up the timer by 10 seconds.

Impress you friends with your memory skills!


###Music
Background music is *_Kevin MacLeod's Impending Boom_*


##Process
###Conceptual planning  
My original concept for this game was make a bomb that could be defused when three Modules(puzzles) were solved within a time limit.

*  A colour game where you need to show the corresponding name to a colour displayed. The challenge would be the name's font would be in a different colour.
*  A colour sequence game 
*  Cutting a wire 

I realized quickly that this would be too big a project to do within the time frame given. 

So I decided to cut it down to one game and make it have a score system instead of a win condition. 

###Coding / Logic
Using OOP, I split the game into modular functions to: 

* Start the game
* Create a random sequence, 
* display lights from that sequence, 
* take a sequence from a player, 
* compare those sequences to determine if the player is right to carry on the game and reward the player with time and points or if they are wrong to display the previous sequence of lights and punish the player with less time and points.
* make a timer 
* Display a game over screen
* Reset the game 


##Challenges 
During this project:

* Remembering that you can't compare two elements. 
	* This was quickly resolved by making another array for bomb.computersequence and bomb.playersequence storing only the id of the button pressed.
* Understanding when to use SetTimeout and SetInterval instead of `for` or `while` loops. 
	* I learned that when ever you need to add a delay in a loop SetInterval is the best method to go with as you can't implement delays in for loops as iterates all at once.
* Getting the sequence to light up properly. I originally had trouble getting the sequence to show in order. 
	* This was resolved using two setInterval methods. one to give it a class ('activated') and another to take it away 200 miliseconds later.

##Things I would of done differently 
###Styling
Personally not a huge fan of what the styling ended up being. 

Orignally I set out to make a simple briefcase that would have an old CRT looking Keypad with a digital clock looking timer. While I was able to create a CRT-like keypad, I was not happy with the overall look. 

What I would of done differetly would of made a simpler aesthetic have the buttons look more like the original simon but with a more sinister look to it. 

Similar to this picture ![](https://www.doyouremember.co.uk/uploads/raw-1336594143.jpg) 

##Thing to add in future 
  * Help button with instructions
  * Different difficulties: Easy/Hard
  * Change the keypad to look more Simon-y

##Techology used

* HTML5/CSS
* JavaScript
* jQuery