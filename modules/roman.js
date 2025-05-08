import { ChordSystem } from "./chordsystem.js";
import { MusicData } from "./musicdata.js";

class Roman extends ChordSystem {
  constructor() {
    super();
    this.bassMajor = [
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
    this.bassMinor = [
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

    this.chordsMajor = [
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
    this.chordsMinor = [
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
  }

  convertNoteFromCDE(note, options) {
    let add = 0;
    let n1 = 0;
    let n2 = 0;
    let result = "";
    let scale;
    let scaleNote = "";
    const scales = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

    scale = MusicData.majorScale(scales[options.key % 12]);
    for (let i = 0; i < scale.length; i++) {
      if (note[0] === scale[i][0]) {
        scaleNote = scale[i];
        result = parseInt(i + 1);
      }
    }
    if (note.length > 1) {
      for (let i = 1; i < note.length; i++) {
        if (note[i] === "#") {
          n1++;
        }
        if (note[i] === "b") {
          n1--;
        }
      }
    }
    if (scaleNote.length > 1) {
      for (let i = 1; i < scaleNote.length; i++) {
        if (scaleNote[i] === "#") {
          n2++;
        }
        if (scaleNote[i] === "b") {
          n2--;
        }
      }
    }
    add = n1 - n2;
    if (add > 0) {
      result = "#".repeat(add) + result;
    } else if (add < 0) {
      result = "b".repeat(-add) + result;
    }
    result = MusicData.fixRomanDoubles(result);
    return result;
  }

  convertNoteToCDE(note, options) {
    let add = "";
    let idx = 0;
    let result = "";
    let romanNumber = note;
    let romanNumberInt = 0;
    let scale;
    const scales = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

    scale = MusicData.majorScale(scales[options.key % 12]);

    for (let i = 0; i < 2; i++) {
      if (romanNumber.length > 1) {
        if ((romanNumber[0] === "b") || (romanNumber[0] === "#")) {
          add += romanNumber[0];
          romanNumber = romanNumber.slice(1);
        }
      }
    }
    romanNumber = romanNumber.toUpperCase();
    switch (romanNumber) {
      case "I":
        romanNumberInt = 1;
        break;
      case "II":
        romanNumberInt = 2;
        break;
      case "III":
        romanNumberInt = 3;
        break;
      case "IV":
        romanNumberInt = 4;
        break;
      case "V":
        romanNumberInt = 5;
        break;
      case "VI":
        romanNumberInt = 6;
        break;
      case "VII":
        romanNumberInt = 7;
        break;
      default:
        romanNumberInt = 0;
        break;
    }
    if (romanNumberInt > 0) {
      idx = (romanNumberInt - 1) % 7;
      result = scale[idx];
      result += add;
      result = MusicData.fixFlatSharp(result);
    }
    return result;
  }

  convertType(type, options) {
    let convert = true;
    let result = type;
    if (type.startsWith("dim")) {
      result = "°" + type.slice(3);
    } else if (type.startsWith("aug")) {
      result = "+" + type.slice(3);
    } else if (type.startsWith("minor")) {
      result = type.slice(5);
    } else if (type.startsWith("min")) {
      result = type.slice(3);
    } else if (type.startsWith("mi")) {
      result = type.slice(2);
    } else if (type.startsWith("m")) {
      if (type.length > 1) {
        if ("aA".includes(type[1])) {
          convert = false;
        }
      }
      if (convert) {
        result = type.slice(1);
      }
    }
    return result;
  }

  notes(minor, bass) {
    let result = [];

    if (minor) {
      if (bass) {
        result = this.bassMinor;
      } else {
        result = this.chordsMinor;
      }
    } else {
      if (bass) {
        result = this.bassMajor;
      } else {
        result = this.chordsMajor;
      }
    }
    return result;
  }

  readNote(s) {
    let result = "";
    if (s.length > 0) {
      result = s[0];
      for (let j = 0; j < 3; j++) {
        if (s.length > result.length) {
          if (
            s[result.length].toLowerCase() === "i" ||
            s[result.length].toLowerCase() === "v"
          ) {
            result += s[result.length];
          }
        }
      }
    }
    return result;
  }
}

export { Roman };