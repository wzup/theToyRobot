'use strict';

module.exports = Messenger;

function Messenger(config) {
    this._config = config || {};
}

var prototype = {

    getMessage: function(argv) {
        if (arguments.length === 0) {
            return this._config.oMsgs['welcome'];
        }
        /**
         * If there is no such a message key in our config.
         * Return default welcome message
         */
        if (!this._config.oMsgs[arguments[0]]) {
            return this._config.oMsgs['welcome'];
        }
        return this._constructMessage(arguments);
    },

    _constructMessage: function(argv) {
        var _arguments = Array.prototype.slice.call(arguments[0]);

        var key = _arguments[0],
            args, str;

        if (_arguments.length > 1) {
            args = _arguments.slice(1);
        } else {
            args = this._config.oSubs;
        }
        str = this._config.oMsgs[key].replace(/{(\w+)}/g, function(match, p) {
            return args[p];
        });
        return str;
    }
};

Messenger.prototype = Object.create(prototype);
Messenger.prototype.constructor = Messenger;


{msg: 'noInitialCommand', }
