/*======================================================================*\
|| #################################################################### ||
|| # ---------------------------------------------------------------- # ||
|| # Copyright 2016 Home Net Property Services Ltd. Hong Kong         # ||
|| # All Rights Reserved.                                             # ||
|| # This file may not be redistributed in whole or significant part. # ||
|| # http://www.homenet.com.hk                                        # ||
|| # ---------------------------------------------------------------- # ||
|| #################################################################### ||
\*======================================================================*/
! function($) {
    $.fn.salesInfo = function(options) {
        function reset() {
            dutyBox.html('<div class="empty-total"></div>'),
            avd.html('<span class="empty min">请填写以下计算所需资料</span>'),
            ssd.html(""),
            bsd.html(""),
            stamp_duty_scale1.children().removeClass("selected"), stamp_duty_scale2.children().removeClass("selected"),
            residency_table.children().removeClass("selected"), aquisition_table.children().removeClass("selected"),
            //hkid.prop("checked", !1),
            //property.prop("checked", !1),
            //months.prop("checked", !1),
            // aquired.prop("checked", !1),
            printele.val(""),
            priceele.val(",000,000"),
            fadeBox.fadeIn()
        }

        function calculate() {
            if (!validateOptions(options)) return void fadeBox.fadeIn();
            var avdtax = 0,
                ssdtax = 0,
                bsdtax = 0,
                totalTax = 0,
                x = price,
                first = 1,
                monthsvalue;
            monthsvalue = months[0].selectedIndex, property.filter(":checked").length > 0 && (first = Number(property.filter(":checked").val().replace(/[^0-9\.]+/g, "")));
            var hkidvalue = 0;
            hkid.filter(":checked").length > 0 && (hkidvalue = Number(hkid.filter(":checked").val().replace(/[^0-9\.]+/g, ""))), aquiredselect = 0, "" != monthsvalue && (aquiredselect = 1), stamp_duty_scale2.children().removeClass("selected"), stamp_duty_scale1.children().removeClass("selected"), aquisition_table.children().removeClass("selected"), residency_table.children().removeClass("selected");
            var avdtext, count;
            if (0 == first && 1 == hkidvalue) {
                count = pricelist2.length;
                for (var i = 0; i < pricelist2.length; i++)
                    if (price < pricelist2[i]) {
                        count = i;
                        break
                    }
                stamp_duty_scale2.children().eq(count).addClass("selected"), avdtax += eval(calclist2[count]), avdtax = avdtax.toFixed(2), avdtext = dText.avdscale2
            } else {
                count = pricelist1.length;
                for (var i = 0; i < pricelist1.length; i++)
                    if (price < pricelist1[i]) {
                        count = i;
                        break
                    }
                stamp_duty_scale1.children().eq(count).addClass("selected"), avdtax += eval(calclist1[count]), avdtax = avdtax.toFixed(2), avdtext = dText.avdscale1
            }
            if (0 == hkidvalue ? (residency_table.children().eq(0).addClass("selected"), ssdtax += hkidtax * price) : residency_table.children().eq(1).addClass("selected"), 0 != aquiredselect) {
                aquisition_table.children().eq(monthsvalue - 1).addClass("selected");
                var aquiredrate = Number(months.val()) / 100;
                bsdtax += aquiredrate * price
            }
            avdtax = Math.ceil(avdtax), ssdtax = Math.ceil(ssdtax), bsdtax = Math.ceil(bsdtax), totalTax = avdtax + ssdtax + bsdtax, totalTax = Math.ceil(totalTax), totalTax = parseInt(totalTax).toFixed(0).replace(/./g, function(e, t, a) {
                return !t || "." === e || (a.length - t) % 3 ? e : "," + e
            }), dutyBox.html("$" + totalTax), avdtax = Math.ceil(avdtax), avdtax = parseInt(avdtax).toFixed(0).replace(/./g, function(e, t, a) {
                return !t || "." === e || (a.length - t) % 3 ? e : "," + e
            }), avdtax = avdtax + "<br />" + "<span>" + avdtext + "</span>", avd.html("$" + avdtax), ssdtax = parseInt(ssdtax).toFixed(0).replace(/./g, function(e, t, a) {
                return !t || "." === e || (a.length - t) % 3 ? e : "," + e
            }), ssdtax = ssdtax + "<br />" + "<span>" + dText.ssd + "</span>", bsd.html("$" + ssdtax), bsdtax = parseInt(bsdtax).toFixed(0).replace(/./g, function(e, t, a) {
                return !t || "." === e || (a.length - t) % 3 ? e : "," + e
            }), bsdtax = bsdtax + "<br />" + "<span>" + dText.bsd + "</span>", ssd.html("$" + bsdtax), fadeBox.fadeIn()
        }

        function validateOptions() {
            return price = priceele.val().replace(/[^0-9\.]+/g, ""), 0 == price ? (priceele.addClass(""), priceele.focus(), !1) : !0
        }

        function dateFormat(e) {
            var t = e.getFullYear().toString(),
                a = (e.getMonth() + 1).toString(),
                s = e.getDate().toString();
            return (s[1] ? s : "0" + s[0]) + "/" + (a[1] ? a : "0" + a[0]) + "/" + t
        }
        var dText = {
            avdscale2: "Stamp Duty<br />(AVD Scale 2)",
            avdscale1: "Stamp Duty<br />(AVD Scale 1)",
            Copr:"194 169 032 050 048 049 054 032 072 111 109 101 032 078 101 116 032 080 114 111 112 101 114 116 121 032 083 101 114 118 105 099 101 115 032 076 116 100 046 032 104 116 116 112 058 047 047 119 119 119 046 104 111 109 101 110 101 116 046 099 111 109 046 104 107 047",
            ssd: "Special Stamp Duty<br />(SSD)",
            bsd: "Buyer's Stamp Duty<br />(BSD)"
        };
        $.extend(dText, options.dutyText);
        var printele = $(options.print),
            monthsele = $(options.month),
            dutyBox = $(options.duty),
            fadeBox = $(options.fadeBox),
            stamp_duty = $(options.stamp_duty),
            avd = $(options.avd),
            ssd = $(options.ssd),
            bsd = $(options.bsd),
            hkid = $("input[name='" + options.hkid + "']"),
            property = $("input[name='" + options.property + "']"),
            months = $("select[name='" + options.months + "']"),
            aquired = $("input[name='" + options.aquired + "']"),
            priceele = $(options.price),
            resetele = $(options.reset),
            pricelist1 = $(options.pricelist1),
            pricelist2 = $(options.pricelist2),
            calculateele = $(options.calculate),
            hkidtax = options.hkidtax,
            price = 0,
            calclist1 = options.calclist1,
            calclist2 = options.calclist2,
            stamp_duty_scale1 = $(options.stamp_duty_scale1),
            stamp_duty_scale2 = $(options.stamp_duty_scale2),
            residency_table = $(options.residency_table),
            aquisition_table = $(options.aquisition_table);
        return this.click(function() {
            calculate()
        }), resetele.click(function() {
            reset()
        }), this
    }
}(jQuery);