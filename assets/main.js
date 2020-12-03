class Piano {
    constructor() {
        this.record = false;
        this.music = [];
    }

    keyboardEvent() {
        document.addEventListener('keyup', this.playSound.bind(this));
    }

    playSound(e) {
        if (e.target.id == 'title') {
            return 1;
        }

        const li = document.querySelector(`[data-key='${e.key}']`)
        if (li == null) {
            return 1;
        }

        li.classList.add('active');
        setTimeout(function () {
            li.classList.remove('active');
        }, 500);

        const sound = li.dataset.sound;
        const audio = document.createElement('audio');
        audio.src = 'assets/notes/' + sound;
        audio.play();

        if (this.record == true) {
            const click = {
                sound: sound,
                date: new Date().getTime(),
            }

            this.music.push(click);
            
        }
    }

    recordEvent() {
        document.querySelector('#record').addEventListener('click', this.switchRecord.bind(this));
    }

    switchRecord(e) {

        this.record = !this.record;
        if (this.record == true) {
            e.target.innerHTML = 'Stop';
        }
        else {
            e.target.innerHTML = 'Record';
        }
    }

    playEvent() {
        document.querySelector('#play').addEventListener('click', this.playRecord.bind(this));
    }

    playRecord() {
        let difference = 0;
        for (let m = 0; m < this.music.length; m++) {
            if (m > 0) {
                difference = difference + (this.music[m].date - this.music[m - 1].date)
                console.log(difference);
            }

            setTimeout(() => {
                const playAudio = document.createElement('audio');
                playAudio.src = 'assets/notes/' + this.music[m].sound;
                playAudio.play();
            }, difference);

        }
    }

    saveRecordEvent() {
        document.querySelector('#save').addEventListener('click', this.saveRecord.bind(this));
    }

    saveRecord() {
        const input = document.querySelector('#title');
        let saveRecords = localStorage.getItem('rec');

        const toSave = {
            name: input.value,
            audio: this.music
        }

        if (saveRecords == null) {
            saveRecords = [toSave]
        }
        else {
            saveRecords = JSON.parse(saveRecords);
            saveRecords.push(toSave);
        }

        saveRecords = JSON.stringify(saveRecords);
        localStorage.setItem('rec', saveRecords);
        input.value = '';
        this.listOfSongs();
    }

    listOfSongs() {
        const savedSongs = document.querySelector('#saved');
        savedSongs.innerHTML = '';
        let ourSongs = localStorage.getItem('rec');
        ourSongs = JSON.parse(ourSongs);
        for (let ourSong of ourSongs) {
            let li = document.createElement('li');
            li.innerHTML = ourSong.name;
            li.addEventListener('click', this.overwrite.bind(this));
            li.style.float = 'none';
            li.dataset.audio = JSON.stringify(ourSong.audio);
            savedSongs.appendChild(li);


        }
    }

    overwrite(e) {
        const parsedAudio = JSON.parse(e.target.dataset.audio);
        this.music = parsedAudio;
    }

}

const piano = new Piano();
piano.keyboardEvent();
piano.recordEvent();
piano.playEvent();
piano.saveRecordEvent();
piano.listOfSongs();
