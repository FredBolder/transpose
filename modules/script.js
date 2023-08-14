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
import { Glob } from "./glob.js";
import { Settings } from "./settings.js";

Glob.init();

function addColor(style, color, theme) {
  let c = color;
  let p1 = 0;
  let result = style;

  if (color !== "") {
    p1 = style.indexOf(`"`);
    if (p1 >= 0) {
      if (theme === "DARK") {
        if (c === "black") {
          c = "white";
        }
      }
      result =
        style.slice(0, p1 + 1) + "color: " + c + "; " + style.slice(p1 + 1);
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

function capitalize(s) {
  let result = s;

  if (result.length > 0) {
    result = result[0].toUpperCase() + result.slice(1);
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
  let p = s.indexOf("/");
  if (p >= 0) {
    s = s.slice(0, p);
  }
  return MusicData.getInterval(s).length > 0;
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

function drawKeyboard(idx, notes) {
  let ch = 0;
  let cw = 0;
  let dx1 = 0;
  let dx2 = 0;
  let n1 = 0;
  let position = "";
  let x = 0;
  let y = 0;
  const keyboard = Glob.settings.keyboard;
  keyboard.height = keyboard.clientHeight * 2;
  keyboard.width = keyboard.clientWidth * 2;
  const kb = keyboard.getContext("2d");
  kb.reset();

  //console.log(notes);
  // console.log(
  //   `Width: ${keyboard.width}, Height: ${keyboard.height}, ClientWidth: ${keyboard.clientWidth}, ClientHeight: ${keyboard.clientHeight}`
  // );

  ch = keyboard.height;
  cw = keyboard.width;
  dx1 = cw / 21;
  kb.lineWidth = 2;
  // White keys
  kb.fillStyle = "white";
  kb.strokeStyle = "black";
  for (let i = 0; i < 21; i++) {
    kb.beginPath;
    kb.fillRect(i * dx1, 0, dx1, ch);
    kb.strokeRect(i * dx1, 0, dx1, ch);
  }
  // Black keys
  kb.fillStyle = "black";
  for (let i = 0; i < 20; i++) {
    if (![2, 6, 9, 13, 16].includes(i)) {
      dx2 = 0;
      if ([0, 7, 14].includes(i)) {
        dx2 = -2;
      }
      if ([1, 8, 15].includes(i)) {
        dx2 = 2;
      }
      if ([3, 10, 17].includes(i)) {
        dx2 = -4;
      }
      if ([5, 12, 19].includes(i)) {
        dx2 = 4;
      }
      kb.beginPath;
      kb.fillRect(i * dx1 + 2 + dx1 / 2 + dx2, 0, dx1 - 4, ch / 1.7);
    }
  }
  // Notes
  if (notes.length > 1) {
    position = Glob.settings.position.value;
    if (position === "INV1" || position === "INV2" || position === "INV3") {
      notes[0] += 12;
    }
    if (position === "INV2" || position === "INV3") {
      notes[1] += 12;
    }
    if (position === "INV3") {
      if (notes.length > 2) {
        notes[2] += 12;
      } else {
        notes[0] += 12;
      }
    }
    x = 0;
    for (let i = 0; i < 36; i++) {
      n1 = ((i + 1) % 12) - 1;
      if (n1 === 1) {
        dx2 = -2;
      } else if (n1 === 3) {
        dx2 = 2;
      } else if (n1 === 6) {
        dx2 = -4;
      } else if (n1 === 10) {
        dx2 = 4;
      } else {
        dx2 = 0;
      }
      if ([1, 3, 6, 8, 10].includes(n1)) {
        kb.fillStyle = "white";
        y = 0.4 * ch;
      } else {
        kb.fillStyle = "black";
        y = 0.85 * ch;
      }
      if ([5, 0].includes(n1)) {
        x += dx1 / 2;
      }
      if (
        notes.reduce((prev, current) => {
          return i === current + idx || prev;
        }, false)
      ) {
        kb.beginPath();
        kb.arc(x + dx2, y, 4, 0, 2 * Math.PI);
        kb.fill();
      }
      x += dx1 / 2;
    }
  }
}

function fixNoteIndex(n) {
  while (n > 11) {
    n -= 12;
  }
  while (n < 0) {
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

function getNumberOfChords() {
  return (Object.keys(MusicData.intervals).length * 12).toString();
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

function header(title, dark = false) {
  let s = "";

  s += `<!DOCTYPE html>\n`;
  s += `<html lang="en">\n`;
  s += `  <head>\n`;
  s += `    <meta charset="UTF-8" />\n`;
  s += `    <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n`;
  s += `    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n`;
  s += `    <title>${title}</title>\n`;
  if (dark) {
    s += `      <style>\n`;
    s += `        body {\n`;
    s += `          color: white;\n`;
    s += `          background-color: black;\n`;
    s += `        }\n`;
    s += `      </style>\n`;
  }
  s += `  </head>\n`;
  s += `  <body>\n`;
  return s;
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

function searchNotes(input) {
  let result = "";
  let d = 0;
  let ct = "";
  let note = "";
  let notes1 = [];
  let notes2 = [];
  let notes3 = [];

  const options = new Options();
  Glob.settings.saveToOptions(options);
  options.inputFormat = options.outputFormat;
  const inputObj = createInputOrOutputObject(options.inputFormat);

  notes1 = input.split(",");
  for (let i = 0; i < notes1.length; i++) {
    notes1[i] = noteToIndex(notes1[i].trim(), options, false, true, inputObj);
  }
  notes1.sort();
  const keys = Object.keys(MusicData.intervals);
  for (let i = 0; i < keys.length; i++) {
    notes2 = MusicData.intervals[keys[i]];
    d = 0;
    while (d < 11) {
      notes3 = notes2.map((current) => {
        return fixNoteIndex(Math.abs(current) + d);
      });
      notes3.sort();
      if (notes1.join(",") === notes3.join(",")) {
        if (result !== "") {
          result += ", ";
        }
        ct = keys[i];
        if (ct === "_") {
          ct = "";
        }
        note = noteIndexToString(d, options, false, inputObj);
        if (options.outputFormat === "GREEK") {
          ct = inputObj.convertType(ct, options);
        }
        if (options.outputFormat === "ROMAN") {
          if (isRomanLower(ct)) {
            note = note.toLowerCase();
            if (ct.startsWith("m")) {
              ct = ct.slice(1);
            }
          }
        }
        if (ct != "*") {
          result += note + ct;
        }
      }
      d++;
    }
  }
  return result;
}

function showHide() {
  if (Glob.settings.inputFormat.value === "INLINE") {
    Glob.settings.bracketsInput.classList.remove("hidden");
  } else {
    Glob.settings.bracketsInput.classList.add("hidden");
  }
  if (Glob.settings.outputFormat.value === "INLINE") {
    Glob.settings.bracketsOutput.classList.remove("hidden");
  } else {
    Glob.settings.bracketsOutput.classList.add("hidden");
  }
  if (
    Glob.settings.inputFormat.value === "ROMAN" ||
    Glob.settings.inputFormat.value === "NASHVILLE" ||
    Glob.settings.outputFormat.value === "ROMAN" ||
    Glob.settings.outputFormat.value === "NASHVILLE"
  ) {
    Glob.settings.groupKey.classList.remove("hidden");
  } else {
    Glob.settings.groupKey.classList.add("hidden");
  }
}

function startScroll() {
  Glob.settings.btScroll.innerText = "Stop";
  Glob.scrollID = setInterval(function () {
    window.scrollBy(0, 1);
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      stopScroll();
    }
  }, Glob.scrollInterval);
}

function stopScroll() {
  if (Glob.scrollID !== null) {
    clearInterval(Glob.scrollID);
    Glob.scrollID = null;
    Glob.settings.btScroll.innerText = "Start";
  }
}

function printClicked() {
  let data = "";
  transposeClicked(true);
  data = Glob.settings.outputArea.innerHTML;
  data = data.split("</div><").join("</div>\n    <");
  const w = window.open(" ", " ");
  w.document.write(header("Transpose by Fred Bolder"));
  w.document.writeln(`    <div class="outputprint">`);
  w.document.write(data);
  w.document.writeln("    </div>");
  w.document.writeln("  </body>");
  w.document.writeln("</html>");
  let stateCheck = setInterval(() => {
    if (document.readyState === "complete") {
      clearInterval(stateCheck);
      w.print();
      w.close();
    }
  }, 100);
  transposeClicked();
}

function exportClicked() {
  let dark = false;
  let data = "";
  let filename = prompt("Filename without path").trim();
  if (filename !== "") {
    const exportFormat = Glob.settings.exportFormat.value;
    const element = document.createElement("a");
    if (exportFormat === "HTML") {
      if (!filename.includes(".")) {
        filename += ".html";
      }
      data = Glob.settings.outputArea.innerHTML;
      data = data.split("</div><").join("</div>\n      <");
      dark = Glob.settings.theme.value === "DARK";
      console.log(dark);
      data = header(filename, dark) + "    <main>\n" + "      " + data;
      data += `\n    </main>\n`;
      data += `  </body>\n`;
      data += `</html>\n`;
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(data)
      );
    } else {
      if (!filename.includes(".")) {
        filename += ".txt";
      }
      data = Glob.settings.outputArea.innerText;
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(data)
      );
    }
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
    range.moveToElementText(Glob.settings.outputArea);
    range.select();
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(Glob.settings.outputArea);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }
}

function chordInfoClicked() {
  let chordType = "";
  let idx = -1;
  let info = "";
  let mayBeOmitted = false;
  let note = "";
  let noteIdx = 0;
  let p1 = -1;
  let s1 = "";
  let chordNotes = [];
  let input = convertToNormalChars(Glob.settings.inputChordInfo.value.trim());
  const output = Glob.settings.outputChordInfo;
  const options = new Options();
  Glob.settings.saveToOptions(options);
  options.inputFormat = options.outputFormat;
  const outputObj = createInputOrOutputObject(options.outputFormat);

  if (input.includes(",")) {
    // Search chord by notes
    // Remove round brackets
    input = Glob.removeChars(input, "()");
    s1 = searchNotes(input);
    if (s1 === "") {
      s1 = "No matching chord found";
    }
    output.innerHTML = s1;
    drawKeyboard(0, []);
  } else {
    // Remove spaces and square brackets
    input = Glob.removeChars(input, " []");

    if (options.outputFormat === "NOCHORDS") {
      options.outputFormat = "CDE";
    }
    note = outputObj.readNote(input);
    if (note !== "") {
      idx = noteToIndex(note, options, false, false, outputObj);
      if (idx >= 0) {
        chordType = input.substring(note.length);
        p1 = chordType.lastIndexOf("/");
        if (p1 >= 0) {
          chordType = chordType.substring(0, p1);
        }
        if (options.outputFormat === "GREEK") {
          chordType = convertGreekType(chordType);
        }
        if (options.outputFormat === "ROMAN") {
          if (
            note === note.toLowerCase() &&
            !chordType.startsWith("°") &&
            !chordType.toLowerCase().startsWith("dim")
          ) {
            chordType = "m" + chordType;
          }
        }
        chordNotes = MusicData.getInterval(chordType);
      }
    }
    info = "";
    for (let i = 0; i < chordNotes.length; i++) {
      if (i > 0) {
        info += ", ";
      }
      mayBeOmitted = (chordNotes[i] < 0);
      chordNotes[i] = Math.abs(chordNotes[i]);
      noteIdx = fixNoteIndex(chordNotes[i] + idx);
      note = noteIndexToString(noteIdx, options, true, outputObj);
      if (mayBeOmitted) {
        note = "(" + note + ")";
      }
      info += note;
    }

    if (info === "") {
      info = "No info available for this chord yet";
      drawKeyboard(0, []);
    } else {
      drawKeyboard(idx, chordNotes);
    }
    output.innerHTML = info;
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
  const input = Glob.settings.inputArea;
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
  const input = Glob.settings.inputArea;
  const inputFormat = Glob.settings.inputFormat.value;
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
  const input = Glob.settings.inputArea;
  const commentType = Glob.settings.commentType.value;
  value = input.value;
  if (value !== "") {
    p3 = input.selectionStart;
    p1 = value.lastIndexOf("\n", p3);
    // No need to change p1 when it is -1
    p2 = value.indexOf("\n", p3);
    if (p2 === -1) {
      p2 = value.length;
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

function scrollClicked() {
  if (Glob.scrollID === null) {
    startScroll();
  } else {
    stopScroll();
  }
}

function setScrollInterval(deltaInterval) {
  const minInterval = 5;
  const maxInterval = 500;
  let newInterval = Glob.scrollInterval + deltaInterval;
  if (newInterval < minInterval) {
    newInterval = minInterval;
  }
  if (newInterval > maxInterval) {
    newInterval = maxInterval;
  }
  if (Glob.scrollID === null) {
    Glob.scrollInterval = newInterval;
  } else {
    stopScroll();
    Glob.scrollInterval = newInterval;
    startScroll();
  }
  Glob.settings.interval.innerText = Glob.scrollInterval.toString();
}

function surpriseMeClicked() {
  const input = Glob.settings.inputArea;
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
      if (n < 1 || (n > Songs.numberOfSongs() && (n < 101 || n > 103))) {
        n = 0;
      }
    }
  }
  if (value === "index" || value === "?") {
    song = Songs.loadSong(0);
    input.value = song.join("\n");
  } else if (value === "!") {
    song = Songs.loadSong(100);
    input.value = song.join("\n");
  } else {
    if (n === 0) {
      if (confirm("Load a random example song?")) {
        do {
          n = Math.floor(Math.random() * Songs.numberOfSongs()) + 1;
        } while (Songs.recentlyShow(n));
      }
    }
  }
  if (n > 0) {
    song = Songs.loadSong(n);
    input.value = song.join("\n");
    Glob.settings.inputFormat.value = "CDE";
    Glob.settings.semitones.value = 0;
    transposeClicked();
  }
}

function downClicked() {
  let semitones = parseInt(Glob.settings.semitones.value);
  if (semitones > -11) {
    semitones--;
    Glob.settings.semitones.value = semitones.toString();
    transposeClicked();
  }
}

function upClicked() {
  let semitones = parseInt(Glob.settings.semitones.value);
  if (semitones < 11) {
    semitones++;
    Glob.settings.semitones.value = semitones.toString();
    transposeClicked();
  }
}

function transposeClicked(print = false) {
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
  let textColor = "";
  let titleColor = "";
  let textSize = "NORMAL";
  let value = "";
  let valueStyle = 0;
  let theme = Glob.settings.theme.value;
  let themeColor = "black";
  const outputArea = Glob.settings.outputArea;
  Glob.settings.saveToOptions(options);
  chordsIsBold = Glob.settings.chordsIsBold.checked;
  ignoreColors = Glob.settings.ignoreColors.checked;

  if (print) {
    theme = "LIGHT";
  }
  if (theme === "LIGHT") {
    themeColor = "black";
  } else if (theme === "DARK") {
    themeColor = "white";
  } else {
    themeColor = "black";
  }

  textSize = Glob.settings.textSize.value;
  if (textSize === "XS") {
    valueStyle = 8;
  } else if (textSize === "SMALL") {
    valueStyle = 12;
  } else if (textSize === "LARGE") {
    valueStyle = 20;
  } else if (textSize === "XL") {
    valueStyle = 24;
  } else {
    valueStyle = 16;
  }
  // Styles inline for keeping style when copying from browser to document
  style = `style="font-family: Liberation Mono, Courier New, Courier, monospace; font-size: ${valueStyle}px"`;
  styleBold = `style="font-family: Liberation Mono, Courier New, Courier, monospace; font-weight: bold; font-size: ${valueStyle}px"`;
  styleComment = `style="font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size: ${valueStyle}px"`;
  styleCommentBox = `style="width: fit-content; border: 1px solid ${themeColor}; font-family: Arial, Helvetica, sans-serif; font-size: ${valueStyle}px"`;
  styleCommentItalic = `style="font-family: Arial, Helvetica, sans-serif; font-style: italic; font-size: ${valueStyle}px"`;
  styleText = `style="font-family: Arial, Helvetica, sans-serif; font-size: ${valueStyle}px"`;
  styleTitle = `style="font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size: ${Math.round(
    valueStyle * 1.5
  )}px"`;
  styleSubTitle = `style="font-family: Arial, Helvetica, sans-serif; font-size: ${Math.round(
    valueStyle * 1.25
  )}px"`;

  let data = Glob.settings.inputArea.value;
  inputData = data.split("\n");
  semitones = parseInt(Glob.settings.semitones.value);
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
    outputData2[i] = convertSpacesAndLF(
      outputData2[i],
      addColor(style, textColor, theme)
    );
    if (
      outputData2[i] === "" ||
      outputData2[i] === `</div><div ${addColor(style, textColor, theme)}>`
    ) {
      outputData2[i] = "&nbsp;";
    }
  }
  chordColor = "";
  textColor = "";
  titleColor = "";
  for (let i = 0; i < outputData2.length; i++) {
    ignore = false;
    if (chordsIsBold && options.outputFormat !== "INLINE" && outputInfo[i]) {
      outputData2[i] = `<div ${addColor(styleBold, chordColor, theme)}>${
        outputData2[i]
      }</div>`;
    } else {
      changed = false;
      if (options.outputFormat !== "INLINE") {
        directive = getDirective(outputData1[i]);
        if (directive.name !== "") {
          changed = true;
          //value = convertSpacesAndLF(directive.value, style);
          value = directive.value;
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
          if (
            directive.name === "textcolour" ||
            directive.name === "textcolor"
          ) {
            ignore = true;
            if (value === "") {
              value = "black";
            }
            if (!ignoreColors) {
              textColor = value;
            }
          }
          if (
            directive.name === "titlecolour" ||
            directive.name === "titlecolor"
          ) {
            ignore = true;
            if (value === "") {
              value = "black";
            }
            if (!ignoreColors) {
              titleColor = value;
            }
          }
          if (directive.name === "title" || directive.name === "t") {
            outputData2[i] = `<div ${addColor(
              styleTitle,
              titleColor,
              theme
            )}>${value}</div>`;
          } else if (directive.name === "subtitle" || directive.name === "st") {
            outputData2[i] = `<div ${addColor(
              styleSubTitle,
              textColor,
              theme
            )}>${value}</div>`;
          } else if (directive.name === "artist") {
            outputData2[i] = `<div ${addColor(
              styleText,
              textColor,
              theme
            )}>${value}</div>`;
          } else if (directive.name === "comment" || directive.name === "c") {
            outputData2[i] = `<div ${addColor(
              styleComment,
              textColor,
              theme
            )}>${value}</div>`;
          } else if (
            directive.name === "comment_italic" ||
            directive.name === "ci"
          ) {
            outputData2[i] = `<div ${addColor(
              styleCommentItalic,
              textColor,
              theme
            )}>${value}</div>`;
          } else if (
            directive.name === "comment_box" ||
            directive.name === "cb"
          ) {
            outputData2[i] = `<div ${addColor(
              styleCommentBox,
              textColor,
              theme
            )}>${value}</div>`;
          } else if (value !== "") {
            outputData2[i] = `<div ${addColor(
              styleText,
              textColor,
              theme
            )}>${capitalize(directive.name)}: ${value}</div>`;
          } else {
            changed = false;
          }
        }
      }
      if (!changed) {
        if (options.outputFormat !== "INLINE" && outputInfo[i]) {
          outputData2[i] = `<div ${addColor(style, chordColor, theme)}>${
            outputData2[i]
          }</div>`;
        } else {
          outputData2[i] = `<div ${addColor(style, textColor, theme)}>${
            outputData2[i]
          }</div>`;
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
  let ct = "";
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
        ct = chord.slice(note.length);
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
            if (
              note === note.toLowerCase() &&
              !ct.startsWith("°") &&
              !ct.toLowerCase().startsWith("dim")
            ) {
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
  window.addEventListener("load", (e) => {
    if (Glob.settings === null) {
      Glob.settings = new Settings();
      //console.log("Settings loaded");
      drawKeyboard(0, []);
      Glob.settings.numberOfChords.innerHTML = getNumberOfChords();
      Glob.settings.position.addEventListener("change", (e) => {
        if (Glob.settings.inputChordInfo.value.trim() !== "") {
          chordInfoClicked();
        }
      });
      Glob.settings.interval.innerText = Glob.scrollInterval.toString();
    }
  });
  document.getElementById("theme").addEventListener("change", (e) => {
    let r = document.querySelector(":root");
    if (e.target.value === "LIGHT") {
      r.style.setProperty("--theme-color", "black");
      r.style.setProperty("--theme-color-bg", "white");
    } else if (e.target.value === "DARK") {
      r.style.setProperty("--theme-color", "white");
      r.style.setProperty("--theme-color-bg", "black");
    }
    transposeClicked();
  });

  document.getElementById("btClear").addEventListener("click", clearClicked);
  document.getElementById("btTitle").addEventListener("click", titleClicked);
  document
    .getElementById("btComment")
    .addEventListener("click", commentClicked);
  document
    .getElementById("btSurpriseMe")
    .addEventListener("click", surpriseMeClicked);
  document.getElementById("btTranspose").addEventListener("click", () => {
    transposeClicked();
  });
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
    document.getElementById("menuBar").classList.add("hidden");
    document.getElementById("help").classList.remove("hidden");
    document.querySelector("h1").innerText = "Transpose - Help";
  });
  document
    .getElementById("btChordInfo")
    .addEventListener("click", chordInfoClicked);
  document.getElementById("btBack").addEventListener("click", () => {
    document.getElementById("main").classList.remove("hidden");
    document.getElementById("links").classList.remove("hidden");
    document.getElementById("menuBar").classList.remove("hidden");
    document.getElementById("help").classList.add("hidden");
    document.querySelector("h1").innerText = "Transpose by Fred Bolder";
  });
  document.getElementById("inputFormat").addEventListener("change", showHide);
  document.getElementById("outputFormat").addEventListener("change", showHide);
  document.getElementById("btScroll").addEventListener("click", scrollClicked);
  document.getElementById("btScrollSlower").addEventListener("click", () => {
    setScrollInterval(5);
  });
  document.getElementById("btScrollFaster").addEventListener("click", () => {
    setScrollInterval(-5);
  });
} catch (e) {
  //console.log(e);
}

export { Options, keyToSemitones, transpose, getDirective };
