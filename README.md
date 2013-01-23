amass
=====

Amass system information and expose it as JSON

Installation
------------

Command line tool

    npm install -g amass

Usage
-----

    $ amass | json os.arch
    x64
    $ amass | json os.type
    Darwin
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

Plugins
-------

*still in beta*

All plugins will be stored in `/var/amass`.  The idea is that plugins should be standalone
node modules that expose useful system information, and as such, be installed in node\_modules
in `/var/amass`.

#### how to

You may need to `sudo` some of these commands.

Adding a plugin ([amass-etc-passwd](https://github.com/bahamas10/amass-etc-passwd))

    $ amass --add amass-etc-passwd
    amass-etc-passwd@0.0.0 node_modules/amass-etc-passwd
    └── etc-passwd@0.1.1 (lazylines@1.0.0)

Now, when you run `amass`, you'll see a new root key of `etc-passwd`

View the installed plugins

    $ amass --list
    amass@0.0.4 /private/var/amass
    └─┬ amass-etc-passwd@0.0.0
      └─┬ etc-passwd@0.1.1
        └── lazylines@1.0.0

That shows you the installed plugins and their dependencies.  If the output
looks familiar to you sharp eye ;), The output is straight from `npm`.

Now, remove the plugin

    $ amass --remove amass-etc-passwd
    $ echo $?
    0

Notice no output is generated (just like `npm remove`), but that the exit code
is properly set.

List the plugins once more and see that it is empty

    $ amass --list
    amass@0.0.4 /private/var/amass
    └── (empty)


License
-------

MIT License
