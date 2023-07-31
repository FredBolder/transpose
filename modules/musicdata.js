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

  static intervals(chordType) {
    // TODO: dim9
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
      { key: "(add2)", value: "add2" },
      { key: "(add4)", value: "add4" },
      { key: "(add9)", value: "add9" },
      { key: "°", value: "dim" },
    ];

    if (ct.startsWith("-")) {
      ct = "m" + ct.slice(1);
    }

    // Lowercase except M (maj)
    idxM = ct.indexOf("M");
    if (idxM === 0 || idxM === 1) {
      ct = ct.substring(0, idxM + 1) + ct.substring(idxM + 1).toLowerCase();
    } else {
      ct = ct.toLowerCase();
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
            //console.log(key, value);
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
    if (s1 !== ct) {
      //console.log(ct, s1);
    }
    ct = s1;

    switch (ct) {
      case "":
        result = [0, 4, 7];
        break;
      case "m":
        result = [0, 3, 7];
        break;
      case "7":
        result = [0, 4, 7, 10];
        break;
      case "7b5":
      case "7-5":
        result = [0, 4, 6, 10];
        break;
      case "aug7":
      case "+7":
      case "7#5":
      case "7+5":
        result = [0, 4, 8, 10];
        break;
      case "7b9":
      case "7-9":
        result = [0, 4, 7, 10, 13];
        break;
      case "7#9":
      case "7+9":
        result = [0, 4, 7, 10, 15];
        break;
      case "7b9#9":
      case "7-9+9":
        result = [0, 4, 7, 10, 13, 15];
        break;
      case "m7":
        result = [0, 3, 7, 10];
        break;
      case "m7no5":
      case "m7(no5)":
        result = [0, 3, 10];
        break;
      case "m7b5":
      case "m7(b5)":
        result = [0, 3, 6, 10];
        break;
      case "M7":
        result = [0, 4, 7, 11];
        break;
      case "M7b5":
      case "M7-5":
        result = [0, 4, 6, 11];
        break;
      case "mM7":
        result = [0, 3, 7, 11];
        break;
      case "aug":
      case "+":
        result = [0, 4, 8];
        break;
      case "aug6":
      case "+6":
        result = [0, 4, 8, 9];
        break;
      case "aug9":
      case "+9":
      case "9#5":
        result = [0, 4, 8, 10, 14];
        break;
      case "dim":
        result = [0, 3, 6];
        break;
      case "dim7":
        result = [0, 3, 6, 9];
        break;
      case "5":
      case "no3":
      case "(no3)":
        result = [0, 7];
        break;
      case "57":
      case "7no3":
      case "7(no3)":
        result = [0, 7, 10];
        break;
      case "6":
      case "add6":
        result = [0, 4, 7, 9];
        break;
      case "m6":
        result = [0, 3, 7, 9];
        break;
      case "9":
        result = [0, 4, 7, 10, 14];
        break;
      case "9no3":
      case "9(no3)":
        result = [0, 7, 10, 14];
        break;
      case "m9":
        result = [0, 3, 7, 10, 14];
        break;
      case "m9b5":
      case "m9-5":
        result = [0, 3, 6, 10, 14];
        break;
      case "M9":
        result = [0, 4, 7, 11, 14];
        break;
      case "mM9":
        result = [0, 3, 7, 11, 14];
        break;
      case "11":
        result = [0, 4, 7, 10, 14, 17];
        break;
      case "11no3":
      case "11(no3)":
        result = [0, 7, 10, 14, 17];
        break;
      case "11no5":
      case "11(no5)":
        result = [0, 4, 10, 14, 17];
        break;
      case "11no9":
      case "11(no9)":
        result = [0, 4, 7, 10, 17];
        break;
      case "m11":
        result = [0, 3, 7, 10, 14, 17];
        break;
      case "m11b9":
      case "m11-9":
        result = [0, 3, 7, 10, 13, 17];
        break;
      case "m11b5b9":
      case "m11-5-9":
        result = [0, 3, 6, 10, 13, 17];
        break;
      case "m11no5":
      case "m11(no5)":
        result = [0, 3, 10, 14, 17];
        break;
      case "M11":
        result = [0, 4, 7, 11, 14, 17];
        break;
      case "13":
        result = [0, 4, 7, 10, 14, 17, 21];
        break;
      case "m13":
        result = [0, 3, 7, 10, 14, 17, 21];
        break;
      case "M13":
        result = [0, 4, 7, 11, 14, 17, 21];
        break;
      case "M13#11":
        result = [0, 4, 7, 11, 14, 18, 21];
        break;
      case "13no3":
      case "13(no3)":
        result = [0, 7, 10, 14, 17, 21];
        break;
      case "13no5":
      case "13(no5)":
        result = [0, 4, 10, 14, 17, 21];
        break;
      case "13no9":
      case "13(no9)":
        result = [0, 4, 7, 10, 17, 21];
        break;
      case "13b9":
      case "13-9":
        result = [0, 4, 7, 10, 13, 17, 21];
        break;
      case "13#11":
      case "13+11":
      case "13(#11)":
        result = [0, 4, 7, 10, 14, 18, 21];
        break;
      case "sus2":
        result = [0, 2, 7];
        break;
      case "sus4":
      case "sus":
        result = [0, 5, 7];
        break;
      case "sus24":
      case "sus42":
        result = [0, 2, 5, 7];
        break;
      case "6sus2":
        result = [0, 2, 7, 9];
        break;
      case "6sus4":
      case "6sus":
        result = [0, 5, 7, 9];
        break;
      case "7sus2":
        result = [0, 2, 7, 10];
        break;
      case "7sus4":
      case "7sus":
        result = [0, 5, 7, 10];
        break;
      case "7sus4b9b13":
        result = [0, 5, 7, 10, 13, 20];
        break;
      case "7sus24":
      case "7sus42":
        result = [0, 2, 5, 7, 10];
        break;
      case "M7sus2":
        result = [0, 2, 7, 11];
        break;
      case "M7sus4":
      case "M7sus":
        result = [0, 5, 7, 11];
        break;
      case "M7sus24":
      case "M7sus42":
        result = [0, 2, 5, 7, 11];
        break;
      case "9sus4":
        result = [0, 5, 7, 10, 14];
        break;
      case "M9sus4":
        result = [0, 5, 7, 11, 14];
        break;
      case "add2":
        result = [0, 2, 4, 7];
        break;
      case "madd2":
        result = [0, 2, 3, 7];
        break;
      case "add4":
        result = [0, 4, 5, 7];
        break;
      case "madd4":
        result = [0, 3, 5, 7];
        break;
      case "add11":
        result = [0, 4, 7, 17];
        break;
      case "add9":
        result = [0, 4, 7, 14];
        break;
      case "madd9":
        result = [0, 3, 7, 14];
        break;
      case "5add9":
      case "59":
        result = [0, 7, 14];
        break;
      case "6add9":
      case "69":
        result = [0, 4, 7, 9, 14];
        break;
      case "69#11":
      case "69+11":
        result = [0, 4, 7, 9, 14, 18];
        break;
      case "m69":
        result = [0, 3, 7, 9, 14];
        break;
      case "69sus4":
      case "69sus":
        result = [0, 5, 7, 9, 14];
        break;
      case "m7b9":
      case "m7-9":
        result = [0, 3, 7, 10, 13];
        break;
      case "m7#9":
      case "m7+9":
        result = [0, 3, 7, 10, 15];
        break;
      case "M7b9":
      case "M7-9":
        result = [0, 4, 7, 11, 13];
        break;
      case "M7#9":
      case "M7+9":
        result = [0, 4, 7, 11, 15];
        break;
      default:
        break;
    }
    return result;
  }
}

export { MusicData };
