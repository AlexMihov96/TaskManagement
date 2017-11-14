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
        },
         roll: function ([direction]) {
            switch (direction) {
                case 'right':
                    let lastElement = theArray.pop();
                    theArray.unshift(lastElement);
                    break;
                case 'left':
                    let firstElem = theArray[0];
                    let newArray = [];
                    for(let i = 1; i < theArray.length; i++) {
                        newArray.push(theArray[i]);
                    }
                    newArray[newArray.length] = firstElem;
                    theArray = newArray;
                    break;
                default:
                    throw new Error('Error: invalid command parameters');
        },
        reverse: function () {
            theArray = theArray.reverse();
        },
        delete: function (index) {
        if (index < 0 || index > theArray.length - 1 || !Number(index)) {
            throw new Error(`Error: invalid index "${index}"`);
        }
        theArray.splice(index, 1);
        },
        end: function () {
        }
    };

    

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