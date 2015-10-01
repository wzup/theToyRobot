'use strict';

/**
 * "The Toy Robot" app.
 * It is a mudule.
 */
var os = require("os"), // to have platform independent EOL
    stdin = process.stdin,
    stdout = process.stdout,
    stderr = process.stderr,
    robot = require('./robotFactory'), // a robot instance
    EOL = os.EOL,
    fs = require('fs'), // to check if a file exists and is readable and to create a stream
    readline = require('readline'), // to read commands from a file
    rl,
    argv, // for cli arguments, particularly to get a file path
    messenger = robot.getMessenger(); // to create and send messages to user

stdin.setEncoding('utf8');
process.title = "== The Toy Robot =="; // sets a terminal title

argv = process.argv.slice(2);


stdin.on('data', function(data) {
    var res, _data = data.trim();
    if (_data.match(/(q|quit|exit)/i))
        process.exit();

    res = doAction(_data);
    if (res instanceof Error) {
        stderr.write(res.message + EOL + '> ');
    } else if (typeof res == 'string') {
        stdout.write(res + EOL + '> ');
    }
    else {
        stdout.write('> ');
    }
});


if (argv.length) {
    stdout.write("ARGV: " + argv + EOL);

    try {
        fs.accessSync(argv[0], fs.F_OK | fs.R_OK)
    } catch (e) {
        stderr.write(messenger.getMessage({
            msg: 'fileNotFound',
            fileName: argv[0]
        }));
        process.exit();
    }


    rl = readline.createInterface({
        input: fs.createReadStream(argv[0]),
        terminal: false
    });

    rl.on('line', function(line) {
        stdout.write(line + EOL);
        stdout.write(doAction(line) + EOL);
    });

    rl.on('close', function() {
        console.log('== END ==: ');
        rl.close();
        process.exit();
    });
}


function doAction(sCommand) {
    var res;
    // PLACE X(,| )Y(,| )F(  *)
    if (sCommand.match(/^\s*place\s+\w+(?:,?\s*|\s+)\w+(?:,?\s*|\s+)\w+\s*$/i)) {
        var args = sCommand.trim().split(/(?:\s+|,\s*)/i).slice(1);
        res = robot.place(args[0], args[1], args[2]);
    } else if (sCommand.match(/^move\s*$/i)) {
        res = robot.move();
    } else if (sCommand.match(/^left\s*$/i)) {
        res = robot.left();
    } else if (sCommand.match(/^right\s*$/i)) {
        res = robot.right();
    } else if (sCommand.match(/^report\s*$/i)) {
        res = robot.report();
    } else {
        res = new Error(messenger.getMessage({
            msg: 'unknownCommand'
        }));
    }
    return res;
}


function TheToyRobotApp() {};
TheToyRobotApp.run = function() {
    stdout.write(messenger.getMessage({
        msg: 'welcome'
    }) + EOL + '> ');
    stdin.resume();
}


module.exports = TheToyRobotApp;
