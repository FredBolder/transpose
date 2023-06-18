import { ChordSystem } from "./chordsystem.js";

class Greek extends ChordSystem {
  constructor() {
    super();
    this.noteList = [
      "Ντο",
      "Ντο#,Ρεb",
      "Ρε",
      "Ρε#,Μιb",
      "Μι",
      "Φα",
      "Φα#,Σολb",
      "Σολ",
      "Σολ#,Λαb",
      "Λα",
      "Λα#,Σιb",
      "Σι",
    ];
  }

  convertType(type, options) {
    let convert = true;
    let result = type;
    if (type.startsWith("minor")) {
      result = "-" + type.slice(5);
    } else if (type.startsWith("min")) {
      result = "-" + type.slice(3);
    } else if (type.startsWith("mi")) {
      result = "-" + type.slice(2);
    } else if (type.startsWith("m")) {
      if (type.length > 1) {
        if ("aA".includes(type[1])) {
          convert = false;
        }
      }
      if (convert) {
        result = "-" + type.slice(1);
      }
    } else if (type === "" && !options.compact) {
      result = "+";
    }
    return result;
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
      if (s[2].toLowerCase() === "λ" && (result === "Σο" || result === "ΣΟ")) {
        result += s[2];
      }
      if (s[2].toLowerCase() === "ο" && (result === "Ντ" || result === "ΝΤ")) {
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

export { Greek };