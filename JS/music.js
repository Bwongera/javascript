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

let songs = [];
let currentSongIndex = -1;
let favorites = [];
let currentPage = "library";
let db = null;
let currentObjectUrl = null;

const DB_NAME = "VibeVaultMusicDB";
const DB_VERSION = 1;
const STORE_NAME = "songs";

function openDatabase() {
    return new Promise(function (resolve, reject) {
        if (!window.indexedDB) {
            reject(
                new Error(
                    "IndexedDB is not supported by this browser."
                )
            );
            return;
        }
        const request =
            indexedDB.open(
                DB_NAME,
                DB_VERSION
            );
        request.onupgradeneeded =
            function (event) {

                const database =
                    event.target.result;
                if (
                    !database.objectStoreNames.contains(
                        STORE_NAME
                    )
                ) {
                    const store =
                        database.createObjectStore(
                            STORE_NAME,
                            {
                                keyPath: "id",
                                autoIncrement: true
                            }
                        );
                    store.createIndex(
                        "addedAt",
                        "addedAt",
                        {
                            unique: false
                        }
                    );
                }
            };
        request.onsuccess =
            function (event) {
                db =
                    event.target.result;
                db.onversionchange =
                    function () {
                        db.close();
                    };
                resolve(db);
            };
        request.onerror =
            function () {
                reject(
                    request.error
                );
            };
    });
}


function saveSong(song) {
    return new Promise(
        function (resolve, reject) {
            const transaction =
                db.transaction(
                    STORE_NAME,
                    "readwrite"
                );
            const store =
                transaction.objectStore(
                    STORE_NAME
                );
            const request =
                store.add({
                    name:
                        song.name,
                    artist:
                        song.artist,
                    file:
                        song.file,
                    addedAt:
                        Date.now()
                });
            request.onsuccess =
                function () {
                    resolve(
                        request.result
                    );
                };
            request.onerror =
                function () {
                    reject(
                        request.error
                    );
                };
        }
    );
}

function getAllSongs() {
    return new Promise(
        function (resolve, reject) {
            const transaction =
                db.transaction(
                    STORE_NAME,
                    "readonly"
                );
            const store =
                transaction.objectStore(
                    STORE_NAME
                );
            const request =
                store.getAll();
           request.onsuccess =
                function () {
                    resolve(
                        request.result
                    );
                };
            request.onerror =
                function () {
                    reject(
                        request.error
                    );
                };
        }
    );
}

function deleteSong(id) {
    return new Promise(
        function (resolve, reject) {
            const transaction =
                db.transaction(
                    STORE_NAME,
                    "readwrite"
                );
            const store =
                transaction.objectStore(
                    STORE_NAME
                );
            const request =
                store.delete(id);
            request.onsuccess =
                function () {
                    resolve();

                };
            request.onerror =
                function () {
                    reject(
                        request.error
                    );
                };
        }
    );
}

function saveFavorites() {
    localStorage.setItem(
        "vibeVaultFavorites",
        JSON.stringify(
            favorites
        )
    );
}

function loadFavorites() {

    const saved =
        localStorage.getItem(
            "vibeVaultFavorites"
        );
    if (!saved) {
        favorites = [];
        return;
    }
    try {
        favorites =
            JSON.parse(saved);
        if (!Array.isArray(favorites)) {
            favorites = [];

        }

    } catch (error) {
        favorites = [];

    }

}


function saveCurrentSong() {

    if (
        currentSongIndex < 0 ||
        !songs[currentSongIndex]
    ) {

        localStorage.removeItem(
            "vibeVaultCurrentSongId"
        );

        return;

    }

    localStorage.setItem(
        "vibeVaultCurrentSongId",
        String(
            songs[currentSongIndex].id
        )
    );

}

function getSavedCurrentSongId() {
    const saved =
        localStorage.getItem(
            "vibeVaultCurrentSongId"
        );

    if (!saved) {
        return null;

    }

    return Number(saved);

}

function savePlaybackPosition() {

    if (
        currentSongIndex < 0 ||
        !songs[currentSongIndex]
    ) {
        return;
    }

    const song =
        songs[currentSongIndex];
    localStorage.setItem(
        "vibeVaultPosition_" + song.id,
        String(
            audio.currentTime || 0
        )
    );
}

function getPlaybackPosition(id) {
    const saved =
        localStorage.getItem(
            "vibeVaultPosition_" + id
        );
    if (!saved) {
        return 0;
    }
    const position =
        Number(saved);
    if (!Number.isFinite(position)) {
        return 0;
    }
    return position;
}

function deleteSavedPosition(id) {

   localStorage.removeItem(
        "vibeVaultPosition_" + id
    );
}

function loadVolume() {
    const saved =
        localStorage.getItem(
            "vibeVaultVolume"
        );
    if (saved === null) {
        audio.volume = 0.8;
        volume.value = 0.8;
        return;
    }
    const value =
        Number(saved);
    if (
        Number.isFinite(value) &&
        value >= 0 &&
        value <= 1
    ) {
        audio.volume =
            value;
        volume.value =
            value;
    } else {
        audio.volume =
            0.8;
        volume.value =
            0.8;

    }

}

volume.addEventListener(
    "input",
    function () {
        const value =
            Number(
                this.value
            );
        audio.volume =
            value;
        localStorage.setItem(
            "vibeVaultVolume",
            String(value)
        );

    }
);

function createSongUrl(file) {
    return URL.createObjectURL(
        file
    );

}

async function loadSongs() {
    const storedSongs =
        await getAllSongs();
    storedSongs.sort(
        function (a, b) {
            return a.addedAt -
                b.addedAt;

        }
    );


    songs =
        storedSongs.map(
            function (song) {

                return {

                    id:
                        song.id,

                    name:
                        song.name,

                    artist:
                        song.artist,

                    file:
                        song.file,

                    url:
                        createSongUrl(
                            song.file
                        )
                };
            }
        );
}

musicInput.addEventListener(
    "change",
    async function () {
        const files =
            Array.from(
                this.files
            );
        if (files.length === 0) {

            return;

        }
        for (const file of files) {

            if (
                !file.type.startsWith(
                    "audio/"
                )
            ) {
                continue;

            }
            const song = {

                name:
                    file.name.replace(
                        /\.[^/.]+$/,
                        ""
                    ),

                artist:
                    "Local Music",

                file:
                    file,

                url:
                    createSongUrl(
                        file
                    )

            };

            try {

                const id =
                    await saveSong(
                        song
                    );

                song.id =
                    id;
                songs.push(
                    song
                );

            } catch (error) {

                console.error(
                    "Could not save song:",
                    error
                );
            }
        }

        if (
            currentSongIndex === -1 &&
            songs.length > 0
        ) {

            loadSong(
                0,
                false
            );

        }
        displaySongs();
        this.value = "";

    }
);

function loadSong(
    index,
    autoPlay = false
) {
    if (songs.length === 0) {

        return;

    }

    if (currentObjectUrl) {

    }

    currentSongIndex =
        (index + songs.length) %
        songs.length;

    const song =
        songs[currentSongIndex];

    audio.src =
        song.url;

    songTitle.textContent =
        song.name;

    artist.textContent =
        song.artist;
    cover.textContent =
        "♪";

    progress.style.width =
        "0%";

    currentTime.textContent =
        "0:00";

    duration.textContent =
        "0:00";

    saveCurrentSong();

    displaySongs();

    if (autoPlay) {

        audio.play().catch(
            function (error) {

                console.log(
                    "Autoplay blocked:",
                    error
                );

            }
        );

    }

}

function restoreCurrentSong() {

    if (songs.length === 0) {

        return;

    }


    const savedId =
        getSavedCurrentSongId();


    if (savedId === null) {

        loadSong(
            0,
            false
        );

        return;

    }


    const index =
        songs.findIndex(
            function (song) {

                return song.id ===
                    savedId;

            }
        );


    if (index === -1) {

        loadSong(
            0,
            false
        );

        return;

    }


    loadSong(
        index,
        false
    );

}


/* =====================================================
   RESTORE PLAY POSITION
===================================================== */

audio.addEventListener(
    "loadedmetadata",
    function () {

        if (
            currentSongIndex < 0 ||
            !songs[currentSongIndex]
        ) {

            return;

        }


        const song =
            songs[currentSongIndex];


        const savedPosition =
            getPlaybackPosition(
                song.id
            );


        if (
            savedPosition > 0 &&
            savedPosition < audio.duration
        ) {

            audio.currentTime =
                savedPosition;

        }


        duration.textContent =
            formatTime(
                audio.duration
            );

    }
);


/* =====================================================
   PLAY / PAUSE
===================================================== */

playBtn.addEventListener(
    "click",
    function () {

        if (songs.length === 0) {

            musicInput.click();

            return;

        }


        if (currentSongIndex === -1) {

            loadSong(
                0,
                true
            );

            return;

        }


        if (audio.paused) {

            audio.play();

        } else {

            audio.pause();

        }

    }
);


/* =====================================================
   PLAY EVENT
===================================================== */

audio.addEventListener(
    "play",
    function () {

        playBtn.textContent =
            "⏸";


        displaySongs();

    }
);


/* =====================================================
   PAUSE EVENT
===================================================== */

audio.addEventListener(
    "pause",
    function () {

        playBtn.textContent =
            "▶";


        savePlaybackPosition();


        displaySongs();

    }
);


/* =====================================================
   TIME UPDATE
===================================================== */

audio.addEventListener(
    "timeupdate",
    function () {

        if (!audio.duration) {

            return;

        }


        const percentage =
            (
                audio.currentTime /
                audio.duration
            ) * 100;


        progress.style.width =
            percentage + "%";


        currentTime.textContent =
            formatTime(
                audio.currentTime
            );


        /*
         * Save position continuously.
         * This means refresh can restore
         * approximately where you stopped.
         */

        savePlaybackPosition();

    }
);


/* =====================================================
   NEXT
===================================================== */

nextBtn.addEventListener(
    "click",
    function () {

        if (songs.length === 0) {

            return;

        }


        loadSong(
            currentSongIndex + 1,
            true
        );

    }
);


/* =====================================================
   PREVIOUS
===================================================== */

previousBtn.addEventListener(
    "click",
    function () {

        if (songs.length === 0) {

            return;

        }


        if (audio.currentTime > 3) {

            audio.currentTime =
                0;

            savePlaybackPosition();

        } else {

            loadSong(
                currentSongIndex - 1,
                true
            );

        }

    }
);


/* =====================================================
   SONG ENDED
===================================================== */

audio.addEventListener(
    "ended",
    function () {

        if (
            currentSongIndex >= 0 &&
            songs[currentSongIndex]
        ) {

            deleteSavedPosition(
                songs[currentSongIndex].id
            );

        }


        if (songs.length > 0) {

            loadSong(
                currentSongIndex + 1,
                true
            );

        }

    }
);


/* =====================================================
   FORMAT TIME
===================================================== */

function formatTime(seconds) {

    if (
        !Number.isFinite(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remainingSeconds =
        Math.floor(
            seconds % 60
        )
        .toString()
        .padStart(
            2,
            "0"
        );


    return (
        minutes +
        ":" +
        remainingSeconds
    );

}


/* =====================================================
   PROGRESS CLICK
===================================================== */

progressBar.addEventListener(
    "click",
    function (event) {

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
            percentage *
            audio.duration;


        savePlaybackPosition();

    }
);


/* =====================================================
   DISPLAY SONGS
===================================================== */

function displaySongs() {

    songsContainer.innerHTML = "";


    let visibleSongs =
        songs;


    if (
        currentPage ===
        "favorites"
    ) {

        visibleSongs =
            songs.filter(
                function (song) {

                    return favorites.includes(
                        song.id
                    );

                }
            );

    }


    songCount.textContent =
        visibleSongs.length +
        " " +
        (
            visibleSongs.length === 1
                ? "song"
                : "songs"
        );


    if (
        visibleSongs.length === 0
    ) {

        empty.style.display =
            "grid";

    } else {

        empty.style.display =
            "none";

    }


    visibleSongs.forEach(
        function (song) {

            const realIndex =
                songs.indexOf(
                    song
                );


            const songElement =
                document.createElement(
                    "div"
                );


            songElement.className =
                "song";


            if (
                realIndex ===
                currentSongIndex
            ) {

                songElement.classList.add(
                    "active"
                );

            }


            /* NUMBER */

            const number =
                document.createElement(
                    "div"
                );


            number.className =
                "song-number";


            if (
                realIndex ===
                    currentSongIndex &&
                !audio.paused
            ) {

                number.textContent =
                    "▶";

            } else {

                number.textContent =
                    String(
                        realIndex + 1
                    )
                    .padStart(
                        2,
                        "0"
                    );

            }


            /* COVER */

            const songCover =
                document.createElement(
                    "div"
                );


            songCover.className =
                "song-cover";


            songCover.textContent =
                "♪";


            /* INFO */

            const info =
                document.createElement(
                    "div"
                );


            info.className =
                "song-info";


            const title =
                document.createElement(
                    "strong"
                );


            title.textContent =
                song.name;


            const songArtist =
                document.createElement(
                    "span"
                );


            songArtist.textContent =
                song.artist;


            info.appendChild(
                title
            );


            info.appendChild(
                songArtist
            );


            /* ACTIONS */

            const actions =
                document.createElement(
                    "div"
                );


            actions.className =
                "song-actions";


            /* FAVORITE */

            const favorite =
                document.createElement(
                    "button"
                );


            favorite.className =
                "favorite";


            if (
                favorites.includes(
                    song.id
                )
            ) {

                favorite.classList.add(
                    "active"
                );

                favorite.textContent =
                    "♥";

            } else {

                favorite.textContent =
                    "♡";

            }


            favorite.title =
                "Favorite";


            favorite.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    if (
                        favorites.includes(
                            song.id
                        )
                    ) {

                        favorites =
                            favorites.filter(
                                function (id) {

                                    return id !==
                                        song.id;

                                }
                            );

                    } else {

                        favorites.push(
                            song.id
                        );

                    }


                    saveFavorites();


                    displaySongs();

                }
            );


            /* DELETE */

            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.className =
                "delete-song";


            deleteButton.textContent =
                "🗑";


            deleteButton.title =
                "Delete song";


            deleteButton.addEventListener(
                "click",
                async function (event) {

                    event.stopPropagation();


                    const confirmed =
                        confirm(
                            'Delete "' +
                            song.name +
                            '" from your library?'
                        );


                    if (!confirmed) {

                        return;

                    }


                    await removeSong(
                        song,
                        realIndex
                    );

                }
            );


            actions.appendChild(
                favorite
            );


            actions.appendChild(
                deleteButton
            );


            /* ADD ELEMENTS */

            songElement.appendChild(
                number
            );


            songElement.appendChild(
                songCover
            );


            songElement.appendChild(
                info
            );


            songElement.appendChild(
                actions
            );


            /* PLAY */

            songElement.addEventListener(
                "click",
                function () {

                    loadSong(
                        realIndex,
                        true
                    );

                }
            );


            songsContainer.appendChild(
                songElement
            );

        }
    );

}


/* =====================================================
   REMOVE SONG
===================================================== */

async function removeSong(
    song,
    realIndex
) {

    const wasCurrent =
        realIndex ===
        currentSongIndex;


    const deletedId =
        song.id;


    try {

        await deleteSong(
            deletedId
        );


        favorites =
            favorites.filter(
                function (id) {

                    return id !==
                        deletedId;

                }
            );


        saveFavorites();


        deleteSavedPosition(
            deletedId
        );


        if (
            song.url
        ) {

            URL.revokeObjectURL(
                song.url
            );

        }


        songs.splice(
            realIndex,
            1
        );


        if (songs.length === 0) {

            audio.pause();

            audio.removeAttribute(
                "src"
            );

            audio.load();


            currentSongIndex =
                -1;


            songTitle.textContent =
                "No Song Selected";


            artist.textContent =
                "Add music to start listening";


            cover.textContent =
                "♪";


            progress.style.width =
                "0%";


            currentTime.textContent =
                "0:00";


            duration.textContent =
                "0:00";


            localStorage.removeItem(
                "vibeVaultCurrentSongId"
            );


        } else if (wasCurrent) {

            let newIndex =
                realIndex;


            if (
                newIndex >=
                songs.length
            ) {

                newIndex =
                    songs.length - 1;

            }


            loadSong(
                newIndex,
                false
            );


        } else {

            if (
                realIndex <
                currentSongIndex
            ) {

                currentSongIndex--;

            }


            saveCurrentSong();


        }


        displaySongs();

    } catch (error) {

        console.error(
            "Could not delete song:",
            error
        );

        alert(
            "The song could not be deleted."
        );

    }

}


/* =====================================================
   LIBRARY
===================================================== */

libraryBtn.addEventListener(
    "click",
    function () {

        currentPage =
            "library";


        libraryBtn.classList.add(
            "active"
        );


        favoriteBtn.classList.remove(
            "active"
        );


        pageTitle.textContent =
            "My Music";


        playlistTitle.textContent =
            "Your Songs";


        displaySongs();

    }
);


/* =====================================================
   FAVORITES
===================================================== */

favoriteBtn.addEventListener(
    "click",
    function () {

        currentPage =
            "favorites";


        favoriteBtn.classList.add(
            "active"
        );


        libraryBtn.classList.remove(
            "active"
        );


        pageTitle.textContent =
            "Favorites";


        playlistTitle.textContent =
            "Favorite Songs";


        displaySongs();

    }
);


/* =====================================================
   PAGE BEFORE UNLOAD
===================================================== */

window.addEventListener(
    "beforeunload",
    function () {

        saveCurrentSong();

        savePlaybackPosition();

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

async function initializeApp() {

    try {

        await openDatabase();


        loadFavorites();


        loadVolume();


        await loadSongs();


        /*
         * Remove favorite IDs
         * that no longer exist.
         */

        const existingIds =
            songs.map(
                function (song) {

                    return song.id;

                }
            );


        favorites =
            favorites.filter(
                function (id) {

                    return existingIds.includes(
                        id
                    );

                }
            );


        saveFavorites();


        restoreCurrentSong();


        displaySongs();

    } catch (error) {

        console.error(
            "VibeVault failed to initialize:",
            error
        );


        empty.style.display =
            "grid";

    }

}


/* START APP */

initializeApp();