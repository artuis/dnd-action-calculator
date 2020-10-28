# Project-Two

![Screenshot (19)](https://user-images.githubusercontent.com/70540019/97221578-542b9480-178a-11eb-8bf9-1727c30daa64.png)

(link to app)[https://stark-island-65376.herokuapp.com/campaigns]


## Description 

The D & D Character Manager allows a DM to create campaigns and create character sheets holding basic stat information and assigning them to campaigns. Character sheets can be viewed and edited after creation. 

### User Story

AS A DM
I WANT to keep track of my campaign's character's stats
SO THAT I can easily manage my campaign
AS A DM
I WANT to automatically calculate rolls
SO THAT I can assist my arithmetically-challenged players


### Usage

To use the app, an account is required. Once logged in, you can then add a campaign and/or character. 

## Campaign and Character Creation
To create character, click on "Add Character" in the bottom section of the Profile page. To add a campaign, simply click "Add Campaign" and give a name to your campaign. Note that campaigns currently cannot be renamed, and no warning will pop up when clicking "Delete Campaign." To associate a character with a campaign, click on the name of the campaign to open the drop down, choose the appropiate character in the revealed drop down menu, and click "Add Character."

Character stats can be modified inside the bottom section of the Profile page by clicking "Update." Clicking "Action" for a specific character will open up the calculator and preload the character's stats into the calculator along with their equipped weapon. 

## Calculator

The calculator can also be accesed by the "Calculator" button at the top of the Profile pages. When a character is loaded, modifiers are automatically calculated from the selected stat, and added onto the roll. The "Attack" tab covers rolls using Strength and Dexterity while the "Spells" tab can calculate modifiers from Charisma, Wisdom, and Intelligence. "Advantage" and "Disadvantage" can be chosen as appropriate, and other modifiers can be entered separately. 

Damage rolls can be calculated from the equipped weapon, or a custom dice roll can be entered, i.e. 2d8 to roll two eight-sided die. Other modifiers such as "Two-Handed" and "Critical Hit" can be selected. The "Spells" tab also preloads damage values based on spell slots used for the selected spell.

The "Custom" tab allows custom dice rolls to be inputted, in a multitude of formats as long as the first number is in the form of a roll i.e. d20.

### Dependencies

## Front-End
Express-Handlebars
PaperCSS
jQuery

## Back-End
Dotenv
Express
Express-session
Sequelize
MySQL2
Nodemailer

### Contributions
Please open an issue first to discuss what you would like to change.

### Milestone
Password reset for accounts
Additional dice roll calculator features such as handling multiplication and parentheses
Rolls for situations beyond combat
Expand custom dice roll calculator tab to show more detailed results
Add more associations. e.g. racial traits, class features, weapon properties
Add means of visualizing combat encounters to account for positioning, visibility/cover, etc
Add means of creating custom spells/races/classes/weapons/etc


### Team

[Thomas An](https://github.com/artuis/)
[Matt Weber](https://github.com/webermg/)
[Magnus Appel](https://github.com/Magnus-Jay/)
[Stefan Johnson](https://github.com/Stefj12/)

