$("table").delegate('td', 'mouseover mouseleave', function (e) {
    if (e.type == 'mouseover') {
        if ($(e.target).attr('class')) {
            var classes = $(e.target).attr('class').split(/\s+/);
            $('th.' + classes[0]).addClass("hover");
            $('th.' + classes[1]).addClass("hover");
            $(e.target).addClass("hover");
        }

    }
    else {
        if ($(e.target).attr('class')) {
            var classes = $(e.target).attr('class').split(/\s+/);
            $('th.' + classes[0]).removeClass("hover");
            $('th.' + classes[1]).removeClass("hover");
            $(e.target).removeClass("hover");
        }

    }
});