"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var List = function () {
    function List(queue) {
        _classCallCheck(this, List);

        this.usage = "%cmd%";
        this.description = "List the queue.";
        this.args = 0;
        this.staff = false;
        this.queue = queue;
    }

    _createClass(List, [{
        key: "onCommand",
        value: function onCommand(bot, message, args) {
            var header = "";
            var body = "";
            if (this.queue.list.length === 0) {
                header = "There isn't anything in the queue.";
            } else {
                if (this.queue.isPlaying) {
                    header += this.queue.currentlyPlaying + "\n\n";
                }
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.queue.list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var request = _step.value;

                        body += "\n" + (this.queue.list.indexOf(request) + 1) + ". `" + (request.shortTitle ? request.shortTitle : request.title) + " [" + request.durationAsString + "]`, requested by `" + bot.client.users.get("id", request.requester).username + "`.";
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            bot.sendMessage(message.channel, {
                message: header + body.replace("\n", "")
            });
        }
    }]);

    return List;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = List;
//# sourceMappingURL=List.js.map
