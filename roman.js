import { ChordSystem } from "./chordsystem.js";

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