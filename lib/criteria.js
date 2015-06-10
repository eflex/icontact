"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var type = "segments";

var Criteria = (function () {
  function Criteria(iContact, segmentId) {
    _classCallCheck(this, Criteria);

    this.i = iContact;
    this.segmentId = segmentId;
  }

  _createClass(Criteria, [{
    key: "value",

    // https: //app.sandbox.icontact.com/icp/a/{accountid}/c/{clientfolderid}/segments/{segmentid}/criteria
    /*
      data = {
        fieldName: ...,
        operator: eq, lt, lte, gt, gte, bet, contains, notcontains
        values: [] / string
      }
    */

    value: function value(fieldName, values, operator) {
      if (!fieldName) throw new Error("Criteria fieldname is required");
      if (!values) throw new Error("Criteria value is required");
      if (!(values instanceof Array)) values = [values];
      if (!operator) operator = "contains";

      this.data = {
        fieldName: fieldName,
        values: values,
        operator: operator
      };

      return this;
    }
  }, {
    key: "create",
    value: function create() {
      if (!this.data) throw new Error("Call .value() first to set data");
      var urlPath = [type, this.segmentId, "criteria"];
      return this.i.process(urlPath, "POST", [this.data]).then(function (data) {
        return Promise.resolve(data.criteria.pop());
      });
    }
  }, {
    key: "all",
    value: function all() {

      var arrPath = [type, this.segmentId, "criteria"];
      return this.i.process(arrPath).then(function (data) {
        return Promise.resolve(data.criteria);
      });
    }
  }, {
    key: "update",
    value: function update(id) {
      if (!this.data) throw new Error("Call .value() first to set data");
      console.log(id.toString());
      var urlPath = [type, this.segmentId, "criteria", id.toString()];
      return this.i.process(urlPath, "POST", this.data).then(function (data) {
        return Promise.resolve(data.criterion);
      });
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      var urlPath = [type, this.segmentId, "criteria", id.toString()];
      return this.i.process(urlPath, "DELETE");
    }
  }]);

  return Criteria;
})();

exports["default"] = Criteria;
module.exports = exports["default"];