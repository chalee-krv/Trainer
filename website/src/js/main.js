function getReqParam(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function getStation(abbr) {
    if (!abbr) {
        return;
    }

    let route = /\D+/.exec(abbr)[0];
    let station = /\d+/.exec(abbr) ? /\d+/.exec(abbr)[0] : 0;
    return window.TN[getTrain(abbr)][station][route];
}

function getTrain(abbr) {
    if (!abbr) {
        return;
    }

    let train;
    switch (/\D+/.exec(abbr)[0]) {
        case 'n':
        case 'e':
        case 'w':
        case 's':
        case 'cen':
            train = 'bts';
            break;
        case 'b':
        case 'p':
        case 'bp':
            train = 'mrt';
            break;
        case 'a':
            train = 'arl';
            break;
    }
    return train;
}

function getJSON(file, callback) {
    $.getJSON("data/" + file + ".json", function (data) {
        callback(data);
    });
}