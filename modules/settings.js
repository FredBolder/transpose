class Settings {
  constructor() {
    this.bracketsInput = document.getElementById("bracketsInput");
    this.bracketsOutput = document.getElementById("bracketsOutput");
    this.chordsIsBold = document.getElementById("chordsBold");
    this.commentType = document.getElementById("commentType");
    this.compact = document.getElementById("compact");
    this.exportFormat = document.getElementById("exportFormat")
    this.groupKey = document.getElementById("groupKey");
    this.ignoreColors = document.getElementById("ignoreColors");
    this.inputArea = document.getElementById("input");
    this.inputChordInfo = document.getElementById("inputChordInfo")
    this.inputFormat = document.getElementById("inputFormat");
    this.interval = document.getElementById("interval");
    this.key = document.getElementById("key");
    this.keyboard = document.getElementById("keyboard");
    this.lowerIsMinor = document.getElementById("lowerIsMinor");
    this.numberOfChords = document.getElementById("numberOfChords");
    this.outputArea = document.getElementById("output");
    this.outputChordInfo = document.getElementById("outputChordInfo")
    this.outputFormat = document.getElementById("outputFormat");
    this.position = document.getElementById("position");
    this.preferSharps = document.getElementById("useSharps");
    this.semitones = document.getElementById("semitones");
    this.spaceBetween = document.getElementById("spaceBetween");
    this.strict = document.getElementById("strict");
    this.textSize = document.getElementById("textSize");
    this.theme = document.getElementById("theme");
    this.uppercase = document.getElementById("uppercase");
    this.useSpecial = document.getElementById("useSpecial");
    this.useTi = document.getElementById("useTi");
  }
  
  saveToOptions(options) {
    options.bracketsInput = this.bracketsInput.value;
    options.bracketsOutput = this.bracketsOutput.value;
    options.compact = this.compact.checked;
    options.inputFormat = this.inputFormat.value;
    options.key = parseInt(this.key.value);
    options.lowerIsMinor = this.lowerIsMinor.checked;
    options.outputFormat = this.outputFormat.value;
    options.preferSharps = this.preferSharps.checked;
    options.spaceBetween = this.spaceBetween.checked;
    options.strict = this.strict.checked;
    options.uppercase = this.uppercase.checked;
    options.useSpecial = this.useSpecial.checked;
    options.useTi = this.useTi.checked;
  }
}

export { Settings };
