const useWebsite = true;

let inputData = [];
let key = 0;
let outputData = [];

let bassRomanMajor = [
  "1",
  "#1,b2",
  "2",
  "#2,b3",
  "3",
  "4",
  "#4,b5",
  "5",
  "#5,b6",
  "6",
  "#6,b7",
  "7",
];

// Natural Minor
let bassRomanMinor = [
  "1",
  "#1,b2",
  "2",
  "3",
  "#3,b4",
  "4",
  "#4,b5",
  "5",
  "6",
  "#6,b7",
  "7",
  "#7,b1",
];

let chordsRomanMajor = [
  "I",
  "#I,bII",
  "ii",
  "#II,bIII",
  "iii",
  "IV",
  "#IV,bV",
  "V",
  "#V,bVI",
  "vi",
  "#VI,bVII",
  "vii",
];

// Natural Minor
let chordsRomanMinor = [
  "i",
  "#I,bII",
  "ii",
  "III",
  "#III,bIV",
  "iv",
  "#IV,bV",
  "v",
  "VI",
  "#VI,bVII",
  "VII",
  "#VII,bI",
];

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
  "La#,Tib",
  "Ti",
];

let notesGreek = [
  "Ντο",
  "Ντο#,Ρεb",
  "Ρε",
  "Ρε#,Μιb",
  "Μι",
  "Φα",
  "Φα#,Σολb",
  "Σολ",
  "Σολ#,Λαb",
  "Λα",
  "Λα#,Σιb",
  "Σι",
];

let simpleNotes = [
  "B#,C",
  "E#,F",
  "Cb,B",
  "Fb,E",
  "Si#,Do",
  "Ti#,Do",
  "Mi#,Fa",
  "Dob,Si",
  "Fab,Mi",
  "Σι#,Ντο",
  "Μι#,Φα",
  "Ντοb,Σι",
  "Φαb,Μι",
  "Cbb,Bb",
  "Dbb,C",
  "Ebb,D",
  "Fbb,Eb",
  "Gbb,F",
  "Abb,G",
  "Bbb,A",
  "C##,D",
  "D##,E",
  "E##,F#",
  "F##,G",
  "G##,A",
  "A##,B",
  "B##,C#",
  "Dobb,Sib",
  "Rebb,Do",
  "Mibb,Re",
  "Fabb,Mib",
  "Solbb,Fa",
  "Labb,Sol",
  "Sibb,La",
  "Tibb,La",
  "Do##,Re",
  "Re##,Mi",
  "Mi##,Fa#",
  "Fa##,Sol",
  "Sol##,La",
  "La##,Si",
  "Si##,Do#",
  "Ti##,Do#",
  "Ντοbb,Σιb",
  "Ρεbb,Ντο",
  "Μιbb,Ρε",
  "Φαbb,Μιb",
  "Σολbb,Φα",
  "Λαbb,Σολ",
  "Σιbb,Λα",
  "Ντο##,Ρε",
  "Ρε##,Μι",
  "Μι##,Φα#",
  "Φα##,Σολ",
  "Σολ##,Λα",
  "Λα##,Σι",
  "Σι##,Ντο#",
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
    this.useTi = false;
    this.useSpecial = false;
    this.spaceBetween = true;
    this.uppercase = false;
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
      noteStr = noteIndexToString(noteIndex, options, true);
      if (options.outputFormat === "ROMAN") {
        noteStr = noteStr.toUpperCase();
        if (noteStr.startsWith("B")) {
          noteStr = noteStr[0].toLowerCase() + noteStr.slice(1);
        }
      }
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

function convertGreekType(s) {
  let result = s;
  if (s.startsWith("-")) {
    result = "m" + s.slice(1);
  } else if (s.startsWith("+")) {
    result = s.slice(1);
  }
  return result;
}

function convertToNormalChars(s) {
  let value = "";
  let result = "";

  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case "♭":
        value = "b";
        break;
      case "♯":
        value = "#";
        break;
      case "°":
        value = "0";
        break;
      default:
        value = s[i];
        break;
    }
    result += value;
  }
  return result;
}

function convertToSpecialChars(s) {
  let value = "";
  let result = "";

  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case "b":
        value = "♭"; // 266D
        break;
      case "#":
        value = "♯"; // 266F
        break;
      case "0":
        value = "°";
        break;
      default:
        value = s[i];
        break;
    }
    result += value;
  }
  return result;
}

function convertTypeToGreek(s) {
  let convert = true;
  let result = s;
  if (s.startsWith("minor")) {
    result = "-" + s.slice(5);
  } else if (s.startsWith("min")) {
    result = "-" + s.slice(3);
  } else if (s.startsWith("m")) {
    if (s.length > 1) {
      if ("aA".includes(s[1])) {
        convert = false;
      }
    }
    if (convert) {
      result = "-" + s.slice(1);
    }
  } else if (s === "") {
    result = "+";
  }
  return result;
}

function convertTypeToRoman(s) {
  let convert = true;
  let result = s;
  if (s.startsWith("dim")) {
    result = "0" + s.slice(3);
  } else if (s.startsWith("minor")) {
    result = s.slice(5);
  } else if (s.startsWith("min")) {
    result = s.slice(3);
  } else if (s.startsWith("m")) {
    if (s.length > 1) {
      if ("aA".includes(s[1])) {
        convert = false;
      }
    }
    if (convert) {
      result = s.slice(1);
    }
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

function isRomanLower(s) {
  let convert = true;
  let isLower = false;

  if (s.startsWith("min")) {
    isLower = true;
  } else if (s.startsWith("m")) {
    if (s.length > 1) {
      if ("aA".includes(s[1])) {
        convert = false;
      }
    }
    if (convert) {
      isLower = true;
    }
  } else if (s.startsWith("dim") || s.startsWith("0") || s.startsWith("°")) {
    isLower = true;
  }
  return isLower;
}

function isSharpOrFlat(index) {
  return [1, 3, 6, 8, 10].includes(index);
}

function keyToSemitones(key) {
  let semitones = key;
  if (semitones > 11) {
    semitones -= 12;
    semitones *= -1;
  }
  return semitones;
}

function noteIndexToString(index, options, bass) {
  let s = "";
  let save_index = 0;

  save_index = index;
  if (options.outputFormat === "CDE" || options.outputFormat === "INLINE") {
    s = notes[index];
  }
  if (options.outputFormat === "DOREMI") {
    if (options.useTi) {
      if (index >= 10) {
        index += 2;
      }
    }
    s = notesDoReMi[index];
  }
  index = save_index;
  if (options.outputFormat === "GREEK") {
    s = notesGreek[index];
  }
  if (options.outputFormat === "ROMAN") {
    if (bass) {
      if (key >= 11) {
        s = bassRomanMinor[index];
      } else {
        s = bassRomanMajor[index];
      }
    } else {
      if (key >= 11) {
        s = chordsRomanMinor[index];
      } else {
        s = chordsRomanMajor[index];
      }
    }
  }
  if (options.outputFormat == "ROMAN") {
    if (s.includes(",")) {
      if (options.preferSharps) {
        s = s.slice(0, s.indexOf(",")).trim();
      } else {
        s = s.slice(s.indexOf(",") + 1).trim();
      }
    }
  } else {
    if (isSharpOrFlat(index)) {
      if (options.preferSharps) {
        s = s.slice(0, s.indexOf(",")).trim();
      } else {
        s = s.slice(s.indexOf(",") + 1).trim();
      }
    }
    if (options.uppercase) {
      if (isSharpOrFlat(index)) {
        s = s.slice(0, s.length - 1).toUpperCase() + s[s.length - 1];
      } else {
        s = s.toUpperCase();
      }
    }
  }
  return s;
}

function noteToIndex(note, options) {
  let arr = [];
  found = false;
  let idx = -1;
  let n = -1;

  if (options.inputFormat === "CDE" || options.inputFormat === "INLINE") {
    arr = notes;
  }
  if (options.inputFormat === "DOREMI" || options.inputFormat === "GREEK") {
    if (options.inputFormat === "GREEK") {
      arr = notesGreek;
    } else {
      arr = notesDoReMi;
    }
    if (note.length > 1) {
      note = note[0] + note.slice(1).toLowerCase();
    }
  }
  note = simplifyNote(note);
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
  if (idx > 11) {
    idx -= 2; // Ti -> Si
  }
  return idx;
}

function simplifyNote(note) {
  let p = -1;
  let s = "";
  let s1 = "";
  let s2 = "";

  let i = 0;
  while (s === "" && i < simpleNotes.length) {
    p = simpleNotes[i].indexOf(",");
    if (p >= 0) {
      s1 = simpleNotes[i].slice(0, p).trim();
      s2 = simpleNotes[i].slice(p + 1).trim();
      if (note === s1) {
        s = s2;
      }
    }
    i++;
  }
  if (s === "") {
    s = note;
  }
  return s;
}

function transpose(semiTones, options) {
  let skipNext = false;
  let n = 0;
  let next = "";
  let nextOptions = new Options();
  let nextResult = "";
  let output = "";
  outputData = [];

  let inlineToInline =
    options.inputFormat === "INLINE" && options.outputFormat === "INLINE";

  n = 1;
  if (inlineToInline) {
    n++;
  }
  for (let j = 0; j < n; j++) {
    if (inlineToInline) {
      if (j === 0) {
        options.inputFormat = "INLINE";
        options.outputFormat = "CDE";
      }
      if (j === 1) {
        semiTones = 0;
        options.inputFormat = "CDE";
        options.outputFormat = "INLINE";
        inputData = outputData.join("\n").split("\n");
        outputData = [];
      }
    }
    nextOptions.inputFormat = options.inputFormat;
    if (options.inputFormat === "CDE") {
      nextOptions.outputFormat = "DOREMI";
    } else {
      nextOptions.outputFormat = "CDE";
    }
    skipNext = false;
    for (let i = 0; i < inputData.length; i++) {
      if (skipNext) {
        skipNext = false;
      } else {
        if (i < inputData.length - 1 && options.outputFormat === "INLINE") {
          next = inputData[i + 1];
          nextResult = transposeLine(next, 1, nextOptions, "");
          if (next !== nextResult || next.trim() === "") {
            next = "";
          }
        } else {
          next = "";
        }
        output = transposeLine(inputData[i], semiTones, options, next);
        outputData.push(output);
        if (
          options.outputFormat === "INLINE" &&
          output !== inputData[i] &&
          next !== "" &&
          i < inputData.length - 1
        ) {
          skipNext = true;
        }
      }
    }
  }
}

function transposeClicked() {
  let options = new Options();
  options.inputFormat = document.getElementById("inputFormat").value;
  options.preferSharps = document.getElementById("useSharps").checked;
  options.useTi = document.getElementById("useTi").checked;
  options.useSpecial = document.getElementById("useSpecial").checked;
  options.spaceBetween = document.getElementById("spaceBetween").checked;
  options.uppercase = document.getElementById("uppercase").checked;
  options.outputFormat = document.getElementById("outputFormat").value;
  let data = document.getElementById("input").value;
  inputData = data.split("\n");
  key = parseInt(document.getElementById("key").value);
  let semitones = parseInt(document.getElementById("semitones").value);
  if (options.outputFormat === "ROMAN") {
    semitones = keyToSemitones(key);
  }
  transpose(semitones, options);
  document.getElementById("output").value = outputData.join("\n");
}

function transposeLine(input, semiTones, options, nextInput) {
  let chord = "";
  let chords = [];
  let chordType = "";
  let error = false;
  let inlinePos = 0;
  let inlineText = "";
  let mergeWithNextLine = false;
  let n1 = 0;
  let newChord = false;
  let note = "";
  let noteIndex = -1;
  let noteStr = "";
  let oneMore = false;
  let outputInline = "";
  let position = -1;
  let prevPos = 0;
  let readChord = false;
  let result = "";
  let s = "";
  let sAdd = "";
  let sNewChord = "";

  mergeWithNextLine = nextInput.length > 0 && options.outputFormat === "INLINE";
  s = convertToNormalChars(input);
  if (
    (input.includes(",") || input.includes(".")) &&
    options.inputFormat !== "INLINE"
  ) {
    error = true;
  }
  oneMore = false;
  inlinePos = 0;
  inlineText = "";
  let i = 0;
  while ((i < s.length || oneMore) && !error) {
    if (oneMore) {
      i--;
    }
    newChord = false;
    sNewChord = "";
    if (!readChord) {
      if (options.inputFormat !== "INLINE" && s[i] !== " ") {
        readChord = true;
        position = i;
        chord = "";
      }
      if (options.inputFormat === "INLINE" && s[i] === "[") {
        readChord = true;
        position = inlinePos;
        chord = "";
      }
      if (!readChord) {
        inlineText += s[i];
        inlinePos++;
      }
    }
    if (readChord) {
      if (chord.length > 0 && !oneMore && options.inputFormat !== "INLINE") {
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
            if (
              noteToIndex(sNewChord, options) >= 0 ||
              sNewChord === "So" ||
              sNewChord === "SO"
            ) {
              newChord = true;
              chord = chord.slice(0, chord.length - 1);
            }
          }
        }
        if (options.inputFormat === "GREEK" && chord.length > 2) {
          if (chord[chord.length - 2] !== "/" && s[i] !== "#" && s[i] !== "b") {
            sNewChord = chord.slice(chord.length - 1) + s[i];
            if (
              noteToIndex(sNewChord, options) >= 0 ||
              sNewChord === "Ντο" ||
              sNewChord === "ΝΤΟ" ||
              sNewChord === "Σολ" ||
              sNewChord === "ΣΟΛ"
            ) {
              newChord = true;
              chord = chord.slice(0, chord.length - 1);
            }
          }
        }
      }
      if (options.inputFormat === "INLINE") {
        if (" []".includes(s[i]) === false) {
          chord += s[i];
        }
      } else {
        if (s[i] !== " " && !newChord && !oneMore) {
          chord += s[i];
        }
      }
      oneMore = false;
      if (
        ((s[i] === " " || i === s.length - 1 || newChord) &&
          options.inputFormat !== "INLINE") ||
        (s[i] === "]" && options.inputFormat === "INLINE")
      ) {
        note = "";
        readChord = false;
        if (options.inputFormat === "CDE" || options.inputFormat === "INLINE") {
          note = chord[0];
          if (chord.length > 1) {
            if (chord[1] === "#" || chord[1] === "b") {
              note += chord[1];
              if (chord.length > 2) {
                if (chord[2] === "#" || chord[2] === "b") {
                  note += chord[2];
                }
              }
            }
          }
        }
        if (options.inputFormat === "DOREMI") {
          if (chord.length > 1) {
            note = chord.slice(0, 2);
          }
          if (chord.length > 2) {
            if (
              chord[2].toLowerCase() === "l" &&
              (note === "So" || note === "SO")
            ) {
              note += chord[2];
            }
          }
          for (let j = 0; j < 2; j++) {
            if (chord.length > note.length) {
              if (chord[note.length] === "#" || chord[note.length] === "b") {
                note += chord[note.length];
              }
            }
          }
        }
        if (options.inputFormat === "GREEK") {
          if (chord.length > 1) {
            note = chord.slice(0, 2);
          }
          if (chord.length > 2) {
            if (
              chord[2].toLowerCase() === "λ" &&
              (note === "Σο" || note === "ΣΟ")
            ) {
              note += chord[2];
            }
            if (
              chord[2].toLowerCase() === "ο" &&
              (note === "Ντ" || note === "ΝΤ")
            ) {
              note += chord[2];
            }
          }
          for (let j = 0; j < 2; j++) {
            if (chord.length > note.length) {
              if (chord[note.length] === "#" || chord[note.length] === "b") {
                note += chord[note.length];
              }
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
          if (
            options.inputFormat === "DOREMI" ||
            options.inputFormat === "GREEK"
          ) {
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
    outputInline = "";
    for (let i = 0; i < chords.length; i++) {
      while (s.length < chords[i].position) {
        s += " ";
      }
      if (mergeWithNextLine) {
        if (nextInput.length >= 0) {
          sAdd = nextInput.slice(0, chords[i].position - prevPos);
          nextInput = nextInput.slice(chords[i].position - prevPos);
        } else {
          sAdd = "";
        }
        while (sAdd.length < chords[i].position - prevPos) {
          sAdd += " ";
        }
        outputInline += sAdd;
        prevPos = chords[i].position;
      }
      n = fixNoteIndex(chords[i].noteIndex + semiTones);
      noteStr = noteIndexToString(n, options, false);
      chordType = changeBass(chords[i].chordType, semiTones, options);
      if (chordType === "ERROR") {
        error = true;
      } else {
        if (options.inputFormat === "GREEK") {
          chordType = convertGreekType(chordType);
        }
        if (options.outputFormat === "ROMAN") {
          if (isRomanLower(chordType)) {
            noteStr = noteStr.toLowerCase();
          } else {
            noteStr = noteStr.toUpperCase();
          }
          if (noteStr.startsWith("B")) {
            noteStr = noteStr[0].toLowerCase() + noteStr.slice(1);
          }
        }
        if (options.outputFormat === "INLINE") {
          s += "[";
        }
        s += noteStr;
        if (options.outputFormat === "GREEK") {
          chordType = convertTypeToGreek(chordType);
        }
        if (options.outputFormat === "ROMAN") {
          chordType = convertTypeToRoman(chordType);
        }
        s += chordType;
        if (options.outputFormat === "INLINE") {
          s += "]";
        }
        if (options.spaceBetween || options.outputFormat === "ROMAN") {
          s += " ";
        }
        if (mergeWithNextLine) {
          outputInline += "[" + noteStr + chordType + "]";
        }
      }
    }
  }
  if (!error) {
    if (mergeWithNextLine) {
      outputInline += nextInput;
      result = outputInline;
    } else {
      result = s;
    }
    result = result.trimEnd();
    if (options.useSpecial) {
      result = convertToSpecialChars(result);
    }
    if (options.inputFormat === "INLINE") {
      result += "\n" + inlineText;
    }
  } else {
    result = input;
  }
  return result;
}

function checkResult(testName, expected, result) {
  if (result !== expected) {
    console.log(`*** ${testName} failed!!! ***`);
    console.log(expected);
    console.log(result);
  }
}

function initTest(
  inputFormat,
  preferSharps,
  useTi,
  useSpecial,
  spaceBetween,
  uppercase,
  outputFormat
) {
  testOptions.inputFormat = inputFormat;
  testOptions.preferSharps = preferSharps;
  testOptions.useTi = useTi;
  testOptions.useSpecial = useSpecial;
  testOptions.spaceBetween = spaceBetween;
  testOptions.uppercase = uppercase;
  testOptions.outputFormat = outputFormat;
  inputData = [];
}

function test() {
  let semitones = 0;

  key = 0;

  // Test 1
  initTest("CDE", false, false, false, true, false, "CDE");
  inputData.push("C C# D D# E F F# G G# A A# B B# Cb Ebb");
  transpose(-1, testOptions);
  checkResult(
    "Test 1",
    "B C  Db D Eb E F Gb G Ab A Bb B Bb Db",
    outputData.join("\n")
  );

  // Test 2
  initTest("CDE", true, false, false, true, false, "CDE");
  inputData.push("C C# D D# E F F# G G# A A# B");
  transpose(1, testOptions);
  checkResult("Test 2", "C# D D# E F F# G G# A A# B C", outputData.join("\n"));

  // Test 3
  initTest("CDE", true, false, false, true, false, "DOREMI");
  inputData.push("C C# D D# E F F# G G# A A# B");
  transpose(0, testOptions);
  checkResult(
    "Test 3",
    "Do Do# Re Re# Mi Fa Fa# Sol Sol# La La# Si",
    outputData.join("\n")
  );

  // Test 4
  initTest("DOREMI", true, false, false, true, false, "CDE");
  inputData.push(
    "Do Do# Re Re# Mi Fa Fa# Sol Sol# La La# Si FA SOL SOLb Mi# Mibb TI"
  );
  transpose(0, testOptions);
  checkResult(
    "Test 4",
    "C  C#  D  D#  E  F  F#  G   G#   A  A#  B  F  G   F#   F   D    B",
    outputData.join("\n")
  );

  // Test 5
  initTest("DOREMI", true, false, false, false, false, "CDE");
  inputData.push("Rem LaRem SolFa SolbFa");
  transpose(0, testOptions);
  checkResult("Test 5", "Dm  A Dm  G  F  F#  F", outputData.join("\n"));

  // Test 6
  initTest("CDE", false, false, false, false, false, "CDE");
  inputData.push("Dm7/A Bb DmF");
  transpose(2, testOptions);
  checkResult("Test 6", "Em7/B C  EmG", outputData.join("\n"));

  // Test 7
  initTest("INLINE", false, false, false, false, false, "CDE");
  inputData.push("This is a [Am]Test with [C/G]inline chords");
  transpose(-1, testOptions);
  checkResult(
    "Test 7",
    "          Abm       B/Gb\nThis is a Test with inline chords",
    outputData.join("\n")
  );

  // Test 8
  initTest("CDE", false, false, false, true, false, "GREEK");
  inputData.push("Dm/F C Cmaj7");
  transpose(0, testOptions);
  checkResult("Test 8", "Ρε-/Φα Ντο+ Ντοmaj7", outputData.join("\n"));

  // Test 9
  initTest("GREEK", false, false, false, true, false, "CDE");
  inputData.push("Ρε-/Φα Ντο+ Σολ♭ Σολ7 ΝΤΟΣολb ΣΟΛ Ρεbb");
  transpose(0, testOptions);
  checkResult(
    "Test 9",
    "Dm/F   C    Gb   G7   C  Gb   G   C",
    outputData.join("\n")
  );

  // Test 10
  initTest("CDE", false, false, false, true, true, "DOREMI");
  inputData.push("Bbm Ebm7");
  transpose(-2, testOptions);
  checkResult("Test 10", "LAbm REbm7", outputData.join("\n"));

  // Test 11
  initTest("GREEK", false, false, false, false, false, "ROMAN");
  inputData.push("Ρε-/Φα Σολ- ΛΑ7 ΛΑ-7 Ντο+");
  key = 14; // Dm
  semitones = keyToSemitones(key);
  transpose(semitones, testOptions);
  checkResult("Test 11", "i/3    iv   V7  v7   VII", outputData.join("\n"));
  key = 0;

  // Test 12
  initTest("INLINE", false, false, true, false, false, "ROMAN");
  inputData.push("[F#]Inline [B]chords [C#7]to [Fdim]Roman [E#dim]notation");
  key = 6; // F#
  semitones = keyToSemitones(key);
  transpose(semitones, testOptions);
  checkResult(
    "Test 12",
    "I      IV     V7 vii°  vii°\nInline chords to Roman notation",
    outputData.join("\n")
  );
  key = 0;

  // Test 13
  initTest("CDE", false, false, false, false, false, "INLINE");
  inputData.push("          Abm       B/Gb");
  inputData.push("This is a Test with inline chords");
  transpose(1, testOptions);
  checkResult(
    "Test 13",
    "This is a [Am]Test with [C/G]inline chords",
    outputData.join("\n")
  );

  // Test 14
  initTest("CDE", false, false, false, false, false, "ROMAN");
  inputData.push("Am B° C Dm Em F G");
  key = 21; // Am
  semitones = keyToSemitones(key);
  transpose(semitones, testOptions);
  checkResult("Test 14", "i  ii0 III iv v VI VII", outputData.join("\n"));
  key = 0;

  // Test 15
  initTest("CDE", false, false, false, false, false, "INLINE");
  inputData.push("C  F  G");
  inputData.push("C         G7");
  inputData.push("This is a Test with inline chords");
  transpose(0, testOptions);
  checkResult(
    "Test 15",
    "[C][F][G]\n[C]This is a [G7]Test with inline chords",
    outputData.join("\n")
  );

  // Test 16
  initTest("INLINE", false, false, false, false, false, "INLINE");
  inputData.push("This is a [Am]Test with [C/G]inline chords");
  transpose(2, testOptions);
  checkResult(
    "Test 16",
    "This is a [Bm]Test with [D/A]inline chords",
    outputData.join("\n")
  );
}

if (!useWebsite) {
  testOptions = new Options();
  testOptions.inputFormat = "DOREMI";
  testOptions.preferSharps = false;
  testOptions.useTi = false;
  testOptions.useSpecial = false;
  testOptions.spaceBetween = true;
  testOptions.uppercase = false;
  testOptions.outputFormat = "CDE";
  createTestData(3);
  console.log(inputData.join("\n"));
  transpose(0, testOptions);
  console.log(outputData.join("\n"));
  test();
}
