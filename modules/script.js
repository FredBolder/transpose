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
import { Songs } from "./songs.js";

function addColor(style, color) {
  let p1 = 0;
  let result = style;

  if (color !== "") {
    p1 = style.indexOf(`"`);
    if (p1 >= 0) {
      result =
        style.slice(0, p1 + 1) + "color: " + color + "; " + style.slice(p1 + 1);
    }
  }
  return result;
}

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

function Capitalize(s) {
  let result = s;

  if (result.length > 0) {
    result = result[0].toUpperCase() + result.slice(1);
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
    case "NOCHORDS":
      result = new CDE();
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

function convertSpacesAndLF(s, style) {
  let value = "";
  let result = "";

  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case " ":
        value = "&nbsp;";
        break;
      case "\n":
        value = `</div><div ${style}>`;
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

function getDirective(s) {
  let p1 = s.indexOf("{");
  let p2 = s.lastIndexOf("{");
  let p3 = s.indexOf("}");
  let p4 = s.lastIndexOf("}");
  let s1 = "";
  let s2 = "";
  let s3 = "";

  if (p1 >= 0 && p3 >= 0 && p1 === p2 && p3 === p4 && p3 > p1 + 1) {
    s1 = s.slice(p1 + 1, p3).trim();
    p1 = s1.indexOf(":");
    if (p1 >= 0 && p1 < s1.length - 1) {
      s2 = s1.slice(0, p1).trim().toLowerCase();
      s3 = s1.slice(p1 + 1).trim();
    }
    if (p1 === -1) {
      // no argument
      s2 = s1;
    }
  }
  return {
    name: s2,
    value: s3,
  };
}

function ignoreLine(s, inputFormat, outputFormat) {
  let d = {};
  let ignore = false;

  if (
    s.startsWith("#") &&
    inputFormat === "INLINE" &&
    outputFormat !== "INLINE"
  ) {
    ignore = true;
  }
  d = getDirective(s);
  if (
    d.name === "new_song" ||
    d.name === "ns" ||
    d.name === "start_of_chorus" ||
    d.name === "soc" ||
    d.name === "end_of_chorus" ||
    d.name === "eoc" ||
    d.name === "start_of_tab" ||
    d.name === "sot" ||
    d.name === "end_of_tab" ||
    d.name === "eot" ||
    d.name === "define" ||
    d.name === "textfont" ||
    d.name === "tf" ||
    d.name === "textsize" ||
    d.name === "ts" ||
    d.name === "chordfont" ||
    d.name === "cf" ||
    d.name === "chordsize" ||
    d.name === "cs" ||
    d.name === "no_grid" ||
    d.name === "ng" ||
    d.name === "grid" ||
    d.name === "g" ||
    d.name === "titles" ||
    d.name === "new_page" ||
    d.name === "np" ||
    d.name === "new_physical_page" ||
    d.name === "npp" ||
    d.name === "columns" ||
    d.name === "col" ||
    d.name === "column_break" ||
    d.name === "colb" ||
    d.name === "pagetype"
  ) {
    ignore = true;
  }
  return ignore;
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
  return [1, 3, 6, 8, 10, 12].includes(index);
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

function exportClicked() {
  let filename = prompt("Filename").trim();
  if (filename !== "") {
    const plainText = document.getElementById("output").innerText;
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(plainText)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
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

  nextOptions.inputFormat = options.inputFormat;
  if (options.inputFormat === "CDE") {
    nextOptions.outputFormat = "DOREMI";
  } else {
    nextOptions.outputFormat = "CDE";
  }
  skipNext = false;
  for (let i = 0; i < inputData.length; i++) {
    if (!ignoreLine(inputData[i], options.inputFormat, options.outputFormat)) {
      if (skipNext) {
        skipNext = false;
      } else {
        if (
          i < inputData.length - 1 &&
          options.inputFormat !== "INLINE" &&
          options.outputFormat === "INLINE"
        ) {
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
          if (
            result1.isChordLine ||
            next.trim() === "" ||
            next.includes("{") ||
            next.includes("}")
          ) {
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
        if (!result2.isChordLine || options.outputFormat !== "NOCHORDS") {
          outputData.push(output);
          outputInfo.push(result2.isChordLine);
        }
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

function clearClicked() {
  const input = document.getElementById("input");
  if (input.value !== "") {
    if (confirm("Clear the input?")) {
      input.value = "";
    }
  }
}

function titleClicked() {
  let found = false;
  let chord = false;
  let data = [];
  let i = 0;
  let name = "";
  let outputData = {};
  let result = {};
  let s = "";
  let titleExists = false;
  const input = document.getElementById("input");
  const inputFormat = document.getElementById("inputFormat").value;
  let options = new Options();
  options.inputFormat = inputFormat;
  const inputObj = createInputOrOutputObject(options.inputFormat);
  const outputObj = createInputOrOutputObject(options.outputFormat);

  data = input.value.split("\n");
  found = false;
  titleExists = false;
  for (let j = 0; j < data.length; j++) {
    name = getDirective(data[j]).name;
    if (name === "title" || name === "t") {
      titleExists = true;
    }
  }
  if (!titleExists) {
    i = 0;
    while (!found && !chord && i < data.length) {
      let s = data[i].trim();
      if (s !== "") {
        if (!data[i].startsWith("#") && !s.startsWith("{")) {
          result = transposeLine(data[i], 1, options, "", inputObj, outputObj);
          if (result.isChordLine) {
            chord = true;
          } else {
            found = true;
            data[i] = `{title: ${s}}`;
          }
        }
      }
      i++;
    }
    if (found) {
      input.value = data.join("\n");
    }
  }
}

function commentClicked() {
  let p1 = 0;
  let p2 = 0;
  let p3 = 0;
  let s1 = "";
  let s2 = "";
  let s3 = "";
  let value = "";
  const input = document.getElementById("input");
  const commentType = document.getElementById("commentType").value;
  value = input.value;
  if (value !== "") {
    p3 = input.selectionStart;
    p1 = value.lastIndexOf("\n", p3);
    if (p1 === -1) {
      p1 = 0;
    }
    p2 = value.indexOf("\n", p3);
    if (p2 === -1) {
      p2 = value.length - 1;
    }
    s1 = value.slice(p1 + 1, p2);
    s2 = s1.trim();
    if (s2 !== "" && !s2.startsWith("{")) {
      s1 = "{" + commentType + ": " + s1 + "}";
      s3 = value.slice(0, p1 + 1) + s1 + value.slice(p2);
      input.value = s3;
    }
  }
}

function surpriseMeClicked() {
  const input = document.getElementById("input");
  let isInt = true;
  let n = 0;
  let song = {};
  let value = "";

  n = 0;
  value = input.value.trim().toLowerCase();
  isInt = true;
  if (value.length > 0 && value.length < 5) {
    for (let i = 0; i < value.length; i++) {
      if ("1234567890".includes(value[i]) === false) {
        isInt = false;
      }
    }
    if (isInt) {
      n = parseInt(value);
      if (n < 1 || n > Songs.numberOfSongs()) {
        n = 0;
      }
    }
  }
  if (value === "index" || value === "?") {
    song = Songs.loadSong(0);
    input.value = song.join("\n");
  } else {
    if (n === 0) {
      if (confirm("Load a random example song?")) {
        n = Math.floor(Math.random() * Songs.numberOfSongs()) + 1;
      }
    }
  }
  if (n > 0) {
    song = Songs.loadSong(n);
    input.value = song.join("\n");
    document.getElementById("inputFormat").value = "CDE";
    transposeClicked();
  }
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
  let changed = false;
  let chordColor = "";
  let chordsIsBold = false;
  let directive = {};
  let ignore = false;
  let ignoreColors = false;
  let inputData = [];
  let outputData = {};
  let outputData1 = [];
  let outputData2 = [];
  let outputData3 = [];
  let outputInfo = [];
  let options = new Options();
  let semitones = 0;
  let style = "";
  let styleBold = "";
  let styleComment = "";
  let styleCommentBox = "";
  let styleCommentItalic = "";
  let styleSubTitle = "";
  let styleText = "";
  let styleTitle = "";
  let textSize = "NORMAL";
  let value = "";
  let valueStyle = 0;
  const outputArea = document.getElementById("output");
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
  ignoreColors = document.getElementById("ignoreColors").checked;

  textSize = document.getElementById("textSize").value;
  if (textSize === "SMALL") {
    valueStyle = 12;
  } else if (textSize === "LARGE") {
    valueStyle = 20;
  } else {
    valueStyle = 16;
  }
  // Styles inline for keeping style when copying from browser to document
  style = `style="font-family: Courier New, Courier, monospace; font-size: ${valueStyle}px"`;
  styleBold = `style="font-family: Courier New, Courier, monospace; font-weight: bold; font-size: ${valueStyle}px"`;
  styleComment = `style="font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size: ${valueStyle}px"`;
  styleCommentBox = `style="width: fit-content; border: 1px solid black; font-family: Arial, Helvetica, sans-serif; font-size: ${valueStyle}px"`;
  styleCommentItalic = `style="font-family: Arial, Helvetica, sans-serif; font-style: italic; font-size: ${valueStyle}px"`;
  styleText = `style="font-family: Arial, Helvetica, sans-serif; font-size: ${valueStyle}px"`;
  styleTitle = `style="font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size: ${Math.round(
    valueStyle * 1.5
  )}px"`;
  styleSubTitle = `style="font-family: Arial, Helvetica, sans-serif; font-size: ${Math.round(
    valueStyle * 1.25
  )}px"`;

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
    outputData2[i] = convertSpacesAndLF(outputData2[i], style);
    if (outputData2[i] === "" || outputData2[i] === `</div><div ${style}>`) {
      outputData2[i] = "&nbsp;";
    }
  }
  chordColor = "";
  for (let i = 0; i < outputData2.length; i++) {
    ignore = false;
    if (chordsIsBold && options.outputFormat !== "INLINE" && outputInfo[i]) {
      outputData2[i] = `<div ${addColor(styleBold, chordColor)}>${
        outputData2[i]
      }</div>`;
    } else {
      changed = false;
      if (options.outputFormat !== "INLINE") {
        directive = getDirective(outputData1[i]);
        if (directive.name !== "") {
          changed = true;
          value = convertSpacesAndLF(directive.value, style);
          if (
            directive.name === "chordcolour" ||
            directive.name === "chordcolor"
          ) {
            ignore = true;
            if (value === "") {
              value = "black";
            }
            if (!ignoreColors) {
              chordColor = value;
            }
          }
          if (directive.name === "title" || directive.name === "t") {
            outputData2[i] = `<div ${styleTitle}>${value}</div>`;
          } else if (directive.name === "subtitle" || directive.name === "st") {
            outputData2[i] = `<div ${styleSubTitle}>${value}</div>`;
          } else if (directive.name === "artist") {
            outputData2[i] = `<div ${styleText}>${value}</div>`;
          } else if (directive.name === "comment" || directive.name === "c") {
            outputData2[i] = `<div ${styleComment}>${value}</div>`;
          } else if (
            directive.name === "comment_italic" ||
            directive.name === "ci"
          ) {
            outputData2[i] = `<div ${styleCommentItalic}>${value}</div>`;
          } else if (
            directive.name === "comment_box" ||
            directive.name === "cb"
          ) {
            outputData2[i] = `<div ${styleCommentBox}>${value}</div>`;
          } else if (value !== "") {
            outputData2[i] = `<div ${styleText}>${Capitalize(
              directive.name
            )}: ${value}</div>`;
          } else {
            changed = false;
          }
        }
      }
      if (!changed) {
        if (options.outputFormat !== "INLINE" && outputInfo[i]) {
          outputData2[i] = `<div ${addColor(style, chordColor)}>${
            outputData2[i]
          }</div>`;
        } else {
          outputData2[i] = `<div ${style}>${outputData2[i]}</div>`;
        }
      }
    }
    if (!ignore) {
      outputData3.push(outputData2[i]);
    }
  }
  outputArea.innerHTML = outputData3.join("");
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
  let hasRead = false;
  let hasText = false;
  let inlinePos = 0;
  let inlineText = "";
  let inlineToInline = false;
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
  let c = "";
  let s = "";
  let sAdd = "";
  let skip = 0;
  let sNewChord = "";

  inlineToInline =
    options.inputFormat === "INLINE" && options.outputFormat === "INLINE";
  mergeWithNextLine = nextInput.length > 0 && options.outputFormat === "INLINE";
  s = convertToNormalChars(input);
  if (
    (input.includes(",") ||
      input.includes(".") ||
      input.includes("{") ||
      input.includes("}")) &&
    options.inputFormat !== "INLINE"
  ) {
    hasText = true;
  }
  oneMore = false;
  inlinePos = 0;
  inlineText = "";
  let i = 0;
  while ((i < s.length || oneMore) && !hasText) {
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
          options.inputFormat === "NOCHORDS" ||
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
          hasText = true;
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
            hasText = true;
          }
        }
        if (!hasText) {
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
  if (!hasText) {
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
          hasText = true;
        }
      }
      if (!hasText) {
        chordType = changeBass(
          chordType,
          semiTones,
          options,
          inputObj,
          outputObj
        );
        if (chordType === "ERROR") {
          hasText = true;
        }
      }
      if (!hasText) {
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
  if (!hasText) {
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
    if (inlineToInline) {
      if (hasRead) {
        result = "";
        inlinePos = 0;
        skip = 0;
        for (let i = 0; i < inlineText.length; i++) {
          do {
            c = " ";
            if (inlinePos < s.length) {
              c = s[inlinePos];
            }
            if (c !== " ") {
              result += c;
              inlinePos++;
              skip++;
            }
          } while (c !== " ");
          result += inlineText[i];
          if (skip > 0) {
            skip--;
          } else {
            inlinePos++;
          }
        }
        while (inlinePos < s.length) {
          result += s[inlinePos];
          inlinePos++;
        }
      }
      if (result === "") {
        result = input;
      }
    } else {
      if (options.inputFormat === "INLINE") {
        if (options.outputFormat === "NOCHORDS") {
          result = inlineText;
          hasText = true;
        } else {
          result += "\n" + inlineText;
        }
      }
    }
  } else {
    result = input;
  }
  return {
    isChordLine: !hasText && hasRead,
    result: result,
  };
}

// To prevent error when using node
try {
  document.getElementById("btClear").addEventListener("click", clearClicked);
  document.getElementById("btTitle").addEventListener("click", titleClicked);
  document
    .getElementById("btComment")
    .addEventListener("click", commentClicked);
  document
    .getElementById("btSurpriseMe")
    .addEventListener("click", surpriseMeClicked);
  document
    .getElementById("btTranspose")
    .addEventListener("click", transposeClicked);
  document.getElementById("btDown").addEventListener("click", downClicked);
  document.getElementById("btUp").addEventListener("click", upClicked);
  document
    .getElementById("btSelectAll")
    .addEventListener("click", selectAllClicked);
  document.getElementById("btPrint").addEventListener("click", printClicked);
  document.getElementById("btExport").addEventListener("click", exportClicked);
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

export { Options, keyToSemitones, transpose, getDirective };
