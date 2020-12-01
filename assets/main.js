class Piano {
    constructor() {
        this.record = false;
        this.music = [];
    }

    keyboardEvent() {
        document.addEventListener('keyup', this.playSound.bind(this));
    }

    playSound(e) {
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
            this.music.push(sound);
            console.log(this.music);
        }
    }

    recordEvent() {
        document.querySelector('#record').addEventListener('click', this.switchRecord.bind(this));
    }

    switchRecord(e) {
        // if (this.record == true) {
        //     this.record = false;
        // }
        // else {
        //     this.record = true;
        // }

        this.record = !this.record;
        if (this.record == true) {
            e.target.innerHTML = 'Stop';
        }
        else {
            e.target.innerHTML = 'Record';
        }
    }

    playEvent(){
        document.querySelector('#play').addEventListener('click', this.playRecord.bind(this));
    }

    playRecord(){
        for(let m of this.music){
            const playAudio = document.createElement('audio');
            playAudio.src = 'assets/notes/' + m;
            playAudio.play();
        }
    }

}

const piano = new Piano();
piano.keyboardEvent();
piano.recordEvent();
piano.playEvent();
