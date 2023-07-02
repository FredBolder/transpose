class Songs {
  static numberOfSongs() {
    return 8;
  }

  static loadSong(n) {
    function weWishYou() {
      inputData.push("   G                C");
      inputData.push("We wish you a merry Christmas");
      inputData.push("   A                D");
      inputData.push("We wish you a merry Christmas");
      inputData.push("   B7               Em");
      inputData.push("We wish you a merry Christmas");
      inputData.push("      C     D   G");
      inputData.push("and a happy new year");
    }

    function goodTidings() {
      inputData.push("     G          D        Em           D");
      inputData.push("Good tidings we bring to you and your kin");
      inputData.push("   G                Bm              C     D   G");
      inputData.push("We wish you a merry Christmas and a happy new year");
    }

    let inputData = [];
    switch (n) {
      case 0:
        inputData.push("INDEX");
        inputData.push("");
        inputData.push("001 Μήλο μου κόκκινο");
        inputData.push("002 Happy Birthday");
        inputData.push("003 Χρόνια πολλά (Greek birthday song)");
        inputData.push("004 Silent night");
        inputData.push("005 Greensleeves");
        inputData.push("006 We wish you a merry Christmas");
        inputData.push("007 Slaap, kindje slaap (Dutch lullaby)");
        inputData.push("008 Του γάμου (Greek wedding song)");
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
        inputData.push("Γιατί με μάρανες, τον πικραμένο  (2x)");
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
        inputData.push("{comment_italic: Greek birthday song}");
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
        inputData.push("{comment: Verse 1:}");
        inputData.push("C");
        inputData.push("Silent night, holy night");
        inputData.push("G7           C");
        inputData.push("All is calm, all is bright");
        inputData.push("F                C");
        inputData.push("Round yon virgin mother and child");
        inputData.push("F              C");
        inputData.push("Holy infant so tender and mild");
        inputData.push("G7                C");
        inputData.push("Sleep in heavenly peace");
        inputData.push("C        G7       C");
        inputData.push("Sleep in heavenly peace");
        inputData.push("");
        inputData.push("{comment: Verse 2:}");
        inputData.push("C");
        inputData.push("Silent night, holy night");
        inputData.push("G7              C");
        inputData.push("Shepherds quake at the sight");
        inputData.push("F                   C");
        inputData.push("Glories stream from heaven afar");
        inputData.push("F                   C");
        inputData.push("Heavenly hosts sing alleluia");
        inputData.push("G7                    C");
        inputData.push("Christ the Savior, is born!");
        inputData.push("C          G7         C");
        inputData.push("Christ the Savior, is born!");
        inputData.push("");
        inputData.push("{comment: Verse 3:}");
        inputData.push("C");
        inputData.push("Silent night, holy night");
        inputData.push("G7          C");
        inputData.push("Son of God, love's pure light");
        inputData.push("F                      C");
        inputData.push("Radiant beams from thy holy face");
        inputData.push("F                  C");
        inputData.push("with the dawn of redeeming grace");
        inputData.push("G7                  C");
        inputData.push("Jesus, Lord, at thy birth");
        inputData.push("C      G7           C");
        inputData.push("Jesus, Lord, at thy birth");
        break;
      case 5:
        inputData.push("{chordcolour: green}");
        inputData.push("{title: Greensleeves}");
        inputData.push("");
        inputData.push("{comment: Verse 1:}");
        inputData.push(" Am     C         G     Em");
        inputData.push("Alas my love, you do me wrong,");
        inputData.push("   Am             E");
        inputData.push("to cast me off discourteously.");
        inputData.push("    Am     C         G        Em");
        inputData.push("For I have loved you well and long,");
        inputData.push("  Am       E7      Am");
        inputData.push("delighting in your company.");
        inputData.push("");
        inputData.push("{comment: Chorus:}");
        inputData.push("C                G      Em");
        inputData.push("Greensleeves was all my joy,");
        inputData.push("Am               E");
        inputData.push("Greensleeves was my delight,");
        inputData.push("C                   G        Em");
        inputData.push("Greensleeves was my heart of gold,");
        inputData.push("    Am         E7   Am");
        inputData.push("and who but my lady Greensleeves.");
        inputData.push("");
        inputData.push("{comment: Verse 2:}");
        inputData.push("  Am        C     G       Em");
        inputData.push("I have been ready at your hand");
        inputData.push("   Am             E");
        inputData.push("to grant whatever you would crave.");
        inputData.push("  Am        C       G        Em");
        inputData.push("I have both wagered life and land,");
        inputData.push("     Am       E7        Am");
        inputData.push("your love and good-will for to have.");
        inputData.push("");
        inputData.push("{comment: Chorus}");
        inputData.push("");
        inputData.push("{comment: Verse 3:}");
        inputData.push("      Am     C       G      Em");
        inputData.push("Well, I will pray to God on high,");
        inputData.push("     Am              E");
        inputData.push("that thou my constancy mayst see,");
        inputData.push("    Am       C      G      Em");
        inputData.push("and that yet once before I die,");
        inputData.push("     Am        E7      Am");
        inputData.push("thou wilt vouchsafe to love me.");
        inputData.push("");
        inputData.push("{comment: Chorus}");
        break;
      case 6:
        inputData.push("{chordcolour: green}");
        inputData.push("{title: We wish you a merry Christmas}");
        inputData.push("");
        weWishYou();
        inputData.push("");
        goodTidings();
        inputData.push("");
        inputData.push("    G                   C");
        inputData.push("Oh, bring us some figgy pudding");
        inputData.push("    A                   D");
        inputData.push("Oh, bring us some figgy pudding");
        inputData.push("    B7                  Em");
        inputData.push("Oh, bring us some figgy pudding");
        inputData.push("    C        D     G");
        inputData.push("and bring it right here");
        inputData.push("");
        goodTidings();
        inputData.push("");
        inputData.push("   G                 C");
        inputData.push("We won't go until we get some");
        inputData.push("   A                 D");
        inputData.push("We won't go until we get some");
        inputData.push("   B7                Em");
        inputData.push("We won't go until we get some,");
        inputData.push("   C        D     G");
        inputData.push("so bring it right here");
        inputData.push("");
        goodTidings();
        inputData.push("");
        inputData.push("   G                  C");
        inputData.push("We all like our figgy pudding");
        inputData.push("   A                  D");
        inputData.push("We all like our figgy pudding");
        inputData.push("   B7                 Em");
        inputData.push("We all like our figgy pudding");
        inputData.push("     C       D    G");
        inputData.push("with all its good cheers");
        inputData.push("");
        goodTidings();
        inputData.push("");
        weWishYou();
        break;
      case 7:
        inputData.push("{title: Slaap, kindje slaap}");
        inputData.push("{comment_italic: Dutch lullaby}");
        inputData.push("");
        inputData.push("G      D7     G");
        inputData.push("Slaap, kindje slaap.");
        inputData.push("            D7        G");
        inputData.push("Daar buiten loopt een schaap.");
        inputData.push("                     C");
        inputData.push("Een schaap met witte voetjes,");
        inputData.push("    G                   D7");
        inputData.push("die drinkt zijn melk zo zoetjes.");
        inputData.push("G      D7     G");
        inputData.push("Slaap, kindje slaap.");
        inputData.push("C    G       D7       G");
        inputData.push("Daar buiten loopt een schaap.");
        break;
      case 8:
        inputData.push("{title: Του γάμου}");
        inputData.push("{comment_italic: Greek wedding song}");
        inputData.push("");
        inputData.push(" D");
        inputData.push("Σήμερα γά-, σήμερα γάμος γίνεται");
        inputData.push("      G       D         A       D");
        inputData.push("Σ’ ωραίο περιβόλι σ' ωραίο περιβόλι  2x");
        inputData.push(" ");
        inputData.push(" D");
        inputData.push("Σήμερα απο-, σήμερα αποχωρίζεται");
        inputData.push("   G            D       A            D");
        inputData.push("Η μάνα από την κόρη, η μάνα από την κόρη  2x");
        inputData.push(" ");
        inputData.push(" D");
        inputData.push("Γαμπρέ τη νύ-, γαμπρέ τη νύφη ν' αγαπάς");
        inputData.push("    G          D          A          D");
        inputData.push("να μην τήνε μαλώνεις, να μην τήνε μαλώνεις  2x");
        inputData.push(" ");
        inputData.push(" D");
        inputData.push("Σαν το βασι-, σαν το βασιλικό στη γη");
        inputData.push(" G           D          A        D");
        inputData.push("να τήνε καμαρώνεις, να τήνε καμαρώνεις  2x");
        inputData.push(" ");
        inputData.push(" D");
        inputData.push("Σήκω περή, σήκω περήφανε αητέ");
        inputData.push(" G               D        A             D");
        inputData.push("κι άνοιξε τα φτερά σου κι άνοιξε τα φτερά σου  2x");
        inputData.push(" ");
        inputData.push(" D");
        inputData.push("Να πεταχτεί, να πεταχτεί η πέρδικα");
        inputData.push("  G                  D        A                  D");
        inputData.push(
          "που 'χεις στην αγκαλιά σου, που 'χεις στην αγκαλιά σου  2x"
        );
        break;
      default:
        break;
    }
    return inputData;
  }
}

export { Songs };
