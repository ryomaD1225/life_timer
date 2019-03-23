var saying = ["tamago","tomato","wakame","tamago","tomato","wakame","tamago","tomato","wakame","tamago","tomato","wakame","tamago","tomato","wakame","tamago","tomato","wakame",]
var personName = ["田中","中田","比嘉","田中","中田","比嘉","田中","中田","比嘉","田中","中田","比嘉","田中","中田","比嘉","田中","中田","比嘉","田中","中田","比嘉",,"田中","中田","比嘉"]


onload()

function onload(){
        var date = new Date();
        var year = date.getFullYear(); //1995 のような 4 桁の数字を返します。

        if((year % 4 == 0 && year % 100 != 0 ) || year % 400 == 0) {
            count = [0,31,60,91,121,152,182,213,244,274,305,335];
        }else{
            count = [0,31,59,90,120,151,181,212,243,273,304,334];
        }
        
        date_count = count[date.getMonth()] + date.getDate(); //月を表す0から11の数値、日を表す1から31の数値

        console.log(date_count)

            var quotes = document.getElementById('quotes');
            var author = document.getElementById('author');
                quotes.textContent = saying[date_count];
                author.textContent = personName[date_count];
    }

// setInterval(text,1000);

// 「天才とは、答えではなく疑問を呈する人。答えを知らないことに対して多くの疑問を持ち、好奇心から未知の領域に足を踏み入れていく。そして、ハイレベルな疑問を追求して得たハイレベルな理解を、我々普通の人間に伝えられる人こそが天才です」

