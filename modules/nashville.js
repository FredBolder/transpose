import { ChordSystem } from "./chordsystem.js";
import { MusicData } from "./musicdata.js";

class Nashville extends ChordSystem {
  constructor() {
    super();
    this.notesMajor = [
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
    this.notesMinor = [
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
  }

  convertNoteToCDE(note, options) {
    let add = "";
    let idx = 0;
    let result = "";
    let nashville = note;
    let nashvilleInt = 0;
    let start = 0;
    const notes = "CDEFGAB";

    for (let i = 0; i < 2; i++) {
      if (nashville.length > 1) {
        if ((nashville[0] === "b") || (nashville[0] === "#")) {
          add += nashville[0];
          nashville = nashville.slice(1);
        }
      }
    }
    nashvilleInt = parseInt(nashville);
    if (nashvilleInt > 0) {
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
      idx = (start + nashvilleInt - 1) % 7;
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
      result = "m" + type.slice(5);
    } else if (type.startsWith("min")) {
      result = "m" + type.slice(3);
    } else if (type.startsWith("mi")) {
      result = "m" + type.slice(2);
    }
    return result;
  }

  notes(minor, bass) {
    let result = [];

    if (minor) {
      result = this.notesMinor;
    } else {
      result = this.notesMajor;
    }
    return result;
  }

  readNote(s) {
    let result = "";
    if (s.length > 0) {
      result = s[0];
      if (s.length > result.length && result.length < 2) {
        if ("b#".includes(s[0]) && "1234567".includes(s[result.length])) {
          result += s[result.length];
        }
      }
    }
    return result;
  }
}

export { Nashville };