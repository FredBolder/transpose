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
    let nashville = note;
    let nashvilleInt = 0;
    let scale;
    const scales = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

    scale = MusicData.majorScale(scales[options.key % 12]);

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
      idx = (nashvilleInt - 1) % 7;
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