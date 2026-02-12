/*
 *   Handlebars
 */
(function($) {
    var compiled = {};
    $.fn.handlebars = function(template, data) {
        if (template instanceof jQuery) {
            template = $(template).html();
        }

        compiled[template] = Handlebars.compile(template);
        $(this).html(compiled[template](data));
    };
    $.fn.handlebarsAppend = function(template, data) {
        if (template instanceof jQuery) {
            template = $(template).html();
        }

        compiled[template] = Handlebars.compile(template);
        $(this).append(compiled[template](data));
    };
})(jQuery);

Handlebars.registerHelper('combo', function(v) {
    var options = [$("<option>", {
        value: "",
        text: "Seleccione una opcion",
        selected: true,
        disabled: true
    })];
    $.each(v, function(i, t) {
        var k = Object.keys(t);
        var regex = /\w+(Id|id)$/g;
        var val;
        var txt;
        if (regex.test(k[0])) {
            val = t[k[0]];
            txt = t[k[1]];
        } else {
            val = t[k[1]];
            txt = t[k[0]];
        }
        options.push($("<option>", {
            value: val,
            text: txt
        }));
    });
    var select = ($("<select>")).append(options);
    return new Handlebars.SafeString($(select).html());
});
Handlebars.registerHelper('formatCurrency', function(value) {
    return "$" + Number(value).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
});
Handlebars.registerHelper('checked', function(currentValue) {
    return currentValue == '1' ? ' checked="checked"' : '';
});
Handlebars.registerHelper('ternary', function(test, yes, no) {
    return test ? yes : no;
});
Handlebars.registerHelper('dateFormat', function(date) {
    return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
});
Handlebars.registerHelper('dateFormatHour', function(date) {
    return moment(date, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm");
});
