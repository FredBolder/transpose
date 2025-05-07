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

  convertNoteFromCDE(note, options) {
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
      case "B":
        return "H";
      case "C#":
        return "Cis";
      case "C##":
        return "Cisis";
      case "Db":
        return "Des";
      case "Dbb":
        return "Deses";
      case "D#":
        return "Dis";
      case "D##":
        return "Disis";
      case "Eb":
        return "Es";
      case "Ebb":
        return "Eses";
      case "F#":
        return "Fis";
      case "F##":
        return "Fisis";
      case "Gb":
        return "Ges";
      case "Gbb":
        return "Geses";
      case "G#":
        return "Gis";
      case "G##":
        return "Gisis";
      case "Ab":
        return "As";
      case "Abb":
        return "Ases";
      case "A#":
        return "Ais";
      case "A##":
        return "Aisis";
      case "Bb":
        return "B";
      case "Bbb":
        return "Heses";
      case "E#":
        return "Eis";
      case "E##":
        return "Eisis";
      case "B#":
        return "His";
      case "B##":
        return "Hisis";
      case "Cb":
        return "Ces";
      case "Cbb":
        return "Ceses";
      case "Fb":
        return "Fes";
      case "Fbb":
        return "Feses";
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
      case "Cis":
        return "C#";
      case "Des":
        return "Db";
      case "Dis":
        return "D#";
      case "Es":
        return "Eb";
      case "Fis":
        return "F#";
      case "Ges":
        return "Gb";
      case "Gis":
        return "G#";
      case "As":
        return "Ab";
      case "Ais":
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