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

  convertNoteToCDE(note, options) {
    let add = "";
    let idx = 0;
    let result = "";
    let romanNumber = note;
    let romanNumberInt = 0;
    let start = 0;
    const notes = "CDEFGAB";

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
      switch (options.key % 12) {
        case 0:
          // C
          start = 0;
          break;
        case 1:
          // C#
          start = 0;
          add += "#";
          break;
        case 2:
          // D
          start = 1;
          break;
        case 3:
          // Eb
          start = 2;
          add += "b";
          break;
        case 4:
          // E
          start = 2;
          break;
        case 5:
          // F
          start = 3;
          break;
        case 6:
          // F#
          start = 3;
          add += "#";
          break;
        case 7:
          // G
          start = 4;
          break;
        case 8:
          // Ab
          start = 5;
          add += "b";
          break;
        case 9:
          // A
          start = 5;
          break;
        case 10:
          // Bb
          start = 6;
          add += "b";
          break;
        case 11:
          // B
          start = 6;
          break;
        default:
          start = 0;
          break;
      }
      idx = (start + romanNumberInt - 1) % 7;
      result = notes[idx];
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