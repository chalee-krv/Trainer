var timetable = {
    start: {
        E9: ['07:24', '07:26', "07:29", "07:32", "07:35", "07:38"],
        S11: ['07:26', '07:29', "07:32", "07:36", "07:39", "07:43"],
        asok: ['7:24', '7:26', "7:29", "7:32", "7:35", "7:38"],
        salaDaeng: ['7:24', '7:26', "7:29", "7:32", "7:35", "7:38"]
    },
    dest: {
        E9: ['08:02', '08:05', "08:08", "08:12", "08:15", "08:19"],
        S11: ['08:05', '08:07', "08:10", "08:13", "08:16", "08:19"],
        asok: ['7:24', '7:26', "7:29", "7:32", "7:35", "7:38"],
        salaDaeng: ['7:24', '7:26', "7:29", "7:32", "7:35", "7:38"]
    }
};

function cal() {
    var start = document.getElementById('from').value;
    var dest = document.getElementById('to').value;

    window.open()
}

function swap() {
    var temp = document.getElementById('label-start').innerText;
    var start = document.getElementById('label-start');
    var dest = document.getElementById('label-dest');

    var startName = document.querySelector('.start-info > h1');
    var destName = document.querySelector('.dest-info > h1');

    var ulStart = document.getElementById('time-start');
    var ulDest = document.getElementById('time-dest');

    timetable.start[dest.innerText].forEach(function (value, i) {
        ulStart.children[i].innerHTML = value;
    });

    timetable.dest[start.innerText].forEach(function (value, i) {
        ulDest.children[i].innerHTML = value;
    });

    start.innerHTML = dest.innerText;
    dest.innerHTML = temp;

    temp = startName.innerText;
    startName.innerHTML = destName.innerText;
    destName.innerHTML = temp;
}