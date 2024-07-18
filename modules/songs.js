class Songs {
    static shown = [-1, -1, -1, -1, -1];
    static shownIndex = 0;
  
    static numberOfSongs() {
      return 13;
    }
  
    static recentlyShow(n) {
      return this.shown.includes(n);
    }
  
    static setShown(n) {
      this.shown[this.shownIndex] = n;
      this.shownIndex++;
      if (this.shownIndex >= this.shown.length) {
        this.shownIndex = 0;
      }
      //console.log(this.shown);
    }
  }
  
  export { Songs };
  