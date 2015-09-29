'use strict';

/**
 * Let's test Messanger.
 * We have to make sure that it returns correct messages to Robot.
 * We take messages from config.js file.
 */

var Messenger = require('./../../app/messenger');
var config = require('./../../app/config');


describe('The Messenger', function() {
    var messenger, x, y, f, s;

    beforeAll(function() {
        messenger = new Messenger(config.messenger),
            x = 1, y = 2, f = 'south', s = 'sake';
    });

    /**
     * To test each message separatly is not a good solution - it makes us to create a new it('...')
     * everytime we have a new message.
     * Bellow it a better loop solution.
     */
    it('shoud output correct noInitialCommand message', function() {
        expect(messenger.getMessage({
            msg: 'noInitialCommand'
        })).toEqual(config.messenger.oMsgs['noInitialCommand']);
    });

    it('shoud output correct default welcome message', function() {
        expect(messenger.getMessage()).toEqual(config.messenger.oMsgs['welcome']);
    });

    it('shoud output correct default welcome message', function() {
        expect(messenger.getMessage({
            msg: 'FooBlaBla'
        })).toEqual(config.messenger.oMsgs['welcome']);
    });

    it('combinedMsg', function() {
        expect(messenger.getMessage({
            msg: 'someCombinedMsg',
            x: x,
            y: y,
            s: s
        })).toEqual(messenger._constructMessage({
            msg: 'someCombinedMsg',
            x: x,
            y: y,
            f: f,
            s: s
        }))
    })

    /**
     * It is much better to test ALL messages in a loop.
     * So that, no need to manually create a new it('...') every time we decide to have a new message.
     * All is needed is to type a new message in a config file. It will be tested here automatically.
     */
    function testItsInLoop(key) {
        it(['shoud output correct', key, 'message'].join(' '), function() {
            // for (var key in config.messenger.oMsgs) {
            //     expect(messenger.getMessage({
            //         msg: key,
            //         x: x,
            //         y: y,
            //         f: f
            //     })).toEqual(messenger._constructMessage({
            //         msg: key,
            //         x: x,
            //         y: y,
            //         f: f
            //     }));
            // }
            // console.log('== key ==: ', key);
                expect(messenger.getMessage({
                    msg: key,
                    x: x,
                    y: y,
                    f: f
                })).toEqual(messenger._constructMessage({
                    msg: key,
                    x: x,
                    y: y,
                    f: f
                }));

        });
    }

    /**
     * A loop by itself
     */
    for (var key in config.messenger.oMsgs) {
        // console.log('== key ==: ', key);
        testItsInLoop(key);
    }
});
