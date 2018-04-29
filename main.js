const bluzelle = require('bluzelle');


let UUID = "caa7eeca-3ca8-427d-bd17-a42e8c37ea06";
bluzelle.connect('ws://140.114.78.42:51010', UUID);


// $("#submit").on("click", function (event) {
//     console.log("sendArticle")
//     var title = $('input#title').val();
//     var content = simplemde.value();
//
//     bluzelle.create(title, {title: title, content: content}).then(() => {
//         console.log(UUID);
//     });
// });


bluzelle.keys().then(keys => {
    console.log(keys);
    for (x in keys) {
        bluzelle.read(keys[x]).then(value => {
            let title = value['title']
            let content = value['content']
            console.log(content)
        }, error => {
        });


    }
}, error => {
    console.log(error);
});


