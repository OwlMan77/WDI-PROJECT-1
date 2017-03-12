![ga](https://cloud.githubusercontent.com/assets/20629455/23824362/2c9817c2-066d-11e7-8988-7b1eefc6d628.jpg)
![wdi](https://cloud.githubusercontent.com/assets/20629455/23824363/2ddeaa7e-066d-11e7-8630-f7c890c9f1c1.png)
# WDI_PROJECT 1

##Simon's Revenge

This project is a more explosive version of the hit 80s game Simon™.

Literally.

![screenshot](https://lh3.googleusercontent.com/q98jbeBPylqJlnP3SljyVe6RYyIOAah5e11V47N4likR1xBQF0EaM0CsuSa0_uRjls7YZHAmZQpf6mgZyAMomQSdzO681_X8KRa0Ffi7dyJ6iecvPRQS32jW1xjhv7FQW98zxv2WwL_3tmXs92Ubkv4sXuTBrU3r73RMjPeffTP42FMb2BSCQJUACLHUm4F2vLVbgaTmRo6vWw9V7qL4Qsgju8WcsWLwHrgT832lD_3-rqRRi0VMn7zJZe6LgB0PMHGubkQ-pnm5FUuBLMFGZ57FjSABiNA59m98-24JQI1rELmt_2FVoS1oI1QySMc_5Vd9SZ-8GQOz3V5MqfySegkmGkD9mZKuNVUo5dcLSTHj1MiBPQwheJPHp1rIa4yaTBbNw_Bv2yHw1xMkStC1quB676UMsyXP5iD0y5-vGdcgxFbergZOoWzZUK2u1inrub3SyisJog8_wVbpuFLL1wiPd5vxJCd2KT9Bmv74zzjw6UUxkoCNVE2WFq04foFIi0ByUxVZiQPXl5z-3-rtDKXw_w3FaY9qb5GTXzzKBZXnz0T-zVUdInO5axtptDVBKVhKzYpu=w1440-h738)

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
Personally, looking back I would of taken the styling a different direction.

Orignally I set out to make a simple briefcase that would have an old CRT looking Keypad with a digital clock looking timer. While I was able to create a CRT-like keypad, I was not happy with the overall look. 

What I would of done differetly would of made a simpler aesthetic have the buttons look more like the original simon but with a more sinister look to it. 

Similar to this picture

 ![](https://www.doyouremember.co.uk/uploads/raw-1336594143.jpg) 

##Thing to add in future 
  * Help button with instructions
  * Different difficulties: Easy/Hard
  * Change the keypad to look more Simon-y

##Techology used

* HTML5/CSS
* JavaScript
* jQuery