"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var type = "segments";

var Segment = (function () {
  function Segment(iContact) {
    _classCallCheck(this, Segment);

    this.i = iContact;
  }

  _createClass(Segment, [{
    key: "value",
    value: function value(data) {
      switch (typeof data) {
        case "string":
          data = {
            name: data
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
    // listId is required on create
    value: function create(listId) {
      if (!this.data) throw new Error("Call .value() first to set data");
      if (!listId) throw new Error("List id is requried on creation");

      // update this.data to include listId
      this.data.listId = listId;

      return this.i.process([type], "POST", [this.data]).then(function (data) {
        return Promise.resolve(data.segments.pop());
      });
    }
  }, {
    key: "all",
    value: function all() {
      return this.i.process([type]).then(function (data) {
        return Promise.resolve(data.segments);
      });
    }
  }, {
    key: "update",
    value: function update(id) {
      if (!this.data) throw new Error("Call .value(0 first to set data");

      return this.i.process([type, id.toString()], "POST", this.data).then(function (data) {
        return Promise.resolve(data.segment);
      });
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      return this.i.process([type, id.toString()], "DELETE");
    }
  }]);

  return Segment;
})();

exports["default"] = Segment;
module.exports = exports["default"];