## iContact
  Simple iContact module for node

## Quick Start

  Installation:

```bash
$ npm install --save eflex/icontact
```


## Usage
var config = {
  appId: appid,
  username: username,
  password: password,
  accountId: accountid,
  clientFolderId: clientfolderid
}

var icontact = new iContact(config)

var list = icontact.List()

list
  .value("new List")
  .create()
  .then(...)
