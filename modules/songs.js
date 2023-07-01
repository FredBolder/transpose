class Songs {
  static numberOfSongs() {
    return 4;
  }

  static loadSong(n) {
    let inputData = [];
    switch (n) {
      case 0:
        inputData.push("INDEX");
        inputData.push("");
        inputData.push("001 Μήλο μου κόκκινο");
        inputData.push("002 Happy Birthday");
        inputData.push("003 Χρόνια πολλά");
        inputData.push("004 Silent night");
        break;
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
        inputData.push("{title: Happy Birthday}");
        inputData.push("");
        inputData.push("      A           E");
        inputData.push("Happy Birthday to you");
        inputData.push("      E           A");
        inputData.push("Happy Birthday to you");
        inputData.push("      A7             D");
        inputData.push("Happy Birthday dear (name)");
        inputData.push("      A        E    A");
        inputData.push("Happy Birthday to you");
        break;
      case 3:
        inputData.push("{title: Χρόνια πολλά}");
        inputData.push("");
        inputData.push("{chordcolour: deeppink}");
        inputData.push("{comment: Birthday woman/girl}");
        inputData.push("    D                  Em");
        inputData.push("Να ζήσεις (name) και χρόνια πολλά,");
        inputData.push("   Em               A7         D");
        inputData.push("μεγάλη να γίνεις με άσπρα μαλλιά");
        inputData.push("     D                     Em");
        inputData.push("Παντού να σκορπίζεις της γνώσης το φως");
        inputData.push("    Em               A7    D");
        inputData.push("και όλοι να λένε να μία σοφός");
        inputData.push("");
        inputData.push("{chordcolour: blue}");
        inputData.push("{comment: Birthday man/boy}");
        inputData.push("    D                  Em");
        inputData.push("Να ζήσεις (name) και χρόνια πολλά,");
        inputData.push("   Em                A7         D");
        inputData.push("μεγάλος να γίνεις με άσπρα μαλλιά");
        inputData.push("     D                     Em");
        inputData.push("Παντού να σκορπίζεις της γνώσης το φως");
        inputData.push("    Em              A7      D");
        inputData.push("και όλοι να λένε να ένας σοφός");
        break;
      case 4:
        inputData.push("{chordcolour: green}");
        inputData.push("{title: Silent night}");
        inputData.push("");
        inputData.push("{comment: Verse 1}");
        inputData.push("C");
        inputData.push("Silent night, holy night,");
        inputData.push("G7           C");
        inputData.push("All is calm, all is bright");
        inputData.push("F                C");
        inputData.push("Round yon virgin mother and child.");
        inputData.push("F              C");
        inputData.push("Holy infant so tender and mild,");
        inputData.push("G7                C");
        inputData.push("Sleep in heavenly peace,");
        inputData.push("C        G7       C");
        inputData.push("Sleep in heavenly peace.");
        inputData.push("");
        inputData.push("{comment: Verse 2}");
        inputData.push("C");
        inputData.push("Silent night, holy night,");
        inputData.push("G7              C");
        inputData.push("Shepherds quake at the sight,");
        inputData.push("F                   C");
        inputData.push("Glories stream from heaven afar.");
        inputData.push("F                   C");
        inputData.push("Heavenly hosts sing alleluia;");
        inputData.push("G7                    C");
        inputData.push("Christ the Savior, is born!");
        inputData.push("C          G7         C");
        inputData.push("Christ the Savior, is born!");
        inputData.push("");
        inputData.push("{comment: Verse 3}");
        inputData.push("C");
        inputData.push("Silent night, holy night,");
        inputData.push("G7          C");
        inputData.push("Son of God, love's pure light");
        inputData.push("F                      C");
        inputData.push("Radiant beams from thy holy face.");
        inputData.push("F                  C");
        inputData.push("With the dawn of redeeming grace,");
        inputData.push("G7                  C");
        inputData.push("Jesus, Lord, at thy birth,");
        inputData.push("C      G7           C");
        inputData.push("Jesus, Lord, at thy birth.");
        break;
      default:
        break;
    }
    return inputData;
  }
}

export { Songs };
