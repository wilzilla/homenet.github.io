$(document).ready(function(){
	$('#start-date').datepicker();
	$('#start-date').datepicker( "option", "dateFormat", "dd/mm/yy");
	$('#free-date').datepicker();
	$('#free-date').datepicker( "option", "dateFormat", "dd/mm/yy");
	$('#end-date').datepicker();
	$('#end-date').datepicker( "option", "dateFormat", "dd/mm/yy");
	var tText={header:'租金總結',month:'月',monthStart:'每月租期開始',monthEnd:'每月租期完結',dayMonth:'每月日數',rentFree:'免租日',dayPayable:'須付租金總日數',payableMonth:'須付租金總月數',rentPerMonth:'每月須付租金'};
	var dText={averageRent: '平均年租', stampDuty:'= 印花稅總數',extraFee:'(extra fee for a copy)',  payable: '各付', atRate: '稅率'};
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
		tableBox:'#b'
	}
	$('#calculate').rentInfo(options);	
})