	(function($) {
	    $.fn.mortgage = function(options) {
	        var dText = { header: '物業按揭列表', type: 'Type', monthyPayments: '每月供款', interestColor: '#d4d0cc', mortgageColor: '#4f7a9f', cashColor: '#aaced4', cashOnly: '現金支出', totalCost: '總支出', loadBalance: '餘下供款', interestPaidMonth: '每月供款内之利息', annualInterestRate: '年利率', cash: 'Cash', amount: 'Amount)', interest: '利息總額', mortgage: '按揭總額', cash: '現金支出', total: '支付總額', year: '年', monthlyPayment: '每月供款', interestRate: '利率' };
	        $.extend(dText, options.dutyText);
	        var fadeBox = $(options.fadeBox);
	        var priceele = $(options.price);
	        var mortgage_valueele = $(options.mortgage_value);
	        var termsele = $(options.terms);
	        var cmortgage = options.cmortgage;
	        var amortgage = options.amortgage;
	        var curent_mortgageele = $(options.curent_mortgage);
	        var fix_yearsele = $(options.fix_years);
	        var future_mortgageele = $(options.future_mortgage);
	        var after_yearsele = $(options.after_years);
	        var resetele = $(options.reset);
	        var monthly_payment = $(options.monthly_payment);
	        var pietable = $(options.pietable);
	        var chart_table = $(options.chart_table);
	        var price;
	        var terms;
	        var terms_month;
	        var mvalue;
	        var cmort;
	        var mort_amount;
	        var fixyear;
	        var fixmonth;
	        var fmort;
	        var ayear;
	        var amonth;
	        var defaultView = true;
	        var chartVisual = [
	            [dText.year, dText.monthyPayments, dText.interestRate],
	            ['1', 1, 1]
	        ];
	        $.extend(chartVisual, options.chartVisual);
	        //google.setOnLoadCallback(drawChart);
	        var chartdata = google.visualization.arrayToDataTable(chartVisual);
	        var chartoptions = {

	            vAxis: {
	                baselineColor: '#000000',
	                textStyle: { fontSize: 11.5, color: '#000000' },
	            },
	            legend: {
	                position: 'in',
	                alignment: 'start',
	                textStyle: { fontSize: 12.5, color: '#000000' }
	            },
	            vAxes: { 0: { format: '$#,###,###' }, 1: { format: '##.###%' } },
	            hAxis: {
	                title: "Year",
	                titleTextStyle: { fontSize: 12.5, italic: 'false', color: '#000000' },
	                baselineColor: '#fff',
	                gridlineColor: '#fff',
	                gridlines: { count: 6 },
	                textStyle: { fontSize: 11.5, color: '#000000' }
	            },
	            series: { 0: { targetAxisIndex: 0, type: "bars" }, 1: { targetAxisIndex: 1, type: "line" } },
	            colors: ['#95B3D7', '#7F7F7F'],
	            animation: { duration: 700, easing: 'out', startup: true },
	            // For graph size and placement adjust values here
	            height: 440,
	            fontName: 'Montserrat',
	            chartArea: {
	                top: "9%",
	                height: "75%",
	                width: "75%"
	            },

	        };

	        $.extend(chartoptions, options.chartoptions);
	        var chartchart = new google.visualization.ColumnChart(document.getElementById(options.chart_div));
	        var chartformatter0 = new google.visualization.NumberFormat({ pattern: dText.year + ' ##' });
	        var chartformatter1 = new google.visualization.NumberFormat({ pattern: '$#,###.#' });
	        var chartformatter2 = new google.visualization.NumberFormat({ pattern: '#,###.##%' });
	        //
	        var barformatter = new google.visualization.NumberFormat({ pattern: '$#,###' });
	        var bardata = google.visualization.arrayToDataTable([
	            ['Label', dText.amount],
	            [dText.cash, 0]
	        ]);
	        barformatter.format(bardata, 1);
	        var baroptions = { pieHole: 0.4, height: 170, width: 170, fontName: 'Montserrat', legend: 'none', slices: { 0: { color: dText.mortgageColor }, 1: { color: dText.cashColor }, 2: { color: dText.interestColor } }, chartArea: { width: 140, height: 140 } };
	        $.extend(baroptions, options.pieoptions);
	        var barchart = new google.visualization.PieChart(document.getElementById(options.piechart));

	        //
	        //Calculate function
			//

	        //Remove comment below if want to on page load auto runs script
	        /*$(window).load(function() {calculate(); calculate();});*/
	        //Calculate twice to remove vertical axis bug

	        // make chart responsive
	        //window.addEventListener('resize', function() {
	        //    drawChart1();
	        //}, false);


	        //Calculate button
	        this.click(function() {
	            calculate();
	            calculate(); //Calculate twice to remove vertical axis bug
	        });
	        resetele.click(function() {
	            reset();
	        });

	        //Reset button
	        function reset() {
	            $(cmortgage).val('');
	            $(amortgage).val('');
	            priceele.val(',000,000');
	            termsele.val(30);
	            fix_yearsele.val('');
	            after_yearsele.val('');
	            mortgage_valueele.val(70);
	            future_mortgageele.val('');
	            curent_mortgageele.val(2.15);

	            defaultView = true;

	            //Remove comment below if want to on page load auto runs script
	            /*calculate();*/
	        }

	        function calculate() {
	            if (!validateOptions(options)) {
	                fadeBox.fadeIn(4000);
	                return;
	            }
	            terms_month = terms * 12;
	            fixmonth = fixyear * 12;
	            amonth = ayear * 12;
	            mort_amount = price * mvalue / 100;
	            var average_interest = (cmort + fmort) / 2;
	            //average_interest=average_interest.toFixed(3)
	            var cashamount = price - mort_amount;
	            var fixinterest = mort_amount * fixmonth * cmort / 100;
	            var variableinterest = (terms_month - fixmonth);
	            var curinterest;
	            var yearpayment = 0;
	            var year;
	            var averagepay;
	            var averageintrate;
	            var curbalance = mort_amount;
	            var curinterestmonth = cmort / 12 / 100;
	            var futinterestmonth = fmort / 12 / 100;
	            var monthsremain = terms_month;
	            var curpayment;
	            var totalpayment = 0;
	            var yearinterest = 0;
	            //
	            var arr = [];
	            var changemort;
	            arr.push([dText.year, dText.monthyPayments, dText.interestRate]);
	            if (ayear != 0) {
	                changemort = (fmort - cmort) / ayear;
	            } else {
	                changemort = 0;
	            }
	            //
	            var totalcash = price - mort_amount;
	            var totalinterest = 0;
	            //
	            var bigtbl = $("<table></table>");
	            bigtbl.append('<tr class="header"><th><div class="head">' + dText.header + '</div></th><th class="m"></th><th></th><th></th><th></th><th></th></tr><tr class="headerrow"><th class="yr">' + dText.year + '</th><th class="pay">' + dText.monthlyPayment + '</th><th class="inpay">' + dText.interestPaidMonth + '</th><th class="rate">' + dText.annualInterestRate + '</th><th class="bal">' + dText.loadBalance + '</th><th class="ttl">' + dText.totalCost + '</th></tr>');
	            var prevousinterestmonth = 0;
	            var prevouspayment = 0;
	            for (var i = 0; i < terms_month; i++) {
	                if (i < fixmonth) {} else if (amonth != 0 && i >= amonth) {
	                    curinterestmonth = futinterestmonth;
	                } else {
	                    if (!((i) % 12)) {
	                        curinterestmonth = (cmort + changemort * (i / 12)) / 12 / 100;
	                    }
	                }
	                //curinterest=Math.round(curbalance*curinterestmonth);
	                curinterest = curbalance * curinterestmonth;
	                totalinterest += curinterest;
	                yearinterest += curinterest;
	                if (prevousinterestmonth == curinterestmonth) {
	                    curpayment = prevouspayment;
	                } else {
	                    curpayment = curbalance * (curinterestmonth * Math.pow((1 + curinterestmonth), monthsremain)) / (Math.pow((1 + curinterestmonth), monthsremain) - 1);
	                }
	                curbalance = curbalance * (1 + curinterestmonth) - curpayment;
	                monthsremain -= 1;
	                yearpayment += curpayment;
	                totalpayment += curpayment;
	                if (!((i + 1) % 12)) {
	                    year = (i + 1) / 12;
	                    averagepay = yearpayment / 12;
	                    arr.push([year, averagepay, curinterestmonth * 12]);
	                    averagepay = Math.round(averagepay).toFixed(0).replace(/./g, function(c, i, a) {
	                        return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
	                    });
	                    var total_cost = (price + totalinterest).toFixed(0).replace(/./g, function(c, i, a) {
	                        return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
	                    });
	                    var displayinterest = Math.round(yearinterest / 12).toFixed(0).replace(/./g, function(c, i, a) {
	                        return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
	                    });
	                    var displayinterstmonth = (curinterestmonth * 12 * 100).toFixed(2).replace(/./g, function(c, i, a) {
	                        return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
	                    });
	                    if (curbalance < 0) {
	                        curbalance = 0;
	                    }
	                    var displaycurbalance = (curbalance).toFixed(0).replace(/./g, function(c, i, a) {
	                        return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
	                    });
	                    bigtbl.append('<tr class="contentrow"><td class="yr">' + ((i + 1) / 12) + '</td><td class="pay">$' + averagepay + '</td><td class="inpay">$' + displayinterest + '</td><td class="rate">' + displayinterstmonth + '%</td><td class="bal">$' + displaycurbalance + '</td><td class="ttl">$' + total_cost + '</td></tr>');
	                    yearpayment = 0;
	                    yearinterest = 0;
	                }
	                prevousinterestmonth = curinterestmonth;
	                prevouspayment = curpayment;
	            }
	            bardata = google.visualization.arrayToDataTable([
	                ['Label', dText.amount],
	                [dText.mortgage, mort_amount],
	                [dText.cash, totalcash],
	                [dText.interest, totalinterest]
	            ]);
	            barformatter.format(bardata, 1);
	            chartdata = google.visualization.arrayToDataTable(arr);
	            chartformatter0.format(chartdata, 0);
	            chartformatter1.format(chartdata, 1);
	            chartformatter2.format(chartdata, 2);
	            //
	            totalpayment = totalpayment / terms_month;
	            var averagepayment = Math.round(totalpayment).toFixed().replace(/./g, function(c, i, a) {
	                return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
	            });
	            monthly_payment.html('<div class="avg-mortgage">$' + averagepayment + '</div><div class="result-desc">平均每月供款</div>');
	            var tbl = $('<table></table>');
	            totalRent = 0;
	            var totalcost = mort_amount + totalcash + totalinterest;
	            if (defaultView) {
	                chartoptions.vAxis.viewWindow.max = totalcost / terms / 6;
	                defaultView = false;
	            } else {
	                chartoptions.vAxis.viewWindow.max = 'pretty';
	                chartoptions.vAxis.viewWindow.min = 'pretty';
	            }
	            totalinterest = Math.round(totalinterest).toFixed(0).replace(/./g, function(c, i, a) {
	                return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
	            });
	            mort_amount = Math.round(mort_amount).toFixed(0).replace(/./g, function(c, i, a) {
	                return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
	            });
	            totalcash = Math.round(totalcash).toFixed(0).replace(/./g, function(c, i, a) {
	                return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
	            });
	            totalcost = Math.round(totalcost).toFixed(0).replace(/./g, function(c, i, a) {
	                return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
	            });
	            tbl.append('<tr><th><span style="background-color:' + dText.interestColor + ';"></span>' + dText.interest + '</th><td>$' + totalinterest + '</td></tr>');
	            tbl.append('<tr><th><span style="background-color:' + dText.mortgageColor + ';"></span>' + dText.mortgage + '</th><td>$' + mort_amount + '</td></tr>');
	            tbl.append('<tr><th><span style="background-color:' + dText.cashColor + ';"></span>' + dText.cashOnly + '</th><td>$' + totalcash + '</td></tr>');
	            tbl.append('<tr><th>支付總額</th><td>$' + totalcost + '</td></tr>');
	            pietable.html(tbl);
	            fadeBox.fadeIn(4000);
	            chart_table.html(bigtbl);
	            drawChart1();
	            drawChart2();
	        }

	        function drawChart1() {
	            chartchart.draw(chartdata, chartoptions);
	        }

	        function drawChart2() {
	            barchart.draw(bardata, baroptions);
	        }
	        return this;

	        function validateOptions() {
	            price = Number(priceele.val().replace(/[^0-9\.]+/g, ""));
	            priceele.removeClass('error');
	            if (price == 0) {
	                priceele.addClass('error');
	                priceele.focus();
	                return false;
	            }
	            mvalue = Number(mortgage_valueele.val().replace(/[^0-9\.]+/g, ""));
	            mortgage_valueele.removeClass('error');
	            if (mvalue == 0) {
	                mortgage_valueele.addClass('error');
	                mortgage_valueele.focus();
	                return false;
	            }
	            terms = Number(termsele.val().replace(/[^0-9\.]+/g, ""));
	            termsele.removeClass('error');
	            if (terms == 0) {
	                termsele.addClass('error');
	                termsele.focus();
	                return false;
	            }
	            cmort = Number(curent_mortgageele.val().replace(/[^0-9\.]+/g, ""));
	            curent_mortgageele.removeClass('error');
	            if (cmort == 0) {
	                curent_mortgageele.addClass('error');
	                curent_mortgageele.focus();
	                return false;
	            }
	            if (fix_yearsele.val() != '') {
	                fixyear = Number(fix_yearsele.val().replace(/[^0-9\.]+/g, ""));
	                fix_yearsele.removeClass('error');
	                if (fixyear == 0) {
	                    fix_yearsele.addClass('error');
	                    fix_yearsele.focus();
	                    return false;
	                }
	            } else {
	                fixyear = 1;
	            }
	            fmort = Number(future_mortgageele.val().replace(/[^0-9\.]+/g, ""));
	            future_mortgageele.removeClass('error');
	            if (fmort == 0) {
	                fmort = cmort;
	            }
	            if (after_yearsele.val() != '') {
	                ayear = Number(after_yearsele.val().replace(/[^0-9\.]+/g, ""));
	                after_yearsele.removeClass('error');
	                if (ayear == 0) {
	                    after_yearsele.addClass('error');
	                    after_yearsele.focus();
	                    return false;
	                }
	                if (ayear < fixyear) {
	                    ayear = fixyear;
	                }
	            } else {
	                ayear = 0;
	            }
	            return true;
	        }

	        function dateFormat(d) {
	            var yyyy = d.getFullYear().toString();
	            var mm = (d.getMonth() + 1).toString(); // getMonth() is zero-based
	            var dd = d.getDate().toString();
	            return (dd[1] ? dd : "0" + dd[0]) + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + yyyy; // padding
	        }
	    };
	}(jQuery));