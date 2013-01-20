amass
=====

Amass system information and expose it as JSON

Installation
------------

Command line tool

    npm install -g amass

Node module

    npm install amass

Usage
-----

As a module

``` js
var amass = require('amass');
amass(function(errors, data) {
    console.log(data);
});
```

`data` is an object representing all of the data that was amassed, and errors,
if set, is an array of any errors encountered from any of the plugins.

Command line tool

    $ amass | json os.arch
    x64
    $ amass | json os.type
    x64
    $ amass | json os.cpus.0
    {
      "model": "MacBookAir5,2",
      "speed": 1800,
      "times": {
        "user": 105979210,
        "nice": 0,
        "sys": 35549920,
        "idle": 314724130,
        "irq": 0
      }
    }

Why?
----

There are other well-known programs that do a similar function.  `amass` is written
completely in node, and as such, doesn't rely on user-land tools that often
behave differently on different operating systems, nor does it use and abuse
`sed`, `awk`, `cut`, etc. all information comes from node's builtin modules.

Also, speed.

    dave @ [ manilla :: (Darwin) ] ~/dev/node-amass $ time ./bin/amass.js > /dev/null

    real    0m0.064s
    user    0m0.053s
    sys     0m0.010s

License
-------

MIT License
