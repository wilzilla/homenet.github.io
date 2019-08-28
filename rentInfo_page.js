$(document).ready(function(){
	$('#start-date').datepicker();
	$('#start-date').datepicker( "option", "dateFormat", "dd/mm/yy");
	$('#free-date').datepicker();
	$('#free-date').datepicker( "option", "dateFormat", "dd/mm/yy");
	$('#end-date').datepicker();
	$('#end-date').datepicker( "option", "dateFormat", "dd/mm/yy");
	var tText={header:'Rental Summary',month:'Month',monthStart:'Month start',monthEnd:'Month end',dayMonth:'Days in the Month',rentFree:'Rent free days',dayPayable:'Days Payable',payableMonth:'Months Payable',rentPerMonth:'Payable Rent per Month'};
	var dText={averageRent: 'Avg. annual rent**', stampDuty:'= Total stamp duty',extraFee:'(extra fee for a copy)', payable: 'each', atRate: 'at rate'};
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
