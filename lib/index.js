/*
  var config = {
    appId: appid,
    username: username,
    password: password,
    accountId: accountid,
    clientFolderId: clientfolderid
  }

  var icontact = new iContact(config)

  var list = icontact.List()

  list.create(....).then()
*/

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _list = require("./list");

var _list2 = _interopRequireDefault(_list);

var _contact = require("./contact");

var _contact2 = _interopRequireDefault(_contact);

var _customfield = require("./customfield");

var _customfield2 = _interopRequireDefault(_customfield);

var _segment = require("./segment");

var _segment2 = _interopRequireDefault(_segment);

var _criteria = require("./criteria");

var _criteria2 = _interopRequireDefault(_criteria);

var _message = require("./message");

var _message2 = _interopRequireDefault(_message);

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var iContact = (function () {
  function iContact(config) {
    _classCallCheck(this, iContact);

    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    if (!(this instanceof iContact)) return new iContact(config);
    if (!config) throw new Error("Configuration is undefined");

    this.appId = config.appId || process.env.iContactAppId;
    this.username = config.username || process.env.iContactUsername;
    this.password = config.password || process.env.iContactPassword;
    this.accountId = config.accountId || process.env.iContactAccountId;
    this.clientFolderId = config.clientFolderId || process.env.iContactClientFolderId;

    this.headers = {
      "Accept": "application/json",
      "Content-Type": "appliiocation/json",
      "Api-Version": "2.0",
      "Api-AppId": this.appId,
      "Api-Username": this.username,
      "API-Password": this.password };
    this.domain = process.env.NODE_ENV == "production" ? "https://app.icontact.com/" : "https://app.sandbox.icontact.com/";
    this.baseUrl = _path2["default"].join("icp", "a", this.accountId.toString(), "c", this.clientFolderId.toString());
  }

  _createClass(iContact, [{
    key: "validateArray",
    value: function validateArray(arr, requiredField) {
      var err = null;
      for (var i in arr) {
        var data = arr[i];
        if (!data[requiredField]) {
          err = new Error(requiredField + " is required");
          break;
        }
      }
      if (err) throw err;
      return arr;
    }
  }, {
    key: "process",
    value: function process(thePath, method, formData) {
      if (!(thePath instanceof Array)) throw new Error("Array of path is not provided");
      if (!method) method = "GET";

      var headers = this.headers;

      var target = _path2["default"].join.apply(null, thePath);

      target = this.domain + _path2["default"].join(this.baseUrl, target);
      // generate the request to make
      var requestOption = {
        url: target,
        headers: headers,
        method: method,
        timeout: 30000
      };

      // this should only work for post, put, delete?
      if (formData) {
        console.log(formData);
        requestOption.form = formData;
      }

      // return the promise
      return new Promise(function (resolve, reject) {
        console.log("sending request to", target);
        return (0, _request2["default"])(requestOption, function (error, response, body) {
          if (error) return reject(error);
          body = JSON.parse(body);

          // if (response.statusCode !== 200) {
          // let errorMessage = "Server responded with status: " + response.statusCode
          // return reject(new Error(errorMessage))
          // }

          if (body.errors) return reject(new Error(body.errors.pop()));
          if (body.warnings) return reject(new Error(body.warnings.pop()));

          return resolve(body);
        });
      });
    }
  }, {
    key: "List",

    /* CONTACT */
    value: function List() {
      return new _list2["default"](this);
    }
  }, {
    key: "Contact",
    value: function Contact() {
      return new _contact2["default"](this);
    }
  }, {
    key: "Segment",
    value: function Segment() {
      return new _segment2["default"](this);
    }
  }, {
    key: "Criteria",
    value: function Criteria(segmentId) {
      if (!segmentId) throw new Error("segmentId is required");
      return new _criteria2["default"](this, segmentId.toString());
    }
  }, {
    key: "CustomField",
    value: function CustomField() {
      return new _customfield2["default"](this);
    }
  }, {
    key: "Message",
    value: function Message() {
      return new _message2["default"](this);
    }
  }]);

  return iContact;
})();

exports["default"] = iContact;
module.exports = exports["default"];