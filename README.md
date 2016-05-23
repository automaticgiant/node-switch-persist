# PROJECT STATUS
This is not maintained. [rc](https://github.com/dominictarr/rc) is probably better. You can have the repo if you want.


# node-switch-persist

node-switch-persist is a simple module to persist configuration, including
switches, in a local dotfile in your project's directory. It was created to fill
a niche that was just outside other packages.

## Usage
Simply instantiate an object with the provide constructor and use its
preferences object that contains what was persisted along with command-line
arguments (provided by yargs).

Simple Example(persists in ./.persist/preferences.json):
```
var preferences = require('node-switch-persist')().preferences);
```

Most use cases will not need to write to preferences during execution, but it
can easily be accomplished by using
[node-persist](https://github.com/simonlast/node-persist)'s API with the store:
```
var persist = require('node-switch-persist')();
var preferences = persist.preferences;
preferences.easypeasy = true;
persist.store.setItem('preferences', preferences);
```

## API
See [API Docs](./API.md)
