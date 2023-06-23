import { MusicData } from "./musicdata.js";
import { Chord } from "./chord.js";
import { Options } from "./options.js";
import { CDE } from "./cde.js";
import { DoReMi } from "./doremi.js";
import { German1 } from "./german1.js";
import { German2 } from "./german2.js";
import { Greek } from "./greek.js";
import { Inline } from "./inline.js";
import { Nashville } from "./nashville.js";
import { Roman } from "./roman.js";

function bracket(options, start) {
  let result = "";
  if (options.outputFormat === "INLINE") {
    if (options.bracketsOutput === "SQUARE") {
      result = start ? "[" : "]";
    }
    if (options.bracketsOutput === "ROUND") {
      result = start ? "(" : ")";
    }
  }
  return result;
}

function createInputOrOutputObject(chordSystem) {
  let result = null;
  switch (chordSystem) {
    case "CDE":
      result = new CDE();
      break;
    case "DOREMI":
      result = new DoReMi();
      break;
    case "GERMAN1":
      result = new German1();
      break;
    case "GERMAN2":
      result = new German2();
      break;
    case "GREEK":
      result = new Greek();
      break;
    case "INLINE":
      result = new Inline();
      break;
    case "ROMAN":
      result = new Roman();
      break;
    case "NASHVILLE":
      result = new Nashville();
      break;
    default:
      break;
  }
  return result;
}

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

function changeBass(input, semiTones, options, inputObj, outputObj) {
  let error = false;
  let note = "";
  let noteIndex = -1;
  let noteStr = "";
  let result = "";
  let p1 = input.indexOf("/");
  let p2 = input.lastIndexOf("/");
  if (p1 >= 0 && p1 === p2 && p1 < input.length - 1) {
    note = input.slice(p1 + 1);
    noteIndex = noteToIndex(note, options, false, true, inputObj);
    if (noteIndex >= 0) {
      noteIndex = fixNoteIndex(noteIndex + semiTones);
      noteStr = noteIndexToString(noteIndex, options, true, outputObj);
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
  while (i < MusicData.chordTypes.length && !found) {
    ct1 = MusicData.chordTypes[i];
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

function convertSpacesAndLF(s) {
  let value = "";
  let result = "";

  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case " ":
        value = "&nbsp;";
        break;
      case "\n":
        value = `</div><div class="outputline">`;
        break;
      default:
        value = s[i];
        break;
    }
    result += value;
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

function noteIndexToString(index, options, bass, outputObj) {
  let minor = false;
  let s = "";

  minor = options.key >= 11;
  if (options.outputFormat === "DOREMI") {
    if (options.useTi) {
      if (index >= 10) {
        index += 2;
      }
    }
  }
  s = outputObj.notes(minor, bass)[index];
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

function noteToIndex(note, options, start, bass, inputObj) {
  let minor = false;
  let arr = [];
  let idx = -1;

  minor = options.key >= 11;
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

  arr = inputObj.notes(minor, bass);
  if (options.inputFormat === "DOREMI" || options.inputFormat === "GREEK") {
    if (note.length > 1) {
      note = note[0] + note.slice(1).toLowerCase();
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

function printClicked() {
  const w = window.open(" ", " ");
  w.document.writeln("<head>");
  w.document.write(document.querySelector("head").innerHTML);
  w.document.writeln("</head>");
  w.document.writeln("<body>");
  w.document.writeln(`<div class="outputprint">`);
  w.document.write(document.getElementById("output").innerHTML);
  w.document.writeln("</div>");
  w.document.writeln("</body>");
  let stateCheck = setInterval(() => {
    if (document.readyState === "complete") {
      clearInterval(stateCheck);
      w.print();
      w.close();
    }
  }, 100);
}

function selectAllClicked() {
  if (document.selection) {
    // IE
    var range = document.body.createTextRange();
    range.moveToElementText(document.getElementById("output"));
    range.select();
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(document.getElementById("output"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }
}

function simplifyNote(note) {
  let p = -1;
  let s = "";
  let s1 = "";
  let s2 = "";

  let i = 0;
  while (s === "" && i < MusicData.simpleNotes.length) {
    p = MusicData.simpleNotes[i].indexOf(",");
    if (p >= 0) {
      s1 = MusicData.simpleNotes[i].slice(0, p).trim();
      s2 = MusicData.simpleNotes[i].slice(p + 1).trim();
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
  let outputInfo = [];
  let result1 = {};
  let result2 = {};
  const inputObj = createInputOrOutputObject(options.inputFormat);
  const outputObj = createInputOrOutputObject(options.outputFormat);

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
          result1 = transposeLine(
            next,
            1,
            nextOptions,
            "",
            inputObj,
            outputObj
          );
          nextResult = result1.result;
          if (next !== nextResult || next.trim() === "") {
            next = "";
          }
        } else {
          next = "";
        }
        result2 = transposeLine(
          inputData[i],
          semiTones,
          options,
          next,
          inputObj,
          outputObj
        );
        output = result2.result;
        outputData.push(output);
        outputInfo.push(result2.isChordLine);
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
  return {
    data: outputData,
    info: outputInfo,
  };
}

function downClicked() {
  const semitonesElement = document.getElementById("semitones");
  let semitones = parseInt(semitonesElement.value);
  if (semitones > -11) {
    semitones--;
    semitonesElement.value = semitones.toString();
    transposeClicked();
  }
}

function upClicked() {
  const semitonesElement = document.getElementById("semitones");
  let semitones = parseInt(semitonesElement.value);
  if (semitones < 11) {
    semitones++;
    semitonesElement.value = semitones.toString();
    transposeClicked();
  }
}

function transposeClicked() {
  let chordsIsBold = false;
  let inputData = [];
  let outputData = {};
  let outputData1 = [];
  let outputData2 = [];
  let outputInfo = [];
  let options = new Options();
  let semitones = 0;
  options.inputFormat = document.getElementById("inputFormat").value;
  options.strict = document.getElementById("strict").checked;
  options.lowerIsMinor = document.getElementById("lowerIsMinor").checked;
  options.bracketsInput = document.getElementById("bracketsInput").value;
  options.bracketsOutput = document.getElementById("bracketsOutput").value;
  options.preferSharps = document.getElementById("useSharps").checked;
  options.useTi = document.getElementById("useTi").checked;
  options.useSpecial = document.getElementById("useSpecial").checked;
  options.spaceBetween = document.getElementById("spaceBetween").checked;
  options.compact = document.getElementById("compact").checked;
  options.uppercase = document.getElementById("uppercase").checked;
  options.outputFormat = document.getElementById("outputFormat").value;
  chordsIsBold = document.getElementById("chordsBold").checked;
  let data = document.getElementById("input").value;
  inputData = data.split("\n");
  options.key = parseInt(document.getElementById("key").value);
  semitones = parseInt(document.getElementById("semitones").value);
  if (
    options.outputFormat === "ROMAN" ||
    options.outputFormat === "NASHVILLE"
  ) {
    semitones = keyToSemitones(options.key);
  }
  if (options.inputFormat === "ROMAN" || options.inputFormat === "NASHVILLE") {
    semitones = -keyToSemitones(options.key);
  }
  if (
    (options.outputFormat === "ROMAN" ||
      options.outputFormat === "NASHVILLE") &&
    (options.inputFormat === "ROMAN" || options.inputFormat === "NASHVILLE")
  ) {
    semitones = 0;
  }
  outputData = transpose(inputData, semitones, options);
  outputData1 = outputData.data;
  outputInfo = outputData.info;
  outputData2 = [...outputData1];
  for (let i = 0; i < outputData2.length; i++) {
    outputData2[i] = convertSpacesAndLF(outputData2[i]);
    if (outputData2[i] === "") {
      outputData2[i] = "&nbsp;";
    }
  }
  for (let i = 0; i < outputData2.length; i++) {
    if (chordsIsBold && options.outputFormat !== "INLINE" && outputInfo[i]) {
      outputData2[i] = `<div class="outputline bold">${outputData2[i]}</div>`;
    } else {
      outputData2[i] = `<div class="outputline">${outputData2[i]}</div>`;
    }
  }
  document.getElementById("output").innerHTML = outputData2.join("");
}

function transposeLine(
  input,
  semiTones,
  options,
  nextInput,
  inputObj,
  outputObj
) {
  let addMinor = "";
  let chord = "";
  let chords = [];
  let chordType = "";
  let error = false;
  let hasRead = false;
  let inlinePos = 0;
  let inlineText = "";
  let mergeWithNextLine = false;
  let n = 0;
  let newChord = false;
  let newPosition = -1;
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
      hasRead = true;
      if (chord.length > 0 && !oneMore && options.inputFormat !== "INLINE") {
        if (
          options.inputFormat === "CDE" ||
          options.inputFormat === "GERMAN1" ||
          options.inputFormat === "GERMAN2"
        ) {
          if (chord[chord.length - 1] !== "/") {
            sNewChord = s[i];
            if (noteToIndex(sNewChord, options, true, false, inputObj) >= 0) {
              newChord = true;
              newPosition = i;
            }
          }
        }
        if (
          (options.inputFormat === "DOREMI" ||
            options.inputFormat === "GREEK") &&
          chord.length > 2
        ) {
          if (chord[chord.length - 2] !== "/" && s[i] !== "#" && s[i] !== "b") {
            sNewChord = chord.slice(chord.length - 1) + s[i];
            if (noteToIndex(sNewChord, options, true, false, inputObj) >= 0) {
              newChord = true;
              chord = chord.slice(0, chord.length - 1);
              newPosition = i - 1;
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
        note = inputObj.readNote(chord);
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
          noteIndex = noteToIndex(note, options, false, false, inputObj);
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
          position = newPosition;
          chord = sNewChord;
          readChord = true;
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
      noteStr = noteIndexToString(n, options, false, outputObj);
      chordType = chords[i].chordType;
      if (options.strict) {
        if (!checkChordType(chordType)) {
          error = true;
        }
      }
      if (!error) {
        chordType = changeBass(
          chordType,
          semiTones,
          options,
          inputObj,
          outputObj
        );
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
        s += bracket(options, true);
        s += noteStr;
        chordType = outputObj.convertType(chordType, options);
        chordType = convertTypeToCompact(chordType, options);
        s += chordType;
        s += bracket(options, false);
        if (
          options.spaceBetween ||
          options.outputFormat === "ROMAN" ||
          options.outputFormat === "NASHVILLE"
        ) {
          s += " ";
        }
        if (mergeWithNextLine) {
          outputInline +=
            bracket(options, true) +
            noteStr +
            chordType +
            bracket(options, false);
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
  return {
    isChordLine: !error && hasRead,
    result: result,
  };
}

// To prevent error when using node
try {
  document
    .getElementById("btTranspose")
    .addEventListener("click", transposeClicked);
  document.getElementById("btDown").addEventListener("click", downClicked);
  document.getElementById("btUp").addEventListener("click", upClicked);
  document
    .getElementById("btSelectAll")
    .addEventListener("click", selectAllClicked);
  document.getElementById("btPrint").addEventListener("click", printClicked);
  document.getElementById("btHelp").addEventListener("click", () => {
    document.getElementById("main").classList.add("hidden");
    document.getElementById("links").classList.add("hidden");
    document.getElementById("help").classList.remove("hidden");
    document.querySelector("h1").innerText = "Transpose - Help";
  });
  document.getElementById("btBack").addEventListener("click", () => {
    document.getElementById("main").classList.remove("hidden");
    document.getElementById("links").classList.remove("hidden");
    document.getElementById("help").classList.add("hidden");
    document.querySelector("h1").innerText = "Transpose by Fred Bolder";
  });
} catch (e) {
  //console.log(e);
}

export { Options, keyToSemitones, transpose };
