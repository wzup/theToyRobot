'use strict';

module.exports = Playgroud;

function Playgroud(config) {
    this._config = config;
}

var prototype = {
    isOutOfPlayground: function(x, y) {
        if (
            (x > (this._config.startPointX + (this._config.lengthX - 1))) ||
            (x < this._config.startPointX) ||
            (y > (this._config.startPointY + (this._config.lengthY - 1))) ||
            (y < this._config.startPointY)
        ) {
            return true;
        } else
            return false;
    },
}

Playgroud.prototype = Object.create(prototype);
Playgroud.prototype.constructor = Playgroud;
