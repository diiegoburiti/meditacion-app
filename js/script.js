const song = document.querySelector('[data-song]');
const play = document.querySelector('[data-play]');
const video = document.querySelector('[data-video] video');
const outline = document.querySelector('[data-moving-outline] circle');
const sound = document.querySelectorAll('[data-sound-picker] button');
const timeDisplay = document.querySelector('.time_display');
const timeSelect = document.querySelectorAll('[data-time-select] button');
const outlineLength = outline.getTotalLength();
const eventClick = 'click';
let fakeDuration = 300;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;
// select different sounds
sound.forEach((sound) => {
  sound.addEventListener(eventClick , function () {
    song.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');
    checkIfPLaying(song);
  });
});
// play sounds
play.addEventListener(eventClick , () => {
  checkIfPLaying(song);
});
// select sound
timeSelect.forEach((option) => {
  option.addEventListener(eventClick , function () {
    fakeDuration = this.getAttribute('data-time');
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
  });
});
// function expecifc to stop and play the sounds
const checkIfPLaying = (song) => {
  if (song.paused) {
    song.play();
    video.play();
    play.src = '../assets/svg/pause.svg';
  } else {
    song.pause();
    video.pause();
    play.src = '../assets/svg/play.svg';
  }
}
//animated the circle 
song.ontimeupdate = () => {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);
  // animation
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;
  // animate the text
  timeDisplay.textContent = `${minutes}:${seconds}`;

  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = '../assets/svg/pause.svg'
    video.pause();
  }
}