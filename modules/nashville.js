import { ChordSystem } from "./chordsystem.js";

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

  convertNoteToCDE(note) {
    return note;
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