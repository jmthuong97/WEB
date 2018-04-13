
const numInputs = document.querySelectorAll('input[type=number]')
numInputs.forEach(function (input) {
    input.addEventListener('change', function (e) {
        if (e.target.value == '') {
            e.target.value = 0
        }
    })
});

$(document).ready(function () {

    $('.change').on('input', function (event) {
        var indexCells = parseInt(event.target.dataset.index) + 1;
        var rowCount = $('#customers tr').length;
        var total = 0;
        for (var i = 2; i < rowCount; i++) {
            var x = document.getElementById("customers").rows[i].cells[indexCells].children[0].value;
            total = parseInt(total) + parseInt(x);
        }
        document.getElementById("customers").rows[1].cells[indexCells].innerHTML = total;
    });

    $('.change').on('input', _.debounce(function (event) {
        var objectData = {
            idRound: event.target.dataset.round,
            index: event.target.dataset.index,
            score: event.target.value
        }
        console.log(objectData)
        var objectDataString = JSON.stringify(objectData);
        // console.log(objectDataString)
        $.ajax({
            type: "POST",
            url: "/updateScore",
            dataType: "json",
            data: {
                o: objectDataString
            },
        });
    }, 100));
});

async function addRound() {
    var table = document.getElementById("customers");
    var row = table.insertRow(-1);
    // create first cell
    var count = ++document.getElementById("noRound").value;
    var cell0 = row.insertCell(0);
    cell0.innerHTML = "Round " + count;
    // create next cell
    var idRound = document.getElementById("idRound").value;
    for (let i = 0; i < 4; i++) {
        // create input
        var input = document.createElement("input");
        input.type = 'number';
        input.className = 'change';
        input.value = 0;
        input.setAttribute('data-index', i);
        input.setAttribute('data-round', idRound);
        input.required = 'required';
        // create next cell
        var nextcell = row.insertCell(i + 1);
        nextcell.appendChild(input);
    }
    // send req to create new round
    var idGame = document.getElementById("idGame").value;
    var objectData = {
        idGame: idGame,
        noRound: count
    }
    var objectDataString = JSON.stringify(objectData);
    console.log(objectDataString)
    await $.ajax({
        type: "POST",
        url: "/createRound",
        dataType: "json",
        data: {
            o: objectDataString
        },
    });
    location.reload();
}


