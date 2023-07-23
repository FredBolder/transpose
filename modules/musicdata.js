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
    let result = [];

    switch (chordType) {
      case "":
        result = [0, 4, 7];
        break;
      case "m":
        result = [0, 3, 7];
        break;
      case "7":
        result = [0, 4, 7, 10];
        break;
      case "m7":
        result = [0, 3, 7, 10];
        break;
      case "M7":
        result = [0, 4, 7, 11];
        break;
      case "mM7":
        result = [0, 3, 7, 11];
        break;
      case "+":
      case "aug":
        result = [0, 4, 8];
        break;
      case "+7":
      case "aug7":
        result = [0, 4, 8, 10];
        break;
      case "dim":
        result = [0, 3, 6];
        break;
      case "dim7":
        result = [0, 3, 6, 9];
        break;
      case "5":
        result = [0, 7];
        break;
      case "6":
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
      case "M9":
        result = [0, 4, 7, 11, 14];
        break;
      case "11":
        result = [0, 4, 7, 10, 14, 17];
        break;
      case "m11":
        result = [0, 3, 7, 10, 14, 17];
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
      case "7sus2":
        result = [0, 2, 7, 10];
        break;
      case "7sus4":
      case "7sus":
        result = [0, 5, 7, 10];
        break;
      case "7sus24":
      case "7sus42":
        result = [0, 2, 5, 7, 10];
        break;
      case "add2":
        result = [0, 2, 4, 7];
        break;
      case "add9":
        result = [0, 4, 7, 14];
        break;
      default:
        break;
    }
    return result;
  }
}

export { MusicData };
