class Settings {
  constructor() {
    this.bracketsInput = document.getElementById("bracketsInput");
    this.bracketsOutput = document.getElementById("bracketsOutput");
    this.btScroll = document.getElementById("btScroll");
    this.chordsIsBold = document.getElementById("chordsBold");
    this.commentType = document.getElementById("commentType");
    this.compact = document.getElementById("compact");
    this.drop = document.getElementById("drop");
    this.exportFormat = document.getElementById("exportFormat")
    this.groupKey = document.getElementById("groupKey");
    this.guitar = document.getElementById("guitar");
    this.guitarVariation = document.getElementById("guitarVariation");
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
    this.simplifyChords = document.getElementById("simplifyChords");
    this.textSize = document.getElementById("textSize");
    this.theme = document.getElementById("theme");
    this.ukulele = document.getElementById("ukulele");
    this.ukuleleFilter = document.getElementById("ukuleleFilter");
    this.ukuleleVariation = document.getElementById("ukuleleVariation");
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
    options.simplifyChords = this.simplifyChords.checked;
    options.uppercase = this.uppercase.checked;
    options.useSpecial = this.useSpecial.checked;
    options.useTi = this.useTi.checked;
  }
}

export { Settings };
