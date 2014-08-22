# node-switch-persist

node-switch-persist is a simple module to persist configuration, including
switches, in a local dotfile in your project's directory. It was created to fill
a niche that was just outside other packages.

## Usage
Simply instantiate an object with the provide constructor (I prefer
preferences), and use
[node-persist](https://github.com/simonlast/node-persist)'s API to read out a
preferences object that contains what was persisted along with command-line
arguments (provided by yargs).

Simple Example(persists in ./.persist/preferences.json):
```
var preferences = require('node-switch-persist')().getItem('preferences');
```

Most use cases will not need to write to preferences during execution, but it
can easily be accomplished:
```
var storage = require('node-switch-persist')();
var preferences = storage.getItem('preferences');
preferences.easypeasy = true;
storage.setItem('preferences', preferences);
```

One intended feature is supporting dependency injected modules:
```
//in submodule:
var preferences = storage(passedInInstanceOrConfigObject);
```

## API
See [API Docs](./API.md)
