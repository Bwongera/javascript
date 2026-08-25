const audio = document.getElementById("audio");

const musicInput = document.getElementById("musicInput");

const songsContainer = document.getElementById("songs");

const empty = document.getElementById("empty");

const songCount = document.getElementById("songCount");

const songTitle = document.getElementById("songTitle");

const artist = document.getElementById("artist");

const cover = document.getElementById("cover");

const playBtn = document.getElementById("playBtn");

const previousBtn = document.getElementById("previousBtn");

const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");

const progress = document.getElementById("progress");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const libraryBtn = document.getElementById("libraryBtn");

const favoriteBtn = document.getElementById("favoriteBtn");

const pageTitle = document.getElementById("pageTitle");

const playlistTitle = document.getElementById("playlistTitle");


/* =========================
   VARIABLES
========================= */

let songs = [];

let currentSongIndex = -1;

let favorites = [];

let currentPage = "library";


/* =========================
   AUDIO DEFAULT
========================= */

audio.volume = 0.8;


/* =========================
   ADD MUSIC
========================= */

musicInput.addEventListener("change", function () {

    const files = [...this.files];

    files.forEach(function (file) {

        if (!file.type.startsWith("audio/")) {
            return;
        }

        const song = {

            name: file.name
                .replace(/\.[^/.]+$/, ""),

            artist: "Local Music",

            file: file,

            url: URL.createObjectURL(file)

        };

        songs.push(song);

    });


    if (songs.length > 0 && currentSongIndex === -1) {

        loadSong(0);

    }


    displaySongs();

    this.value = "";

});


/* =========================
   LOAD SONG
========================= */

function loadSong(index, autoPlay = false) {

    if (songs.length === 0) {
        return;
    }


    currentSongIndex =
        (index + songs.length) % songs.length;


    const song = songs[currentSongIndex];


    audio.src = song.url;


    songTitle.textContent = song.name;

    artist.textContent = song.artist;


    cover.textContent = "♪";


    progress.style.width = "0%";

    currentTime.textContent = "0:00";

    duration.textContent = "0:00";


    displaySongs();


    if (autoPlay) {

        audio.play().catch(function () {

            console.log("Browser blocked autoplay.");

        });

    }

}


/* =========================
   PLAY / PAUSE
========================= */

playBtn.addEventListener("click", function () {

    if (songs.length === 0) {

        musicInput.click();

        return;

    }


    if (currentSongIndex === -1) {

        loadSong(0, true);

        return;

    }


    if (audio.paused) {

        audio.play();

    } else {

        audio.pause();

    }

});


/* =========================
   AUDIO PLAY
========================= */

audio.addEventListener("play", function () {

    playBtn.textContent = "⏸";

    displaySongs();

});


/* =========================
   AUDIO PAUSE
========================= */

audio.addEventListener("pause", function () {

    playBtn.textContent = "▶";

    displaySongs();

});


/* =========================
   NEXT
========================= */

nextBtn.addEventListener("click", function () {

    if (songs.length === 0) {
        return;
    }

    loadSong(currentSongIndex + 1, true);

});


/* =========================
   PREVIOUS
========================= */

previousBtn.addEventListener("click", function () {

    if (songs.length === 0) {
        return;
    }


    if (audio.currentTime > 3) {

        audio.currentTime = 0;

    } else {

        loadSong(currentSongIndex - 1, true);

    }

});


/* =========================
   SONG ENDED
========================= */

audio.addEventListener("ended", function () {

    if (songs.length > 0) {

        loadSong(currentSongIndex + 1, true);

    }

});


/* =========================
   TIME
========================= */

audio.addEventListener("loadedmetadata", function () {

    duration.textContent =
        formatTime(audio.duration);

});


audio.addEventListener("timeupdate", function () {

    if (!audio.duration) {
        return;
    }


    const percentage =
        (audio.currentTime / audio.duration) * 100;


    progress.style.width =
        percentage + "%";


    currentTime.textContent =
        formatTime(audio.currentTime);

});


/* =========================
   FORMAT TIME
========================= */

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {

        return "0:00";

    }


    const minutes =
        Math.floor(seconds / 60);


    const remainingSeconds =
        Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");


    return `${minutes}:${remainingSeconds}`;

}


/* =========================
   PROGRESS CLICK
========================= */

progressBar.addEventListener("click", function (event) {

    if (!audio.duration) {
        return;
    }


    const width =
        this.clientWidth;


    const clickX =
        event.offsetX;


    const percentage =
        clickX / width;


    audio.currentTime =
        percentage * audio.duration;

});


/* =========================
   VOLUME
========================= */

volume.addEventListener("input", function () {

    audio.volume =
        Number(this.value);

});


/* =========================
   DISPLAY SONGS
========================= */

function displaySongs() {

    songsContainer.innerHTML = "";


    let visibleSongs = songs;


    if (currentPage === "favorites") {

        visibleSongs = songs.filter(function (song, index) {

            return favorites.includes(index);

        });

    }


    songCount.textContent =
        `${visibleSongs.length} ${
            visibleSongs.length === 1
                ? "song"
                : "songs"
        }`;


    if (visibleSongs.length === 0) {

        empty.style.display = "grid";

    } else {

        empty.style.display = "none";

    }


    visibleSongs.forEach(function (song) {

        const realIndex =
            songs.indexOf(song);


        const songElement =
            document.createElement("div");


        songElement.className = "song";


        if (realIndex === currentSongIndex) {

            songElement.classList.add("active");

        }


        /* NUMBER */

        const number =
            document.createElement("div");

        number.className =
            "song-number";


        if (
            realIndex === currentSongIndex &&
            !audio.paused
        ) {

            number.textContent = "▶";

        } else {

            number.textContent =
                String(realIndex + 1)
                    .padStart(2, "0");

        }


        /* COVER */

        const songCover =
            document.createElement("div");

        songCover.className =
            "song-cover";

        songCover.textContent = "♪";


        /* INFO */

        const info =
            document.createElement("div");

        info.className =
            "song-info";


        const title =
            document.createElement("strong");

        title.textContent =
            song.name;


        const songArtist =
            document.createElement("span");

        songArtist.textContent =
            song.artist;


        info.appendChild(title);

        info.appendChild(songArtist);


        /* FAVORITE */

        const favorite =
            document.createElement("button");

        favorite.className =
            "favorite";


        if (favorites.includes(realIndex)) {

            favorite.classList.add("active");

            favorite.textContent = "♥";

        } else {

            favorite.textContent = "♡";

        }


        favorite.addEventListener("click", function (event) {

            event.stopPropagation();


            if (favorites.includes(realIndex)) {

                favorites =
                    favorites.filter(
                        index => index !== realIndex
                    );

            } else {

                favorites.push(realIndex);

            }


            displaySongs();

        });


        /* ADD ELEMENTS */

        songElement.appendChild(number);

        songElement.appendChild(songCover);

        songElement.appendChild(info);

        songElement.appendChild(favorite);


        /* PLAY SONG */

        songElement.addEventListener(
            "click",
            function () {

                loadSong(realIndex, true);

            }
        );


        songsContainer.appendChild(
            songElement
        );

    });

}


/* =========================
   LIBRARY
========================= */

libraryBtn.addEventListener("click", function () {

    currentPage = "library";


    libraryBtn.classList.add("active");

    favoriteBtn.classList.remove("active");


    pageTitle.textContent =
        "My Music";

    playlistTitle.textContent =
        "Your Songs";


    displaySongs();

});


/* =========================
   FAVORITES
========================= */

favoriteBtn.addEventListener("click", function () {

    currentPage = "favorites";


    favoriteBtn.classList.add("active");

    libraryBtn.classList.remove("active");


    pageTitle.textContent =
        "Favorites";

    playlistTitle.textContent =
        "Favorite Songs";


    displaySongs();

});


/* =========================
   INITIAL
========================= */

displaySongs();