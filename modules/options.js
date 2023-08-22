class Options {
  constructor() {
    this.bracketsInput = "SQUARE";
    this.bracketsOutput = "SQUARE";
    this.compact = false;
    this.inputFormat = "CDE";
    this.key = 0;
    this.lowerIsMinor = false;
    this.outputFormat = "CDE";
    this.preferSharps = false;
    this.spaceBetween = true;
    this.strict = true;
    this.simplifyChords = false;
    this.useSpecial = false;
    this.useTi = false;
    this.uppercase = false;
  }
}

export { Options };