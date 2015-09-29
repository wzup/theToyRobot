'use strict';

var config = require('./config');
module.exports = Robot;


/**
 * Класс Robot
 */
function Robot(argument) {

    /**
     * Возможные команды роботу
     * @type {Array}
     */
    var aCommands = ['place', 'move', 'left', 'right', 'report'];
    var aDirections = ['north', 'east', 'south', 'west'];
    var aInitialCommands = [aCommands[0]]; // place
    var isFirstStepMade = false;
    var oCurrentRobotPosition = {
        x: 0,
        y: 0,
        f: 0
    };
}

/**
 * Проверить, есть ли такая команда
 * @return {Boolean} есть команда - тру, нету - фолс
 */
Robot.prototype.isCommandValid = function(sCommand) {
    // TODO: проверка типа, что sCommand - строка
    return aCommands.indexOf(sCommand) !== -1;
};

/**
 * Проверить, есть ли такое направление
 * @param  {[string]}  sDirection - north, east, south, west
 * @return {Boolean} - true | false
 */
function isDirectionValid(sDirection) {
    // TODO: проверка типа, что sDirection - строка
    return aDirections.indexOf(sDirection) !== -1;
}

/**
 * LEFT and RIGHT will rotate the robot 90 degrees in the specified direction
 * without changing the position of the robot.
 * Т.е. только FACE поменять
 * @return {[type]} [description]
 */
Robot.prototype.left = function() {
    oCurrentRobotPosition.f = (oCurrentRobotPosition.f - 1) < 0 ? 3 : oCurrentRobotPosition.f - 1;
};
Robot.prototype.right = function() {
    oCurrentRobotPosition.f = (oCurrentRobotPosition.f + 1) > 3 ? 0 : oCurrentRobotPosition.f + 1;
};
Robot.prototype.place = function(x, y, f) {
    // TODO: проверка, что робот ставится на игровое поле, а не куда-то за поле
    if (isEndOfPlayground(x, y, f)) {
        this.report(oMsgs.wrongPlace);
        return;
    }
    if (!isDirectionValid(f)) {
        this.report(oMsgs.wrondDirection);
        return;
    }
    updateRobotPosition(x, y, aDirections.indexOf(f));
};
Robot.prototype.move = function() {
    if (!isFirstStepMade) {
        this.report(oMsgs.noInitialCommand);
        return;
    }
    // if (!isFirstStepMade && '')
};

Robot.prototype.report = function(msg) {
    console.info(msg);
};

Robot.prototype.setRobotPosition = function(x, y, f) {
    oCurrentRobotPosition.x = x;
    oCurrentRobotPosition.y = y;

    // TODO: возможно слово (north, south, т.д.) переделывать на число ЗДЕСЬ,
    // а не в .move
    oCurrentRobotPosition.f = f;
}

Robot.prototype.getRobotPosition = function() {
    return oCurrentRobotPosition;
};

Robot.prototype.oMsgs = {
    noInitialCommand: 'Warning! You didn\'t placed a robot first. Use PLACE X, Y, F to position a robot on a playgroud.',
    wrongPlace: 'Warning! You cannot place the robot in that square, it can fall',
    wrondDirection: ['Error! No such a direction. Available direction are: ', aDirections.join(', ').toUpperCase()].join(''),
};



/**
 * Проверка, что не конец игрового поля. Что робот не упадет.
 * @return {Boolean} true | false
 */
Robot.prototype.isEndOfPlayground = function() {}


