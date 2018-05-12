var from, to;

$('.station').mousedown(function (event) {
    $(this).attr({'x-down': event.clientX, 'y-down': event.clientY});
}).mouseup(function (event) {
    if ($(this).attr('x-down') == event.clientX && $(this).attr('y-down') == event.clientY) {
        if ($(this).attr('clicked')) {
            $(this).removeAttr('clicked');
            if (from && $(this).attr('id') == from.abbr)
                from = undefined;
            else
                to = undefined;
            updatePath();
        }
        else {
            $(this).attr('clicked', true);
            if (!from) {
                updatePath($(this).attr('id'));
            }
            else if (!to) {
                updatePath(null, $(this).attr('id'));
            }
            else {
                $('#' + from.abbr).removeAttr('clicked');
                $('#' + to.abbr).removeAttr('clicked');
                updatePath($(this).attr('id'), null);
            }
        }
    }
    $(this).removeAttr('x-down y-down');
});

$(function () {
    initMap(getReqParam('from'), getReqParam('to'));
});

function initMap(from, to) {
    let map = $('#map')[0];
    let mapContainer = $('.map-container');

    panzoom(map, {
        realPinch: true,
        autocenter: true,
        maxZoom: 3,
        minZoom: (mapContainer.height() / map.getBBox().height).toFixed(2),
    });

    mapContainer.mousedown(function () {
        $(this).addClass('grabbing');
    }).mouseup(function () {
        $(this).removeClass('grabbing');
    });

    if (from && to) {
        $('#' + from).mouseup();
        $('#' + to).mouseup();
    }
}

function updatePath(from, to) {
    if (from) {
        this.from = getStation(from);
    }

    if (to) {
        this.to = getStation(to);
    }
    else if (to === null) {
        this.to = undefined;
        $('[active]').removeAttr('active');
    }

    if (this.from && this.to) {
        $('#map').removeAttr('active');
        renderPath();
    }
    else {
        $('#map').attr('active', true);
    }

}

function renderPath() {
    var path = calPath();
    $('[active]').removeAttr('active');
    $('[hide]').removeAttr('hide');
    path.forEach(function (station, i) {
        $(`.${station}`).attr('active', true);
        if (i !== 0 || i !== path.length - 1)
            $(`#${station}`).attr('active', true);
        if (i !== path.length - 1) {
            let selector;
            if (station < path[i + 1]) {
                selector = `#${station}-${path[i + 1]}`;
                if (station === 'a5' && path[i + 1] === 'a6' || station === 's1' && path[i + 1] === 's2' || station === 'e4' && path[i + 1] === 'e5' || station === 'n7' && path[i + 1] === 'n8') {
                    $(`${selector}-${path[i + 1]}`).attr('active', true);
                    $(`${selector}-c`).attr('active', true);
                    $(`${selector}-${station}`).attr('active', true);
                }
                else {
                    if (station === 'b2' && path[i + 1] === 'b3')
                        $('#n7-n8-c').attr('hide', true);
                    else if (station === 'b10' && path[i + 1] === 'b11')
                        $('#a5-a6-c').attr('hide', true);
                    else if (station === 'b12' && path[i + 1] === 'b13')
                        $('#e4-e5-c').attr('hide', true);
                    else if (station === 'b16' && path[i + 1] === 'b17')
                        $('#s1-s2-c').attr('hide', true);
                    $(selector).attr('active', true);
                }
            }
            else {
                selector = `#${path[i + 1]}-${station}`;
                if (path[i + 1] === 'a5' && station === 'a6' || path[i + 1] === 's1' && station === 's2' || path[i + 1] === 'e4' && station === 'e5' || path[i + 1] === 'n7' && station === 'n8') {
                    $(`${selector}-${path[i + 1]}`).attr('active', true);
                    $(`${selector}-c`).attr('active', true);
                    $(`${selector}-${station}`).attr('active', true);
                }
                else {
                    if (path[i + 1] === 'b2' && station === 'b3')
                        $('#n7-n8-c').attr('hide', true);
                    else if (path[i + 1] === 'b10' && station === 'b11')
                        $('#a5-a6-c').attr('hide', true);
                    else if (path[i + 1] === 'b12' && station === 'b13')
                        $('#e4-e5-c').attr('hide', true);
                    else if (path[i + 1] === 'b16' && station === 'b17')
                        $('#s1-s2-c').attr('hide', true);
                    $(selector).attr('active', true);
                }
            }
        }
    })
}

function calPath() {
    let train = [getTrain(from.abbr), getTrain(to.abbr)];
    let route = [/\D+/.exec(from.abbr)[0], /\D+/.exec(to.abbr)[0]];
    let stt = [
        parseInt(/\d+/.exec(from.abbr) ? /\d+/.exec(from.abbr)[0] : 0),
        parseInt(/\d+/.exec(to.abbr) ? /\d+/.exec(to.abbr)[0] : 0)
    ];

    if (train[0] === train[1]) {
        if (route[0] === route[1])
            return getPath(stt[0], stt[1], route[0]);
        else if (route[0] === 'cen' || route[0] === 'bp')
            return getPath(0, stt[1], route[1]);
        else if (route[1] === 'cen' || route[1] === 'bp')
            return getPath(stt[0], 0, route[0]);
        else if (train[0] === 'bts' || train[0] === 'mrt')
            return getPath(stt[0], 1, route[0]).concat(
                train[0] === 'bts' ? ['cen'] : ['bp'],
                getPath(1, stt[1], route[1])
            );
    }
}

function getPath(from, to, route) {
    let path = [];
    for (let i = from; from < to ? i <= to : i >= to; from < to ? i++ : i--) {
        if (route === 'n' && i === 6 || route === 's' && i === 4)
            continue;
        else if (i === 0) {
            if (route === 'n' || route === 'e' || route === 'w' || route === 's')
                path.push('cen');
            else if (route === 'b' || route === 'p')
                path.push('bp');
        }
        else
            path.push(route + i);
    }
    return path;
}