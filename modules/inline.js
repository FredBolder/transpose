import { ChordSystem } from "./chordsystem.js";

class Inline extends ChordSystem {
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
      "A#,Bb",
      "B",
    ];
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

export { Inline };