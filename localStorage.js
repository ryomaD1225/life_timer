(function() {
    var started = localStorage['started'];
    if (started) {
        // This is not the first time the user opens this file
        // How long has it been?

        var diff = Date.now() - started;

        if (diff >= 1000 * 60 * 60 * 24 * 7) {
            // At least one week has passed. Do something here.
        } else {
            // Less than a week has passed. Do something else here.
        }
    } else {
        // This is the first time the user opens this file 

        localStorage['started'] = Date.now();

        // Do something else here to welcome the user...
    }
})();