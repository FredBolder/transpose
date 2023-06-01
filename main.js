const useWebsite = true;

let inputData = [];
let outputData = [];

let notes = [
    "C",
    "C#,Db",
    "D",
    "D#,Eb",
    "E",
    "F",
    "F#,Gb",
    "G",
    "G#,Ab",
    "A",
    "A#,Bb",
    "B",
];

let notesDoReMi = [
    "Do",
    "Do#,Reb",
    "Re",
    "Re#,Mib",
    "Mi",
    "Fa",
    "Fa#,Solb",
    "Sol",
    "Sol#,Lab",
    "La",
    "La#,Sib",
    "Si",
];

let testOptions;

class Chord {
    constructor(position, noteIndex, chordType) {
        this.position = position;
        this.noteIndex = noteIndex;
        this.chordType = chordType;
    }
}

class Options {
    constructor() {
        this.inputFormat = "CDE";
        this.preferSharps = false;
        this.spaceBetween = true;
        this.outputFormat = "CDE";
    }
}

function changeBass(input, semiTones, options) {
    let error = false;
    let note = "";
    let noteIndex = -1;
    let noteStr = "";
    let result = "";
    let p1 = input.indexOf("/");
    let p2 = input.lastIndexOf("/");
    if (p1 >= 0 && p1 === p2 && p1 < input.length - 1) {
        note = input.slice(p1 + 1);
        noteIndex = noteToIndex(note, options);
        if (noteIndex >= 0) {
            noteIndex = fixNoteIndex(noteIndex + semiTones);
            noteStr = noteIndexToString(noteIndex, options);
            result = input.slice(0, p1 + 1) + noteStr;
        } else {
            error = true;
        }
    } else {
        result = input;
    }
    if (error) {
        result = "ERROR";
    }
    return result;
}

function createTestData(n) {
    switch (n) {
        case 1:
            inputData.push("         Bb");
            inputData.push("Θέλω κοντά σου να μείνω");
            inputData.push("   C7   F");
            inputData.push("Θέλω σκιά σου να γίνω");
            inputData.push("");
            break;
        case 2:
            inputData.push("          C/G");
            inputData.push("This is a chord with a different bass");
            break;
        case 3:
            inputData.push("          Rem          Do    Sib/Fa");
            inputData.push("This is a test with Do Re Mi notation");
            break;
        default:
            break;
    }
}

function fixNoteIndex(n) {
    if (n > 11) {
        n -= 12;
    }
    if (n < 0) {
        n += 12;
    }
    return n;
}

function isSharpOrFlat(index) {
    return [1, 3, 6, 8, 10].includes(index);
}

function noteIndexToString(index, options) {
    let s = "";

    if (options.outputFormat === "CDE") {
        s = notes[index];
    }
    if (options.outputFormat === "DOREMI") {
        s = notesDoReMi[index];
    }
    if (isSharpOrFlat(index)) {
        if (options.preferSharps) {
            s = s.slice(0, s.indexOf(",")).trim();
        } else {
            s = s.slice(s.indexOf(",") + 1).trim();
        }
    }
    return s;
}

function noteToIndex(note, options) {
    let arr = [];
    found = false;
    let idx = -1;
    let n = -1;
    initialValue = 1;
    if (options.inputFormat === "CDE") {
        arr = notes;
    }
    if (options.inputFormat === "DOREMI") {
        arr = notesDoReMi;
    }
    idx = arr.reduce((acc, current, currentIdx) => {
        found = false;
        n = current.indexOf(note);
        if (n >= 0 && !note.includes(",")) {
            if (note.includes("#") || note.includes("b")) {
                if (current.includes(",") && note.length > 1) {
                    found = true;
                }
            } else {
                if (!current.includes(",")) {
                    found = true;
                }
            }
        }
        if (found) {
            acc = currentIdx;
        }
        return acc;
    }, -1);
    return idx;
}

function transpose(semiTones, options) {
    outputData = [];
    for (let i = 0; i < inputData.length; i++) {
        outputData[i] = transposeLine(inputData[i], semiTones, options);
    }
}

function transposeClicked() {
    let options = new Options();
    options.inputFormat = document.getElementById("inputFormat").value;
    options.preferSharps = document.getElementById("useSharps").checked;
    options.spaceBetween = document.getElementById("spaceBetween").checked;
    options.outputFormat = document.getElementById("outputFormat").value;
    let data = document.getElementById("input").value;
    inputData = data.split("\n");
    let semitones = parseInt(document.getElementById("semitones").value);
    transpose(semitones, options);
    document.getElementById("output").innerHTML = outputData.join("\n");
}

function transposeLine(input, semiTones, options) {
    let chord = "";
    let chords = [];
    let chordType = "";
    let error = false;
    let n1 = 0;
    let newChord = false;
    let note = "";
    let noteIndex = -1;
    let noteStr = "";
    let oneMore = false;
    let position = -1;
    let readChord = false;
    let result = "";
    let s = input;
    let sNewChord = "";

    if (input.includes(",") || input.includes(".")) {
        error = true;
    }
    oneMore = false;
    let i = 0;
    while ((i < s.length || oneMore) && !error) {
        if (oneMore) {
            i--;
        }
        newChord = false;
        sNewChord = "";
        if (!readChord) {
            if (s[i] !== " ") {
                readChord = true;
                position = i;
                chord = "";
            }
        }
        if (readChord) {
            if (chord.length > 0 && !oneMore) {
                if (options.inputFormat === "CDE") {
                    if (chord[chord.length - 1] !== "/") {
                        if (noteToIndex(s[i], options) >= 0) {
                            newChord = true;
                        }
                    }
                }
                if (options.inputFormat === "DOREMI" && chord.length > 2) {
                    if (chord[chord.length - 2] !== "/" && s[i] !== "#" && s[i] !== "b") {
                        sNewChord = chord.slice(chord.length - 1) + s[i];
                        if (noteToIndex(sNewChord, options) >= 0 || sNewChord === "So") {
                            newChord = true;
                            chord = chord.slice(0, chord.length - 1);
                        }
                    }
                }
            }
            if (s[i] !== " " && !newChord && !oneMore) {
                chord += s[i];
            }
            oneMore = false;
            if (s[i] === " " || i === s.length - 1 || newChord) {
                note = "";
                readChord = false;
                if (options.inputFormat === "CDE") {
                    note = chord[0];
                    if (chord.length > 1) {
                        if (chord[1] === "#" || chord[1] === "b") {
                            note += chord[1];
                        }
                    }
                }
                if (options.inputFormat === "DOREMI") {
                    if (chord.length > 1) {
                        note = chord.slice(0, 2);
                    }
                    if (chord.length > 2) {
                        if (chord[2] === "l" && note === "So") {
                            note += chord[2];
                        }
                    }
                    if (chord.length > note.length) {
                        if (chord[note.length] === "#" || chord[note.length] === "b") {
                            note += chord[note.length];
                        }
                    }
                }
                if (note == "") {
                    error = true;
                } else {
                    noteIndex = noteToIndex(note, options);
                    if (noteIndex === -1) {
                        error = true;
                    }
                }
                if (!error) {
                    chords.push(new Chord(position, noteIndex, chord.slice(note.length)));
                    if (!useWebsite) {
                        //console.log(chords[chords.length - 1]);
                    }
                }
                if (newChord) {
                    readChord = true;
                    if (options.inputFormat === "CDE") {
                        position = i;
                        chord = s[i];
                    }
                    if (options.inputFormat === "DOREMI") {
                        position = i - 1;
                        chord = sNewChord;
                    }
                    if (i === s.length - 1) {
                        oneMore = true;
                    }
                }
            }
        }
        i++;
    }
    if (!error) {
        s = "";
        for (let i = 0; i < chords.length; i++) {
            while (s.length < chords[i].position) {
                s += " ";
            }
            n = fixNoteIndex(chords[i].noteIndex + semiTones);
            noteStr = noteIndexToString(n, options);
            s += noteStr;
            chordType = changeBass(chords[i].chordType, semiTones, options);
            if (chordType === "ERROR") {
                error = true;
            }
            s += chordType;
            if (options.spaceBetween) {
                s += " ";
            }
        }
    }
    if (!error) {
        result = s.trimEnd();
    } else {
        result = input;
    }
    return result;
}

function checkResult(testName, expected, result) {
    if (result !== expected) {
        console.log(`*** ${testName} failed!!! ***`);
    }
}

function initTest(inputFormat, preferSharps, spaceBetween, outputFormat) {
    testOptions.inputFormat = inputFormat;
    testOptions.preferSharps = preferSharps;
    testOptions.spaceBetween = spaceBetween;
    testOptions.outputFormat = outputFormat;
    inputData = [];
}

function test() {
    // Test 1
    initTest("CDE", false, true, "CDE");
    inputData.push("C C# D D# E F F# G G# A A# B");
    transpose(-1, testOptions);
    checkResult("Test 1", "B C  Db D Eb E F Gb G Ab A Bb", outputData.join("\n"));

    // Test 2
    initTest("CDE", true, true, "CDE");
    inputData.push("C C# D D# E F F# G G# A A# B");
    transpose(1, testOptions);
    checkResult("Test 2", "C# D D# E F F# G G# A A# B C", outputData.join("\n"));

    // Test 3
    initTest("CDE", true, true, "DOREMI");
    inputData.push("C C# D D# E F F# G G# A A# B");
    transpose(0, testOptions);
    checkResult(
        "Test 3",
        "Do Do# Re Re# Mi Fa Fa# Sol Sol# La La# Si",
        outputData.join("\n")
    );

    // Test 4
    initTest("DOREMI", true, true, "CDE");
    inputData.push("Do Do# Re Re# Mi Fa Fa# Sol Sol# La La# Si");
    transpose(0, testOptions);
    checkResult(
        "Test 4",
        "C  C#  D  D#  E  F  F#  G   G#   A  A#  B",
        outputData.join("\n")
    );

    // Test 5
    initTest("DOREMI", true, false, "CDE");
    inputData.push("Rem LaRem SolFa SolbFa");
    transpose(0, testOptions);
    checkResult("Test 5", "Dm  A Dm  G  F  F#  F", outputData.join("\n"));

    // Test 6
    initTest("CDE", false, false, "CDE");
    inputData.push("Dm7/A Bb DmF");
    transpose(2, testOptions);
    checkResult("Test 6", "Em7/B C  EmG", outputData.join("\n"));
}

if (!useWebsite) {
    testOptions = new Options();
    testOptions.inputFormat = "DOREMI";
    testOptions.preferSharps = false;
    testOptions.spaceBetween = true;
    testOptions.outputFormat = "CDE";
    createTestData(3);
    console.log(inputData.join("\n"));
    transpose(0, testOptions);
    console.log(outputData.join("\n"));
    test();
}
