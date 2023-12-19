var lives = 3;
var level = 1;
var score = 0;
var rotation = 0;
var speed = 60;
var covidCount = 0;
var covidBirthFrequency = 1000;
var covidUpFrequency = 60;
var covidUp = 5;
var covidWidth = 50;
var covidHeight = 50;
var screenWidth = 320;
var screenHeight = 450;
var pausePlay = false;
var startGameFrequency = 100;
var startGame = false;

setStyle("mask", "z-index: 1");

onEvent("mainScreen", "mousemove", function(event) {
  setPosition("mask", event.x - getProperty("mask", "width") / 2, event.y - getProperty("mask", "height") / 2);
});

onEvent("mask", "click", function() {
  if (!pausePlay) {
    for (i=0; i<covidCount; i++) {
      covidId = "covid" + i;
      maskX = getXPosition("mask");
      maskY = getYPosition("mask");
      covidX = getXPosition(covidId);
      covidY = getYPosition(covidId);
      if (Math.abs(maskX - covidX) < 25 && Math.abs(maskY - covidY) < 25) {
        playSound("assets/category_explosion/8bit_explosion.mp3");
        score += level;
        setProperty("scoreValue", "text", score);
        setPosition(covidId, -100, 100);
        if (level == 1 && score >= 5) {
          playSound("assets/category_music/island_level_complete_4.mp3");
          playSound("assets/category_female_voiceover/level_up_female.mp3")
          pausePlay = true;
          setProperty("imgLevelUp", "image", "assets/faceMask.jpg");
          setScreen("levelUpScreen");
          break;
        }
        else if (level == 2 && score >= 15) {
          playSound("assets/category_music/island_level_complete_4.mp3");
          playSound("assets/category_female_voiceover/level_up_female.mp3")
          pausePlay = true;
          setProperty("imgLevelUp", "image", "assets/washHands.png");
          setScreen("levelUpScreen");
          break;
        }
        else if (level == 3 && score >= 30) {
          playSound("assets/category_music/island_level_complete_4.mp3");
          playSound("assets/category_female_voiceover/level_up_female.mp3")
          pausePlay = true;
          setProperty("imgLevelUp", "image", "assets/safeDistance.png");
          setScreen("levelUpScreen");
          break;
        }
        else if (level == 4 && score >= 50) {
          playSound("assets/category_music/island_level_complete_4.mp3");
          playSound("assets/category_female_voiceover/level_up_female.mp3")
          pausePlay = true;
          setProperty("imgLevelUp", "image", "assets/stayHome.jpg");
          setScreen("levelUpScreen");
          break;
        }
        else if (level == 5 && score >= 75) {
          playSound("assets/category_achievements/vibrant_virtcal_achievment.mp3");
          playSound("assets/category_female_voiceover/you_win_female.mp3");
          pausePlay = true;
          setScreen("winScreen");
          break;
        }
      }
    }
  }
});

timedLoop(startGameFrequency, function() {
  if (!startGame) {
    fontSize = getProperty("lblBeatCovid", "font-size")
    if (fontSize >= 45) {
      playSound("assets/category_explosion/radioactive_zombie_explode_2.mp3");
      startGame = true;
      hideElement("lblBeatCovid");
    }
    setProperty("lblBeatCovid", "font-size", fontSize + 5);
  }
});

timedLoop(covidBirthFrequency, function() {
  if (!pausePlay) {
    covidId = "covid" + covidCount;
    image(covidId, "assets/covid.png");
    covidX = randomNumber(covidWidth, screenWidth - covidWidth);
    covidY = screenHeight;
    setPosition(covidId, covidX, covidY, covidWidth, covidHeight);
    covidCount++;
  }
});

timedLoop(covidUpFrequency, function() {
  if (!pausePlay) {
    rotation = rotation + speed;
    for (i=0; i<covidCount; i++) {
      covidId = "covid" + i;
      covidX = getXPosition(covidId);
      if (covidX == -100)
        continue;
      covidY = getYPosition(covidId);
      setPosition(covidId, covidX, covidY - covidUp);
      setStyle(covidId, "transform: rotate(" + rotation + "deg)");
      if (covidY < 0) {
        setPosition(covidId, -100, 100);
        if (lives == 3) {
          playSound("assets/category_explosion/melodic_loss_1.mp3");
          hideElement("heart3");
          lives--;
        }
        else if (lives == 2) {
          playSound("assets/category_explosion/melodic_loss_1.mp3");
          hideElement("heart2");
          lives--;
        }
        else {
          playSound("assets/category_music/gameover.mp3");
          pausePlay = true;
          setProperty("finalScoreValue", "text", score);
          setScreen("gameOverScreen");
        }
      }
    }
  }
});

function clearScreen(newLevel) {
  lives = 3;
  level = newLevel;
  setProperty("levelValue", "text", level);
  if (level == 1) {
    setProperty("lblBeatCovid", "font-size", 0);
    showElement("lblBeatCovid");
    startGame = false;
    score = 0;
    covidBirthFrequency = 1000;
    covidUpFrequency = 60;
    covidUp = 5;
  }
  else if (level == 2) {
    covidBirthFrequency = 800;
    covidUpFrequency = 30;
    covidUp = 10;
  }
  else if (level == 3) {
    covidBirthFrequency = 700;
    covidUpFrequency = 15;
    covidUp = 20;
  }
  else if (level == 4) {
    covidBirthFrequency = 600;
    covidUpFrequency = 10;
    covidUp = 30;
  }
  else {
    covidBirthFrequency = 500;
    covidUpFrequency = 5;
    covidUp = 50;
  }
  setProperty("scoreValue", "text", score);
  showElement("heart2");
  showElement("heart3");
  for (i=0; i<covidCount; i++) {
    covidId = "covid" + i;
    deleteElement(covidId);
  }
  covidCount = 0;
}

onEvent("btnLevelUp", "click", function() {
  clearScreen(level+1);
  setScreen("mainScreen");
  pausePlay = false;
});

onEvent("btnPlayAgain", "click", function() {
  clearScreen(1);
  setScreen("mainScreen");
  pausePlay = false;
});

onEvent("btnPlayWin", "click", function() {
  clearScreen(1);
  setScreen("mainScreen");
  pausePlay = false;
});
