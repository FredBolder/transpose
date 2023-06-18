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