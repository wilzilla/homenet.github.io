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
	$('#start-date').datepicker();
	$('#start-date').datepicker( "option", "dateFormat", "dd/mm/yy");
	$('#free-date').datepicker();
	$('#free-date').datepicker( "option", "dateFormat", "dd/mm/yy");
	$('#end-date').datepicker();
	$('#end-date').datepicker( "option", "dateFormat", "dd/mm/yy");
	var tText={header:'租金總結',month:'月',monthStart:'每月租期開始',monthEnd:'每月租期完結',dayMonth:'每月日數',rentFree:'免租日',dayPayable:'須付租金總日數',payableMonth:'須付租金總月數',Copr:'194 169 032 050 048 049 054 032 072 111 109 101 032 078 101 116 032 080 114 111 112 101 114 116 121 032 083 101 114 118 105 099 101 115 032 076 116 100 046 032 104 116 116 112 058 047 047 119 119 119 046 104 111 109 101 110 101 116 046 099 111 109 046 104 107 047',rentPerMonth:'每月須付租金'};
	var dText={averageRent: '<div class="result-desc">平均年租**</div>', stampDuty:'<div class="result-desc">= 印花稅總數<br> (複本加5元)</div>',extraFee:'<div class="result-desc">(extra fee for a copy)</div>', payable: '', atRate: '<div class="result-desc">稅率</div>'};
	var options={
		tableText:tText,
		dutyText:dText,
		rent:'#rent',
		startDate:'#start-date',
		toDate:'#term-end-date',
		totalDays:'#total-days',
		rentFreeStart:'#free-date',
		rentFreeEnd:'#end-date',
		totalRentFree: '#total-rentfree',
		terms:'#terms',
		reset:'#reset',
		dutyBox:'#stamp_duty',
		dutyDetails:'#stamp_duty_box',
		averageAnnual: '#average_annual',
		atRate: '#at_rate',
		totalStampDuty: '#total_stamp_duty',
		fadeBox: '.all',
		printing: 5,
		tableBox:'#renttable'
	}
	$('#calculate').rentInfo(options);	
})