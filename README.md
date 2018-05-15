# Bluzelle Hackthon report 3

# 用bluzelle js api做一個去中心化blogger

這篇是講技術實現，bussiness model以及可行性探討，在另外一篇
我想要做的是一個完全去中心化的blog系統，包含blog的廣告也使用智能合約做去中心化
前端是html+js，和一般網頁並無二致
後端是IPFS(檔案)+Bluzelle(資料)，這邊完全不使用任何中心化的後端框架

具體結構如下：

![](https://d2mxuefqeaa7sj.cloudfront.net/s_0721358924718A09B16679608A78189EBB90342A1866096B32E37B86179EEAA8_1526394938760_file.png)




# 初始化
1. 創個新專案並安裝bluzelle api
    mkdir new_project
    cd new_project
    npm init
    npm install bluzelle


2. bluzelle的app必須要有一個uuid才能存取資料

你可以從這邊產生一個:
https://www.uuidgenerator.net/version4
不同uuid之間資料是不相通的，每個app都需要綁一個uuid


3. 新增main.js，並輸入
    const bluzelle = require('bluzelle');
    
    let UUID = "{改成你的UUID}";
    bluzelle.connect('ws://{改成你的IP}:51010', UUID);


# Bundle packages

由於我js不會寫react.js或node.js後端
web的js必須要包成一整個js檔案才能用，而npm install的js都是散的

我這邊和幾位大大學了兩手，這邊兩招可以用：[browserify](https://www.npmjs.com/package/browserify)和[bower](https://bower.io/)
先把它裝起來:

    npm install -g browserify
    npm install -g bower


## browserify用法
    browserify main.js > bundle.js

然後你就會得到含有所有require package的單一檔案bundle的js
如果有動到main.js，要重新執行上面的指令再打包一次

## bower用法 & jquery install

在vincent的介紹下，研究了一下react.js，發現這們學問博大精深XD
黑客松應該來不及搞懂他，所以後來採用了比較簡單直覺的jquery

要下載包好的jquery可以改用bower來install，就會直接是一個js檔：

    bower install jquery

除了jquery，有很多js的專案都支援用bower安裝
由於這次我做的是blog，採用了markdown作為格式標記語法，因此我還安裝了兩個套件：

    bower install simplemde --save
    bower install showdown 

其中一個是md編輯介面，另外一個是把md render成html輸出

都裝好之後，檔案結構會長的像這個樣子


![](https://d2mxuefqeaa7sj.cloudfront.net/s_0721358924718A09B16679608A78189EBB90342A1866096B32E37B86179EEAA8_1526365391364_file.png)



## simplemde用法

https://simplemde.com/
它是一個長得像這一的editor:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_0721358924718A09B16679608A78189EBB90342A1866096B32E37B86179EEAA8_1526392668618_file.png)


用法很簡單，先在index.html
body標籤內新增一個text area

    <textarea id="demo1"></textarea>

然後在後面用下面這段code把普通的textarea替換成simplemde的介面

    <script>
    var simplemde = new SimpleMDE({ element: document.getElementById("demo1") });
    </script>


## showdown用法

https://github.com/showdownjs/showdown
這是一個markdown to html的renderer
這個用法也是很簡單，new一個converter物件
用下列方法就可以得到轉換後的html

    var converter = new showdown.Converter(),
        text      = '#hello, markdown!',
        html      = converter.makeHtml(text);



## bluzelle js用法

這邊寫得很清楚
https://bluzelle.github.io/api/
用法很簡單 他寫得很清楚 我就不贅述了
剩下可以看main.js


