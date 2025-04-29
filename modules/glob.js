class Glob {
  static lastChord;
  static lastChordIdx;
  static scrollID;
  static scrollInterval;
  static settings;
  static tuningGain;
  static tuningOscillator;
  static ukuleleFrets;
  static ukuleleLeftHanded;
  static ukuleleTuning;
  static ukuleleTuningStatus;
  static ukuleleVariation;

  static init() {
    this.lastChord = [];
    this.lastChordIdx = 0;
    this.scrollID = null;
    this.scrollInterval = 200;
    this.settings = null;
    this.tuningGain = null;
    this.tuningOscillator = null;
    this.ukuleleFrets = [];
    this.ukuleleLeftHanded = false;
    this.ukuleleTuning = "G4-C4-E4-A4";
    this.ukuleleTuningStatus = 0;
    this.ukuleleVariation = 0;
  }

  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static removeChars(input, chars) {
    let result = "";
    for (let i = 0; i < input.length; i++) {
      if (!chars.includes(input[i])) {
        result += input[i];
      }
    }
    return result;
  }

  static tryParseInt(str, defaultValue) {
    let result = defaultValue;
    if (str !== null) {
      if (str.length > 0) {
        if (!isNaN(str)) {
          result = parseInt(str);
        }
      }
    }
    return result;
  }
}

export { Glob };
