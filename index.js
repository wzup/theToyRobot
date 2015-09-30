#! /usr/bin/env node


var os = require("os"), // to have platform independent EOL
    stdin = process.stdin,
    stdout = process.stdout,
    robot = require('./app/robotFactory.js'), // a robot instance
    EOL = os.EOL,
    fs = require('fs'), // to check if a file exists and is readable and create a stream
    readline = require('readline'), // to read commands from a file
    rl,
    argv; // for cli arguments, particularly to get a file path

stdin.setEncoding('utf8');
process.title = "== The Toy Robot =="; // sets a terminal title
stdout.write('Tell the robot your first command. Begin by placing it on the playground, like PLACE X, Y, F.' + EOL);

// If argv is provided we assume it is a file to read commands from
argv = process.argv.slice(2);
if (argv.length) {
    stdout.write("ARGV: " + argv + EOL);

    try {
        fs.accessSync(argv[0], fs.F_OK | fs.R_OK)
    } catch (e) {
        stdout.write(['ERROR! File "', argv[0], '" either does not exist or isn\'t readable.'].join(''));
        process.exit();
    }


    rl = readline.createInterface({
        input: fs.createReadStream(argv[0]),
        terminal: false
    });
    rl.on('line', readLineCb);
    rl.on('close', function() {
        console.log('== END ==: ');
        rl.close();
        process.exit();
    })

    function readLineCb(line) {
        stdout.write(line + EOL);
        stdout.write(doAction(line) + EOL);
    }
}


stdin.on('data', function(data) {
    var res;
    if (data.match(/q/i))
        process.exit();

    res = doAction(data);
    if (typeof res == 'string') {
        stdout.write(res + EOL);
    }
});

stdin.resume();

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
        res = robot.report({
            msg: 'unknownCommand'
        });
    }
    return res;
}
