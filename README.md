# Local alias

Simple Node.js server app that allows you to create short aliases for any URL provided.

## Installation

```
npm install -g local-alias
```

You can install it on any machine running Node.js. I'm serving it from RaspberryPI 3.
Note that this tool makes sense if your hostname is short (e.g. `home` / `http://home/`) and the server runs at default `80` port. 
Therefore please make sure that `80` port is available on your machine.

You can always change the `port` value in the `config.json` file.

Here's [how to change your hostname on RPi](https://thepihut.com/blogs/raspberry-pi-tutorials/19668676-renaming-your-raspberry-pi-the-hostname).


## Configuration

```
cd $(npm root -g)
cd local-alias
nano config.json
```

Configure your `config.json` file providing an alias name as a key and URL as the value.
```
{
    "port": 80,
    "aliases": {
        "oh": "http://openhabianpi:8080/start/index",
        "github": "https://github.com/issues/mentioned"
    }
}
```

This way you have a quick access to those URLs by simply typing
```
home/github
```
in your browser.

You can also **link aliases to other aliases** (with `>` prefix) if you don't want to duplicate URLs.

```
{
    "port": 80,
    "aliases": {
        "forum": "https://community.openhab.org",
        "community": ">forum"
    }
}
```

You can also create simple **URL wildcards** with `%s` in the URL value:
```
{
    "aliases": {
        "binding": "http://docs.openhab.org/addons/bindings/%s/readme.html",
        "help": "http://docs.openhab.org/search?q=%s"
    }
}
```

And use it like this:
```
http://home/binding/airquality

http://home/help/whatever
```


## Running

`node local-alias`

There's a possibility to run this as a service using [`forever`](http://npmjs.com/package/forever).

```
~$ cd $(npm root -g)
```