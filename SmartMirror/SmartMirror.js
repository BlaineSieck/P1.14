//CS 3366 Human Computer Interaction
//Project 1
//Blaine Sieck, Gabriel Costanzo, Eduardo Lozano, Abdus Sami Yakoob

//images (blue tint and notification shape)
let colorTint, notificationBanner, bathroom, volIcon;

//buttons
let onButton;
let offButton;
var buttonText;

//webcam
let capture;

//time and date
let hr, hrDisplay, min, minDisplay, sec, dy, mo, yr;
var amorpm;
var date = new Date();
var dow = date.getDay();

//reminders
let rem;
var reminders = ["Take Medicine", "Call Mom", "Study for Exam",];

//on/off boolean
let state;

//drag and drop
var dragging = false; // Is the object being dragged?
var draggingCal = false;
var draggingWeather = false;
var draggingMusic = false;
var draggingLights = false;
var rollover = false; // Is the mouse over the ellipse?
var rolloverCal = false;
var rolloverWeather = false;
var rolloverMusic = false;
var rolloverLights = false;
var x, y, w, h;          // Location and size
var x2, y2, w2, h2;
var x3, y3, w3, h3;
var x4, y4, w4, h4;
var x5, y5, w5, h5;
var offsetX, offsetY;    // Mouseclick offset
var offsetX2, offsetY2;
var offsetX3, offsetY3;
var offsetX4, offsetY4;
var offsetX5, offsetY5;

var audio;

//GABE VARIABLES
var weatherList;
var currentWeather;
var currentTemp;
var currentIcon;
let source = "";
let json;
var img;
var articleOneShown = 0;
var articleTwoShown = 0;
let news1, news2;

//EDUARDO VARIABLES
//Sliders
let volSlider;
let brightSlider;
let rSlider, gSlider, bSlider;
let rgb;
//Sound Files
var song1;
var song2;
var song3;
//Images
let album0Img, album1Img, album2Img, album3Img;
let brightImg;
//Stuff for music player
let playBtnOver = false;
let current = "pause";
let song = "track1";
//Title of song
let songTitle = " ";
let art = "0";

function preload() {
  
  //GABE CODE FOR APIs
  let url = "https://api.openweathermap.org/data/2.5/forecast/daily?zip=79401,us&units=imperial&cnt=6&APPID=e812164ca05ed9e0344b89ebe273c141";
  weatherJson = loadJSON(url);
  
  let currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Lubbock&units=imperial&APPID=e812164ca05ed9e0344b89ebe273c141";
  currentWeatherJson = loadJSON(currentWeatherUrl);
  
  newsApiKey = 'c1159300dd1641c0b63b5326385a7ce6';
  
  var newsUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=c1159300dd1641c0b63b5326385a7ce6';
  newsJson = loadJSON(newsUrl);
  
  //EDUARDO CODE FOR MUSIC
  soundFormats('mp3', 'ogg');
  song1 = loadSound('hype.mp3');
  song2 = loadSound('hollywood.mp3');
  song3 = loadSound('memories.mp3');
  
  album0Img = loadImage("song0.png");
  album1Img = loadImage('topART.jpg');
  album2Img = loadImage('postART.jpg');
  album3Img = loadImage('m5ART.jpg');
  
  brightImg = loadImage('sun.png');

}

function setup() {

  createCanvas(1038, 1035);
  capture = createCapture(VIDEO);
  capture.size(1000, 650);
  capture.hide();
  
  colorTint = loadImage('tint.png');
  notificationBanner = loadImage("notificationBlue.png");
  bathroom = loadImage("bathroom.png");
  volIcon = loadImage("volume.png");
  
  // Starting location of time/date
  x = 12 + 18;
  y = 10 + 34;
  // Dimensions of time/date
  w = 250;
  h = 60;
  
  // Starting location of calendar
  x2 = 12 + 18;
  y2 = 120 + 34;
  // Dimensions of calendar
  w2 = 250;
  h2 = 200;
  
  // Starting location of weather
  x3 = 12 + 18;
  y3 = 400;
  // Dimensions of weather
  w3 = 250;
  h3 = 250;
  
  // Starting location of music
  x4 = 768;
  y4 = 300;
  // Dimensions of music
  w4 = 250;
  h4 = 190;
  
  // Starting location of lights
  x5 = 940;
  y5 = 520;
  // Dimensions of lights
  w5 = 85;
  h5 = 75;
 
  hr = hour();
  min = minute();
  minDisplay = minute();
  dy = day();
  mo = month();
  yr = year();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];
  mo = months[mo-1];
  var daysow = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
  dow = daysow[dow];
  
  state = false;
  powerButton(state);
  
  //GABE SETUP CODE
  //weather
  weatherList = weatherJson.list;
  currentTemp = currentWeatherJson.main.temp;
  currentIcon = currentWeatherJson.weather[0].icon;
  
  //news
  source = newsJson.articles[0].source.name;
  title = newsJson.articles[0].title;
  description = newsJson.articles[0].description;
  newsImg = newsJson.articles[0].urlToImage;
  
  source2 = newsJson.articles[1].source.name;
  title2 = newsJson.articles[1].title;
  description2 = newsJson.articles[1].description;
  newsImg2 = newsJson.articles[1].urlToImage;
  
  //EDUARDO SETUP CODE
  
  songTitle = "Press Play";
  
  //Slider for volume adjuster
  volSlider = createSlider(0, 100, 20);
  volSlider.style('width', '180px');
  volSlider.hide();
  
  //Slider for adjusting brightness
  brightSlider = createSlider(0, 255, 0);
  brightSlider.style('width', '180px');
  brightSlider.hide();
  
  //Slider for adjusting light color
  rSlider = createSlider(0, 255, 255);
  gSlider = createSlider(0, 255, 255);
  bSlider = createSlider(0, 255, 255);
  rSlider.hide();
  gSlider.hide();
  bSlider.hide();
  
}

function draw() {
 
  sec = second();
  
  image(bathroom, 0, 0);
  
  //make it a mirror image, not backwards
  translate(1000, 0);
  scale(-1.0, 1.0);
  image(capture, -19, 34, 1000, 650);
  translate(1000, 0);
  scale(-1.0, 1.0);
  
  image(colorTint, 0 + 19, 0 + 34);
  tint(255, 180);
  
  //temporary borders/constraints
  /*line(250, 0, 250, 650);
  line(750, 0, 750, 650);
  line(0, 100, 250, 100);
  line(375, 100, 625, 100);
  line(0, 350, 250, 350);
  line(750, 250, 1000, 250);
  line(750, 450, 1000, 450);
  line(375, 550, 625, 550);
  line(375, 550, 375, 650);
  line(625, 550, 625, 650);
  line(375, 0, 375, 100);
  line(625, 0, 625, 100);*/
  
  // Is mouse over date/time
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    rollover = true;
  } 
  else {
    rollover = false;
  }
  
  //Is mouse over calendar
  if (mouseX > x2 && mouseX < x2 + w2 && mouseY > y2 && mouseY < y2 + h2) {
    rolloverCal = true;
  } 
  else {
    rolloverCal = false;
  }
  
  // Is mouse over weather
  if (mouseX > x3 && mouseX < x3 + w3 && mouseY > y3 && mouseY < y3 + h3) {
    rolloverWeather = true;
  } 
  else {
    rolloverWeather = false;
  }
  
  // Is mouse over music
  if (mouseX > x4 && mouseX < x4 + w4 && mouseY > y4 && mouseY < y4 + h4) {
    rolloverMusic = true;
  } 
  else {
    rolloverMusic = false;
  }
  
  // Is mouse over lights
  if (mouseX > x5 && mouseX < x5 + w5 && mouseY > y5 && mouseY < y5 + h5) {
    rolloverLights = true;
  } 
  else {
    rolloverLights = false;
  }
  
  // Adjust date/time location if being dragged
  if (dragging) {
    x = mouseX + offsetX;
    y = mouseY + offsetY;
  }
  
  // Adjust calendar location if being dragged
  if (draggingCal) {
    x2 = mouseX + offsetX2;
    y2 = mouseY + offsetY2;
  }
  
  // Adjust weather location if being dragged
  if (draggingWeather) {
    x3 = mouseX + offsetX3;
    y3 = mouseY + offsetY3;
  }
  
  // Adjust music location if being dragged
  if (draggingMusic) {
    x4 = mouseX + offsetX4;
    y4 = mouseY + offsetY4;
  }
  
  // Adjust lights location if being dragged
  if (draggingLights) {
    x5 = mouseX + offsetX5;
    y5 = mouseY + offsetY5;
  }
  
  //font stuff
  strokeWeight(1.5);
  stroke(1);
  textFont("OstrichSans-Black");
  
  //format minutes
  if(min < 10) {
    minDisplay = "0" + min.toString();
  }
  
  //format hours
  hrDisplay = hr;
  
  if(hr < 12) {
    amorpm = "am";
    if(hr == 0) {
      hrDisplay = 12;
    }
  }
  else if(hr >= 12) {
    amorpm = "pm";
    if(hr != 12) {
      hrDisplay -= 12;
    }
  }
  
  // Different fill based on state of date/time
  if (dragging) {
    fill (125);
  } else if (rollover) {
    //fill(200);
    fill(255);
  } else {
    fill(255);
  }
  
  //draw time and date text
  textSize(23);
  textAlign(LEFT);
  text(dow + ', ' + mo + ' ' + dy + ', ' + yr + "\n" + hrDisplay + " : " + minDisplay + " " + amorpm, x, y, w, h);
  
  // Different fill based on state of Cal
  if (draggingCal) {
    fill (125);
  } else if (rolloverCal) {
    //fill(200);
    fill(255);
  } else {
    fill(255);
  }
  
  //draw all elements when on/off button is on
  if(state == true) {
    textSize(16);
    textAlign(LEFT);
    textSize(20);
    text("My Calendar", x2, y2, w2, h2);
    textSize(16);
    text("\t CS 3383 - Theory of Automata", x2, y2 + 50);
    textSize(13);
    text("\t\tToday at 12:00 PM", x2, y2 + 70);
    textSize(16);
    text("\t CS 3365 - Software Engineering I", x2, y2 + 90);
    textSize(13);
    text("\t\tToday at 1:00 PM", x2, y2 + 110);
    textSize(16);
    text("\t CS 3366 - Human Computer Interaction", x2, y2 + 130);
    textSize(13);
    text("\t\tToday at 3:00 PM", x2, y2 + 150);
    textSize(16);
    text("\t CS 3364 - Algorithms", x2, y2 + 170);
    textSize(13);
    text("\t\tTomorrow at 2:00 PM", x2, y2 + 190);
    textAlign(CENTER);
    textSize(28);
    fill(255);
    if(sec <= 20) {
      text("Take Medicine", 500 + 18, 34 + 34);
    }
    if(sec > 20 && sec <= 40) {
      text("Call Mom", 500 + 18, 34 + 34);
    }
    if(sec > 40 && sec <= 60) {
      text("Study Algorithms", 500 + 18, 34 + 34);
    }
    textAlign(CENTER);
    textSize(16);
    text('Heath and Activity\n Daily Steps : 5,951 for 3.59 mi \n Exercise: 45 min today & 2 hrs this week \n Sleep Cycle : 5 hrs light sleep & 3 hrs REM sleep', 500 + 18, 570 + 34);
  
    //GABE DRAW CODE
    // Different fill based on state of date/time
    if (draggingWeather) {
      fill (125);
    } else if (rolloverWeather) {
      fill(255);
    } else {
      fill(255);
    }
    textAlign(LEFT);
    //Show Weather
    textSize(40);
    text("LBK", x3, y3 + 4, w3, h3);
    textSize(18);
    text("F", x3 + 100, y3 + 5, w3, h3);
    textSize(40);
    text(int(currentTemp), x3 + 60, y3 + 3, w3, h3);
    currentIconUrl = "http://openweathermap.org/img/w/" + currentIcon + ".png";
    img = createImg(currentIconUrl);
    img.hide();
    image(img, x3 + 100, y3 - 28, 100, 100);
    
    textSize(20);
    var date = new Date();
    var today = date.getDay();
    for (i = 1; i < weatherList.length; i++)
    {
      var showDay = ((today + i) % 7);
      var GABEy = i * 35 + 420 + 34;
      var GABEx = 25 + 18;
      if (showDay == 1)
      {
        text("MON", x3 + GABEx - 30, y3 + GABEy - 415, w3, h3);
      }
      if (showDay == 2)
      {
        text("TUE", x3 + GABEx - 30, y3 + GABEy - 415, w3, h3);
      }
      if (showDay == 3)
      {
        text("WED", x3 + GABEx - 30, y3 + GABEy - 415, w3, h3);
      }
      if (showDay == 4)
      {
        text("THU", x3 + GABEx - 30, y3 + GABEy - 415, w3, h3);
      }
          if (showDay == 5)
      {
        text("FRI", x3 + GABEx - 30, y3 + GABEy - 415, w3, h3);
      }
          if (showDay == 6)
      {
        text("SAT", x3 + GABEx - 30, y3 + GABEy - 415, w3, h3);
      }
          if (showDay == 0)
      {
        text("SUN", x3 + GABEx - 30, y3 + GABEy - 415, w3, h3);
      }
      data = weatherList[i];
      text('L:', x3 + 50, y3 + GABEy - 415, w3, h3);
      text(int(data.temp.min), x3 + 70, y3 + GABEy - 415, w3, h3);
      
      text('H:', x3 + 100, y3 + GABEy - 415, w3, h3); 
      text(int(data.temp.max), x3 + 120, y3 + GABEy - 415, w3, h3); 
      
      print(data);
      icon = data.weather[0].icon;
      url = "http://openweathermap.org/img/w/" + icon + ".png";
      img = createImg(url);
      img.hide(); 
      image(img, x3 + 150, y3 + GABEy - 432, 50, 50); 
      print(url);
      
    }
    
    //show news
    fill(255);
    url = newsImg;
    img = createImg(url);
    img.hide();
    news1 = image(img, 775 + 18, 35 + 34, 200, 90);
    url2 = newsImg2;
    img = createImg(url2);
    img.hide();
    news2 = image(img, 775 + 18, 155 + 34, 200, 90);
    var GABEx2 = 250 + 18;
    var GABEy2 = 125 + 34;
    var lineStart = 0;
    var lineEnd = 0;
    if (articleOneShown == 0 && mouseX > 775 + 18 && mouseY < 125 + 34)
    {
      for (i = 0; i < description.length; i++)
      {
        if (i % 60 == 1)
        {
          lineEnd = i-1;
          textAlign(CENTER);
          text(description.slice(lineStart, lineEnd), width*0.5, GABEy2-50);
          GABEy2 += 20;
          lineStart = lineEnd;
        }
      }
      textAlign(CENTER);
      text(description.slice(lineStart, description.length), width*0.5, GABEy2-50);
    }
    
    if (articleTwoShown == 0 && mouseX > 775 + 18 && mouseY < 250 + 34 && mouseY > 125 + 34)
    {
      for (i = 0; i < description2.length; i++)
      {
        if (i % 60 == 1)
        {
          lineEnd = i-1;
          textAlign(CENTER);
          text(description2.slice(lineStart, lineEnd), width*0.5, GABEy2-50);
          GABEy2 += 20;
          lineStart = lineEnd;
        }
      }
      textAlign(CENTER);
      text(description2.slice(lineStart, description2.length), width*0.5, GABEy2-50);
    }
    textAlign(LEFT);
    text(source, width*0.765, 30 + 34);
    text(source2, width*0.765, 150 + 34);
    
    //DRAW EDUARDO CODE
    
    //Brightness icon
    image(brightImg, x5 + 53, y5 + 134);
    image(volIcon, x4 + 223, y4 + 196);
    
    //Music Section
    textSize(15);
    if (draggingMusic) {
      fill (125);
    } else if (rolloverMusic) {
      fill(255);
    } else {
      fill(255);
    }
    //Song info
    textAlign(CENTER);
    text(songTitle, x4 + 125, y4 + 134);
    albumArt();
    
    volSlider.position(x4 + 35, y4 + 195);
    volSlider.show();
    drawForward();
    drawBack();
    playorPause();
    song1.setVolume(0.2);
    const val = volSlider.value() / 100;
    
    song1.setVolume(val);  
    song2.setVolume(val);
    song3.setVolume(val);
    
    //RGB and brightness sliders
    brightSlider.position(x5 + - 137, y5 + 129);
    brightSlider.show();
    rSlider.position(x5 - 137, y5 + 38);
    gSlider.position(x5 - 137, y5 + 63);
    bSlider.position(x5 - 137, y5 + 88);
    rSlider.show();
    gSlider.show();
    bSlider.show();
    const r = rSlider.value();
    const g = gSlider.value();
    const b = bSlider.value();
    const bright = brightSlider.value();
    
    //Backlight
    noFill();
    stroke(r, g, b, bright);
    strokeWeight(10);
    line(2 + 18, 1 + 34, 998 + 18 , 1 + 34);
    line(998 + 18, 1 + 34, 998 + 18, 648 + 34);
    line(998 + 18, 648 + 34, 2 + 18, 648 + 34);
    line(2 + 18, 648 + 34, 2 + 18, 1 + 34);
    
    //RGB setting labeling
    if (draggingLights) {
      fill(125);
    } else if (rolloverLights) {
      fill(255);
    } else {
      fill(255);
    }
    stroke(0);
    strokeWeight(1);
    textSize(15);
    textAlign(LEFT);
    text("Lighting Controls", x5 - 135, y5 + 30);
    text('R', x5 + 3, y5 + 53);
    text('G', x5 + 3, y5 + 78);
    text('B', x5 + 3, y5 + 103);
    }
  
}

function powerButton() {
  
  if(state == false) {
    onButton = createButton("Power On");
    onButton.style("font-family", "OstrichSans-Medium");
    onButton.position(10 + 18 + 3, 620 + 34);
    onButton.mousePressed(power);
  }
  
  if(state == true) {
    offButton = createButton("Power Off");
    offButton.style("font-family", "OstrichSans-Medium");
    offButton.position(10 + 18 + 3, 620 + 34);
    offButton.mousePressed(power);
  }
  
}

function power() {
  
  if(state == false) {
    state = true;
    onButton.hide();
    powerButton();
  }
  
  else {
    state = false;
    offButton.hide();
    powerButton();
    volSlider.hide();
    brightSlider.hide();
    rSlider.hide();
    gSlider.hide();
    bSlider.hide();
  }
  
}

function mousePressed() {
  
  // Did I click on the date/time?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x-mouseX;
    offsetY = y-mouseY;
  }
  
  //Did I click on the Cal?
  if (mouseX > x2 && mouseX < x2 + w2 && mouseY > y2 && mouseY < y2 + h2) {
    draggingCal = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX2 = x2-mouseX;
    offsetY2 = y2-mouseY;
  }
  
  //Did I click on the Weather?
  if (mouseX > x3 && mouseX < x3 + w3 && mouseY > y3 && mouseY < y3 + h3) {
    draggingWeather = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX3 = x3 - mouseX;
    offsetY3 = y3 - mouseY;
  }
  
  //Did I click on the Music?
  if (mouseX > x4 && mouseX < x4 + w4 && mouseY > y4 && mouseY < y4 + h4) {
    draggingMusic = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX4 = x4 - mouseX;
    offsetY4 = y4 - mouseY;
  }
  
   //Did I click on the Lights?
  if (mouseX > x5 && mouseX < x5 + w5 && mouseY > y5 && mouseY < y5 + h5) {
    draggingLights = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX5 = x5 - mouseX;
    offsetY5 = y5 - mouseY;
  }
  
  //EDUARDO MOUSE CLICKED FUNCTIONS
  if (mouseOverPlay() && current == "pause" && song == "track1"){
    song1.play();
    art = "1";
    current = "play";
    songTitle = "Now Playing: The Hype (Berlin)";
  }
  else if (mouseOverPlay() && current == "play" && song == "track1"){
    song1.pause();
    current = "pause";
  }
  else if (mouseOverNext() && song == "track1"){
    song1.stop();
    art = "2";
    song2.play();
    song = "track2";
    current = "play";
    songTitle = "Now Playing: Hollywood's Bleeding";
  }
  else if (mouseOverPrev() && song == "track1") {
    song1.stop();
    art = "3";
    song3.play();
    song = "track3";
    current = "play";
    songTitle = "Now Playing: Memories";
  }
  else if (mouseOverPlay() && current == "pause" && song == "track2"){
    song2.play();
    current = "play";    
  }
  else if (mouseOverPlay() && current == "play" && song == "track2"){
    song2.pause();
    current = "pause";
  }
  else if(mouseOverNext() && song == "track2"){
    song2.stop();
    art = "3";
    song3.play();
    song = "track3";
    current = "play";
    songTitle = "Now Playing: Memories";
  }
  else if (mouseOverPrev() & song == "track2") {
    song2.stop();
    art = "1";
    song1.play();
    song = "track1";
    current = "play";
    songTitle = "Now Playing: The Hype (Berlin)";
  }
  else if (mouseOverPlay() && current == "pause" && song == "track3"){
    song3.play();
    current = "play";
  }
  else if (mouseOverPlay() && current == "play" && song == "track3"){
    song3.pause();
    current = "pause";
  }
  else if (mouseOverNext() && song == "track3") {
    song3.stop();
    art = "1";
    song1.play();
    song = "track1";
    current = "play";
    songTitle = "Now Playing: The Hype (Berlin)";
  }
  else if (mouseOverPrev() && song == "track3") {
    song3.stop();
    art = "2";
    song2.play();
    song = "track2";
    current = "play";
    songTitle = "Now Playing: Hollywood's Bleeding";
  }
  
}

function mouseReleased() {
  
  // Quit dragging
  dragging = false;
  draggingCal = false;
  draggingWeather = false;
  draggingMusic = false;
  draggingLights = false;
}

//EDUARDO FUNCTIONS
//Functions for music section
function drawForward(){
  fill(255);
  strokeWeight(1);
  triangle(x4 + 190, y4 + 164, x4 + 190, y4 + 174, x4 + 200, y4 + 169);
  triangle(x4 + 205, y4 + 164, x4 + 205, y4 + 174, x4 + 215, y4 + 169);
}

function drawBack(){
  fill(255);
  strokeWeight(1);
  triangle(x4 + 65, y4 + 164, x4 + 65, y4 + 174, x4 + 55, y4 + 169);
  triangle(x4 + 50, y4 + 164, x4 + 50, y4 + 174, x4 + 40, y4 + 169);
}

function drawPlay(){
  fill(255);
  strokeWeight(1);
  triangle(x4 + 115, y4 + 154, x4 + 115, y4 + 184, x4 + 135, y4 + 169);
}

function drawPause(){
  fill(255);
  strokeWeight(1);
  rect(x4 + 110, y4 + 154, 10, 25);
  rect(x4 + 125, y4 + 154, 10, 25);
}

function volAdjust(){
  song1.setVolume(0.1);
  song1.Volume(val);
}

//Checks to see if mouse is over play button
function mouseOverPlay(){
  let d = dist(mouseX, mouseY, x4 + 125, y4 + 169);
  if(d < 10) {
    return true;
  }
  else{
    return false;
  }
}

//Checks to see if button is over next button
function mouseOverNext(){
  let d = dist(mouseX, mouseY, x4 + 202, y4 + 169);
  if (d < 5) {
    return true;
  }
  else {
    return false;
  }
}

//Checks to see if button is over previous button
function mouseOverPrev() {
  let d = dist(mouseX, mouseY, x4 + 45, y4 + 169);
  if (d < 10) {
    return true;
  }
  else {
    return false;
  }
}

function albumArt(){
  if(art == "0") {
    image(album0Img, x4 + 80, y4 + 19);
  }
  if (art == "1"){
    image(album1Img, x4 + 80, y4 + 19);
  }
  else if (art == "2"){
    image(album2Img, x4 + 80, y4 + 19);
  }
  else if (art == "3"){
    image(album3Img, x4 + 80, y4 + 19);
  }
}

//Shows play or pause button
function playorPause(){
  if (current == "play"){
    drawPause();
  }
  else if (current == "pause"){
    drawPlay();
  }
}
