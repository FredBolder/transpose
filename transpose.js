function greekToNormal(s) {
  let c = "";
  let result = "";
  for (let i = 0; i < s.length; i++) {
    c = s[i];
    switch (c) {
      case "Α":
        c = "A";
        break;
      case "Β":
        c = "B";
        break;
      case "Ε":
        c = "E";
        break;
      default:
        break;
    }
    result += c;
  }
  return result;
}

const bassRomanMajor = [
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
const bassRomanMinor = [
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

const chordsRomanMajor = [
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
const chordsRomanMinor = [
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

const chordTypes = [
  "",
  "2",
  "5",
  "6",
  "6b5",
  "69",
  "7",
  "7b5",
  "7#5",
  "7b9",
  "7#9",
  "7#9#11",
  "9",
  "11",
  "11omit3",
  "11omit5",
  "13",
  "minor",
  "minor2",
  "minoradd2",
  "minoradd4",
  "minor6",
  "minor69",
  "minor7",
  "minor7b5",
  "minor7#5",
  "minor7b9",
  "minor7#9",
  "minor9",
  "minoradd9",
  "minor11",
  "minor11omit5",
  "minor11b5b9",
  "minor11b9",
  "minor13",
  "maj7",
  "Δ",
  "maj7b5",
  "Δb5",
  "maj7#9",
  "Δ#9",
  "maj9",
  "maj11",
  "maj13",
  "minmaj7",
  "-Δ",
  "minmaj9",
  "+",
  "+7",
  "aug",
  "aug6",
  "aug7",
  "dim",
  "°",
  "dim7",
  "°7",
  "dim9",
  "°9",
  "sus",
  "sus2",
  "sus4",
  "sus24",
  "sus42",
  "6sus2",
  "6sus4",
  "69sus4",
  "7sus",
  "7sus2",
  "7sus4",
  "7sus24",
  "7sus42",
  "9sus",
  "9sus4",
  "maj7sus2",
  "maj7sus4",
  "maj7sus24",
  "maj7sus42",
  "Δsus2",
  "Δsus4",
  "Δsus24",
  "Δsus42",
  "maj9sus4",
  "add2",
  "add4",
  "add9",
  "add11",
];

const notes = [
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

const notesDoReMi = [
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

const notesGerman1 = [
  "C",
  "Cis,Des",
  "D",
  "Dis,Es",
  "E",
  "F",
  "Fis,Ges",
  "G",
  "Gis,As",
  "A",
  "Ais,B",
  "H",
];

const notesGerman2 = [
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
  "A#,B",
  "H",
];

const notesGreek = [
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

const notesNashvilleMajor = [
  "1",
  "#1,b2",
  "2",
  "#2,b3",
  "3",
  "4",
  "#4,5",
  "5",
  "#5,b6",
  "6",
  "#6,b7",
  "7",
];

// Natural Minor
const notesNashvilleMinor = [
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

const simpleNotes = [
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
  "So,Sol",
  "Sob,Solb",
  "So#,Sol#",
  "Sobb,Fa",
  "So##,La",
  "Ces,H",
  "His,C",
  "Eis,F",
  "Fes,E",
];

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
    this.key = 0;
    this.strict = true;
    this.lowerIsMinor = false;
    this.bracketsInput = "SQUARE";
    this.bracketsOutput = "SQUARE";
    this.preferSharps = false;
    this.useTi = false;
    this.useSpecial = false;
    this.spaceBetween = true;
    this.compact = false;
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
    noteIndex = noteToIndex(note, options, false, true);
    if (noteIndex >= 0) {
      noteIndex = fixNoteIndex(noteIndex + semiTones);
      noteStr = noteIndexToString(noteIndex, options, true);
      if (
        options.outputFormat === "ROMAN" ||
        options.outputFormat === "NASHVILLE"
      ) {
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

function checkChordType(s) {
  let arrType = [];
  let ct1 = "";
  let ct2 = "";
  let found = false;
  let p = s.indexOf("/");
  if (p >= 0) {
    s = s.slice(0, p);
  }
  if (s.endsWith("(b5)") || s.endsWith("(5-)") || s.endsWith("(-5)")) {
    s = s.slice(0, s.length - 4) + "b5";
  }
  if (s.endsWith("(#5)") || s.endsWith("(5+)") || s.endsWith("(+5)")) {
    s = s.slice(0, s.length - 4) + "#5";
  }
  if (s.endsWith("(b9)") || s.endsWith("(9-)") || s.endsWith("(-9)")) {
    s = s.slice(0, s.length - 4) + "b9";
  }
  if (s.endsWith("(#9)") || s.endsWith("(9+)") || s.endsWith("(+9)")) {
    s = s.slice(0, s.length - 4) + "#9";
  }
  let i = 0;
  while (i < chordTypes.length && !found) {
    ct1 = chordTypes[i];
    ct2 = "";
    if (ct1.startsWith("minor")) {
      arrType = ["minor", "min", "mi", "m", "-"];
      ct2 = ct1.slice(5);
    } else if (ct1.startsWith("maj")) {
      arrType = ["maj", "M", "Δ"];
      ct2 = ct1.slice(3);
    } else if (ct1.startsWith("minmaj")) {
      arrType = ["minmaj", "mM", "-M", "-Δ"];
      ct2 = ct1.slice(6);
    } else {
      arrType = [];
      arrType.push(ct1);
    }
    for (let j = 0; j < arrType.length; j++) {
      if (s === arrType[j] + ct2) {
        found = true;
      }
    }
    i++;
  }
  return found;
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
      case "Δ":
        if (i + 1 < s.length) {
          if (s[i + 1] === "7" || s[i + 1] === "9" || s[i + 1] === "1") {
            // 1 for 11 and 13
            value = "M";
          }
        } else {
          value = "M7";
        }
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
      default:
        value = s[i];
        break;
    }
    result += value;
  }
  return result;
}

function convertTypeToCompact(s, options) {
  let result = s;
  if (options.compact) {
    if (s.startsWith("aug") && options.outputFormat !== "GREEK") {
      result = "+" + s.slice(3);
    } else if (s.startsWith("maj7")) {
      if (options.useSpecial) {
        result = "Δ" + s.slice(4);
      } else {
        result = "M7" + s.slice(4);
      }
    } else if (s.startsWith("M7") && options.useSpecial) {
      result = "Δ" + s.slice(2);
    } else if (s.startsWith("maj9")) {
      if (options.useSpecial) {
        result = "Δ9" + s.slice(4);
      } else {
        result = "M9" + s.slice(4);
      }
    } else if (s.startsWith("maj11")) {
      if (options.useSpecial) {
        result = "Δ11" + s.slice(5);
      } else {
        result = "M11" + s.slice(5);
      }
    } else if (s.startsWith("maj13")) {
      if (options.useSpecial) {
        result = "Δ13" + s.slice(5);
      } else {
        result = "M13" + s.slice(5);
      }
    } else if (s.startsWith("minor")) {
      result = "m" + s.slice(5);
    } else if (s.startsWith("min")) {
      result = "m" + s.slice(3);
    } else if (s.startsWith("mi")) {
      result = "m" + s.slice(2);
    } else if (s.startsWith("dim")) {
      result = "°" + s.slice(3);
    }
  }
  return result;
}

function convertTypeToGreek(s, options) {
  let convert = true;
  let result = s;
  if (s.startsWith("minor")) {
    result = "-" + s.slice(5);
  } else if (s.startsWith("min")) {
    result = "-" + s.slice(3);
  } else if (s.startsWith("mi")) {
    result = "-" + s.slice(2);
  } else if (s.startsWith("m")) {
    if (s.length > 1) {
      if ("aA".includes(s[1])) {
        convert = false;
      }
    }
    if (convert) {
      result = "-" + s.slice(1);
    }
  } else if (s === "" && !options.compact) {
    result = "+";
  }
  return result;
}

function convertTypeToNashville(s) {
  let convert = true;
  let result = s;
  if (s.startsWith("dim")) {
    result = "°" + s.slice(3);
  } else if (s.startsWith("aug")) {
    result = "+" + s.slice(3);
  } else if (s.startsWith("minor")) {
    result = "m" + s.slice(5);
  } else if (s.startsWith("min")) {
    result = "m" + s.slice(3);
  } else if (s.startsWith("mi")) {
    result = "m" + s.slice(2);
  }
  return result;
}

function convertTypeToRoman(s) {
  let convert = true;
  let result = s;
  if (s.startsWith("dim")) {
    result = "°" + s.slice(3);
  } else if (s.startsWith("aug")) {
    result = "+" + s.slice(3);
  } else if (s.startsWith("minor")) {
    result = s.slice(5);
  } else if (s.startsWith("min")) {
    result = s.slice(3);
  } else if (s.startsWith("mi")) {
    result = s.slice(2);
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

  if (s.startsWith("m")) {
    if (s.length > 1) {
      if ("aA".includes(s[1])) {
        convert = false;
      }
    }
    if (convert) {
      isLower = true;
    }
  } else if (s.startsWith("dim") || s.startsWith("°")) {
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
  }
  semitones *= -1;
  return semitones;
}

function noteIndexToString(index, options, bass) {
  let s = "";
  let saveIndex = 0;

  saveIndex = index;
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
  index = saveIndex;
  if (options.outputFormat === "GERMAN1") {
    s = notesGerman1[index];
  }
  if (options.outputFormat === "GERMAN2") {
    s = notesGerman2[index];
  }
  if (options.outputFormat === "GREEK") {
    s = notesGreek[index];
  }
  if (options.outputFormat === "ROMAN") {
    if (bass) {
      if (options.key >= 11) {
        s = bassRomanMinor[index];
      } else {
        s = bassRomanMajor[index];
      }
    } else {
      if (options.key >= 11) {
        s = chordsRomanMinor[index];
      } else {
        s = chordsRomanMajor[index];
      }
    }
  }
  if (options.outputFormat === "NASHVILLE") {
    if (options.key >= 11) {
      s = notesNashvilleMinor[index];
    } else {
      s = notesNashvilleMajor[index];
    }
  }
  if (s.includes(",")) {
    if (options.preferSharps) {
      s = s.slice(0, s.indexOf(",")).trim();
    } else {
      s = s.slice(s.indexOf(",") + 1).trim();
    }
  }
  if (options.uppercase) {
    if (
      options.outputFormat !== "ROMAN" &&
      options.outputFormat !== "NASHVILLE" &&
      options.outputFormat !== "GERMAN1" &&
      options.outputFormat !== "GERMAN2"
    ) {
      if (isSharpOrFlat(index)) {
        s = s.slice(0, s.length - 1).toUpperCase() + s[s.length - 1];
      } else {
        s = s.toUpperCase();
      }
    }
  }
  return s;
}

function noteToIndex(note, options, start, bass) {
  let arr = [];
  let idx = -1;

  if (options.inputFormat !== "GREEK") {
    note = greekToNormal(note);
  }
  if (start && options.lowerIsMinor) {
    if (note === note.toLowerCase() && note !== "b") {
      note = note[0].toUpperCase() + note.slice(1);
    }
  }
  if (options.inputFormat === "ROMAN") {
    note = note.toLowerCase();
  }

  if (options.inputFormat === "CDE" || options.inputFormat === "INLINE") {
    arr = notes;
  }
  if (options.inputFormat === "GERMAN1") {
    arr = notesGerman1;
  }
  if (options.inputFormat === "GERMAN2") {
    arr = notesGerman2;
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
  if (options.inputFormat === "NASHVILLE") {
    if (options.key >= 11) {
      arr = notesNashvilleMinor;
    } else {
      arr = notesNashvilleMajor;
    }
  }
  if (options.inputFormat === "ROMAN") {
    if (bass) {
      if (options.key >= 11) {
        arr = bassRomanMinor;
      } else {
        arr = bassRomanMajor;
      }
    } else {
      if (options.key >= 11) {
        arr = chordsRomanMinor;
      } else {
        arr = chordsRomanMajor;
      }
    }
  }
  note = simplifyNote(note);
  idx = arr.reduce((acc, current, currentIdx) => {
    let found = false;
    let p = -1;
    let s1 = "";
    let s2 = "";
    s1 = current.trim();
    if (options.inputFormat === "ROMAN") {
      s1 = s1.toLowerCase();
    }
    s2 = s1;
    p = s1.indexOf(",");
    if (p >= 0) {
      s2 = s1.slice(p + 1).trim();
      s1 = s1.slice(0, p).trim();
    }
    if (start) {
      if (s1.startsWith(note) || s2.startsWith(note)) {
        found = true;
      }
    } else {
      if (note === s1 || note === s2) {
        found = true;
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

function transpose(inputData, semiTones, options) {
  let skipNext = false;
  let n = 0;
  let next = "";
  let nextOptions = new Options();
  let nextResult = "";
  let output = "";
  let outputData = [];

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
  return outputData;
}

function transposeLine(input, semiTones, options, nextInput) {
  let addMinor = "";
  let chord = "";
  let chords = [];
  let chordType = "";
  let error = false;
  let inlinePos = 0;
  let inlineText = "";
  let mergeWithNextLine = false;
  let n = 0;
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
      if (options.inputFormat !== "INLINE" && s[i] !== " " && s[i] !== "|") {
        readChord = true;
        position = i;
        chord = "";
      }
      if (
        options.inputFormat === "INLINE" &&
        ((s[i] === "[" && options.bracketsInput === "SQUARE") ||
          (s[i] === "(" && options.bracketsInput === "ROUND"))
      ) {
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
            if (noteToIndex(s[i], options, true, false) >= 0) {
              newChord = true;
            }
          }
        }
        if (options.inputFormat === "DOREMI" && chord.length > 2) {
          if (chord[chord.length - 2] !== "/" && s[i] !== "#" && s[i] !== "b") {
            sNewChord = chord.slice(chord.length - 1) + s[i];
            if (
              noteToIndex(sNewChord, options, true, false) >= 0 ||
              sNewChord === "So" ||
              sNewChord === "SO"
            ) {
              newChord = true;
              chord = chord.slice(0, chord.length - 1);
            }
          }
        }
        if (
          options.inputFormat === "GERMAN1" ||
          options.inputFormat === "GERMAN2"
        ) {
          if (chord[chord.length - 1] !== "/") {
            if (noteToIndex(s[i], options, true, false) >= 0) {
              newChord = true;
            }
          }
        }
        if (options.inputFormat === "GREEK" && chord.length > 2) {
          if (chord[chord.length - 2] !== "/" && s[i] !== "#" && s[i] !== "b") {
            sNewChord = chord.slice(chord.length - 1) + s[i];
            if (
              noteToIndex(sNewChord, options, true, false) >= 0 ||
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
        if (
          ((" []".includes(s[i]) && options.bracketsInput === "SQUARE") ||
            (" ()".includes(s[i]) && options.bracketsInput === "ROUND")) ===
          false
        ) {
          chord += s[i];
        }
      } else {
        if (s[i] !== " " && s[i] !== "|" && !newChord && !oneMore) {
          chord += s[i];
        }
      }
      oneMore = false;
      if (
        ((s[i] === " " || i === s.length - 1 || newChord) &&
          options.inputFormat !== "INLINE") ||
        (s[i] === "]" &&
          options.inputFormat === "INLINE" &&
          options.bracketsInput === "SQUARE") ||
        (s[i] === ")" &&
          options.inputFormat === "INLINE" &&
          options.bracketsInput === "ROUND")
      ) {
        note = "";
        readChord = false;
        if (
          options.inputFormat === "CDE" ||
          options.inputFormat === "INLINE" ||
          options.inputFormat === "GERMAN2"
        ) {
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
        if (options.inputFormat === "GERMAN1") {
          note = chord[0];
          if (chord.length > 1) {
            if (chord[1] === "i" || chord[1] === "e") {
              note += chord[1];
            }
          }
          if (chord.length > note.length) {
            if (chord[note.length] === "s") {
              if (chord.length > note.length + 1) {
                // In case of sus chord
                if (chord[note.length + 1] !== "u") {
                  note += "s";
                }
              } else {
                note += "s";
              }
            }
          }
        }
        if (options.inputFormat === "ROMAN") {
          note = chord[0];
          for (let j = 0; j < 3; j++) {
            if (chord.length > note.length) {
              if (
                chord[note.length].toLowerCase() === "i" ||
                chord[note.length].toLowerCase() === "v"
              ) {
                note += chord[note.length];
              }
            }
          }
        }
        if (options.inputFormat === "NASHVILLE") {
          note = chord[0];
          if (chord.length > note.length) {
            if ("1234567".includes(chord[note.length])) {
              note += chord[note.length];
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
        addMinor = "";
        if (note === "") {
          error = true;
        } else {
          if (options.lowerIsMinor) {
            if (note === note.toLowerCase()) {
              note = note[0].toUpperCase() + note.slice(1);
              addMinor = "m";
            }
          }
          if (options.inputFormat === "ROMAN") {
            if (note === note.toLowerCase()) {
              addMinor = "m";
            }
          }
          noteIndex = noteToIndex(note, options, false, false);
          if (noteIndex === -1) {
            error = true;
          }
        }
        if (!error) {
          chords.push(
            new Chord(position, noteIndex, addMinor + chord.slice(note.length))
          );
          //console.log(chords[chords.length - 1]);
        }
        if (newChord) {
          readChord = true;
          if (
            options.inputFormat === "CDE" ||
            options.inputFormat === "GERMAN1" ||
            options.inputFormat === "GERMAN2"
          ) {
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
      chordType = chords[i].chordType;
      if (options.strict) {
        if (!checkChordType(chordType)) {
          error = true;
        }
      }
      if (!error) {
        chordType = changeBass(chordType, semiTones, options);
        if (chordType === "ERROR") {
          error = true;
        }
      }
      if (!error) {
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
          if (options.bracketsOutput === "SQUARE") {
            s += "[";
          }
          if (options.bracketsOutput === "ROUND") {
            s += "(";
          }
        }
        s += noteStr;
        if (options.outputFormat === "GREEK") {
          chordType = convertTypeToGreek(chordType, options);
        }
        if (options.outputFormat === "ROMAN") {
          chordType = convertTypeToRoman(chordType);
        }
        if (options.outputFormat === "NASHVILLE") {
          chordType = convertTypeToNashville(chordType);
        }
        chordType = convertTypeToCompact(chordType, options);
        s += chordType;
        if (options.outputFormat === "INLINE") {
          if (options.bracketsOutput === "SQUARE") {
            s += "]";
          }
          if (options.bracketsOutput === "ROUND") {
            s += ")";
          }
        }

        if (
          options.spaceBetween ||
          options.outputFormat === "ROMAN" ||
          options.outputFormat === "NASHVILLE"
        ) {
          s += " ";
        }
        if (mergeWithNextLine) {
          if (options.bracketsOutput === "SQUARE") {
            outputInline += "[" + noteStr + chordType + "]";
          }
          if (options.bracketsOutput === "ROUND") {
            outputInline += "(" + noteStr + chordType + ")";
          }
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


export { Options, keyToSemitones, transpose };

