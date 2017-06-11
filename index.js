var os = require("os");
var http = require('http');
var connect = require('connect');
var path = require('path');
var redirect = require('connect-redirection');
var SelfReloadJSON = require('self-reload-json');
var config = new SelfReloadJSON(path.resolve(__dirname, 'config.json'));
var hostname = os.hostname();

var app = connect()
    .use(redirect());

app.use(function(req, res) {
    var aliases = config.aliases;
    var request = req.url.substr(1);
    var split = request.split('/');
    var alias = split[0];
    var wildcard = split.length === 2 && split[1];

    // In case there's an alias linking to other alias' alias :-O
    alias = alias.substr(0, 3) === "%3E" ? alias.substr(3) : alias;

    if (aliases.hasOwnProperty(alias)) {
        var url = aliases[alias];
        var link = url.substr(1);

        // If alias redirects to other alias
        if (url.substr(0, 1) === ">" && aliases.hasOwnProperty(link)) {
            url = aliases[link];
        }

        // If alias contains variable wildcard (i.e "http://home/sth/hello")
        if (wildcard && url.includes("%s")) {
            url = url.replace(/%s/g, wildcard);
        }

        console.log('Redirecting to "' + url + '"');
        res.redirect(url);
    } else {
        res.end('Welcome! ' + req.url +
            '\n\n' +
            'Here\'s a list of your aliases:\n' +
            JSON.stringify(aliases, null, 4)
        );
    }

});

http.createServer(app).listen(config.port, function() {
    console.log('Server running on http://' + hostname + ':' + config.port + ' ...\n');
});