"use strict";

import Base from "./base";
var type = "messages"

export default class Message extends Base {


  count() {
    return super.count([type])
  }
  read(limit, offset) {
    return super.read(limit, offset, [type], type)
  }

  readClicks(messageId, limit, offset) {
    if (!messageId) throw new Error("messageId is required");
    return super.read(limit, offset, [type, messageId.toString(), "clicks"],
      "clicks")
  }

  totalClicks(messageId) {
    return super.count([type, messageId.toString(), 'clicks'])
  }

}
