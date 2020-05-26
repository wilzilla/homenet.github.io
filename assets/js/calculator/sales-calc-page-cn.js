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
$(document).ready(function(){
    //Old Stamp Duty Variables
    //var dText={avdscale2:'Stamp Duty<br />(AVD Scale 2)',avdscale1:'Stamp Duty<br />(AVD Scale 1)',ssd:'Buyer\'s Stamp Duty<br />(BSD)',Copr:'194 169 032 050 048 049 054 032 072 111 109 101 032 078 101 116 032 080 114 111 112 101 114 116 121 032 083 101 114 118 105 099 101 115 032 076 116 100 046 032 104 116 116 112 058 047 047 119 119 119 046 104 111 109 101 110 101 116 046 099 111 109 046 104 107 047',bsd:'Special Stamp Duty<br />(SSD)'};
    var dText = { 
        avdscale2: '<a href="#avd-scale-2"><div class="result-desc">从价印花税</div><div class="result-desc2 small">(AVD第2标准税率)</div></a>',
        avdscale1: '<a href="#avd-part-1"><div class="result-desc">从价印花税</div><div class="result-desc2 small">(AVD第1标准第1部税率)</div></a>',
        ssd: '<a href="#bsd-table"><div class="result-desc">买家印花税</div><div class="result-desc2">(BSD)</div></a>',
        Copr:'194 169 032 050 048 049 054 032 072 111 109 101 032 078 101 116 032 080 114 111 112 101 114 116 121 032 083 101 114 118 105 099 101 115 032 076 116 100 046 032 104 116 116 112 058 047 047 119 119 119 046 104 111 109 101 110 101 116 046 099 111 109 046 104 107 047',
        bsd: '<a href="#ssd-table"><div class="result-desc">额外印花税</div><div class="result-desc2">(SSD)</div></a>'
        };
        var options={
            dutyText:dText,
            price:'#price',
            duty:'#stamp_duty',
            avd:'#avd',
            ssd:'#ssd',
            bsd:'#bsd',
            hkid:'hkid',
            hkidtax:0.15,
            property: 'property',
            months:'months',
            aquired: 'aquired',
            pricelist1: [2000001,2176471,3000001,3290331,4000001,4428581,6000001,6720001,20000001,21739131],
            pricelist2: [2000001,2351761,3000001,3290321,4000001,4428571,6000001,6720001,20000001,21739121],
            //Old Stamp Duty Scale
            //calclist1: ['0.015*x','(x-2000000)*0.2+30000','0.03*x','(x-3000000)*0.2+90000','0.045*x','(x-4000000)*0.2+180000','0.06*x','(x-6000000)*0.2+360000','0.075*x','(x-20000000)*0.2+1500000','0.085*x'],
            calclist1: ['0.15*x', '0.15*x', '0.15*x', '0.15*x', '0.15*x', '0.15*x', '0.15*x', '0.15*x', '0.15*x', '0.15*x', '0.15*x'],
            calclist2: ['100','(x-2000000)*0.1+100','0.015*x','(x-3000000)*0.1+45000','0.0225*x','(x-4000000)*0.1+90000','0.03*x','(x-6000000)*0.1+180000','0.0375*x','(x-20000000)*0.1+750000','0.0425*x'],
            reset:'#reset',
            calculate:'#calculate',
            stamp_duty_scale1:'#stamp_duty_scale1',
            stamp_duty_scale2:'#stamp_duty_scale2',
            residency_table: '#residency_table',
            aquisition_table: '#aquisition_table',
            fadeBox: '.all'
    }
    $('#calculate').salesInfo(options); 
})


