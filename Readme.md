# MeshCmd Customization

This repository is an example on how to customize MeshCmd of Meshcentral 2 to add new features to fit individual requirements.

# Development test run

Windows:

```
MeshService64.exe meshcmd.js <the rest of the cli arguments>
```

Linux:

```
./meshagent_x86-64 meshcmd.js <the rest of the cli arguments>
```

# Built-in help

Windows:

```
MeshService64.exe meshcmd.js help <action>
```

Linux:

```
./meshagent_x86-64 meshcmd.js help <action>
```


## How MeshCmd works
MeshCMD is basically a MeshAgent binary appended with embedded Duktape javascript concatenated at the end of the file.

| MeshAgent |
| --------- |
| Embedded Duktape JS |
| JS length (4 bytes)|
| EXE JS Marker GUID (16 bytes) |

All modules will be appended into built-in modules handler except meshcmd.js.
See merge.js

## How to rebuild MeshCmd.exe
Edit any JS file to add features, then run for windows:

```
node merge.js
```

For Linux:

```
node merge-linux.js
```

The resulting MeshCMD.exe binary should have all the changes made.

## Credit
* Ylian St Hilaire
* Bryan Roe
