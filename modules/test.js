import { keyToSemitones, transpose, getDirective } from "./script.js";
import { Options } from "./options.js";
import { MusicData } from "./musicdata.js";

function checkResult(testName, expected, result) {
  if (result !== expected) {
    console.log(`*** ${testName} failed!!! ***`);
    console.log(`Expected : ${expected}`);
    console.log(`Result   : ${result}`);
  }
}

function createTestData(n) {
  let inputData = [];
  switch (n) {
    case 1:
      inputData.push("         Bb");
      inputData.push("Θέλω κοντά σου να μείνω");
      inputData.push("   C7   F");
      inputData.push("Θέλω σκιά σου να γίνω");
      inputData.push("");
      break;
    case 2:
      inputData.push("          C/G");
      inputData.push("This is a chord with a different bass");
      break;
    case 3:
      inputData.push("          Rem          Do    Sib/Fa");
      inputData.push("This is a test with Do Re Mi notation");
      break;
    case 4:
      inputData.push("[C]This is a [F]test with [G]inline chords");
      break;
    default:
      break;
  }
  return inputData;
}

function test() {
  let data = "";
  let duplicate = false;
  let inputData = [];
  let outputData = [];
  let semitones = 0;
  let testOptions = new Options();
  let value = "";

  function initTest(
    inputFormat,
    preferSharps,
    useTi,
    useSpecial,
    spaceBetween,
    compact,
    uppercase,
    outputFormat
  ) {
    testOptions.key = 0;
    testOptions.strict = true;
    testOptions.lowerIsMinor = false;
    testOptions.bracketsInput = "SQUARE";
    testOptions.bracketsOutput = "SQUARE";
    testOptions.inputFormat = inputFormat;
    testOptions.preferSharps = preferSharps;
    testOptions.useTi = useTi;
    testOptions.useSpecial = useSpecial;
    testOptions.spaceBetween = spaceBetween;
    testOptions.compact = compact;
    testOptions.uppercase = uppercase;
    testOptions.outputFormat = outputFormat;
    inputData = [];
  }

  // Test 1
  initTest("CDE", false, false, false, true, false, false, "CDE");
  inputData.push("C C# D D# E F F# G G# A A# B B# Cb Ebb C7b5");
  outputData = transpose(inputData, -1, testOptions).data;
  checkResult(
    "Test 1",
    "B C  Db D Eb E F Gb G Ab A Bb B Bb Db  B7b5",
    outputData.join("\n")
  );

  // Test 2
  initTest("CDE", true, false, false, true, false, false, "CDE");
  inputData.push("C C# D D# E F F# G G# A A# B");
  outputData = transpose(inputData, 1, testOptions).data;
  checkResult("Test 2", "C# D D# E F F# G G# A A# B C", outputData.join("\n"));

  // Test 3
  initTest("CDE", true, false, false, true, false, false, "DOREMI");
  inputData.push("C C# D D# E F F# G G# A A# B");
  outputData = transpose(inputData, 0, testOptions).data;
  checkResult(
    "Test 3",
    "Do Do# Re Re# Mi Fa Fa# Sol Sol# La La# Si",
    outputData.join("\n")
  );

  // Test 4
  initTest("DOREMI", true, false, false, true, false, false, "CDE");
  inputData.push(
    "Do Do# Re Re# Mi Fa Fa# Sol Sol# La La# Si FA SOL SOLb Mi# Mibb TI"
  );
  outputData = transpose(inputData, 0, testOptions).data;
  checkResult(
    "Test 4",
    "C  C#  D  D#  E  F  F#  G   G#   A  A#  B  F  G   F#   F   D    B",
    outputData.join("\n")
  );

  // Test 5
  initTest("DOREMI", true, false, false, false, false, false, "CDE");
  inputData.push("Rem LaRem SolFa SolbFaSol");
  outputData = transpose(inputData, 0, testOptions).data;
  checkResult("Test 5", "Dm  A Dm  G  F  F#  F G", outputData.join("\n"));

  // Test 6
  initTest("CDE", false, false, false, false, false, false, "CDE");
  inputData.push("Dm7/A Bb DmF");
  outputData = transpose(inputData, 2, testOptions).data;
  checkResult("Test 6", "Em7/B C  EmG", outputData.join("\n"));

  // Test 7
  initTest("INLINE", false, false, false, false, false, false, "CDE");
  inputData.push("This is a [Am]Test with [C/G]inline chords");
  outputData = transpose(inputData, -1, testOptions).data;
  checkResult(
    "Test 7",
    "          Abm       B/Gb\nThis is a Test with inline chords",
    outputData.join("\n")
  );

  // Test 8
  initTest("CDE", false, false, false, true, false, false, "GREEK");
  inputData.push("Dm/F C Cmaj7");
  outputData = transpose(inputData, 0, testOptions).data;
  checkResult("Test 8", "Ρε-/Φα Ντο+ Ντοmaj7", outputData.join("\n"));

  // Test 9
  initTest("GREEK", false, false, false, true, false, false, "CDE");
  inputData.push("Ρε-/Φα Ντο+ Σολ♭ Σολ7 ΝΤΟΣολb ΣΟΛ Ρεbb");
  outputData = transpose(inputData, 0, testOptions).data;
  checkResult(
    "Test 9",
    "Dm/F   C    Gb   G7   C  Gb   G   C",
    outputData.join("\n")
  );

  // Test 10
  initTest("CDE", false, false, false, true, false, true, "DOREMI");
  inputData.push("Bbm Ebm7");
  outputData = transpose(inputData, -2, testOptions).data;
  checkResult("Test 10", "LAbm REbm7", outputData.join("\n"));

  // Test 11
  initTest("GREEK", false, false, false, false, false, false, "ROMAN");
  inputData.push("Ρε-/Φα Σολ- ΛΑ7 ΛΑ-7 Ντο+");
  testOptions.key = 14; // Dm
  semitones = keyToSemitones(testOptions.key);
  outputData = transpose(inputData, semitones, testOptions).data;
  checkResult("Test 11", "i/3    iv   V7  v7   VII", outputData.join("\n"));

  // Test 12
  initTest("INLINE", false, false, true, false, false, false, "ROMAN");
  inputData.push("[F#]Inline [B]chords [C#7]to [Fdim]Roman [E#dim]notation");
  testOptions.key = 6; // F#
  semitones = keyToSemitones(testOptions.key);
  outputData = transpose(inputData, semitones, testOptions).data;
  checkResult(
    "Test 12",
    "I      IV     V7 vii°  vii°\nInline chords to Roman notation",
    outputData.join("\n")
  );

  // Test 13
  initTest("CDE", false, false, false, false, false, false, "INLINE");
  inputData.push("          Abm       B/Gb");
  inputData.push("This is a Test with inline chords");
  outputData = transpose(inputData, 1, testOptions).data;
  checkResult(
    "Test 13",
    "This is a [Am]Test with [C/G]inline chords",
    outputData.join("\n")
  );

  // Test 14
  initTest("CDE", false, false, false, false, false, false, "ROMAN");
  inputData.push("Am Bdim C Dm Em F G");
  testOptions.key = 21; // Am
  semitones = keyToSemitones(testOptions.key);
  outputData = transpose(inputData, semitones, testOptions).data;
  checkResult("Test 14", "i  ii°  III iv v VI VII", outputData.join("\n"));

  // Test 15
  initTest("CDE", false, false, false, false, false, false, "INLINE");
  inputData.push("C  F  G");
  inputData.push("C         G7");
  inputData.push("This is a Test with inline chords");
  outputData = transpose(inputData, 0, testOptions).data;
  checkResult(
    "Test 15",
    "[C][F][G]\n[C]This is a [G7]Test with inline chords",
    outputData.join("\n")
  );

  // Test 16
  initTest("INLINE", false, false, false, false, false, false, "INLINE");
  inputData.push("This is a [Am]Test with [C/G]inline chords");
  outputData = transpose(inputData, 2, testOptions).data;
  checkResult(
    "Test 16",
    "This is a [Bm]Test with [D/A]inline chords",
    outputData.join("\n")
  );

  // Test 17
  initTest("CDE", false, false, false, true, true, false, "CDE");
  inputData.push("Cdim Fmaj7 Aminor Dmi7 Aaug7");
  outputData = transpose(inputData, 0, testOptions).data;
  checkResult("Test 17", "C°   FM7   Am     Dm7  A+7", outputData.join("\n"));

  // Test 18
  initTest("INLINE", false, false, false, false, false, false, "INLINE");
  testOptions.bracketsInput = "ROUND";
  testOptions.bracketsOutput = "SQUARE";
  inputData.push("This is a (Am)Test with (C/G)inline chords");
  outputData = transpose(inputData, 3, testOptions).data;
  checkResult(
    "Test 18",
    "This is a [Cm]Test with [Eb/Bb]inline chords",
    outputData.join("\n")
  );

  // Test 19
  initTest("INLINE", false, false, false, false, true, false, "INLINE");
  testOptions.bracketsInput = "SQUARE";
  testOptions.bracketsOutput = "ROUND";
  inputData.push("This is a [Cmin]Test with [Eb/Bb]inline chords");
  outputData = transpose(inputData, -3, testOptions).data;
  checkResult(
    "Test 19",
    "This is a (Am)Test with (C/G)inline chords",
    outputData.join("\n")
  );

  // Test 20
  initTest("GERMAN1", false, false, false, true, false, false, "CDE");
  inputData.push(
    "C Cis Des D Dis Es E F Fis Ges G Gis As A Ais B H Ces His Eis Fes CisDesDDis Gm/B"
  );
  outputData = transpose(inputData, 0, testOptions).data;
  checkResult(
    "Test 20",
    "C Db  Db  D Eb  Eb E F Gb  Gb  G Ab  Ab A Bb  Bb B B  C   F   E   Db Db D Eb Gm/Bb",
    outputData.join("\n")
  );

  // Test 21
  initTest("GERMAN2", true, false, false, true, false, false, "CDE");
  inputData.push("C C# Db D D# Eb E F F# Gb G G# Ab A A# B H");
  outputData = transpose(inputData, 0, testOptions).data;
  checkResult(
    "Test 21",
    "C C# C# D D# D# E F F# F# G G# G# A A# A# B",
    outputData.join("\n")
  );

  // Test 22
  initTest("CDE", false, false, false, true, false, false, "CDE");
  testOptions.lowerIsMinor = true;
  inputData.push("C c bb def F f7 Csus4");
  outputData = transpose(inputData, -1, testOptions).data;
  checkResult(
    "Test 22",
    "B Bm Am Dbm Ebm Em E Em7 Bsus4",
    outputData.join("\n")
  );

  // Test 23
  // https://music.stackexchange.com/questions/73537/using-roman-numeral-notation-with-notes-in-the-bass-not-figured-bass
  initTest("ROMAN", true, false, false, true, false, false, "CDE");
  inputData.push("I ii IV iii III I/3 i/5 i°");
  testOptions.key = 2; // D
  semitones = -keyToSemitones(testOptions.key);
  outputData = transpose(inputData, semitones, testOptions).data;
  checkResult("Test 23", "D Em G  F#m F#  D/F# Dm/A D°", outputData.join("\n"));

  // Test 24
  initTest("CDE", false, false, false, false, false, false, "NASHVILLE");
  inputData.push("Am Bdim C Dm Em F G Am/C");
  testOptions.key = 21; // Am
  semitones = keyToSemitones(testOptions.key);
  outputData = transpose(inputData, semitones, testOptions).data;
  checkResult("Test 24", "1m 2°   3 4m 5m 6 7 1m/3", outputData.join("\n"));

  // Test 25
  initTest("NASHVILLE", true, false, false, true, false, false, "CDE");
  inputData.push("1 2m 4 3m 3 1/3 1m/5 b3 17");
  testOptions.key = 2; // D
  semitones = -keyToSemitones(testOptions.key);
  outputData = transpose(inputData, semitones, testOptions).data;
  checkResult("Test 25", "D Em G F#m F# D/F# Dm/A F D7", outputData.join("\n"));

  // Test 26
  initTest("NASHVILLE", false, false, false, true, false, false, "ROMAN");
  inputData.push("1 2m 4 3m 3 1/3 1m/5 b3");
  testOptions.key = 2; // D
  semitones = 0;
  outputData = transpose(inputData, semitones, testOptions).data;
  checkResult("Test 26", "I ii IV iii III I/3 i/5 bIII", outputData.join("\n"));

  // Test 27
  initTest("CDE", false, true, false, true, false, true, "DOREMI");
  inputData.push("C C# D D# E F F# G G# A A# B");
  outputData = transpose(inputData, 0, testOptions).data;
  checkResult(
    "Test 27",
    "DO REb RE MIb MI FA SOLb SOL LAb LA TIb TI",
    outputData.join("\n")
  );

  // Test 28
  data = "{title: This is a nice song}";
  checkResult(
    "Test 28",
    "title,This is a nice song",
    getDirective(data).name + "," + getDirective(data).value
  );

  // Test 29
  initTest("CDE", false, false, false, false, false, false, "INLINE");
  inputData.push("Dm Am");
  inputData.push("{comment: Play fast}");
  inputData.push("Dm        A7");
  inputData.push("Test with inline chords");
  outputData = transpose(inputData, 0, testOptions).data;
  checkResult(
    "Test 29",
    "[Dm][Am]\n{comment: Play fast}\n[Dm]Test with [A7]inline chords",
    outputData.join("\n")
  );

  // Test 30
  initTest("INLINE", false, false, false, false, false, false, "NOCHORDS");
  inputData.push("This is a [Am]Test with [C/G]inline chords");
  outputData = transpose(inputData, 2, testOptions).data;
  checkResult(
    "Test 30",
    "This is a Test with inline chords",
    outputData.join("\n")
  );

  // Test 31
  initTest("CDE", false, false, false, false, false, false, "NOCHORDS");
  inputData.push("Dm Am");
  inputData.push("{comment: Verse}");
  inputData.push("Dm        A7");
  inputData.push("Test is a test");
  outputData = transpose(inputData, 0, testOptions).data;
  checkResult(
    "Test 31",
    "{comment: Verse}\nTest is a test",
    outputData.join("\n")
  );

  checkResult(
    "Test 32",
    [0, 3, 7].toString(),
    MusicData.getInterval("m").toString()
  );

  checkResult(
    "Test 33",
    [0, 3, 10, 14, 17].toString(),
    MusicData.getInterval("m11OMIT5").toString()
  );

  checkResult(
    "Test 34",
    [0, 5, 7, 11].toString(),
    MusicData.getInterval("M7SUS4").toString()
  );

  // Test 35 (unique results in object MusicData.intervals)
  duplicate = false;
  const keys = Object.keys(MusicData.intervals);
  for (let i = 0; i < keys.length && !duplicate; i++) {
    value = MusicData.intervals[keys[i]].toString();
    for (let j = 0; j < keys.length && !duplicate; j++) {
      if (MusicData.intervals[keys[j]].toString() === value && j != i) {
        duplicate = true;
      }
    }
  }
  checkResult("Test 35", false, duplicate);

  checkResult(
    "Test 36",
    [0, 4, 7, 11].toString(),
    MusicData.getInterval("maj7").toString()
  );

  checkResult(
    "Test 37",
    [0, 3, 7].toString(),
    MusicData.getInterval("min").toString()
  );

  checkResult(
    "Test 38",
    [0, 3, 7, 10, 15].toString(),
    MusicData.getInterval("m7+9").toString()
  );

  // Extra test
  testOptions.key = 0;
  testOptions.inputFormat = "INLINE";
  testOptions.strict = true;
  testOptions.lowerIsMinor = false;
  testOptions.bracketsInput = "SQUARE";
  testOptions.bracketsOutput = "SQUARE";
  testOptions.preferSharps = false;
  testOptions.useTi = false;
  testOptions.useSpecial = false;
  testOptions.spaceBetween = true;
  testOptions.compact = false;
  testOptions.uppercase = false;
  testOptions.outputFormat = "CDE";
  inputData = createTestData(4);
  //console.log(inputData.join("\n"));
  outputData = transpose(inputData, 2, testOptions).data;
  //console.log(outputData.join("\n"));
}

test();
