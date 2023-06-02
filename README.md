# NUMBERS GAME

Want to play a game? Who doesn't!

Lucky for you, there is a new game in town and it's said to be very addictive.

Our game is called 'Numbers game'. 

The point of the game is to clear all of the numbers from the screen by following a few simple rules. 
Depending on the users current result, they can take advantage of several boosters.

Our target audience are any users with access to the Internet. And more specifically, users with thirst for quality content without adds. 
Our ideal user is a working professional who commutes to and from work and/or has too much time on their hands when on their lunch break. 
A user that wishes to have at least something under their control, their square of peace and quiet. 
Our user does not want a permanent commitment, but a temporary escape without repercussions.

Game's goal is for it's users to relax their mind all while practicing logical and strategic thinking.

![screenshot](documentation/responsive-image.png)

## UX

### Colour Scheme

Colour scheme was decided based on the background image.
The main goal was for image's content to be a connection between outdoor sports activity, all the while having an abstract connection to the game's content.

Once the image was sourced, the colour scheme of the game needed to provide direct contrast while being simple and easy on the eyes.

- `#BC4A3C` used for background colour in case image does not load.
- `#000001` user as primary border, text colour, icons as well as span colour upon successful removal of valid pairs in-game.
- `#D3D3D3` used as primary background colour of the game-area to provide initial contrast from the background image.
- `#F5F5F5` used as a secondary background colour of the areas containing text.
- `#E5E619` used as a tertiary background colour to highlight user's choice.
- `#808080` used as a secondary border colour.
- `#F4C430` used as a quaternary background colour to display hints.

I used [coolors.co](https://coolors.co/f4c430-e5e619-f5f5f5-d3d3d3-808080-000001-bc4a3c) to generate my colour palette:

![screenshot](documentation/colour-scheme.png)

### Typography


- [Kanit](https://fonts.google.com/specimen/Kanit) was used for the primary headers and titles.

- Courier New was used for all other secondary text.

- [Font Awesome](https://fontawesome.com) icons were used for sound toggling options.

## Wireframes

I've used [Balsamiq](https://balsamiq.com/wireframes) to design my site wireframes.

### Home Page Wireframes

| Size | Screenshot |
| --- | --- |
| Mobile | ![screenshot](documentation/wireframes/phone-main-menu.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-main-menu.png) |

### Rules Wireframes

| Size | Screenshot |
| --- | --- |
| Mobile | ![screenshot](documentation/wireframes/phone-rules.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-rules.png) |

### About Wireframes

| Size | Screenshot |
| --- | --- |
| Mobile | ![screenshot](documentation/wireframes/phone-about.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-about.png) |

### Controls Wireframes

| Size | Screenshot |
| --- | --- |
| Mobile | ![screenshot](documentation/wireframes/phone-controls.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-controls.png) |

### Difficulty Menu Wireframes

| Size | Screenshot |
| --- | --- |
| Mobile | ![screenshot](documentation/wireframes/phone-difficulty.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-difficulty.png) |

### Game Wireframes

| Size | Screenshot |
| --- | --- |
| Mobile | ![screenshot](documentation/wireframes/phone-sound-off.png) |
| Mobile | ![screenshot](documentation/wireframes/phone-sound-on.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-sound-off.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-sound-on.png) |

## Features

### Existing Features

- **Responsive design**

    - Our game is accessible via phones, tables and desktop devices.

![screenshot](documentation/responsive-image.png)

- **Difficulty levels**

    - User can choose their difficulty level. Their choice will decide on the initial size of the game.

![screenshot](documentation/feature/difficulty-levels.png)

- **Generate button and functionality**

    - User can choose to generate all existing squares (spans) to allow for more options when solving the game.

![screenshot](documentation/feature/generate-button.png)

- **Hint button and functionality**

    - If user is unsure of their next move, they can use the hint button to see available match. In case there are none, Generate button will be highlighted instead.

![screenshot](documentation/feature/hint.png)

- **Undo button**

    - After a successful removal of a pair, user has an option to use the undo button should they notice their choice not being the best. Undo button will be disabled in several instances to prevent gaming and boost genuine experience.

![screenshot](documentation/feature/undo-button.png)

- **Remove fifth button and functionality**

    - User can choose to spend their points by using a 'remove fifth' booster. This button is enabled only if the user has a minimum of 50 points and if there are more than 4 squares on the board.

![screenshot](documentation/remove-fifth-button.png)

- **Sound and sound options**

    - User can choose to switch the sound on or off. When game is initially launched, sound will be switched off.

![screenshot](documentation/feature/sound-off-icon.png)
![screenshot](documentation/feature/sound-on-icon.png)

- **Return to Menu button**

    - Each section of the game enables user to return to the main menu.

![screenshot](documentation/feature/return-to-menu-button.png)

- **Pause game**

    - Should the user return to the menu during a live game session, the main menu will contain 'continue' and 'quit game' buttons.

![screenshot](documentation/feature/pause-game.png)

- **Continue game**

    - User can use continue button to return to the game. All stats, including the squares present on the board, sound preference and score will remain as they left them when pausing the game.

![screenshot](documentation/feature/continue-game.png)

- **Quit game**

    - User can choose to quit the game. Pop-up will ask for confirmation. If the user decides to cancel the action, game will remain in it's paused state.

![screenshot](documentation/feature/quit-game-confirm.png)

- **Stuck-check**

    - Should the user repeatedly use 'generate' button without any alternative actions, it is possible the player has no viable pairs to remove. For this reason, pop-up will appear notifying the player of the case. Game will be paused for player to decide on the next best action (continue game, or quit game)

![screenshot](documentation/feature/generate-instances.png)

- **Row removal**

    - Once a full row has been emptied, it will be removed from the table to allow for better visibility. Image below is not representative of the actual action which takes place.

![screenshot](documentation/feature/removed-row.png)

- **Score calculation**

    - Score is calculated, depending on the user's action. Removing a pair will add 2 points, removing a row will add additional 10 points. Using a hint, undo or remove fifth options will subtract specific amount of points from the overall score.

![screenshot](documentation/feature/score.png)

- **Choice validation**

    - User can make valid and invalid choices. Should a valid choice be made, the two squares will become dark. Otherwise the highlight showing the user's choice will be removed from the board. The same behaviour exists for instances when the user clicks the same square twice.

![screenshot](documentation/feature/choice-validation.png)

- **Game won confirmation**

    - Once all of the squares are removed from the board, a pop-up will automatically appear, notifying the user of their win. Pop-up will include their final score. User will be taken to the main menu.

![screenshot](documentation/feature/game-won.png)

- **Rules section**

    - Main menu includes a button which leads to the rules section. This section briefly explains the rules of the game.

![screenshot](documentation/feature/rules.png)

- **About section**

    - Main menu includes a button which leads to the about section. This section briefly explains the inspiration for the game and contains a link taking the user to the creator's github page.

![screenshot](documentation/feature/about.png)

- **Controls section**

    - Main menu includes a button which leads to the controls section. This section briefly explains the controls used in-game. Depending on the screen size, user can see different options available.

![screenshot](documentation/feature/desktop-controls.png)
![screenshot](documentation/feature/phone-controls.png)

- **Shortcuts**

    - There are several shortcuts available in-game. User can un/mute the sound, pause the game, continue game, generate more squares, remove a fifth of them or ask for a hint. Depending on the availability of the boosters. To prevent unnecessary clicks, user can use majority of them to unpause the game all while their actual request is being acknowledged.

![screenshot](documentation/feature/desktop-controls.png)

- **Re-playability**

    - When launching the game, the numbers will be randomly placed on the board, making the replayability value significant.

![screenshot](documentation/feature/random-one.png)
![screenshot](documentation/feature/random-two.png)

- **In-game button section**

    - Regardless of the screen size, in-game buttons will remain visible even if the board becomes sufficiently long to require scrolling. Name of the game is deprioritised in this case to maximise screen space.
    - Additional benefit here is the fact that the position of the buttons doesn't change regardless of button visibility. Should 'remove fifth' button not be available, it's space will remain blank instead of taken over by another button. This ensures familiarity for the user and removes room for accidents.

![screenshot](documentation/feature/phone-button-section.png)
![screenshot](documentation/feature/desktop-button-section.png)

- **404 page**

    - 404 page exists to notify the user of a non-existent page. Page contains a link which allows user to transition to the main menu easily.

![screenshot](documentation/feature/404.png)

### Future Features

⚠️⚠️⚠️⚠️⚠️ START OF NOTES (to be deleted) ⚠️⚠️⚠️⚠️⚠️

Do you have additional ideas that you'd like to include on your project in the future?
Fantastic! List them here!
It's always great to have plans for future improvements!
Consider adding any helpful links or notes to help remind you in the future, if you revisit the project in a couple years.

🛑🛑🛑🛑🛑 END OF NOTES (to be deleted) 🛑🛑🛑🛑🛑

- Title for future feature #1
    - Any additional notes about this feature.
- Title for future feature #2
    - Any additional notes about this feature.
- Title for future feature #3
    - Any additional notes about this feature.

## Tools & Technologies Used

⚠️⚠️⚠️⚠️⚠️ START OF NOTES (to be deleted) ⚠️⚠️⚠️⚠️⚠️

In this section, you should explain the various tools and technologies used to develop the project.
Make sure to put a link (where applicable) to the source, and explain what each was used for.
Some examples have been provided, but this is just a sample only, your project might've used others.
Feel free to delete any unused items below as necessary.

🛑🛑🛑🛑🛑 END OF NOTES (to be deleted) 🛑🛑🛑🛑🛑

- [HTML](https://en.wikipedia.org/wiki/HTML) used for the main site content.
- [CSS](https://en.wikipedia.org/wiki/CSS) used for the main site design and layout.
- [CSS :root variables](https://www.w3schools.com/css/css3_variables.asp) used for reusable styles throughout the site.
- [CSS Flexbox](https://www.w3schools.com/css/css3_flexbox.asp) used for an enhanced responsive layout.
- [CSS Grid](https://www.w3schools.com/css/css_grid.asp) used for an enhanced responsive layout.
- [JavaScript](https://www.javascript.com) used for user interaction on the site.
- [Python](https://www.python.org) used as the back-end programming language.
- [Git](https://git-scm.com) used for version control. (`git add`, `git commit`, `git push`)
- [GitHub](https://github.com) used for secure online code storage.
- [GitHub Pages](https://pages.github.com) used for hosting the deployed front-end site.
- [Gitpod](https://gitpod.io) used as a cloud-based IDE for development.
- [Bootstrap](https://getbootstrap.com) used as the front-end CSS framework for modern responsiveness and pre-built components.
- [Materialize](https://materializecss.com) used as the front-end CSS framework for modern responsiveness and pre-built components.
- [Flask](https://flask.palletsprojects.com) used as the Python framework for the site.
- [Django](https://www.djangoproject.com) used as the Python framework for the site.
- [MongoDB](https://www.mongodb.com) used as the non-relational database management with Flask.
- [SQLAlchemy](https://www.sqlalchemy.org) used as the relational database management with Flask.
- [PostgreSQL](https://www.postgresql.org) used as the relational database management.
- [ElephantSQL](https://www.elephantsql.com) used as the Postgres database.
- [Heroku](https://www.heroku.com) used for hosting the deployed back-end site.
- [Cloudinary](https://cloudinary.com) used for online static file storage.
- [Stripe](https://stripe.com) used for online secure payments of ecommerce products/services.
- [AWS S3](https://aws.amazon.com/s3) used for online static file storage.

## Testing

For all testing, please refer to the [TESTING.md](TESTING.md) file.

## Deployment

The site was deployed to GitHub Pages. The steps to deploy are as follows:
- In the [GitHub repository](https://github.com/josipcodes/numbers-game), navigate to the Settings tab 
- From the source section drop-down menu, select the **Main** Branch, then click "Save".
- The page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.

The live link can be found [here](https://josipcodes.github.io/numbers-game)

### Local Deployment

This project can be cloned or forked in order to make a local copy on your own system.

#### Cloning

You can clone the repository by following these steps:

1. Go to the [GitHub repository](https://github.com/josipcodes/numbers-game) 
2. Locate the Code button above the list of files and click it 
3. Select if you prefer to clone using HTTPS, SSH, or GitHub CLI and click the copy button to copy the URL to your clipboard
4. Open Git Bash or Terminal
5. Change the current working directory to the one where you want the cloned directory
6. In your IDE Terminal, type the following command to clone my repository:
	- `git clone https://github.com/josipcodes/numbers-game.git`
7. Press Enter to create your local clone.

Alternatively, if using Gitpod, you can click below to create your own workspace using this repository.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/josipcodes/numbers-game)

Please note that in order to directly open the project in Gitpod, you need to have the browser extension installed.
A tutorial on how to do that can be found [here](https://www.gitpod.io/docs/configure/user-settings/browser-extension).

#### Forking

By forking the GitHub Repository, we make a copy of the original repository on our GitHub account to view and/or make changes without affecting the original owner's repository.
You can fork this repository by using the following steps:

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/josipcodes/numbers-game)
2. At the top of the Repository (not top of page) just above the "Settings" Button on the menu, locate the "Fork" Button.
3. Once clicked, you should now have a copy of the original repository in your own GitHub account!

### Local VS Deployment

⚠️⚠️⚠️⚠️⚠️ START OF NOTES (to be deleted) ⚠️⚠️⚠️⚠️⚠️

Use this space to discuss any differences between the local version you've developed, and the live deployment site on GitHub Pages.

🛑🛑🛑🛑🛑 END OF NOTES (to be deleted) 🛑🛑🛑🛑🛑

## Credits

⚠️⚠️⚠️⚠️⚠️ START OF NOTES (to be deleted) ⚠️⚠️⚠️⚠️⚠️

In this section you need to reference where you got your content, media, and extra help from.
It is common practice to use code from other repositories and tutorials,
however, it is important to be very specific about these sources to avoid plagiarism.

🛑🛑🛑🛑🛑 END OF NOTES (to be deleted) 🛑🛑🛑🛑🛑

### Content

⚠️⚠️⚠️⚠️⚠️ START OF NOTES (to be deleted) ⚠️⚠️⚠️⚠️⚠️

Use this space to provide attribution links to any borrowed code snippets, elements, or resources.
A few examples have been provided below to give you some ideas.

Ideally, you should provide an actual link to every resource used, not just a generic link to the main site!

🛑🛑🛑🛑🛑 END OF NOTES (to be deleted) 🛑🛑🛑🛑🛑

| Source | Location | Notes |
| --- | --- | --- |
| [Markdown Builder](https://traveltimn.github.io/markdown-builder) | README and TESTING | tool to help generate the Markdown files |
| [Chris Beams](https://chris.beams.io/posts/git-commit) | version control | "How to Write a Git Commit Message" |
| [W3Schools](https://www.w3schools.com/howto/howto_js_topnav_responsive.asp) | entire site | responsive HTML/CSS/JS navbar |
| [W3Schools](https://www.w3schools.com/howto/howto_css_modals.asp) | contact page | interactive pop-up (modal) |
| [W3Schools](https://www.w3schools.com/css/css3_variables.asp) | entire site | how to use CSS :root variables |
| [Flexbox Froggy](https://flexboxfroggy.com/) | entire site | modern responsive layouts |
| [Grid Garden](https://cssgridgarden.com) | entire site | modern responsive layouts |
| [StackOverflow](https://stackoverflow.com/a/2450976) | quiz page | Fisher-Yates/Knuth shuffle in JS |
| [YouTube](https://www.youtube.com/watch?v=YL1F4dCUlLc) | leaderboard | using `localStorage()` in JS for high scores |
| [YouTube](https://www.youtube.com/watch?v=u51Zjlnui4Y) | PP3 terminal | tutorial for adding color to the Python terminal |
| [strftime](https://strftime.org) | CRUD functionality | helpful tool to format date/time from string |
| [WhiteNoise](http://whitenoise.evans.io) | entire site | hosting static files on Heroku temporarily |

### Media

⚠️⚠️⚠️⚠️⚠️ START OF NOTES (to be deleted) ⚠️⚠️⚠️⚠️⚠️

Use this space to provide attribution links to any images, videos, or audio files borrowed from online.
A few examples have been provided below to give you some ideas.

If you're the owner (or a close acquaintance) of all media files, then make sure to specify this.
Let the assessors know that you have explicit rights to use the media files within your project.

Ideally, you should provide an actual link to every media file used, not just a generic link to the main site!
The list below is by no means exhaustive. Within the Code Institute Slack community, you can find more "free media" links
by sending yourself the following command: `!freemedia`.

🛑🛑🛑🛑🛑 END OF NOTES (to be deleted) 🛑🛑🛑🛑🛑

| Source | Location | Type | Notes |
| --- | --- | --- | --- |
| [Pexels](https://www.pexels.com) | entire site | image | favicon on all pages |
| [Lorem Picsum](https://picsum.photos) | home page | image | hero image background |
| [Unsplash](https://unsplash.com) | product page | image | sample of fake products |
| [Pixabay](https://pixabay.com) | gallery page | image | group of photos for gallery |
| [Wallhere](https://wallhere.com) | footer | image | background wallpaper image in the footer |
| [This Person Does Not Exist](https://thispersondoesnotexist.com) | testimonials | image | headshots of fake testimonial images |
| [Audio Micro](https://www.audiomicro.com/free-sound-effects) | game page | audio | free audio files to generate the game sounds |
| [Videvo](https://www.videvo.net/) | home page | video | background video on the hero section |
| [TinyPNG](https://tinypng.com) | entire site | image | tool for image compression |

### Acknowledgements

⚠️⚠️⚠️⚠️⚠️ START OF NOTES (to be deleted) ⚠️⚠️⚠️⚠️⚠️

Use this space to provide attribution to any supports that helped, encouraged, or supported you throughout the development stages of this project.
A few examples have been provided below to give you some ideas.

🛑🛑🛑🛑🛑 END OF NOTES (to be deleted) 🛑🛑🛑🛑🛑

- I would like to thank my Code Institute mentor, [Tim Nelson](https://github.com/TravelTimN) for their support throughout the development of this project.
- I would like to thank the [Code Institute](https://codeinstitute.net) tutor team for their assistance with troubleshooting and debugging some project issues.
- I would like to thank the [Code Institute Slack community](https://code-institute-room.slack.com) for the moral support; it kept me going during periods of self doubt and imposter syndrome.
- I would like to thank my partner (John/Jane), for believing in me, and allowing me to make this transition into software development.
- I would like to thank my employer, for supporting me in my career development change towards becoming a software developer.
