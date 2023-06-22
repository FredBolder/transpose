class Options {
  constructor() {
    this.inputFormat = "CDE";
    this.key = 0;
    this.strict = true;
    this.lowerIsMinor = false;
    this.bracketsInput = "SQUARE";
    this.bracketsOutput = "SQUARE";
    this.preferSharps = false;
    this.useTi = false;
    this.useSpecial = false;
    this.spaceBetween = true;
    this.compact = false;
    this.uppercase = false;
    this.outputFormat = "CDE";
  }
}

export { Options };