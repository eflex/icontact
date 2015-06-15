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

module.exports = {
  Contact: require("./contact"),
  Segment: require("./segment"),
  Message: require("./message"),
  List: require("./list"),
  CustomField: require("./<!--  -->customfield"),
  Criteria: require("./criteria")
}
