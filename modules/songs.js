class Songs {
  static numberOfSongs() {
    return 1;
  }

  static loadSong(n) {
    let inputData = [];
    switch (n) {
      case 1:
        inputData.push("{chordcolour: red}");
        inputData.push("{title: Μήλο μου κόκκινο}");
        inputData.push("{comment_italic: Καλαματιανός}");
        inputData.push("");
        inputData.push("C  F  C  G  C  F  C");
        inputData.push("Intro");
        inputData.push("");
        inputData.push("C                  F        C");
        inputData.push("Μήλο μου κόκκινο, ρόιδο βαμμένο  (2x)");
        inputData.push("C         G                 C");
        inputData.push("γιατί με μάρανες, τον πικραμένο  (2x)");
        inputData.push("");
        inputData.push("C                    F         C");
        inputData.push("Πηγαίνω κι έρχομαι, μα δε σε βρίσκω  (2x)");
        inputData.push("C           G                C");
        inputData.push("Βρίσκω την πόρτα σου μανταλωμένη");
        inputData.push("C       G                 C");
        inputData.push("τα παραθύρια σου φεγγοβολούνε");
        inputData.push("");
        inputData.push("C                     F           C");
        inputData.push("Ρωτώ την πόρτα σου, πού είν’ η κυρά σου  (2x)");
        inputData.push("C            G                     C");
        inputData.push("Κυρά μ’ δεν είναι ’δω, πάησε στη βρύση");
        inputData.push("C           G                 C");
        inputData.push("πάησε να πιει νερό και να γιομίσει");
        break;
      case 2:
        inputData.push("TEST");
        break;
      default:
        break;
    }
    return inputData;
  }
}

export { Songs };
