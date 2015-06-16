/*
  var config = {
    appId: appid,
    username: username,
    password: password,
    accountId: accountid,
    clientFolderId: clientfolderid
  }

  var list = require("icontact").List(config)

  list.create(....).then()
*/

"use strict";

import Contact from "./contact";
import Segment from "./segment";
import Message from "./message";
import List from "./list";
import CustomField from "./customfield";
import Criteria from "./criteria";

class iContact {
  constructor(config, production) {
    this.config = config;
    this.production = production;
  }

  Contact() {
    return new Contact(this.config, this.production)
  }
  Segment() {
    return new Segment(this.config, this.production)
  }
  Criteria(segmentId) {
    return new Criteria(segmentId, this.config, this.production)
  }
  Message() {
    return new Message(this.config, this.production)
  }
  List() {
    return new List(this.config, this.production)
  }
  CustomField() {
    return new CustomField(this.config, this.production)
  }
}

export default function(config, production) {
  return new iContact(config, production)
}
