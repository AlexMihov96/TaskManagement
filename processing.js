function process() {

    let theArray = [];

    let input = $('#command');
    let result = $('#result');
    let executeBtn = $('#executeBtn');

    executeBtn.on('click', execute);
    input.keypress(function (event) {
        let keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            execute();
        }
    });

    let commands = {
        sort: function ([a]) {
            if (a) {
                throw new Error("invalid parameters")
            }
            theArray.sort() + '\n';
        }
    };

    delete: function (index) {
        if (index < 0 || index > theArray.length - 1 || !Number(index)) {
            throw new Error(`Error: invalid index "${index}"`);
        }
        theArray.splice(index, 1);
    },

    function execute() {

        let tokens = input.val().split(' ').filter(w => w !== '');
        let currentCommand = tokens[0];
        let data = tokens.slice(1);

        if (currentCommand) {
            try {
                if (theArray.length === 0) {
                    tokens.forEach(e => theArray.push(e));
                    result.text(result.text() + theArray.join(' ') + '\n');
                } else {
                    if (!commands.hasOwnProperty(currentCommand)) {
                        throw new Error('Error: invalid command');
                    }
                    commands[currentCommand](data);
                    if (currentCommand != 'end') {
                        if (currentCommand === 'count') {
                            result.text(result.text() + commands[currentCommand](tokens[1]) + '\n');
                            return;
                        }
                        result.text(result.text() + theArray.join(' ') + '\n');
                    } else {
                        result.text('Finished');
                        executeBtn.off('click', execute);
                    }

                }
            } catch (err) {
                result.text(result.text() + err.message + '\n');
            } finally {
                input.val('');
            }
        }
    }