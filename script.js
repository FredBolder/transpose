import { Options, keyToSemitones, transpose } from "./transpose.js";

function copyClicked() {
  let data = document.getElementById("output").value;
  navigator.clipboard.writeText(data);
}

function transposeClicked(semitones = null) {
  let inputData = [];
  let outputData = [];
  let options = new Options();
  options.inputFormat = document.getElementById("inputFormat").value;
  options.strict = document.getElementById("strict").checked;
  options.lowerIsMinor = document.getElementById("lowerIsMinor").checked;
  options.bracketsInput = document.getElementById("bracketsInput").value;
  options.bracketsOutput = document.getElementById("bracketsOutput").value;
  options.preferSharps = document.getElementById("useSharps").checked;
  options.useTi = document.getElementById("useTi").checked;
  options.useSpecial = document.getElementById("useSpecial").checked;
  options.spaceBetween = document.getElementById("spaceBetween").checked;
  options.compact = document.getElementById("compact").checked;
  options.uppercase = document.getElementById("uppercase").checked;
  options.outputFormat = document.getElementById("outputFormat").value;
  let data = document.getElementById("input").value;
  inputData = data.split("\n");
  options.key = parseInt(document.getElementById("key").value);
  if (semitones === null) {
    semitones = parseInt(document.getElementById("semitones").value);
  }
  if (
    options.outputFormat === "ROMAN" ||
    options.outputFormat === "NASHVILLE"
  ) {
    semitones = keyToSemitones(options.key);
  }
  if (options.inputFormat === "ROMAN" || options.inputFormat === "NASHVILLE") {
    semitones = -keyToSemitones(options.key);
  }
  if (
    (options.outputFormat === "ROMAN" ||
      options.outputFormat === "NASHVILLE") &&
    (options.inputFormat === "ROMAN" || options.inputFormat === "NASHVILLE")
  ) {
    semitones = 0;
  }
  outputData = transpose(inputData, semitones, options);
  document.getElementById("output").value = outputData.join("\n");
}

function downClicked() {
  const semitonesElement = document.getElementById("semitones");
  let semitones = parseInt(semitonesElement.value);
  if (semitones > -11) {
    semitones--;
    semitonesElement.value = semitones.toString();
    transposeClicked(semitones);
  }
}

function upClicked() {
  const semitonesElement = document.getElementById("semitones");
  let semitones = parseInt(semitonesElement.value);
  if (semitones < 11) {
    semitones++;
    semitonesElement.value = semitones.toString();
    transposeClicked(semitones);
  }
}

export { copyClicked, transposeClicked, downClicked, upClicked };
