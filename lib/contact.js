"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var type = "contacts";

/*
  info = {
    email: ...,
    firstName: ...,
    lastName: ...,
    ....
  }
*/

var Contact = (function () {
  function Contact(iContact) {
    _classCallCheck(this, Contact);

    this.i = iContact;
  }

  _createClass(Contact, [{
    key: "value",
    value: function value(data) {
      switch (typeof data) {
        case "string":
          data = {
            email: data
          };
          break;
        default:
          if (!data.email) throw new Error("Email is required");
      }
      this.data = data;
      return this;
    }
  }, {
    key: "create",
    value: function create() {
      if (!this.data) throw new Error("Call .value() to set values first");
      return this.i.process([type], "POST", [this.data]).then(function (data) {
        return Promise.resolve(data.contacts.pop());
      });
    }
  }, {
    key: "all",
    value: function all() {
      return this.i.process([type]).then(function (data) {
        return Promise.resolve(data.contacts);
      });
    }
  }, {
    key: "update",
    value: function update(id) {
      if (!this.data) throw new Error("Call .value() to set values first");
      var urlPath = [type, id];
      return this.i.process(urlPath, "POST", this.data).then(function (data) {
        return Promise.resolve(data.contact);
      });
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      var urPath = [type, id];
      return this.i.process(urPath, "DELETE");
    }
  }, {
    key: "subscriptions",
    value: function subscriptions() {
      var urlPath = ["subscriptions"];
      return this.i.process(urlPath).then(function (data) {
        return Promise.resolve(data.subscriptions);
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe(contactId, listId) {
      var urlPath = ["subscriptions"];
      var data = {
        contactId: contactId,
        listId: listId,
        status: "normal"
      };
      return this.i.process(urlPath, "POST", [data]).then(function (data) {
        return Promise.resolve(data.subscriptions.pop());
      });
    }

    //  unsubscribe(contactId, listId) {
    //   let subscriptionId = listId + "_" + contactId;
    //   let urlPath = ["subscriptions", subscriptionId.toString()]
    //   let data = {
    //     status: "unsubscribed"
    //   }

    //   return this.i.process(urlPath, "POST", data)
    //     .then(function(data) {
    //       return Promise.resolve(data.subscription)
    //     })
    // }

  }]);

  return Contact;
})();

exports["default"] = Contact;
module.exports = exports["default"];