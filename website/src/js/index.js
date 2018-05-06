$.getJSON("data/map.json", function (data) {
    var bts = new Bloodhound({
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.tokens.join(' '));
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: data.bts
    });

    var mrt = new Bloodhound({
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.tokens.join(' '));
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: data.mrt
    });

    var arl = new Bloodhound({
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.tokens.join(' '));
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: data.arl
    });

    $('#from').typeahead({
        highlight: true
    }, {
        name: 'bts-station',
        display: 'name_EN',
        source: bts,
        templates: {
            header: '<h4 class="tt-header">BTS</h4>',
            suggestion: Handlebars.compile('<div>{{name_EN}} – {{name_TH}}</div>')
        }
    }, {
        name: 'mrt-station',
        display: 'name_EN',
        source: mrt,
        templates: {
            header: '<h4 class="tt-header">MRT</h4>',
            suggestion: Handlebars.compile('<div>{{name_EN}} – {{name_TH}}</div>')
        }
    }, {
        name: 'arl-station',
        display: 'name_EN',
        source: arl,
        templates: {
            header: '<h4 class="tt-header">Airport Rail Link</h4>',
            suggestion: Handlebars.compile('<div>{{name_EN}} – {{name_TH}}</div>')
        }
    });

    $('#to').typeahead({
        highlight: true
    }, {
        name: 'bts-station',
        display: 'name_EN',
        source: bts,
        templates: {
            header: '<h4 class="tt-header">BTS</h4>',
            suggestion: Handlebars.compile('<div>{{name_EN}} – {{name_TH}}</div>')
        }
    }, {
        name: 'mrt-station',
        display: 'name_EN',
        source: mrt,
        templates: {
            header: '<h4 class="tt-header">MRT</h4>',
            suggestion: Handlebars.compile('<div>{{name_EN}} – {{name_TH}}</div>')
        }
    }, {
        name: 'arl-station',
        display: 'name_EN',
        source: arl,
        templates: {
            header: '<h4 class="tt-header">Airport Rail Link</h4>',
            suggestion: Handlebars.compile('<div>{{name_EN}} – {{name_TH}}</div>')
        }
    });
});

$("#money, #time").click(function () {
    if (!$(this).hasClass('active')) {
        $("#money, #time").removeClass('active');
        $(this).addClass('active');
    }
});

$('#from').keypress(function () {
    if ($(this).parents(".form-group").hasClass('has-error has-feedback')) {
        $(this).parents(".form-location").children(".error-message:eq(0)").attr('hidden', true);
        $(this).parents(".form-group").children(".form-control-feedback").attr('hidden', true);
        $(this).parents(".form-group").removeClass('has-error has-feedback');
    }
});

$('#to').keypress(function () {
    if ($(this).parents(".form-group").hasClass('has-error has-feedback')) {
        $(this).parents(".form-location").children(".error-message:eq(1)").attr('hidden', true);
        $(this).parents(".form-group").children(".form-control-feedback").attr('hidden', true);
        $(this).parents(".form-group").removeClass('has-error has-feedback');
    }
});

$("#cal").click(function () {
    var from = $('#from');
    var to = $('#to');
    var as = $('.btn.active');

    if (isValid(from, to) && !isSame(from, to)) {
        var url = '/result.html?from=' + from.val().trim() + '&to=' + to.val().trim() + '&as=' + (as.length ? as.attr('id') : 'money');
        window.open(encodeURI(url), '_self');
    }
});

function isValid(f, t) {
    if (!f.val().trim()) {
        f.parents(".form-location").children(".error-message:eq(0)").removeAttr('hidden');
        f.parents(".form-group").children(".form-control-feedback").removeAttr('hidden');
        f.parents(".form-group").addClass('has-error has-feedback');
    }

    if (!t.val().trim()) {
        t.parents(".form-location").children(".error-message:eq(1)").removeAttr('hidden').text("Please provide a valid station");
        t.parents(".form-group").children(".form-control-feedback").removeAttr('hidden');
        t.parents(".form-group").addClass('has-error has-feedback');
        return false;
    }

    return true;
}

function isSame(f, t) {
    if (f.val().trim() == t.val().trim()) {
        t.parents(".form-location").children(".error-message:eq(1)").removeAttr('hidden').text("Please select a different station");
        t.parents(".form-group").children(".form-control-feedback").removeAttr('hidden');
        t.parents(".form-group").addClass('has-error has-feedback');
        return true;
    }

    return false;
}