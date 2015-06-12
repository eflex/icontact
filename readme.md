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
var iContact = require("icontact");

var contact = new iContact.Contact(config)
contact
  .read(1000) // read(limit, offset)
  //.count()
  // .delete(id)
  // .subscriptions()
  // .subscribe(contactId, listId)
  // .create({email: "your@email.address"})
  // .update(id, {firstName: "Your FirstName", lastName: "Your last name"})
  .then(...)

var message = new iContact.Message(config);
message
.read(1000) // read(limit, offset)
//.count()
// .delete(id)
// .readClicks(messageId)
// .totalClicks(messageId)
.then(...)
```
