import { ChordSystem } from "./chordsystem.js";

class DoReMi extends ChordSystem {
  constructor() {
    super();
    this.noteList = [
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
  }

  convertNoteFromCDE(note, options) {
    let result = "";

    const notes = {
      C: "Do",
      D: "Re",
      E: "Mi",
      F: "Fa",
      G: "Sol",
      A: "La",
      B: "Si",
    };
    if (note.length > 0) {
      result = notes[note[0]];
    }
    if (result === undefined) {
      return "";
    }
    if ((result === "Si") && options.useTi) {
      result = "Ti";
    }
    if (note.length > 1) {
      result += note.slice(1);
    }
    return result;
  }

  convertNoteToCDE(note, options) {
    switch (note) {
      case "Do":
        return "C";
      case "Re":
        return "D";
      case "Mi":
        return "E";
      case "Fa":
        return "F";
      case "Sol":
        return "G";
      case "La":
        return "A";
      case "Si":
        return "B";
      case "Ti":
        return "B";
      case "Do#":
        return "C#";
      case "Reb":
        return "Db";
      case "Re#":
        return "D#";
      case "Mib":
        return "Eb";
      case "Fa#":
        return "F#";
      case "Solb":
        return "Gb";
      case "Sol#":
        return "G#";
      case "Lab":
        return "Ab";
      case "La#":
        return "A#";
      case "Sib":
        return "Bb";
      case "Tib":
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
    if (s.length > 1) {
      result = s.slice(0, 2);
    }
    if (s.length > 2) {
      if (s[2].toLowerCase() === "l" && (result === "So" || result === "SO")) {
        result += s[2];
      }
    }
    for (let j = 0; j < 2; j++) {
      if (s.length > result.length) {
        if (s[result.length] === "#" || s[result.length] === "b") {
          result += s[result.length];
        }
      }
    }
    return result;
  }
}

export { DoReMi };