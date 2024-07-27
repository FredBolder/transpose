class Audio {
    static audioCache;
    static audioContext;

    static init() {
        this.audioCache = new Map();
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

        const urls = [];
        for (let i = 0; i < 32; i++) {
            let url = (i + 1).toString();
            if (url.length < 2) {
                url = '0' + url;
            }
            url = 'wav/' + url + '.wav';
            urls.push(url);
        }
        this.preloadAudioFiles(urls);
    }

    static getCachedAudioBuffer(url) {
        return this.audioCache.get(url);
    }

    static async preloadAudioFiles(urls) {
        const loadAudioData = async (url) => {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            return this.audioContext.decodeAudioData(arrayBuffer);
        };

        const audioBuffers = await Promise.all(urls.map(url => loadAudioData(url)));
        urls.forEach((url, index) => this.audioCache.set(url, audioBuffers[index]));
    }

}

export { Audio };
