class Songs {
  static shown = [-1, -1, -1, -1, -1];
  static shownIndex = 0;

  static numberOfSongs() {
    return 12;
  }

  static recentlyShow(n) {
    return this.shown.includes(n);
  }

  static loadSong(n) {
    this.shown[this.shownIndex] = n;
    this.shownIndex++;
    if (this.shownIndex >= this.shown.length) {
      this.shownIndex = 0;
    }
    //console.log(this.shown);

    let d = [];

    function weWishYou() {
      d.push("   G                C");
      d.push("We wish you a merry Christmas");
      d.push("   A                D");
      d.push("We wish you a merry Christmas");
      d.push("   B7               Em");
      d.push("We wish you a merry Christmas");
      d.push("      C     D   G");
      d.push("and a happy new year");
    }

    function goodTidings() {
      d.push("     G          D        Em           D");
      d.push("Good tidings we bring to you and your kin");
      d.push("   G                Bm              C     D   G");
      d.push("We wish you a merry Christmas and a happy new year");
    }

    switch (n) {
      case 0:
        d.push("INDEX");
        d.push("");
        d.push("001 Μήλο μου κόκκινο (Greek folk song)");
        d.push("002 Happy Birthday");
        d.push("003 Χρόνια πολλά (Greek birthday song)");
        d.push("004 Silent night");
        d.push("005 Greensleeves");
        d.push("006 We wish you a merry Christmas");
        d.push("007 Slaap, kindje slaap (Dutch lullaby)");
        d.push("008 Σήμερα γάμος γίνεται (Greek wedding song)");
        d.push("009 Ωραία που ‘ναι η νύφη μας (Greek wedding song)");
        d.push("010 Are you lonesome tonight?");
        d.push("011 Yes sir, that's my baby");
        d.push("012 Ένας αϊτός (Greek folk song)");
        break;
      case 1:
        d.push("{chordcolour: red}");
        d.push("{title: Μήλο μου κόκκινο}");
        d.push("{comment_italic: Καλαματιανός}");
        d.push("");
        d.push("C  F  C  G  C  F  C");
        d.push("Intro");
        d.push("");
        d.push("C                  F        C");
        d.push("Μήλο μου κόκκινο, ρόιδο βαμμένο  (2x)");
        d.push("C         G                 C");
        d.push("Γιατί με μάρανες, τον πικραμένο  (2x)");
        d.push("");
        d.push("C                    F         C");
        d.push("Πηγαίνω κι έρχομαι, μα δε σε βρίσκω  (2x)");
        d.push("C           G                C");
        d.push("Βρίσκω την πόρτα σου μανταλωμένη");
        d.push("C       G                 C");
        d.push("τα παραθύρια σου φεγγοβολούνε");
        d.push("");
        d.push("C                     F           C");
        d.push("Ρωτώ την πόρτα σου, πού είν’ η κυρά σου  (2x)");
        d.push("C            G                     C");
        d.push("Κυρά μ’ δεν είναι ’δω, πάησε στη βρύση");
        d.push("C           G                 C");
        d.push("πάησε να πιει νερό και να γιομίσει");
        break;
      case 2:
        d.push("{title: Happy Birthday}");
        d.push("");
        d.push("      A           E");
        d.push("Happy Birthday to you");
        d.push("      E           A");
        d.push("Happy Birthday to you");
        d.push("      A7             D");
        d.push("Happy Birthday dear (name)");
        d.push("      A        E    A");
        d.push("Happy Birthday to you");
        break;
      case 3:
        d.push("{title: Χρόνια πολλά}");
        d.push("{comment_italic: Greek birthday song}");
        d.push("");
        d.push("{chordcolour: deeppink}");
        d.push("{comment: Birthday woman/girl}");
        d.push("    D                  Em");
        d.push("Να ζήσεις (name) και χρόνια πολλά,");
        d.push("   Em               A7         D");
        d.push("μεγάλη να γίνεις με άσπρα μαλλιά");
        d.push("     D                     Em");
        d.push("Παντού να σκορπίζεις της γνώσης το φως");
        d.push("    Em               A7    D");
        d.push("και όλοι να λένε να μία σοφός");
        d.push("");
        d.push("{chordcolour: blue}");
        d.push("{comment: Birthday man/boy}");
        d.push("    D                  Em");
        d.push("Να ζήσεις (name) και χρόνια πολλά,");
        d.push("   Em                A7         D");
        d.push("μεγάλος να γίνεις με άσπρα μαλλιά");
        d.push("     D                     Em");
        d.push("Παντού να σκορπίζεις της γνώσης το φως");
        d.push("    Em              A7      D");
        d.push("και όλοι να λένε να ένας σοφός");
        break;
      case 4:
        d.push("{chordcolour: green}");
        d.push("{title: Silent night}");
        d.push("");
        d.push("{comment: Verse 1:}");
        d.push("C");
        d.push("Silent night, holy night");
        d.push("G7           C");
        d.push("All is calm, all is bright");
        d.push("F                C");
        d.push("Round yon virgin mother and child");
        d.push("F              C");
        d.push("Holy infant so tender and mild");
        d.push("G7                C");
        d.push("Sleep in heavenly peace");
        d.push("C        G7       C");
        d.push("Sleep in heavenly peace");
        d.push("");
        d.push("{comment: Verse 2:}");
        d.push("C");
        d.push("Silent night, holy night");
        d.push("G7              C");
        d.push("Shepherds quake at the sight");
        d.push("F                   C");
        d.push("Glories stream from heaven afar");
        d.push("F                   C");
        d.push("Heavenly hosts sing alleluia");
        d.push("G7                    C");
        d.push("Christ the Savior, is born!");
        d.push("C          G7         C");
        d.push("Christ the Savior, is born!");
        d.push("");
        d.push("{comment: Verse 3:}");
        d.push("C");
        d.push("Silent night, holy night");
        d.push("G7          C");
        d.push("Son of God, love's pure light");
        d.push("F                      C");
        d.push("Radiant beams from thy holy face");
        d.push("F                  C");
        d.push("with the dawn of redeeming grace");
        d.push("G7                  C");
        d.push("Jesus, Lord, at thy birth");
        d.push("C      G7           C");
        d.push("Jesus, Lord, at thy birth");
        break;
      case 5:
        d.push("{chordcolour: green}");
        d.push("{title: Greensleeves}");
        d.push("");
        d.push("{comment: Verse 1:}");
        d.push(" Am     C         G     Em");
        d.push("Alas my love, you do me wrong,");
        d.push("   Am             E");
        d.push("to cast me off discourteously.");
        d.push("    Am     C         G        Em");
        d.push("For I have loved you well and long,");
        d.push("  Am       E7      Am");
        d.push("delighting in your company.");
        d.push("");
        d.push("{comment: Chorus:}");
        d.push("C                G      Em");
        d.push("Greensleeves was all my joy,");
        d.push("Am               E");
        d.push("Greensleeves was my delight,");
        d.push("C                   G        Em");
        d.push("Greensleeves was my heart of gold,");
        d.push("    Am         E7   Am");
        d.push("and who but my lady Greensleeves.");
        d.push("");
        d.push("{comment: Verse 2:}");
        d.push("  Am        C     G       Em");
        d.push("I have been ready at your hand");
        d.push("   Am             E");
        d.push("to grant whatever you would crave.");
        d.push("  Am        C       G        Em");
        d.push("I have both wagered life and land,");
        d.push("     Am       E7        Am");
        d.push("your love and good-will for to have.");
        d.push("");
        d.push("{comment: Chorus}");
        d.push("");
        d.push("{comment: Verse 3:}");
        d.push("      Am     C       G      Em");
        d.push("Well, I will pray to God on high,");
        d.push("     Am              E");
        d.push("that thou my constancy mayst see,");
        d.push("    Am       C      G      Em");
        d.push("and that yet once before I die,");
        d.push("     Am        E7      Am");
        d.push("thou wilt vouchsafe to love me.");
        d.push("");
        d.push("{comment: Chorus}");
        break;
      case 6:
        d.push("{chordcolour: green}");
        d.push("{title: We wish you a merry Christmas}");
        d.push("");
        weWishYou();
        d.push("");
        goodTidings();
        d.push("");
        d.push("    G                   C");
        d.push("Oh, bring us some figgy pudding");
        d.push("    A                   D");
        d.push("Oh, bring us some figgy pudding");
        d.push("    B7                  Em");
        d.push("Oh, bring us some figgy pudding");
        d.push("    C        D     G");
        d.push("and bring it right here");
        d.push("");
        goodTidings();
        d.push("");
        d.push("   G                 C");
        d.push("We won't go until we get some");
        d.push("   A                 D");
        d.push("We won't go until we get some");
        d.push("   B7                Em");
        d.push("We won't go until we get some,");
        d.push("   C        D     G");
        d.push("so bring it right here");
        d.push("");
        goodTidings();
        d.push("");
        d.push("   G                  C");
        d.push("We all like our figgy pudding");
        d.push("   A                  D");
        d.push("We all like our figgy pudding");
        d.push("   B7                 Em");
        d.push("We all like our figgy pudding");
        d.push("     C       D    G");
        d.push("with all its good cheers");
        d.push("");
        goodTidings();
        d.push("");
        weWishYou();
        break;
      case 7:
        d.push("{title: Slaap, kindje slaap}");
        d.push("{comment_italic: Dutch lullaby}");
        d.push("");
        d.push("G      D7     G");
        d.push("Slaap, kindje slaap.");
        d.push("            D7        G");
        d.push("Daar buiten loopt een schaap.");
        d.push("                     C");
        d.push("Een schaap met witte voetjes,");
        d.push("    G                   D7");
        d.push("die drinkt zijn melk zo zoetjes.");
        d.push("G      D7     G");
        d.push("Slaap, kindje slaap.");
        d.push("C    G      D7        G");
        d.push("Daar buiten loopt een schaap.");
        break;
      case 8:
        d.push("{title: Σήμερα γάμος γίνεται}");
        d.push("{comment_italic: Greek wedding song}");
        d.push("");
        d.push(" D");
        d.push("Σήμερα γά-, σήμερα γάμος γίνεται");
        d.push("      G       D         A       D");
        d.push("Σ’ ωραίο περιβόλι σ' ωραίο περιβόλι  2x");
        d.push(" ");
        d.push(" D");
        d.push("Σήμερα απο-, σήμερα αποχωρίζεται");
        d.push("   G            D       A            D");
        d.push("Η μάνα από την κόρη, η μάνα από την κόρη  2x");
        d.push(" ");
        d.push(" D");
        d.push("Γαμπρέ τη νύ-, γαμπρέ τη νύφη ν' αγαπάς");
        d.push("    G          D          A          D");
        d.push("να μην τήνε μαλώνεις, να μην τήνε μαλώνεις  2x");
        d.push(" ");
        d.push(" D");
        d.push("Σαν το βασι-, σαν το βασιλικό στη γη");
        d.push(" G           D          A        D");
        d.push("να τήνε καμαρώνεις, να τήνε καμαρώνεις  2x");
        d.push(" ");
        d.push(" D");
        d.push("Σήκω περή, σήκω περήφανε αητέ");
        d.push(" G               D        A             D");
        d.push("κι άνοιξε τα φτερά σου κι άνοιξε τα φτερά σου  2x");
        d.push(" ");
        d.push(" D");
        d.push("Να πεταχτεί, να πεταχτεί η πέρδικα");
        d.push("  G                  D        A                  D");
        d.push("που 'χεις στην αγκαλιά σου, που 'χεις στην αγκαλιά σου  2x");
        break;
      case 9:
        d.push("{title: Ωραία που ‘ναι η νύφη μας}");
        d.push("{comment_italic: Greek wedding song}");
        d.push("");
        d.push("   G                          D           G");
        d.push("Ωραία που ‘ναι η νύφη μας, ωραία τα προικιά της");
        d.push(" G   D G");
        d.push("Instrumental");
        d.push("   F          C           D           G");
        d.push("Ωραία κι η παρέα της που κάνει την χαρά της  2x");
        d.push("");
        d.push("  G                      D          G");
        d.push("Ένα τραγούδι θα σας πω απάνω στο κεράσι");
        d.push(" G   D G");
        d.push("Instrumental");
        d.push("       F         C         D          G");
        d.push("Τ’ ανδρόγυνο που έγινε να ζήσει να γεράσει  2x");
        d.push("");
        d.push("  G                      D          G");
        d.push("Ένα τραγούδι θα σας πω απάνω στο ρεβίθι");
        d.push(" G   D G");
        d.push("Instrumental");
        d.push("   F             C               D           G");
        d.push("Χαρά στα μάτια του γαμπρού που διάλεξαν την νύφη  2x");
        d.push("");
        d.push("  G                       D          G");
        d.push("Ένα τραγούδι θα σας πώ, απάνω στο λεμόνι");
        d.push(" G   D G");
        d.push("Instrumental");
        d.push("    F              C                D         G");
        d.push("Να ζήσει η νύφη κι ο γαμπρός κι οι συμπεθέροι όλοι  2x");
        break;
      case 10:
        d.push("{title: Are you lonesome tonight?}");
        d.push("");
        d.push("Dm  G7  C  G7");
        d.push("");
        d.push("        C          Em            Am");
        d.push("Are you lonesome tonight, do you miss me tonight?");
        d.push("        C        C7       F");
        d.push("Are you sorry we drifted apart?");
        d.push("          G                 G7");
        d.push("Does your memory stray to a brighter summer day");
        d.push("       G7                             C");
        d.push("When I kissed you and called you sweetheart?");
        d.push("       C7                         F");
        d.push("Do the chairs in your parlor seem empty and bare?");
        d.push("       D                         Dm         G");
        d.push("Do you gaze at your doorstep and picture me there?");
        d.push("        C                 Em            D");
        d.push("Is your heart filled with pain, shall I come back again?");
        d.push("        Dm            G7         C");
        d.push("Tell me dear, are you lonesome tonight?");
        break;
      case 11:
        d.push("{title: Yes sir, that's my baby}");
        d.push("");
        d.push("D");
        d.push("   That's my baby");
        d.push("A");
        d.push(" No, sir, I don't mean maybe");
        d.push("A7                         D");
        d.push(" Yes, sir! That's my baby now...");
        d.push("");
        d.push("D");
        d.push(" Yes, ma'am, we've decided");
        d.push("A");
        d.push(" No ma'am, we ain't gonna hide it");
        d.push("A7                           D");
        d.push(" Yes, ma'am, you're invited now");
        d.push("");
        d.push("       D    D7");
        d.push("By the way");
        d.push("       G");
        d.push("By the way");
        d.push("        E7                           A7");
        d.push("When we walk up to the preacher I'll say");
        d.push(" ");
        d.push("D");
        d.push(" Yes sir, that's my baby");
        d.push("A");
        d.push(" No sir, I don't mean maybe");
        d.push("A7                        D");
        d.push(" Yes sir, that's my baby now");
        d.push("");
        d.push("       D    D7");
        d.push("By the way");
        d.push("       G");
        d.push("By the way");
        d.push("           E7                         A7");
        d.push("When we'll run into the preacher I'll say");
        d.push("");
        d.push("         D");
        d.push("I'll say, Yes sir, that's my baby");
        d.push("A");
        d.push(" No sir, I don't mean maybe");
        d.push("A7                        D");
        d.push(" Yes sir, that's my baby now");
        break;
      case 12:
        d.push("{title: Ένας αϊτός}");
        d.push("{comment_italic: Τσάμικος}");
        d.push("{chordcolour: blue}");
        d.push("");
        d.push("G Cm     D   Gm  C       F     Cm");
        d.push("Ένας, μωρέ ένας, ένας αϊτός καθότανε");
        d.push("Gm             F Gm");
        d.push("ναι μωρέ, καθότανε");
        d.push("C       F     D   Gm  C         F");
        d.push("Ένας αϊτός καθότανε στον ήλιο και");
        d.push("    D        Gm            F Gm");
        d.push("λιαζότανε, ναι μωρέ, λιαζότανε");
        d.push("");
        d.push("G     Cm     D      Gm   C        F");
        d.push("Και τσί-, μωρέ παιδιά, και τσίμπαγε");
        d.push("    Cm     Gm              F   Gm");
        d.push("τα νύχια του, βρε τα νυχάκια του");
        d.push("  C       F    D      Gm C      F");
        d.push("Τσίμπαγε τα νυχάκια του τα νυχοπο-");
        d.push("   D      Gm              F   Gm");
        d.push("δαράκια του, βρε, ποδαράκια του");
        break;
      case 100:
        d.push("INDEX");
        d.push("");
        d.push("101 Φύλακας Άγγελος");
        d.push("102 Ποια νύχτα σ’ έκλεψε");
        break;
      case 101:
        d.push("{title: Φύλακας Άγγελος}");
        d.push("{comment_italic: Γιάννης Κότσιρας}");
        d.push("");
        d.push("Bm     F#");
        d.push("");
        d.push("Bm        F#          Bm          F#          Bm  F#");
        d.push("Όταν θα νιώθεις μοναξιά όταν το σπίτι θα 'ναι άδειο");
        d.push(" Bm        F#          Bm  G             F#          Bm   F#");
        d.push("Θα 'χεις εμένα συντροφιά     και θα σου δίνω εγώ κουράγιο");
        d.push("Bm       F#          Bm         F#           Bm  F#");
        d.push("Όταν μαυρίζει ο ουρανός όταν παγώνει η αγκαλιά σου");
        d.push("   Bm        F#            Bm  G       F#          Bm   F#");
        d.push("Κι όταν σε πνίγει ένας λυγμός   εγώ θα έρχομαι κοντά σου");
        d.push("");
        d.push(" G       A           D   G           A              D   C#m");
        d.push("Μονάχα εσύ να 'σε καλά    μη δω στα μάτια σου ούτε δάκρυ");
        d.push("  G         A         Bm  G          F#          Bm");
        d.push("Μπορεί να ζούμε χωριστά     μα τότε ζήσαμε μια αγάπη");
        d.push(" G         A           D     G       A            D    C#m");
        d.push("Να 'σαι κορίτσι μου καλά και όταν ζητάς τον άνθρωπό σου");
        d.push(" G        A             Bm  G        F#        Bm");
        d.push("Θα είμαι κάπου εκεί κοντά     ο φύλακας ο άγγελος σου");
        d.push("G        F#        Bm      F#");
        d.push("  ο φύλακας ο άγγελος σου");
        d.push("");
        d.push("Bm        F#           Bm            F#           Bm  F#");
        d.push("Αν σου ραγίζει τη καρδιά κι αν μόνη θέλει να σ' αφήσει");
        d.push(" Bm          F#            Bm  G       F#            Bm   F#");
        d.push("Πες του πως κάποιος μια φορά     αληθινά σ' είχε αγαπήσει");
        d.push("");
        d.push(" G       A           D   G           A              D   C#m");
        d.push("Μονάχα εσύ να 'σε καλά    μη δω στα μάτια σου ούτε δάκρυ");
        d.push("  G         A         Bm  G          F#          Bm");
        d.push("Μπορεί να ζούμε χωριστά     μα τότε ζήσαμε μια αγάπη");
        d.push(" G         A           D     G       A            D    C#m");
        d.push("Να 'σαι κορίτσι μου καλά και όταν ζητάς τον άνθρωπό σου");
        d.push(" G        A             Bm  G        F#        Bm");
        d.push("Θα είμαι κάπου εκεί κοντά     ο φύλακας ο άγγελος σου");
        d.push("G        F#        Bm");
        d.push("  ο φύλακας ο άγγελος σου");
        break;
      case 102:
        d.push("{title: Ποια νύχτα σ’ έκλεψε}");
        d.push("{comment_italic: Γιάννης Πουλόπουλος}");
        d.push("");
        d.push("Am  G6  FM7  Esus4  E");
        d.push("");
        d.push("Am                     E/Ab");
        d.push(" Βροχή στο πρόσωπο μου     κι ο ήλιος πουθενά");
        d.push("Em/G                         Dm/F");
        d.push(" Ψάχνω για τ’ όνειρο μου μα γύρω μου βουνά");
        d.push("    Esus4 E     Am G6 FM7");
        d.push("Μα γύρω μου βουνά");
        d.push("");
        d.push("             Esus4 E");
        d.push("Ποια νύχτα σ’ έκλεψε");
        d.push("              F    Dm");
        d.push("Ποια πίκρα σ’ έκρυψε");
        d.push("           G                     C");
        d.push("Και τώρα πια για ποιαν θα τραγουδώ");
        d.push("   A7       Dm        B7    E");
        d.push("Νωρίς που βράδιασε ο κόσμος άδειασε");
        d.push("Dm              Bdim  E         Am");
        d.push("Αγάπη μου δε θα σε ξαναδώ δε θα σε ξαναδώ");
        d.push("");
        d.push("Am  G6  FM7  Esus4  E");
        d.push("");
        d.push("Am                      E/Ab");
        d.push(" Στης λησμονιάς τη βρύση δεν έχει πια νερό");
        d.push("Em/G                    Dm/F");
        d.push(" Ξέρω δε θα γυρίσει μα θα την καρτερώ");
        d.push("    Esus4  E    Am G6 FM7");
        d.push("Μα θα την καρτερώ");
        d.push("");
        d.push("             Esus4 E");
        d.push("Ποια νύχτα σ’ έκλεψε");
        d.push("              F    Dm");
        d.push("Ποια πίκρα σ’ έκρυψε");
        d.push("           G                     C");
        d.push("Και τώρα πια για ποιαν θα τραγουδώ");
        d.push("   A7       Dm        B7    E");
        d.push("Νωρίς που βράδιασε ο κόσμος άδειασε");
        d.push("Dm              Bdim  E         Am");
        d.push("Αγάπη μου δε θα σε ξαναδώ δε θα σε ξαναδώ");
        d.push("");
        d.push("Am  G6  FM7  Esus4  E  Am");
        break;
      default:
        break;
    }
    return d;
  }
}

export { Songs };
