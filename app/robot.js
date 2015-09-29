// #! /usr/bin/env node

'use strict';

var config = require('./config');
// var playground = new(require('./playground'))(config.playground);
var playground = new(require('./playground'))();
module.exports = Robot;

debugger;

/**
 * Класс Robot
 */
function Robot() {

    /**
     * Возможные команды роботу
     * @type {Array}
     */
    var aCommands = ['place', 'move', 'left', 'right', 'report'];
    var aDirections = ['north', 'east', 'south', 'west'];
    var aInitialCommands = [aCommands[0]]; // place
    var isFirstStepMade = false;
    // f - num, индекс слова в массиве, не слово!
    var oCurrentRobotPosition = {
        x: 0,
        y: 0,
        f: 0
    };
    var oMsgs = {
        noInitialCommand: 'Warning! You didn\'t placed a robot first. Type "PLACE X, Y, F" to position a robot on the playground.',
        wrongPlace: 'Warning! You cannot place the robot in that square, it can fall.',
        wrondDirection: ['Error! No such a direction. Available directions are: ', aDirections.join(', ').toUpperCase(), '.'].join(''),
        robotPosition: 'Robot\'s position is: ',
        noNegativeCoordinates: 'Error! No negative X or Y allowed. Try again.',
        wrongMove: 'Warning! You cannot move the robot that way, it can fall.'
    };

    /**
     * Проверить, есть ли такая команда
     * @return {Boolean} есть команда - тру, нету - фолс
     */
    function isCommandValid(sCommand) {
        // TODO: проверка типа, что sCommand - строка
        return aCommands.indexOf(sCommand) !== -1;
    }

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
    this.left = function() {
        oCurrentRobotPosition.f = (oCurrentRobotPosition.f - 1) < 0 ? 3 : oCurrentRobotPosition.f - 1;
    };

    this.right = function() {
        oCurrentRobotPosition.f = (oCurrentRobotPosition.f + 1) > 3 ? 0 : oCurrentRobotPosition.f + 1;
    };

    this.place = function(x, y, f) {
        var f = f.toUpperCase();
        if (x < 0 || y < 0) {
            return this.report(oMsgs.noNegativeCoordinates);
        }
        if (isEndOfPlayground(x, y)) {
            return this.report(oMsgs.wrongPlace);
        }
        if (!isDirectionValid(f)) {
            return this.report(oMsgs.wrondDirection);
        }
        setRobotPosition(x, y, f);
        if (!isFirstStepMade)
            isFirstStepMade = true;
        return true;
    };

    this.move = function() {
        var x, y, f;
        if (!isFirstStepMade) {
            return this.report(oMsgs.noInitialCommand);
        }
        // TODO: ПОСЧИТАТЬ СЛЕДУЮЩИЙ ШАГ
        // если шагнет в конец поля, сообщение и выход
        // если все ок, обновить position
        f = oCurrentRobotPosition.f;
        switch(f) {
            case aDirections[0]: // north
                ++y;
            break;
            case aDirections[1]: // east
                ++x;
            break;
            case aDirections[2]: // south
                --y
            break;
            case aDirections[3]: // west
                --x;
            break;
        }
        if (isEndOfPlayground(x, y)) {
            return this.report(oMsgs.wrongMove);
        }
        setRobotPosition(x, y, f);
        return true;
    };

    this.report = function(msg) {
        var msg = msg;
        if (!msg) {
            // console.info(oMsgs.robotPosition,
            //     oCurrentRobotPosition.x,
            //     oCurrentRobotPosition.y,
            //     aDirections[oCurrentRobotPosition.f].toUpperCase());
            msg = [oMsgs.robotPosition,
                oCurrentRobotPosition.x,
                oCurrentRobotPosition.y,
                aDirections[oCurrentRobotPosition.f].toUpperCase()
            ].join(' ');
        } else {
            // console.log(oMsgs.noNegativeCoordinates);
            msg = msg;
        }
        return msg;
    }

    function setRobotPosition(x, y, f) {
        oCurrentRobotPosition.x = x;
        oCurrentRobotPosition.y = y;

        // TODO: возможно слово (north, south, т.д.) переделывать на число ЗДЕСЬ,
        // а не в .place или .move
        oCurrentRobotPosition.f = aDirections.indexOf(f.toLowerCase());
    }

    function getRobotPosition() {}

    /**
     * Проверка, что не конец игрового поля. Что робот не упадет.
     * @return {Boolean} true | false
     */
    function isEndOfPlayground(x, y) {
        return playground.isEndOfPlayground(x, y);
    }
}
