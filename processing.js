function process() {

    let theArray = [];

    let input = $('#command');
    let result = $('#result');
    let executeBtn = $('#executeBtn');

    executeBtn.on('click', execute);
    input.keypress(function(event) {
        let keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            execute();
        }
    });

let commands = {};