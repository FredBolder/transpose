import { Glob } from "./glob.js";
import { Audio } from "./audio.js";

class ChordDiagrams {
    static guitarFrets;
    static guitarLeftHanded;
    static guitarTuning;
    static guitarTuningStatus;
    static guitarVariation;
    static tuningGain;
    static tuningOscillator;
    static ukuleleFrets;
    static ukuleleLeftHanded;
    static ukuleleTuning;
    static ukuleleTuningStatus;
    static ukuleleVariation;

    static init() {
        this.guitarFrets = [];
        this.guitarLeftHanded = false;
        this.guitarTuning = "E2-A2-D3-G3-B3-E4";
        this.guitarTuningStatus = 0;
        this.guitarVariation = 0;
        this.tuningGain = null;
        this.tuningOscillator = null;
        this.ukuleleFrets = [];
        this.ukuleleLeftHanded = false;
        this.ukuleleTuning = "G4-C4-E4-A4";
        this.ukuleleTuningStatus = 0;
        this.ukuleleVariation = 0;
    }

    static drawGuitar(idx, notes, variation, info) {
        const columns = 5;
        let maxFret = 0;
        const maxFretDist = 4;
        const rows = 5;
        let bass1 = 0;
        let bass2 = 0;
        let ch = 0;
        let cw = 0;
        let dx1 = 0;
        let dy1 = 0;
        let fretStart = 1;
        let found = false;
        let infoStr = "";
        let lowestIsRoot = false;
        let nFound = 0;
        let ok = true;
        let snareIdx = 0;
        let snares;

        const guitar = Glob.settings.guitar;
        guitar.height = guitar.clientHeight * 2;
        guitar.width = guitar.clientWidth * 2;
        const gtr = guitar.getContext("2d");
        gtr.reset();
        const guitarFilter = Glob.settings.guitarFilter.value;

        switch (this.guitarTuning) {
            case "E2-A2-D3-G3-B3-E4":
                // oct is only for calculating the lowest note and the highest note for the info
                // Standard
                snares = [{ note: 4, fret: 0, oct: 2 }, { note: 9, fret: 0, oct: 2 }, { note: 2, fret: 0, oct: 3 }, { note: 7, fret: 0, oct: 3 }, { note: 11, fret: 0, oct: 3 }, { note: 4, fret: 0, oct: 4 }];
                break;
            case "D2-A2-D3-G3-B3-E4":
                // Drop D
                snares = [{ note: 2, fret: 0, oct: 2 }, { note: 9, fret: 0, oct: 2 }, { note: 2, fret: 0, oct: 3 }, { note: 7, fret: 0, oct: 3 }, { note: 11, fret: 0, oct: 3 }, { note: 4, fret: 0, oct: 4 }];
                break;
            case "D2-A2-D3-F#3-A3-D4":
                // Open D
                snares = [{ note: 2, fret: 0, oct: 2 }, { note: 9, fret: 0, oct: 2 }, { note: 2, fret: 0, oct: 3 }, { note: 6, fret: 0, oct: 3 }, { note: 9, fret: 0, oct: 3 }, { note: 2, fret: 0, oct: 4 }];
                break;
            case "D2-A2-D3-F3-A3-D4":
                // Open D Minor
                snares = [{ note: 2, fret: 0, oct: 2 }, { note: 9, fret: 0, oct: 2 }, { note: 2, fret: 0, oct: 3 }, { note: 5, fret: 0, oct: 3 }, { note: 9, fret: 0, oct: 3 }, { note: 2, fret: 0, oct: 4 }];
                break;
            default:
                snares = [{ note: 4, fret: 0, oct: 2 }, { note: 9, fret: 0, oct: 2 }, { note: 2, fret: 0, oct: 3 }, { note: 7, fret: 0, oct: 3 }, { note: 11, fret: 0, oct: 3 }, { note: 4, fret: 0, oct: 4 }];
                break;
        }

        ch = guitar.height;
        cw = guitar.width;
        dx1 = cw / (columns + 2.5);
        dy1 = ch / (rows + 2);

        // Draw raster
        gtr.lineWidth = 2;
        gtr.fillStyle = "white";
        gtr.strokeStyle = "black";
        for (let col = 0; col < columns; col++) {
            for (let row = 0; row < rows; row++) {
                gtr.beginPath;
                gtr.fillRect((col * dx1) + (0.5 * dx1), (row * dy1) + (1.5 * dy1), dx1, dy1);
                gtr.strokeRect((col * dx1) + (0.5 * dx1), (row * dy1) + (1.5 * dy1), dx1, dy1);
            }
        }

        if (!variation || (this.guitarFrets.length === 0)) {
            if (notes.length > 0) {
                let transposed = [];
                for (let i = 0; i < notes.length; i++) {
                    let note = (notes[i] + idx) % 12;
                    transposed.push(note);
                }

                // Keep only the most important notes
                if (transposed.length > 4) {
                    // Delete the fifth
                    let p = transposed.indexOf((7 + idx) % 12);
                    if (p >= 0) {
                        transposed.splice(p, 1);
                    }
                }
                if (transposed.length > 4) {
                    if (transposed.includes((17 + idx) % 12) || transposed.includes((21 + idx) % 12)) {
                        // Delete the ninth
                        let p = transposed.indexOf((14 + idx) % 12);
                        if (p >= 0) {
                            transposed.splice(p, 1);
                        }
                    }
                }
                if (transposed.length > 4) {
                    if (transposed.includes((21 + idx) % 12)) {
                        // Delete the eleventh
                        let p = transposed.indexOf((17 + idx) % 12);
                        if (p >= 0) {
                            transposed.splice(p, 1);
                        }
                    }
                }

                // Keep only the possible fret positions
                if (guitarFilter === "Fret5") {
                    maxFret = 5;
                } else {
                    maxFret = 15;
                }
                const frets = [];
                for (let i = 0; i < snares.length; i++) {
                    frets.push([]);
                    if ([0, 1, 5].includes(i)) {
                        frets[i].push(-1);
                    }
                    for (let j = 0; j <= maxFret; j++) {
                        const note = (snares[i].note + j) % 12;
                        if (transposed.includes(note)) {
                            frets[i].push(j);
                        }
                    }
                }

                // Fret position
                this.guitarVariation = 0;
                this.guitarFrets.length = 0;
                if ((frets[0].length > 0) && (frets[1].length > 0) && (frets[2].length > 0) && (frets[3].length > 0)) {
                    for (let iF1 = 0; iF1 < frets[0].length; iF1++) {
                        const f1 = frets[0][iF1];
                        for (let iF2 = 0; iF2 < frets[1].length; iF2++) {
                            const f2 = frets[1][iF2];
                            for (let iF3 = 0; iF3 < frets[2].length; iF3++) {
                                const f3 = frets[2][iF3];
                                for (let iF4 = 0; iF4 < frets[3].length; iF4++) {
                                    const f4 = frets[3][iF4];
                                    for (let iF5 = 0; iF5 < frets[4].length; iF5++) {
                                        const f5 = frets[4][iF5];
                                        for (let iF6 = 0; iF6 < frets[5].length; iF6++) {
                                            const f6 = frets[5][iF6];
                                            let note1 = f1 === -1 ? -1 : (snares[0].note + f1) % 12;
                                            let note2 = f2 === -1 ? -1 : (snares[1].note + f2) % 12;
                                            let note3 = f3 === -1 ? -1 : (snares[2].note + f3) % 12;
                                            let note4 = f4 === -1 ? -1 : (snares[3].note + f4) % 12;
                                            let note5 = f5 === -1 ? -1 : (snares[4].note + f5) % 12;
                                            let note6 = f6 === -1 ? -1 : (snares[5].note + f6) % 12;
                                            nFound = 0;
                                            for (let i = 0; i < transposed.length; i++) {
                                                let note = transposed[i];
                                                if ((note1 === note) || (note2 === note) || (note3 === note) || (note4 === note) || (note5 === note) || (note6 === note)) {
                                                    nFound++;
                                                }
                                            }
                                            if ((nFound === snares.length) || (nFound === transposed.length)) {
                                                ok = true;
                                                // Only outside mutes
                                                if ((f1 !== -1) && (f2 === -1)) {
                                                    ok = false;
                                                }
                                                // Maximal 2 mutes
                                                if ((f1 === -1) && (f2 === -1) && (f6 === -1)) {
                                                    ok = false;
                                                }
                                                // Minimal bass note distance 4 semitones
                                                if ((f1 !== -1) && (f2 !== -1)) {
                                                    bass1 = snares[0].note + f1 + (snares[0].oct * 12);
                                                    bass2 = snares[1].note + f2 + (snares[1].oct * 12);
                                                    if (Math.abs(bass1 - bass2) < 4) {
                                                        ok = false;
                                                    }
                                                }
                                                // Not enough fingers
                                                if (this.usedFingers([f1, f2, f3, f4, f5, f6]) > 4) {
                                                    ok = false;
                                                }

                                                if (ok) {
                                                    const result = this.fretRange([f1, f2, f3, f4, f5, f6]);
                                                    snares[0].fret = f1;
                                                    snares[1].fret = f2;
                                                    snares[2].fret = f3;
                                                    snares[3].fret = f4;
                                                    snares[4].fret = f5;
                                                    snares[5].fret = f6;
                                                    lowestIsRoot = (transposed[0] === this.lowestNoteAndHighestNote(snares).lowest);
                                                    if ((guitarFilter === "All") || ((guitarFilter === "Fret5") && (result.maxFretPosition <= 5)) ||
                                                        ((guitarFilter === "LowestIsRoot") && lowestIsRoot)) {
                                                        if ((result.maxFretPosition - result.minFretPosition) < maxFretDist) {
                                                            this.guitarFrets.push({ f1, f2, f3, f4, f5, f6 });
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // Remove variations with mute that exist already without that mute
        const newGuitarFrets = [];
        for (let i = 0; i < this.guitarFrets.length; i++) {
            found = false;
            const gf1 = this.guitarFrets[i];
            for (let j = 0; j < this.guitarFrets.length; j++) {
                const gf2 = this.guitarFrets[j];
                if ((gf1.f3 === gf2.f3) && (gf1.f4 === gf2.f4) && (gf1.f5 === gf2.f5)) {
                    if ((gf1.f1 === gf2.f1) && (gf1.f2 === gf2.f2) && (gf1.f6 === -1) && (gf2.f6 !== -1)) {
                        found = true;
                    }
                    if ((gf1.f1 === gf2.f1) && (gf1.f6 === gf2.f6) && (gf1.f2 === -1) && (gf2.f2 !== -1)) {
                        found = true;
                    }
                    if ((gf1.f6 === gf2.f6) && (gf1.f1 === -1) && (gf2.f1 !== -1) && (gf1.f2 === -1) && (gf2.f2 !== -1)) {
                        found = true;
                    }
                }
            }
            if (!found) {
                newGuitarFrets.push(gf1);
            }
        }
        this.guitarFrets.length = 0;
        this.guitarFrets = null;
        this.guitarFrets = newGuitarFrets;

        // Sort by fret start
        this.guitarFrets.sort((a, b) => {
            let fretStartA = 1;
            let fretStartB = 1;
            const resultA = this.fretRange([a.f1, a.f2, a.f3, a.f4, a.f5, a.f6]);
            if (resultA.maxFretPosition > rows) {
                if (resultA.minFretPosition === 0) {
                    fretStartA = resultA.maxFretPosition;
                } else {
                    fretStartA = resultA.minFretPosition;
                }
            }
            const resultB = this.fretRange([b.f1, b.f2, b.f3, b.f4, b.f5, b.f6]);
            if (resultB.maxFretPosition > rows) {
                if (resultB.minFretPosition === 0) {
                    fretStartB = resultB.maxFretPosition;
                } else {
                    fretStartB = resultB.minFretPosition;
                }
            }
            return fretStartA - fretStartB;
        });

        if (this.guitarFrets.length > 0) {
            if (this.guitarVariation >= this.guitarFrets.length) {
                this.guitarVariation = 0;
            }
            snares[0].fret = this.guitarFrets[this.guitarVariation].f1;
            snares[1].fret = this.guitarFrets[this.guitarVariation].f2;
            snares[2].fret = this.guitarFrets[this.guitarVariation].f3;
            snares[3].fret = this.guitarFrets[this.guitarVariation].f4;
            snares[4].fret = this.guitarFrets[this.guitarVariation].f5;
            snares[5].fret = this.guitarFrets[this.guitarVariation].f6;
            Glob.settings.guitarVariation.innerText = `${this.guitarVariation + 1}/${this.guitarFrets.length}`;

            fretStart = 1;
            const result = this.fretRange([snares[0].fret, snares[1].fret, snares[2].fret, snares[3].fret, snares[4].fret, snares[5].fret]);
            if (result.maxFretPosition > rows) {
                if (result.minFretPosition === 0) {
                    fretStart = result.maxFretPosition;
                } else {
                    fretStart = result.minFretPosition;
                }
            }

            if (fretStart === 1) {
                gtr.lineWidth = 6;
                gtr.beginPath();
                gtr.moveTo(0.5 * dx1, 1.5 * dy1);
                gtr.lineTo((columns * dx1) + (0.5 * dx1), 1.5 * dy1);
                gtr.stroke();
            } else {
                gtr.font = "24px serif";
                gtr.fillStyle = "black";
                gtr.fillText(fretStart.toString(), cw - 30, (2.5 * dy1));
            }

            // Draw dots and crosses
            gtr.lineWidth = 2;
            gtr.fillStyle = "black";
            gtr.strokeStyle = "black";
            for (let col = 0; col <= columns; col++) {
                if (this.guitarLeftHanded) {
                    snareIdx = columns - col;
                } else {
                    snareIdx = col;
                }
                if (snares[snareIdx].fret === 0) {
                    gtr.beginPath();
                    gtr.arc((col * dx1) + (0.5 * dx1), (dy1 * 0.7), 6, 0, 2 * Math.PI);
                    gtr.stroke();
                }
                if (snares[snareIdx].fret === -1) {
                    gtr.beginPath();
                    gtr.moveTo((col * dx1) + (0.5 * dx1) - 5, (dy1 * 0.7) - 5);
                    gtr.lineTo((col * dx1) + (0.5 * dx1) + 5, (dy1 * 0.7) + 5);
                    gtr.stroke();
                    gtr.beginPath();
                    gtr.moveTo((col * dx1) + (0.5 * dx1) - 5, (dy1 * 0.7) + 5);
                    gtr.lineTo((col * dx1) + (0.5 * dx1) + 5, (dy1 * 0.7) - 5);
                    gtr.stroke();
                }
                for (let row = 0; row < rows; row++) {
                    if (snares[snareIdx].fret === (row + fretStart)) {
                        gtr.beginPath();
                        gtr.arc((col * dx1) + (0.5 * dx1), (row * dy1) + dy1 + dy1, 6, 0, 2 * Math.PI);
                        gtr.fill();
                        gtr.stroke();
                    }
                }
            }
            if (info) {
                let note = 0;
                let notes;
                if (document.getElementById("useSharps").checked) {
                    notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
                } else {
                    notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
                }
                infoStr = "Notes: "
                for (let i = 0; i < snares.length; i++) {
                    note = (snares[i].note + snares[i].fret) % 12;
                    if (i > 0) {
                        infoStr += ", ";
                    }
                    if (snares[i].fret !== -1) {
                        infoStr += notes[note];

                    } else {
                        infoStr += "X";
                    }
                }
                infoStr += "\nLowest note: ";
                const lowestHighest = this.lowestNoteAndHighestNote(snares);
                infoStr += notes[lowestHighest.lowest];
                infoStr += "\nHighest note: ";
                infoStr += notes[lowestHighest.highest];
                alert(infoStr);
            }
        } else {
            Glob.settings.guitarVariation.innerText = "";
        }
    }

    static drawUkulele(idx, notes, variation, info) {
        const columns = 3;
        let maxFret = 0;
        const rows = 5;
        let ch = 0;
        let cw = 0;
        let dx1 = 0;
        let dy1 = 0;
        let fretStart = 1;
        let infoStr = "";
        let nFound = 0;
        let snareIdx = 0;
        let snares;

        const ukulele = Glob.settings.ukulele;
        ukulele.height = ukulele.clientHeight * 2;
        ukulele.width = ukulele.clientWidth * 2;
        const uku = ukulele.getContext("2d");
        uku.reset();
        const ukuleleFilter = Glob.settings.ukuleleFilter.value;

        switch (this.ukuleleTuning) {
            case "G4-C4-E4-A4":
                // oct is only for calculating the lowest note and the highest note for the info
                // High G
                snares = [{ note: 7, fret: 0, oct: 4 }, { note: 0, fret: 0, oct: 4 }, { note: 4, fret: 0, oct: 4 }, { note: 9, fret: 0, oct: 4 }];
                break;
            case "G3-C4-E4-A4":
                // Low G
                snares = [{ note: 7, fret: 0, oct: 3 }, { note: 0, fret: 0, oct: 4 }, { note: 4, fret: 0, oct: 4 }, { note: 9, fret: 0, oct: 4 }];
                break;
            case "A4-D4-F#4-B4":
                snares = [{ note: 9, fret: 0, oct: 4 }, { note: 2, fret: 0, oct: 4 }, { note: 6, fret: 0, oct: 4 }, { note: 11, fret: 0, oct: 4 }];
                break;
            case "G4-C4-E4-G4":
                // Slack Key
                snares = [{ note: 7, fret: 0, oct: 4 }, { note: 0, fret: 0, oct: 4 }, { note: 4, fret: 0, oct: 4 }, { note: 7, fret: 0, oct: 4 }];
                break;
            case "D3-G3-B3-E4":
                // Baritone
                snares = [{ note: 2, fret: 0, oct: 3 }, { note: 7, fret: 0, oct: 3 }, { note: 11, fret: 0, oct: 3 }, { note: 4, fret: 0, oct: 4 }];
                break;
            case "C3-G3-B3-E4":
                snares = [{ note: 0, fret: 0, oct: 3 }, { note: 7, fret: 0, oct: 3 }, { note: 11, fret: 0, oct: 3 }, { note: 4, fret: 0, oct: 4 }];
                break;
            default:
                snares = [{ note: 7, fret: 0, oct: 4 }, { note: 0, fret: 0, oct: 4 }, { note: 4, fret: 0, oct: 4 }, { note: 9, fret: 0, oct: 4 }];
                break;
        }

        ch = ukulele.height;
        cw = ukulele.width;
        dx1 = cw / (columns + 2.5);
        dy1 = ch / (rows + 2);

        // Draw raster
        uku.lineWidth = 2;
        uku.fillStyle = "white";
        uku.strokeStyle = "black";
        for (let col = 0; col < columns; col++) {
            for (let row = 0; row < rows; row++) {
                uku.beginPath;
                uku.fillRect((col * dx1) + (0.5 * dx1), (row * dy1) + (1.5 * dy1), dx1, dy1);
                uku.strokeRect((col * dx1) + (0.5 * dx1), (row * dy1) + (1.5 * dy1), dx1, dy1);
            }
        }

        if (!variation || (this.ukuleleFrets.length === 0)) {
            if (notes.length > 0) {
                let transposed = [];
                for (let i = 0; i < notes.length; i++) {
                    let note = (notes[i] + idx) % 12;
                    transposed.push(note);
                }

                // Keep only the most important notes
                if (transposed.length > 4) {
                    // Delete the fifth
                    let p = transposed.indexOf((7 + idx) % 12);
                    if (p >= 0) {
                        transposed.splice(p, 1);
                    }
                }
                if (transposed.length > 4) {
                    if (transposed.includes((17 + idx) % 12) || transposed.includes((21 + idx) % 12)) {
                        // Delete the ninth
                        let p = transposed.indexOf((14 + idx) % 12);
                        if (p >= 0) {
                            transposed.splice(p, 1);
                        }
                    }
                }
                if (transposed.length > 4) {
                    if (transposed.includes((21 + idx) % 12)) {
                        // Delete the eleventh
                        let p = transposed.indexOf((17 + idx) % 12);
                        if (p >= 0) {
                            transposed.splice(p, 1);
                        }
                    }
                }

                // Keep only the possible fret positions
                if (ukuleleFilter === "Fret5") {
                    maxFret = 5;
                } else {
                    maxFret = 15;
                }
                const frets = [];
                for (let i = 0; i < snares.length; i++) {
                    frets.push([]);
                    for (let j = 0; j <= maxFret; j++) {
                        const note = (snares[i].note + j) % 12;
                        if (transposed.includes(note)) {
                            frets[i].push(j);
                        }
                    }
                }

                // Fret position
                this.ukuleleVariation = 0;
                this.ukuleleFrets.length = 0;
                if ((frets[0].length > 0) && (frets[1].length > 0) && (frets[2].length > 0) && (frets[3].length > 0)) {
                    for (let iF1 = 0; iF1 < frets[0].length; iF1++) {
                        const f1 = frets[0][iF1];
                        for (let iF2 = 0; iF2 < frets[1].length; iF2++) {
                            const f2 = frets[1][iF2];
                            for (let iF3 = 0; iF3 < frets[2].length; iF3++) {
                                const f3 = frets[2][iF3];
                                for (let iF4 = 0; iF4 < frets[3].length; iF4++) {
                                    const f4 = frets[3][iF4];
                                    let note1 = (snares[0].note + f1) % 12;
                                    let note2 = (snares[1].note + f2) % 12;
                                    let note3 = (snares[2].note + f3) % 12;
                                    let note4 = (snares[3].note + f4) % 12;
                                    nFound = 0;
                                    for (let i = 0; i < transposed.length; i++) {
                                        let note = transposed[i];
                                        if ((note1 === note) || (note2 === note) || (note3 === note) || (note4 === note)) {
                                            nFound++;
                                        }
                                    }
                                    if ((nFound === snares.length) || (nFound === transposed.length)) {
                                        const result = this.fretRange([f1, f2, f3, f4]);
                                        if ((ukuleleFilter === "All") || ((ukuleleFilter === "Fret5") && (result.maxFretPosition <= 5))) {
                                            if ((result.maxFretPosition - result.minFretPosition) < rows) {
                                                this.ukuleleFrets.push({ f1, f2, f3, f4 });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (this.ukuleleFrets.length > 0) {
            if (this.ukuleleVariation >= this.ukuleleFrets.length) {
                this.ukuleleVariation = 0;
            }
            snares[0].fret = this.ukuleleFrets[this.ukuleleVariation].f1;
            snares[1].fret = this.ukuleleFrets[this.ukuleleVariation].f2;
            snares[2].fret = this.ukuleleFrets[this.ukuleleVariation].f3;
            snares[3].fret = this.ukuleleFrets[this.ukuleleVariation].f4;
            Glob.settings.ukuleleVariation.innerText = `${this.ukuleleVariation + 1}/${this.ukuleleFrets.length}`;

            fretStart = 1;
            const result = this.fretRange([snares[0].fret, snares[1].fret, snares[2].fret, snares[3].fret]);
            if (result.maxFretPosition > rows) {
                if (result.minFretPosition === 0) {
                    fretStart = result.maxFretPosition;
                } else {
                    fretStart = result.minFretPosition;
                }
            }

            if (fretStart === 1) {
                uku.lineWidth = 6;
                uku.beginPath();
                uku.moveTo(0.5 * dx1, 1.5 * dy1);
                uku.lineTo((columns * dx1) + (0.5 * dx1), 1.5 * dy1);
                uku.stroke();
            } else {
                uku.font = "24px serif";
                uku.fillStyle = "black";
                uku.fillText(fretStart.toString(), cw - 30, (2.5 * dy1));
            }

            // Draw dots and crosses
            uku.lineWidth = 2;
            uku.fillStyle = "black";
            uku.strokeStyle = "black";
            for (let col = 0; col <= columns; col++) {
                if (this.ukuleleLeftHanded) {
                    snareIdx = columns - col;
                } else {
                    snareIdx = col;
                }
                if (snares[snareIdx].fret === 0) {
                    uku.beginPath();
                    uku.arc((col * dx1) + (0.5 * dx1), (dy1 * 0.7), 6, 0, 2 * Math.PI);
                    uku.stroke();
                }
                if (snares[snareIdx].fret === -1) {
                    uku.beginPath();
                    uku.moveTo((col * dx1) + (0.5 * dx1) - 5, (dy1 * 0.7) - 5);
                    uku.lineTo((col * dx1) + (0.5 * dx1) + 5, (dy1 * 0.7) + 5);
                    uku.stroke();
                    uku.beginPath();
                    uku.moveTo((col * dx1) + (0.5 * dx1) - 5, (dy1 * 0.7) + 5);
                    uku.lineTo((col * dx1) + (0.5 * dx1) + 5, (dy1 * 0.7) - 5);
                    uku.stroke();
                }
                for (let row = 0; row < rows; row++) {
                    if (snares[snareIdx].fret === (row + fretStart)) {
                        uku.beginPath();
                        uku.arc((col * dx1) + (0.5 * dx1), (row * dy1) + dy1 + dy1, 6, 0, 2 * Math.PI);
                        uku.fill();
                        uku.stroke();
                    }
                }
            }
            if (info) {
                let note = 0;
                let notes;
                if (document.getElementById("useSharps").checked) {
                    notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
                } else {
                    notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
                }
                infoStr = "Notes: "
                for (let i = 0; i < snares.length; i++) {
                    note = (snares[i].note + snares[i].fret) % 12;
                    if (i > 0) {
                        infoStr += ", ";
                    }
                    infoStr += notes[note];
                }
                infoStr += "\nLowest note: ";
                const lowestHighest = this.lowestNoteAndHighestNote(snares);
                infoStr += notes[lowestHighest.lowest];
                infoStr += "\nHighest note: ";
                infoStr += notes[lowestHighest.highest];
                alert(infoStr);
            }
        } else {
            Glob.settings.ukuleleVariation.innerText = "";
        }
    }

    static async fadeOutAndStop(audioCtx, gainNode, oscNode, fadeOutTime) {
        const now = audioCtx.currentTime;

        gainNode.gain.cancelScheduledValues(now);
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.linearRampToValueAtTime(0, now + fadeOutTime);
        oscNode.stop(now + fadeOutTime);

        await new Promise(resolve => {
            oscNode.onended = () => resolve();
        });

        oscNode.disconnect();
        gainNode.disconnect();
    }

    static fretRange(fretPositions) {
        let minFretPosition = 0;
        let maxFretPosition = 0;
        for (let i = 0; i < fretPositions.length; i++) {
            const fret = fretPositions[i];
            if (fret > 0) {
                if ((minFretPosition === 0) || (fret < minFretPosition)) {
                    minFretPosition = fret;
                }
                if ((maxFretPosition === 0) || (fret > maxFretPosition)) {
                    maxFretPosition = fret;
                }
            }
        }
        return { minFretPosition, maxFretPosition };
    }

    static lowestFret(arr) {
        const frets = [];
        let result = -1;

        if (arr.length > 0) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] > 0) {
                    frets.push(arr[i]);
                }
            }
            if (frets.length > 0) {
                result = Math.min(...frets);
            }
        }
        return result;
    }

    static lowestNoteAndHighestNote(snares) {
        let note = -1;
        const notes = [];
        let result = { lowest: -1, highest: -1 };

        if (snares.length > 0) {
            for (let i = 0; i < snares.length; i++) {
                if (snares[i].fret !== -1) {
                    note = snares[i].note + snares[i].fret + (snares[i].oct * 12);
                    notes.push(note);
                }
            }
            result.lowest = Math.min(...notes) % 12;
            result.highest = Math.max(...notes) % 12;
        }
        return result;
    }

    static async tuneGuitar() {
        let frequencies;
        const audioCtx = Audio.audioContext;

        if (this.ukuleleTuningStatus === 0) {
            this.guitarTuningStatus++;
            if (this.guitarTuningStatus > 1) {
                await this.fadeOutAndStop(
                    audioCtx,
                    this.tuningGain,
                    this.tuningOscillator,
                    0.1
                );
                this.tuningGain = null;
                this.tuningOscillator = null;
            }

            if (this.guitarTuningStatus >= 7) {
                this.guitarTuningStatus = 0;
            }

            if (this.guitarTuningStatus > 0) {
                switch (this.guitarTuning) {
                    case "E2-A2-D3-G3-B3-E4":
                        frequencies = [82.407, 110, 146.832, 195.998, 246.942, 329.628];
                        break;
                    case "D2-A2-D3-G3-B3-E4":
                        frequencies = [73.416, 110, 146.832, 195.998, 246.942, 329.628];
                        break;
                    case "D2-A2-D3-F#3-A3-D4":
                        frequencies = [73.416, 110, 146.832, 184.997, 220, 293.665];
                        break;
                    case "D2-A2-D3-F3-A3-D4":
                        frequencies = [73.416, 110, 146.832, 174.614, 220, 293.665];
                        break;
                    default:
                        frequencies = [82.407, 110, 146.832, 195.998, 246.942, 329.628];
                        break;
                }

                this.tuningGain = audioCtx.createGain();
                this.tuningGain.gain.value = 0.25;

                this.tuningOscillator = audioCtx.createOscillator();
                this.tuningOscillator.type = "triangle";
                this.tuningOscillator.frequency.setValueAtTime(frequencies[this.guitarTuningStatus - 1], audioCtx.currentTime);

                this.tuningOscillator.connect(this.tuningGain);
                this.tuningGain.connect(audioCtx.destination);

                this.tuningOscillator.start();
            }
        }
    }

    static async tuneUkulele() {
        let frequencies;
        const audioCtx = Audio.audioContext;
        if (this.guitarTuningStatus === 0) {
            this.ukuleleTuningStatus++;
            if (this.ukuleleTuningStatus > 1) {
                await this.fadeOutAndStop(
                    audioCtx,
                    this.tuningGain,
                    this.tuningOscillator,
                    0.1
                );
                this.tuningGain = null;
                this.tuningOscillator = null;
            }

            if (this.ukuleleTuningStatus >= 5) {
                this.ukuleleTuningStatus = 0;
            }

            if (this.ukuleleTuningStatus > 0) {
                switch (this.ukuleleTuning) {
                    case "G4-C4-E4-A4":
                        frequencies = [391.995, 261.626, 329.628, 440];
                        break;
                    case "G3-C4-E4-A4":
                        frequencies = [195.998, 261.626, 329.628, 440];
                        break;
                    case "A4-D4-F#4-B4":
                        frequencies = [440, 293.665, 369.994, 493.883];
                        break;
                    case "G4-C4-E4-G4":
                        frequencies = [391.995, 261.626, 329.628, 391.995];
                        break;
                    case "D3-G3-B3-E4":
                        frequencies = [146.832, 195.998, 246.942, 329.628];
                        break;
                    case "C3-G3-B3-E4":
                        frequencies = [130.813, 195.998, 246.942, 329.628];
                        break;
                    default:
                        frequencies = [391.995, 261.626, 329.628, 440];
                        break;
                }

                this.tuningGain = audioCtx.createGain();
                this.tuningGain.gain.value = 0.25;

                this.tuningOscillator = audioCtx.createOscillator();
                this.tuningOscillator.type = "triangle";
                this.tuningOscillator.frequency.setValueAtTime(frequencies[this.ukuleleTuningStatus - 1], audioCtx.currentTime);

                this.tuningOscillator.connect(this.tuningGain);
                this.tuningGain.connect(audioCtx.destination);

                this.tuningOscillator.start();
            }
        }
    }

    static usedFingers(frets) {
        let last = 0;
        let result = 0;
        let stop = false;
        const lowest = this.lowestFret(frets);

        if (frets.length <= 0) return 0;

        for (let i = 0; i < frets.length; i++) {
            if (frets[i] > 0) {
                result++;
            }
        }
        last = frets[frets.length - 1];
        if ((last > 0) && (last === lowest)) {
            for (let i = 1; ((i < frets.length) && !stop); i++) {
                if (frets[frets.length - 1 - i] === last) {
                    result--;
                }
                if (frets[frets.length - 1 - i] < last) {
                    stop = true;
                }
            }
        }
        return result;
    }

}

export { ChordDiagrams };