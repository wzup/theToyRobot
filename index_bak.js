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
    // console.log('== rl ==: ', rl);
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
    // stdout.write("EXISTS");
}


stdin.on('data', function(data) {
    if (data.match(/q/i))
        process.exit();

    if(doAction(data) !== true) {
        stdout.write(doAction(data) + EOL);
    }
});

stdin.on('exit', function() {
    stdout.write('Thanks for playing. Come again.');
});

stdin.resume();


function doAction(sCommand) {
    var res;
    if (sCommand.match(/place/i)) {
        var args = sCommand.split(/(?:\s+|,\s*)/i).slice(1);
        res = robot.place(args[0], args[1], args[2]);
        if (res !== true) {
            // stdout.write([res, 'HELLO', EOL].join(''));
            return res;
        }
        else
            return  true;
        // stdout.write([robot.report(), "  --УДАЛИЬ В ПРОДЕ--  ", EOL].join('')); // удалить в продакшене
        // return [robot.report(), "  --УДАЛИЬ В ПРОДЕ--  ", EOL].join('');
    } else if (sCommand.match(/move/i)) {

    } else if (sCommand.match(/left/i)) {

    } else if (sCommand.match(/right/i)) {

    } else if (sCommand.match(/report/i)) {
        return robot.report();
    } else {
        // stdout.write("No such a command: " + data);
        return "No such a command: " + sCommand;
    }
}







// process.stdout.write('Hello! Place a robot to begin.' + os.EOL);
// process.stdout.write('To exit type \'Q\' or Ctrl+C.' + os.EOL);
// process.stdout.write('Type \'PLACE X Y F\':' + os.EOL);
// process.stdin.resume();
// process.stdin.setEncoding('utf8');
// process.stdin.on('data', function(data) {
//     if(data.match(/q/i))
//         process.exit();
//     process.stdout.write(data);
// });



// var robot = new (require('./app/robot'))();
// var pg = new (require('./app/playground'))();
// var robot = new Robot();

// debugger;



// console.log('== HELLO ==: ');
// console.log(process.argv);


// sergey@WEISS ~/sbox/node/lookahead.com.au/theToyRobot (master)
// $ npm link
// C:\Users\sergey\AppData\Roaming\npm\foo -> C:\Users\sergey\AppData\Roaming\npm\node_modules\theToyRobot\index.js
// C:\Users\sergey\AppData\Roaming\npm\node_modules\theToyRobot -> c:\Users\sergey\sbox\node\lookahead.com.au\theToyRobot

// var program = require('commander');

// var program = require('commander');

// program
//     .version('0.0.1')
//     .option('-p, --peppers', 'Add peppers')
//     .option('-P, --pineapple', 'Add pineapple')
//     .option('-b, --bbq-sauce', 'Add bbq sauce')
//     .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
//     .parse(process.argv);

// console.log('you ordered a pizza with:');
// if (program.peppers) console.log('  - peppers');
// if (program.pineapple) console.log('  - pineapple');
// if (program.bbqSauce) console.log('  - bbq');
// console.log('  - %s cheese', program.cheese);

// var prompt = require('prompt');
// prompt.start();


// function _prompt() {
//     prompt.get(['foo'], function(err, result) {
//         //
//         // Log the results.
//         //
//         console.log('Command-line input received:', result);
//         if(result.foo == 'Q')
//             return;
//         _prompt();
//     });
// }

// _prompt();



// var stdin = process.stdin,
//     stdout = process.stdout,
//     inputChunks = [];

// stdin.resume();
// stdin.setEncoding('utf8');

// stdin.on('data', function(chunk) {
//     console.info('== DATA ==: ', chunk);
//     inputChunks.push(chunk);
// });

// stdin.on('end', function() {
//     // var inputJSON = inputChunks.join(),
//     //     parsedData = JSON.parse(inputJSON),
//     //     outputJSON = JSON.stringify(parsedData, null, '    ');
//     // stdout.write(outputJSON);
//     console.log('== END ==: ');
//     stdout.write('END OF INPUT. BYE!');
//     stdout.write('\n');
// });
