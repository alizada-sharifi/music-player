const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector(".artist");
const music = document.querySelector("audio");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress-time");
const currentTimeElement = document.querySelector("#current-time");
const durationTimeElement = document.querySelector("#duration");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.getElementById("next");
let isPlaying = false;
let songIndex = 0;
const collection = [
  {
    pic: "pic-1",
    songName: "m-1",
    title: "One Day Things Will Go My Way",
    person: " Fearless Soul",
  },
  {
    pic: "pic-2",
    songName: "m-2",
    title: "Unstoppable",
    person: " Sia Furler",
  },
  {
    pic: "pic-3",
    songName: "m-3",
    title: "stay",
    person: "The Kid LAROI & Justin Bieber",
  },
  {
    pic: "pic-4",
    songName: "m-4",
    title: "I Am Already Enough",
    person: "Fearless Soul",
  },
  {
    pic: "pic-5",
    songName: "m-5",
    title: "You're the Inspiration",
    person: "Peter Cetera $ David Foster",
  },
];
// =========
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  music.play();
}
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  music.pause();
}
updateSong(collection[songIndex]);
function updateSong(text) {
  artist.textContent = text.person;
  title.textContent = text.title;
  image.src = `img/${text.pic}.jpg`;
  music.src = `music/${text.songName}.mp3`;
}
function nextSong() {
  songIndex++;
  if (songIndex > collection.length - 1) {
    songIndex = 0;
  }
  updateSong(collection[songIndex]);
  playSong();
}
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = collection.length - 1;
  }
  updateSong(collection[songIndex]);
  playSong();
}
function setTime(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.target;
    const durationPercentage = (currentTime / duration) * 100;
    progress.style.width = `${durationPercentage}%`;
    const durationMin = Math.floor(duration / 60);
    let durationSec = Math.floor(duration % 60);
    if (durationSec < 10) {
      durationSec = `0${durationSec}`;
    }
    if (durationSec) {
      durationTimeElement.textContent = `${durationMin}:${durationSec}`;
    }
    const currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
      currentSec = `0${currentSec}`;
    }
    if (currentSec) {
      currentTimeElement.textContent = `${currentMin}:${currentSec}`;
    }
  }
}
function setBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}
// ===========
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
music.addEventListener("timeupdate", setTime);
progressContainer.addEventListener("click", setBar);
music.addEventListener("ended", nextSong);
