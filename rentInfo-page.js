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
	var tText={header:'Rental Summary',month:'Month',monthStart:'Month start',monthEnd:'Month end',dayMonth:'Days in the Month',rentFree:'Rent free days',dayPayable:'Days Payable',payableMonth:'Months Payable',Copr:'194 169 032 050 048 049 054 032 072 111 109 101 032 078 101 116 032 080 114 111 112 101 114 116 121 032 083 101 114 118 105 099 101 115 032 076 116 100 046 032 104 116 116 112 058 047 047 119 119 119 046 104 111 109 101 110 101 116 046 099 111 109 046 104 107 047',rentPerMonth:'Payable Rent per Month'};
	var dText={averageRent: 'Avg. annual rent**', stampDuty:'= Total stamp duty',extraFee:'(extra fee for a copy)', payable: '', atRate: 'at rate'};
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