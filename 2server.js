const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');


app.listen(PORT, function () {
    console.log('start serwera na porcie ' + PORT);
});

app.use(
    express.urlencoded({
        extended: true,
    })
);
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(express.static('static'));


app.get('/', function (req, res) {
    console.log('ścieżka do katalogu głównego aplikacji: ' + __dirname);
    res.sendFile(path.join(__dirname + '/static/pages/addUser.html'));
});


let users = [
    { nick: "111", email: "111@w.pl" },
    { nick: "222", email: "222@w.pl" },
    { nick: "333", email: "333@w.pl" }
]


app.post('/addUser', function (req, res) {
    console.log(req.body);
    var nick = req.body.nick;
    var email = req.body.email
    var licznik = 0;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            licznik++;
        }
    }
    if (licznik > 0) {
        res.send("Taki mail jest już w bazie");
    }
    else {
        users.push({ nick: nick, email: email })
        console.log(users);
        res.redirect("/")
    }

});

app.get('/removeUserBySelect', function (req, res) {

    var select = "<select name=dane>";
    for (var i = 0; i < users.length; i++) {
        select += "<option value=" + users[i].email + ">" + users[i].email + "</option>"
    }
    select += "</select>"

    res.send(
        "<form action='/usun1' method='POST'> <input type='submit' value='usun'> </input> <br>" + select + "</form>"
    );

});


app.get('/removeUserByRadio', function (req, res) {

    var input = "";
    for (var i = 0; i < users.length; i++) {
        input += "<input type=radio name=dane value=" + users[i].email + ">" + users[i].email + "</input> <br> "
    }

    res.send(
        "<form action='/usun2' method='POST'>" + input + "<input type='submit' value='usun'> </input> </form>"
    );


});

app.get('/removeUserByCheckbox', function (req, res) {
    var input = "";

    for (var i = 0; i < users.length; i++) {
        input += "<input type=checkbox name=dane value=" + users[i].email + ">" + users[i].email + "</input> <br> "
    }

    res.send(
        "<form action='/usun3' method='POST'>" + input + "<input type='submit' value='usun'> </input> </form>"
    );
});

app.post('/usun1', function (req, res) {
    var mail = req.body.dane;

    for (var i = 0; i < users.length; i++) {
        if (users[i].email == mail) {
            users.splice(i, 1);
        }
    }
    console.log(users);
    res.redirect("/removeUserBySelect");
});


app.post('/usun2', function (req, res) {
    var mail = req.body.dane;

    for (var i = 0; i < users.length; i++) {
        if (users[i].email == mail) {
            users.splice(i, 1);
        }
    }
    console.log(users);
    res.redirect("/removeUserByRadio");
});

app.post('/usun3', function (req, res) {
    var maile = req.body.dane;
    if (Array.isArray(maile)) {
        for (var j = 0; j < maile.length; j++) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].email == maile[j]) {
                    users.splice(i, 1);
                }
            }
        }
    } else {
        for (var i = 0; i < users.length; i++) {
            if (users[i].email == maile) {
                users.splice(i, 1);
            }
        }
    }


    console.log(users);
    res.redirect("/removeUserByCheckbox");
});





