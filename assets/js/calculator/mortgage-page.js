google.load("visualization", "1", { packages: ["corechart"] });
/*if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(fn, scope) {
        for(var i = 0, len = this.length; i < len; ++i) {
            fn.call(scope, this[i], i, this);
        }
    }
}
if (!Object.keys) {
    Object.keys = function(obj) {
        var keys = [],
            key;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }

        return keys;
    };
}
Array.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
};
if (typeof Element.prototype.addEventListener === 'undefined') {
    Element.prototype.addEventListener = function (e, callback) {
      e = 'on' + e;
      return this.attachEvent(e, callback);
    };
  }*/
$(document).ready(function() {
    var slider1 = document.getElementById("cmortgage");
    var cmortgage_input = $("#cmortgage_input");
    noUiSlider.create(slider1, {
        start: 2.15,
        step: 0.05,
        range: {
            'min': 0,
            'max': 12
        }
    });
    slider1.noUiSlider.on('update', function(values, handle) {
        if (values[handle] == 0) {
            cmortgage_input.val("");
        } else {
            cmortgage_input.val(values[handle]);
        }
    });
    cmortgage_input.on('change', function() {
        slider1.noUiSlider.set([this.value, null]);
    });

    var slider2 = document.getElementById('amortgage');
    noUiSlider.create(slider2, {
        start: 0,
        step: 0.1,
        range: {
            'min': 0,
            'max': 12
        }
    });
    var amortgage_input = $("#amortgage_input");;

    slider2.noUiSlider.on('update', function(values, handle) {
        if (values[handle] == 0) {
            amortgage_input.val('');
        } else {
            amortgage_input.val(values[handle]);
        }
    });
    amortgage_input.on('change', function() {
        slider2.noUiSlider.set([this.value, null]);
    });

    dText = { type: 'Type', monthyPayments: 'Monthly Payment', interestColor: '#d4d0cc', mortgageColor: '#4f7a9f', cashColor: '#aaced4', cashOnly: 'Cash Only', totalCost: 'Total Cost Year End', loadBalance: 'Load Balance at year end', interestPaidMonth: 'Interest Paid Month', annualInterestRate: 'Annual Interest Rate', cash: 'Cash', amount: 'Amount)', interest: 'Interest', mortgage: 'Mortgage', cash: 'Cash Outlay', total: 'Total Cost', year: 'Year', monthlyPayment: 'Monthly Payment', interestRate: 'Interest Rate' };
    var options = {
        price: '#price',
        mortgage_value: '#mortgage',
        terms: '#terms',
        cmortgage: '#cmortgage',
        amortgage: '#amortgage',
        curent_mortgage: '#cmortgage_input',
        fix_years: '#fix_years',
        future_mortgage: '#amortgage_input',
        after_years: '#after_years',
        monthly_payment: '#monthly_payment',
        reset: '#reset',
        fadeBox: '.all',
        chart_div: 'chart_div',
        chart_table: '#morttable',
        piechart: 'piechart',
        pietable: '#pietable',
        pieoptions: { pieHole: 0.4, height: 170, width: 170, fontSize: 10.5, tooltip: { textStyle: { fontSize: 12 } }, legend: 'none', slices: { 0: { color: dText.mortgageColor }, 1: { color: dText.cashColor }, 2: { color: dText.interestColor } }, chartArea: { width: 140, height: 140 } },
        chartoptions: {
            vAxis: { baselineColor: '#000000', viewWindow: { min: 0 }, textStyle: { fontSize: 11.5, color: '#000000' } },
            legend: { position: 'in', alignment: 'start', textStyle: { fontSize: 12.5, color: '#000000' } },
            vAxes: { 0: { format: '$#,###,###' }, 1: { format: '##.###%' } },
            hAxis: {
                title: "Year",
                minValue: 0,
                maxValue: 5,
                gridlines: { count: 6 },
                titleTextStyle: { fontSize: 12.5, italic: 'false', color: '#000000' },
                baselineColor: '#fff',
                gridlineColor: '#fff',
                gridlines: { count: 6 },
                textStyle: { fontSize: 11.5, color: '#000000' }
            },
            series: { 0: { targetAxisIndex: 0, type: "bars" }, 1: { targetAxisIndex: 1, type: "line" } },
            colors: ['#95B3D7', '#7F7F7F'],
            animation: { duration: 700, easing: 'out' },
        },
        dText: dText
    }
    $('#calculate').mortgage(options);
});