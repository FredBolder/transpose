import { ChordSystem } from "./chordsystem.js";

class German1 extends ChordSystem {
  constructor() {
    super();
    this.noteList = [
      "C",
      "Cis,Des",
      "D",
      "Dis,Es",
      "E",
      "F",
      "Fis,Ges",
      "G",
      "Gis,As",
      "A",
      "Ais,B",
      "H",
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
        if (s[1] === "i" || s[1] === "e") {
          result += s[1];
        }
      }
      if (s.length > result.length) {
        if (s[result.length] === "s") {
          if (s.length > result.length + 1) {
            // In case of sus chord
            if (s[result.length + 1] !== "u") {
              result += "s";
            }
          } else {
            result += "s";
          }
        }
      }
    }
    return result;
  }
}

export { German1 };