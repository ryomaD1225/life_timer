//即時関数で囲う
(function(){

    //厳密なエラーチェックのための記述
    'use strict'; 

    var timer = document.getElementById('timer');
    var min = document.getElementById('min');
    var sec = document.getElementById('sec');
    var reset = document.getElementById('reset');
    var start = document.getElementById('start');

    //年齢を選択する時に使う用の関数
    var Age = document.getElementById('age');

    //睡眠時間選択する時に使うよう変数
    var Sleep = document.getElementById('sleep');

    //スタートタイムを押した時の時間を入れる変数
    var startTime;

    //残り時間を計算するための変数
    var timeLeft;

    //とりあえず4秒で設定しておく。 現在時刻と表示形式を合わせるために * 1000
    var timeToCountDown = 0;

    //clearTimeoutメソッドを使いたいので、その時用に変数定義
    var timerId;

    //変数を用意し、カウントダウンの状態を管理できるようにする * Startの兼用
    var isRunning = false;

    //変数を用意して、年齢の選択時に適切な値を出力するようにする
    var hoursLeft = 80;

    //年齢の選択後に余生年数を代入するための変数
    var leftLifeTime = 0;

    //一日の活動時間を計算する
    var dayHours = 24;

    //睡眠時間の選択後に余生年数を〜時間単位で代入するための変数
    var awakeTime = 0;

    //残り時間を表示するためにミリ秒を渡すと分とか秒に直してくれる関数を作る
    function updateTimer(ms){

    //引数として渡されたtでデータオブジェクトを作りたいので変数dという変数名で作ってみる

    var h = String(Math.floor(ms / 3600000));
    var m = String(Math.floor((ms - h * 3600000)/60000));
    var s = String(Math.round((ms - h * 3600000 - m * 60000)/1000));
    timer.textContent = h + '時間' + m + '分' + s + '秒';
    // var hms = "";
	// var h = t / 3600 | 0;
	// var m = t % 3600 / 60 | 0;
    // var s = t % 60;


	// if (h != 0) {
	// 	hms = h + "時間" + padZero(m) + "分" + padZero(s) + "秒";
	// } else if (m != 0) {
	// 	hms = m + "分" + padZero(s) + "秒";
	// } else {
	// 	hms = s + "秒";
	// }

	// timer.textContent = hms;

	// function padZero(v) {
	// 	if (v < 10) {
	// 		return "0" + v;
	// 	} else {
	// 		return v;
	// 	}
    // }
    
        // var d = new Date(t);

        // var h = d.getHours();
        // var m = d.getMinutes();
        // var s = d.getSeconds();
        // var ms = d.getMilliseconds();
        // m = ('0' + m).slice(-2);
        // s = ('0' + s).slice(-2);
        // ms = ('00' + ms).slice(-3);
        // timer.textContent = h + ':' + m + ':' + s + ':' + ms;

    }


    function countDown(){

        //setTimeoutを使って次の処理を10ミリ秒後に実行するようにする
        timerId = setTimeout(function(){

        //残り時間 = カウントされる時間 - 現在時刻
        timeLeft = timeToCountDown - (Date.now() - startTime);

        //残り時間が0になった時の処理をif文で記述する。
        if(timeLeft < 0){
            isRunning = false;
            start.textContent = 'Start';
            clearTimeout(timerId);
            timeLeft = 0;

            //カウントをリスタートした際にデフォ値の4秒にならないようにする
            timeToCountDown = 0;

            updateTimer(timeLeft);
            return;
        }

        //countDownを再帰的に呼び出すためのに記述
        updateTimer(timeLeft)
        countDown();

       //1秒以下の時間も表示されるようにする
        },10);
    };


    
    //startを押した際に発火するイベント
    start.addEventListener('click',function(){

        if(isRunning === false){
            isRunning = true;

            start.textContent = 'Stop';

            startTime = Date.now();

            //カウントダウンの機能は再帰的に実行したいのでcountDown関数を入れとく
            countDown();
        }else{
            isRunning = false;

            //表記をStartに戻す
            start.textContent = 'Start';

            //この時点のtimeLeftで更新してあげる
            timeToCountDown = timeLeft;

            //カウントを止めたいのでclearTimeoutする
            clearTimeout(timerId);
        }
    });

    //Minを押した時の処理を記述
    min.addEventListener('click',function(){

        //カウントダウン中に設定時間を変更できないようにする
        if(isRunning === true){
            return;
        }

        //分 = 60秒なので
        timeToCountDown += 60 * 1000;

        //60分、60秒を超えたら0になるようにする
        if(timeToCountDown >= 60 * 60 * 1000){
            timeToCountDown = 0;
        }

        //timeToCountDownをtimerに反映させたいのでupDatetimerを使う
        updateTimer(timeToCountDown);
    });


    //Secを押した時の処理
    sec.addEventListener('click',function(){

        //カウントダウン中に設定時間を変更できないようにする
        if(isRunning === true){
            return;
        }

        //60秒なので
        timeToCountDown += 1000;

        if(timeToCountDown >= 60 * 60 * 1000){
            timeToCountDown = 0;
        }

        //timeToCountDownをtimerに反映させたいのでupDatetimerを使う
        updateTimer(timeToCountDown);
    });


    //Resetを押した時の処理
    reset.addEventListener('click',function(){

        //カウントダウン中に設定時間を変更できないようにする
        if(isRunning === true){
            return;
        }

        //60秒なので
        timeToCountDown = 0;

        //timeToCountDownをtimerに反映させたいのでupDatetimerを使う
        updateTimer(timeToCountDown);
    });


    //年齢を選択する時に発火する関数
    setAgeNumber();

    function setAgeNumber(){
        for(var i = 10; i <= 80; i ++){
            var option = document.createElement("option");
            option.value = i;
            option.innerText = i;
            Age.appendChild(option);
        }
    }

    //年齢を選択するプルダウンメニューを変更したら発火
    Age.addEventListener('change',function(){
        var ageValue = document.getElementById("age").value;

        //余生の時間を計算
        leftLifeTime += (hoursLeft - ageValue); 
        alert(leftLifeTime);
    });


    //睡眠時間を選択する際に発火する関数
    setSleepNumber();

    function setSleepNumber(){
        for(var i = 1; i <= 24; i++){
            var option = document.createElement("option");
            option.value = i;
            option.innerText = i;
            Sleep.appendChild(option);
        }
    }

    //睡眠時間を選択するプルダウンメニューを変更したら発火
    Sleep.addEventListener('change',function(){
        var sleepValue = document.getElementById("sleep").value;

        //残り時間を計算 
        // awakeTime = (dayHours - sleepValue) * 365 * leftLifeTime;
        awakeTime = (dayHours - sleepValue) * 365 * leftLifeTime;

        timeToCountDown = awakeTime * (60 * 60000);
        updateTimer(timeToCountDown);
        alert(timeToCountDown);
    });

    


})();