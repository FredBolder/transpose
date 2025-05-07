import { ChordSystem } from "./chordsystem.js";

class German2 extends ChordSystem {
  constructor() {
    super();
    this.noteList = [
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
  }

  convertNoteFromCDE(note, options) {
    switch (note) {
      case "B":
        return "H";
      case "B#":
        return "H#";
      case "B##":
        return "H##";
      case "Bb":
        return "B";
      case "Bbb":
        return "Bb";
      default:
        return note;
    }
  }

  convertNoteToCDE(note, options) {
    switch (note) {
      case "C":
        return "C";
      case "D":
        return "D";
      case "E":
        return "E";
      case "F":
        return "F";
      case "G":
        return "G";
      case "A":
        return "A";
      case "H":
        return "B";
      case "C#":
        return "C#";
      case "Db":
        return "Db";
      case "D#":
        return "D#";
      case "Eb":
        return "Eb";
      case "F#":
        return "F#";
      case "Gb":
        return "Gb";
      case "G#":
        return "G#";
      case "Ab":
        return "Ab";
      case "A#":
        return "A#";
      case "B":
        return "Bb";
      default:
        return "";
    }
  }

  notes(minor, bass) {
    return this.noteList;
  }

  readNote(s) {
    let result = "";
    if (s.length > 0) {
      result = s[0];
      if (s.length > 1) {
        if (s[1] === "#" || s[1] === "b") {
          result += s[1];
          if (s.length > 2) {
            if (s[2] === "#" || s[2] === "b") {
              result += s[2];
            }
          }
        }
      }
    }
    return result;
  }
}

export { German2 };