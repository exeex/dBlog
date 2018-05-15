///////////main.js//////////


// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}
///////////connect//////////
const bluzelle = require('bluzelle');
let UUID = "caa7eeca-3ca8-427d-bd17-a42e8c37ea06";
bluzelle.connect('ws://140.114.78.42:51010', UUID);


///////////new post//////////
$("#submit").on("click", function (event) {
    console.log("sendArticle");
    var title = $('input#title').val();
    var content = simplemde.value();

    var d = new Date();
    let year = d.getFullYear().toString();
    let mon = d.getMonth().toString();
    let date = d.getDate().toString();
    let hr = d.getHours().toString();
    let min = d.getMinutes().toString();
    let time = year + '/' + mon + '/' + date + ' ' + hr + ':' + min;

    bluzelle.create(title, {title: title, time: time, content: content}).then(() => {
        console.log(time);
        window.location.href = "index.html";
    });
});


///////////showdown//////////
var converter = new showdown.Converter();

///////////load article//////////
bluzelle.keys().then(keys => {
    console.log(keys);
    for (x in keys) {
        bluzelle.read(keys[x]).then(value => {
            let title = value['title'];
            let content = value['content'];
            let time = value['time'];
            let article_id = title;
            let edit = "<a id='{0}-edit'>edit</a>".format(title);
            let del = "<a id='{0}-del'>delete</a>".format(title);
            content = converter.makeHtml(content);
            content = '<p>' + content + '</p>';

            console.log(content);
            let post = $('div#posts');

            post.append(`
                    <article id=${title}> 
                    <h1>${title}</h1>
                    <h4>${time} | ${edit} | ${del}</h4>
                    ${content}
                    <hr />
                    </article>
                    `)
            // post.append('<article id={0}>'.format(article_id));
            // post.append('<h1>' + title + '</h1>');
            // post.append(time);
            // post.append(edit);
            // post.append(' | ');
            // post.append(del);
            // post.append(content);
            // post.append('</article>');
            // post.append('<hr/>');


            $("#{0}-del".format(title)).on("click", function (event) {
                console.log("delArticle");

                bluzelle.remove(title).then(() => {
                    console.log("delArticle done.");
                    console.log('<article id={0}>'.format(article_id));
                    // window.location.href = "index.html";
                    $('article#{0}>'.format(article_id)).remove();
                });
            });
        }, error => {
        });


    }
}, error => {
    console.log(error);
});

///////////end main.js//////////