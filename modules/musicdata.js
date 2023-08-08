"use strict";

class MusicData {
  static simpleNotes = [
    "B#,C",
    "E#,F",
    "Cb,B",
    "Fb,E",
    "Si#,Do",
    "Ti#,Do",
    "Mi#,Fa",
    "Dob,Si",
    "Fab,Mi",
    "Σι#,Ντο",
    "Μι#,Φα",
    "Ντοb,Σι",
    "Φαb,Μι",
    "Cbb,Bb",
    "Dbb,C",
    "Ebb,D",
    "Fbb,Eb",
    "Gbb,F",
    "Abb,G",
    "Bbb,A",
    "C##,D",
    "D##,E",
    "E##,F#",
    "F##,G",
    "G##,A",
    "A##,B",
    "B##,C#",
    "Dobb,Sib",
    "Rebb,Do",
    "Mibb,Re",
    "Fabb,Mib",
    "Solbb,Fa",
    "Labb,Sol",
    "Sibb,La",
    "Tibb,La",
    "Do##,Re",
    "Re##,Mi",
    "Mi##,Fa#",
    "Fa##,Sol",
    "Sol##,La",
    "La##,Si",
    "Si##,Do#",
    "Ti##,Do#",
    "Ντοbb,Σιb",
    "Ρεbb,Ντο",
    "Μιbb,Ρε",
    "Φαbb,Μιb",
    "Σολbb,Φα",
    "Λαbb,Σολ",
    "Σιbb,Λα",
    "Ντο##,Ρε",
    "Ρε##,Μι",
    "Μι##,Φα#",
    "Φα##,Σολ",
    "Σολ##,Λα",
    "Λα##,Σι",
    "Σι##,Ντο#",
    "So,Sol",
    "Sob,Solb",
    "So#,Sol#",
    "Sobb,Fa",
    "So##,La",
    "Ces,H",
    "His,C",
    "Eis,F",
    "Fes,E",
  ];

  static intervals = {
    "_": [0, 4, 7],
    "11": [0, 4, 7, 10, 14, 17],
    "11no3": [0, 7, 10, 14, 17],
    "11no5": [0, 4, 10, 14, 17],
    "11no9": [0, 4, 7, 10, 17],
    "13": [0, 4, 7, 10, 14, 17, 21],
    "13#11": [0, 4, 7, 10, 14, 18, 21],
    "13b9": [0, 4, 7, 10, 13, 17, 21],
    "13no3": [0, 7, 10, 14, 17, 21],
    "13no5": [0, 4, 10, 14, 17, 21],
    "13no9": [0, 4, 7, 10, 17, 21],
    "5": [0, 7],
    "57": [0, 7, 10],
    "59": [0, 7, 14],
    "6": [0, 4, 7, 9],
    "69": [0, 4, 7, 9, 14],
    "69#11": [0, 4, 7, 9, 14, 18],
    "69sus4": [0, 5, 7, 9, 14],
    "6sus2": [0, 2, 7, 9],
    "6sus4": [0, 5, 7, 9],
    "7": [0, 4, 7, 10],
    "7#11": [0, 4, 7, 10, 18],
    "7#9": [0, 4, 7, 10, 15],
    "7b5": [0, 4, 6, 10],
    "7b9": [0, 4, 7, 10, 13],
    "7b9#9": [0, 4, 7, 10, 13, 15],
    "7sus2": [0, 2, 7, 10],
    "7sus24": [0, 2, 5, 7, 10],
    "7sus4": [0, 5, 7, 10],
    "7sus4b9b13": [0, 5, 7, 10, 13, 20],
    "9": [0, 4, 7, 10, 14],
    "9#11": [0, 4, 7, 10, 14, 18],
    "9no3": [0, 7, 10, 14],
    "9sus4": [0, 5, 7, 10, 14],
    "M11": [0, 4, 7, 11, 14, 17],
    "M13": [0, 4, 7, 11, 14, 17, 21],
    "M13#11": [0, 4, 7, 11, 14, 18, 21],
    "M7": [0, 4, 7, 11],
    "M7#9": [0, 4, 7, 11, 15],
    "M7b5": [0, 4, 6, 11],
    "M7b9": [0, 4, 7, 11, 13],
    "M7sus2": [0, 2, 7, 11],
    "M7sus24": [0, 2, 5, 7, 11],
    "M7sus4": [0, 5, 7, 11],
    "M9": [0, 4, 7, 11, 14],
    "M9sus4": [0, 5, 7, 11, 14],
    "add11": [0, 4, 7, 17],
    "add2": [0, 2, 4, 7],
    "add4": [0, 4, 5, 7],
    "add9": [0, 4, 7, 14],
    "aug": [0, 4, 8],
    "aug6": [0, 4, 8, 9],
    "aug7": [0, 4, 8, 10],
    "aug9": [0, 4, 8, 10, 14],
    "aug11": [0, 4, 8, 10, 14, 17],
    "aug13": [0, 4, 8, 10, 14, 17, 21],
    "dim": [0, 3, 6],
    "dim7": [0, 3, 6, 9],
    "dim9": [0, 3, 6, 9, 14],
    "dim11": [0, 3, 6, 9, 14, 17],
    "m": [0, 3, 7],
    "m11": [0, 3, 7, 10, 14, 17],
    "m11b5": [0, 3, 6, 10, 14, 17],
    "m11b5b9": [0, 3, 6, 10, 13, 17],
    "m11b9": [0, 3, 7, 10, 13, 17],
    "m11no5": [0, 3, 10, 14, 17],
    "m13": [0, 3, 7, 10, 14, 17, 21],
    "m6": [0, 3, 7, 9],
    "m69": [0, 3, 7, 9, 14],
    "m7": [0, 3, 7, 10],
    "m7#11": [0, 3, 7, 10, 18],
    "m7#9": [0, 3, 7, 10, 15],
    "m7add11": [0, 3, 7, 10, 17],
    "m7b5": [0, 3, 6, 10],
    "m7b9": [0, 3, 7, 10, 13],
    "m7no5": [0, 3, 10],
    "m9": [0, 3, 7, 10, 14],
    "m9b5": [0, 3, 6, 10, 14],
    "mM7": [0, 3, 7, 11],
    "mM9": [0, 3, 7, 11, 14],
    "madd2": [0, 2, 3, 7],
    "madd4": [0, 3, 5, 7],
    "madd9": [0, 3, 7, 14],
    "sus2": [0, 2, 7],
    "sus24": [0, 2, 5, 7],
    "sus4": [0, 5, 7],
    "sus4add9": [0, 5, 7, 14],
  }

  static getInterval(chordType) {
    let ct = chordType;
    let foundKey = "";
    let foundValue = "";
    let idxM = -1;
    let key = "";
    let p = 0;
    let result = [];
    let s1 = "";
    let value = "";

    const names = [
      { key: "maj", value: "M" },
      { key: "Δ", value: "M" },
      { key: "minor", value: "m" },
      { key: "min", value: "m" },
      { key: "mi", value: "m" },
      { key: "omit", value: "no" },
      { key: "°", value: "dim" },
      { key: "sus42", value: "sus24" },
      { key: "+5", value: "#5" },
      { key: "-5", value: "b5" },
      { key: "+9", value: "#9" },
      { key: "-9", value: "b9" },
      { key: "+11", value: "#11" },
      { key: "-11", value: "b11" },
      { key: "+13", value: "#13" },
      { key: "-13", value: "b13" },
    ];

    // Remove characters
    s1 = "";
    for (let i = 0; i < ct.length; i++) {
      if (!"()".includes(ct[i])) {
        s1 += ct[i];
      }
    }
    ct = s1;

    // minor
    if (ct.startsWith("-")) {
      ct = "m" + ct.slice(1);
    }
    // aug
    if (ct.startsWith("+")) {
      ct = "aug" + ct.slice(1);
    }

    // Lowercase except M (maj)
    idxM = ct.indexOf("M");
    if (idxM === 0 || idxM === 1) {
      ct = ct.substring(0, idxM + 1) + ct.substring(idxM + 1).toLowerCase();
    } else {
      ct = ct.toLowerCase();
    }

    // sus
    if (ct.endsWith("sus")) {
      ct += "4";
    }

    // Convert names
    p = 0;
    s1 = "";
    while (p < ct.length) {
      foundKey = "";
      foundValue = "";
      for (let i = 0; i < names.length && foundKey === ""; i++) {
        key = names[i].key;
        value = names[i].value;
        if (p + (key.length - 1) < ct.length) {
          if (ct.substring(p, p + key.length) === key) {
            foundKey = key;
            foundValue = value;
          }
        }
      }
      if (foundValue !== "") {
        s1 += foundValue;
        p += foundKey.length;
      } else {
        s1 += ct[p];
        p++;
      }
    }
    ct = s1;

    // Other names
    if (ct === "7#5") {
      ct = "aug7";
    } else if (ct === "9#5") {
      ct = "aug9";
    } else if (ct === "no3") {
      ct = "5";
    } else if (ct === "7no3") {
      ct = "57";
    } else if (ct === "add6") {
      ct = "6";
    } else if (ct === "5add9") {
      ct = "59";
    } else if (ct === "6add9") {
      ct = "69";
    } else if (ct === "7add11") {
      ct = "11no9";
    }

    if (ct === "") {
      ct = "_";
    }
    if (this.intervals[ct]) {
      result = [...this.intervals[ct]];
    } else {
      result = [];
    }
    if (result.length === 0) {
      //console.log("ct", ct)
    }
    return result;
  }
}

export { MusicData };
