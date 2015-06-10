"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var type = "messages";

/*
  info = {
    email: ...,
    firstName: ...,
    lastName: ...,
    ....
  }
*/

var Message = (function () {
  function Message(iContact) {
    _classCallCheck(this, Message);

    this.i = iContact;
  }

  _createClass(Message, [{
    key: "all",
    value: function all() {
      return this.i.process([type]).then(function (data) {
        return Promise.resolve(data.messages);
      });
    }
  }, {
    key: "clicks",
    value: function clicks(messageId) {
      if (!messageId) throw new Error("messageId is required");
      return this.i.process([type, messageId.toString(), "clicks"]).then(function (data) {
        return Promise.resolve(data.clicks);
      });
    }
  }]);

  return Message;
})();

exports["default"] = Message;
module.exports = exports["default"];