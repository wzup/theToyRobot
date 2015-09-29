'use strict';


function instantiate(Robot) {

    return new Robot();
}



module.exports = config;

var config = {
    playgroud: {
        startPointX: 0,
        startPointY: 0,
        lengthX: 5,
        lengthY: 5
    },
    robot: {
        commands: [],
        initialCommands: [],
    }
};
