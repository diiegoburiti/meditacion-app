const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const video = document.querySelector('.container_video video');
  const outline = document.querySelector('.moving_outline circle');
  // sounds
  const sound = document.querySelectorAll('.container_sound_picker button');
  // display
  const timeDisplay = document.querySelector('.time_display');
  const timeSelect = document.querySelectorAll('.container_time_select button');  
  // get all length outline
  const outlineLength = outline.getTotalLength();
  let fakeDuration = 600

  outline.style.strokeDasharray = outlineLength
  outline.style.strokeDashoffset = outlineLength

  // select different sounds
  sound.forEach((sound) => {
    sound.addEventListener('click', function () {
    
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkIfPLaying(song);
    })
  })
  
  
  
  // play sounds
  play.addEventListener('click', () => {
    checkIfPLaying(song);
  })

  // select sound
  timeSelect.forEach((option) => {
    option.addEventListener('click', function () {
      fakeDuration = this.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
    })
  })

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
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
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
}
app();