#Index

**Namespaces**

* [defaults](#defaults)
  * [defaults.dir](#defaults.dir)
  * [defaults.rememberableKeys](#defaults.rememberableKeys)

**Functions**

* [Preferences(config)](#Preferences)
  * [Preferences~preferences](#Preferences..preferences)
 
<a name="defaults"></a>
#defaults
Defaults config object for instances.
Enumerates and documents options - template for passed in object.

**Type**: `Object`  
**Members**

* [defaults](#defaults)
  * [defaults.dir](#defaults.dir)
  * [defaults.rememberableKeys](#defaults.rememberableKeys)

<a name="defaults.dir"></a>
##defaults.dir
String of directory for backing JSONs.

**Type**: `String`  
<a name="defaults.rememberableKeys"></a>
##defaults.rememberableKeys
Map of rememberable switches, and whether they are rememberable.
Name refers to keys in args map.

**Type**: `Array`  
<a name="Preferences"></a>
#Preferences(config)
Constructor for node-persist instance with a preferences key that handles
command-line switches

**Params**

- config `Object` - object like defaults  

