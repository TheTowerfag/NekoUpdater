/*:
 * ===============================
 * MND_SkipLoadError.js
 * ===============================
 * @plugindesc displays pop-ups with errors related to plug-ins, images, and sound files missing, and tries to ignore the error to continue the game. (v1.0.2)
   * @author   @66rpg
 * 
 * @help
   * This plugin does not need to be configured, but please note:
   * This plugin may have compatibility issues after the official upgrade of RMMV (if the officially modified the corresponding method), this
   * The plugin is released for simple testing only under RMMV 1.4.1 (steam version).
 * 
   * by     ( (Mandarava) 2016.06.06
 */
 
PluginManager.checkErrors = function() {
    var url = this._errorUrls.shift();
    if (url) {
        alert('Failed to load: ' + url);
    }
};
 
ImageManager.loadSvActor = function(filename, hue) {
    var fs=require("fs");
    var path=require("path");
    var folder = path.join(path.dirname(process.mainModule.filename), 'img/sv_actors/');
    var file = folder + filename + '.png';
    if(fs.existsSync(file)){
        return this.loadBitmap('img/sv_actors/', filename, hue, false);
    }else{
        alert("Failed to load: "+file);
        return this.loadEmptyBitmap();
    }
};
 
ImageManager.isReady = function() {
    for (var key in this.cache._inner) {
        var bitmap = this.cache._inner[key].item;
        if (bitmap.isError()) {
            alert('Failed to load: ' + bitmap.url);
            bitmap=ImageManager.loadEmptyBitmap();
            this.cache.setItem(key, bitmap);
        }
        if (!bitmap.isReady()) {
            return false;
        }
    }
    return true;
};
 
AudioManager.checkWebAudioError = function(webAudio) {
    if (webAudio && webAudio.isError()) {
        alert('Failed to load: ' + webAudio.url);
        webAudio.initialize("");
    }
};