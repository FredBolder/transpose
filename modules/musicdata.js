"use strict";

class MusicData {
  static chordTypes = [
    "",
    "2",
    "5",
    "6",
    "6b5",
    "69",
    "7",
    "7b5",
    "7#5",
    "7b9",
    "7#9",
    "7#9#11",
    "9",
    "11",
    "11omit3",
    "11omit5",
    "13",
    "minor",
    "minor2",
    "minoradd2",
    "minoradd4",
    "minor6",
    "minor69",
    "minor7",
    "minor7b5",
    "minor7#5",
    "minor7b9",
    "minor7#9",
    "minor9",
    "minoradd9",
    "minor11",
    "minor11omit5",
    "minor11b5b9",
    "minor11b9",
    "minor13",
    "maj7",
    "Δ",
    "maj7b5",
    "Δb5",
    "maj7#9",
    "Δ#9",
    "maj9",
    "maj11",
    "maj13",
    "minmaj7",
    "-Δ",
    "minmaj9",
    "+",
    "+7",
    "aug",
    "aug6",
    "aug7",
    "dim",
    "°",
    "dim7",
    "°7",
    "dim9",
    "°9",
    "sus",
    "sus2",
    "sus4",
    "sus24",
    "sus42",
    "6sus2",
    "6sus4",
    "69sus4",
    "7sus",
    "7sus2",
    "7sus4",
    "7sus24",
    "7sus42",
    "9sus",
    "9sus4",
    "maj7sus2",
    "maj7sus4",
    "maj7sus24",
    "maj7sus42",
    "Δsus2",
    "Δsus4",
    "Δsus24",
    "Δsus42",
    "maj9sus4",
    "add2",
    "add4",
    "add9",
    "add11",
  ];

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
      { key: "min", value: "m" },
      { key: "omit", value: "no" },
    ];

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
      for (let i = 0; i < names.length; i++) {
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
      case "+7":
      case "aug7":
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
      case "+":
      case "aug":
        result = [0, 4, 8];
        break;
      case "+6":
      case "aug6":
        result = [0, 4, 8, 9];
        break;
      case "+9":
      case "aug9":
      case "9#5":
        result = [0, 4, 8, 10, 14];
        break;
      case "°":
      case "dim":
        result = [0, 3, 6];
        break;
      case "°7":
      case "dim7":
        result = [0, 3, 6, 9];
        break;
      case "5":
        result = [0, 7];
        break;
      case "57":
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
      case "add4":
        result = [0, 4, 5, 7];
        break;
      case "madd4":
        result = [0, 3, 5, 7];
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
