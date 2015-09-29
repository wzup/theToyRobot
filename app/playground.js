'use strict';

module.exports = Playgroud;

/**
 * Класс "Игровое поле"
 * config = {x: 5, y: 5}
 */
function Playgroud(config) {

    var config = config || {};

    // если нет в конфиге X или Y, ставим по умолчанию
    var oStartPoint = {
        x: config.startPointX || 0,
        y: config.startPointY || 0
    };
    var oLength = {
        x: config.lengthX || 5,
        y: config.lengthY || 5
    };

    this.isEndOfPlayground = function(x, y) {
        debugger
        if (
            (x > (oStartPoint.x + (oLength.x - 1))) ||
            (x < oStartPoint.x) ||
            (y > (oStartPoint.y + (oLength.y - 1))) ||
            (y < oStartPoint.y)
        ) {
            return true;
        } else
            return true;
    };
}
