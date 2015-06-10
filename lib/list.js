"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Segment = require("./segment");
var type = "lists";

var List = (function () {
  function List(iContact) {
    _classCallCheck(this, List);

    this.i = iContact;
  }

  _createClass(List, [{
    key: "value",
    value: function value(data) {

      switch (typeof data) {
        case "string":
          data = {
            "name": data
          };
          break;
        default:
          if (!data.name) throw new Error("Name is required");
      }
      this.data = data;
      return this;
    }
  }, {
    key: "create",

    /* the CRUD */

    // data name of the list
    value: function create() {
      if (!this.data) throw new Error("Call .value() to set values first");
      console.log("data", this.data);
      return this.i.process([type], "POST", [this.data]).then(function (data) {
        return Promise.resolve(data.lists.pop());
      });
    }
  }, {
    key: "all",
    value: function all() {
      return this.i.process([type]).then(function (data) {
        return Promise.resolve(data.lists);
      });
    }
  }, {
    key: "update",
    value: function update(id) {
      if (!this.data) throw new Error("Call .value() to set values first");
      var urlPath = [type, id.toString()];

      return this.i.process(urlPath, "POST", this.data).then(function (data) {
        return Promise.resolve(data.list);
      });
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      var urlPath = [type, id.toString()];
      return this.i.process(urlPath, "DELETE");
    }
  }]);

  return List;
})();

exports["default"] = List;
module.exports = exports["default"];