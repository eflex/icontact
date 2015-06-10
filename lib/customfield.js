"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var type = "customfields";

var CustomField = (function () {
  function CustomField(iContact) {
    _classCallCheck(this, CustomField);

    this.i = iContact;
    this.data = null;
  }

  _createClass(CustomField, [{
    key: "value",

    /*
    info = {
      privateName: ...,
      displayToUser: 1/0(default),
      fieldType: checkbox(default) / text / date / number
      publicName: ...
    }
    */

    value: function value(data) {
      switch (typeof data) {
        case "string":
          data = {
            privateName: data,
            displayToUser: 0,
            fieldType: "text"
          };
          break;
        default:
          if (!data.privateName) throw new Error("privateName is required");
          // set default value
          if (!data.displayToUser) data.displayToUser = 0;
          if (!data.fieldType) data.fieldType = "text";
      }
      this.data = data;
      return this;
    }
  }, {
    key: "create",
    value: function create() {
      if (!this.data) throw new Error("Call .value() to set values first");
      return this.i.process([type], "POST", [this.data]).then(function (data) {
        return Promise.resolve(data.customfields.pop());
      });
    }
  }, {
    key: "all",
    value: function all() {
      return this.i.process([type]).then(function (data) {
        return Promise.resolve(data.customfields);
      });
    }
  }, {
    key: "update",
    value: function update(id) {
      if (!this.data) throw new Error("Call .value() to set values first");
      var urlPath = [type, id.toString()];
      return this.i.send(type, "POST", this.data).then(function (data) {
        return Promise.resolve(data.customfield);
      });
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      var urlPath = [type, id.toString()];
      return this.i.process(urlPath, "DELETE");
    }
  }]);

  return CustomField;
})();

exports["default"] = CustomField;
module.exports = exports["default"];