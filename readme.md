## iContact
  Simple iContact module for node

## Quick Start

  Installation:

```bash
$ npm install --save eflex/icontact
```


## Usage
```javascript

var config = {
  appId: appid,
  username: username,
  password: password,
  accountId: accountid,
  clientFolderId: clientfolderid
}

// INITIALIZE ICONTACT
var iContact = require("icontact")(config);

var contact = iContact.Contact(config)
contact
  .count()
  // .read(limit, offset)
  // .delete(id)
  // .subscriptions()
  // .subscribe(contactId, listId)
  // .create({email: "your@email.address"})
  // .update(id, {firstName: "Your FirstName", lastName: "Your last name"})
  .then(...)

var message = new iContact.Message(config);
message
  // read(limit, offset)
  .count()
  // .delete(id)

  // .readClick(messageId)
  // .countClick(messageId)

  // .readOpen(messageId)
  // .countOpen(messageId)
  .then(...)
```
