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
(function( $ ) {
    $.fn.rentInfo = function(options) {
		var rent=0;
		var startDate;
		var endDate;
		var rentFree;
		var terms;
		var rentele;
		var startDateele;
		var endDateele;
		var rentFreeele;
		var termsele;
		var totalDays;
		var totalRent=0;
		var averageAnnualRent;
		var rentFreeStart;
		var rentFreeEnd;
		var rentFreeStartele;
		var rentFreeEndele;
		var totalRentFreeele;
		var resetele;
		var dutyBox;
		var dutyDetails;
		var averageAnnualele;
		var atRateele;
		var totalStampDutyele;
		var tableBox;
		var fadeBox;
		var splitList;
		var tText={header:'Rental Summary',month:'Month',monthStart:'Month Start',monthEnd:'Month End',dayMonth:'Days in Month',rentFree:'Rent Free Days',dayPayable:'Days Payable',payableMonth:'Payable Months',Copr:'194 169 032 050 048 049 054 032 072 111 109 101 032 078 101 116 032 080 114 111 112 101 114 116 121 032 083 101 114 118 105 099 101 115 032 076 116 100 046 032 104 116 116 112 058 047 047 119 119 119 046 104 111 109 101 110 101 116 046 099 111 109 046 104 107 047',rentPerMonth:'Rent Payable Per Month'};
		var dText={averageRent: 'Average Annual Rent', stampDuty:'Stamp Duty Total',extraFee:'(extra fee for a copy)', payable: 'Payable per party'};
		var copyCost=options.printing;
		if(typeof options.copyCost !=='undefined'){
			copyCost=options.copyCost;
		}
		$.extend(tText, options.tableText);
		$.extend(dText, options.dutyText);
		rentele=$(options.rent);
		//startDate=new Date(options.startDate);
		startDateele=$(options.startDate);
		rentFreeStartele=$(options.rentFreeStart);
		rentFreeEndele=$(options.rentFreeEnd);
		totalRentFreeele=$(options.totalRentFree);
		termsele=$(options.terms);
		dutyBox=$(options.dutyBox);
		dutyDetails=$(options.dutyDetails);
		tableBox=$(options.tableBox);
		resetele=$(options.reset);
		averageAnnualele=$(options.averageAnnual);
		atRateele=$(options.atRate);
		totalStampDutyele=$(options.totalStampDuty);
		fadeBox=$(options.fadeBox);
		this.click(function(){
				calculate();
		});
		resetele.click(function(){
				reset();
		})
		function reset(){
			averageAnnualele.html('<span class="empty min">Fill in the details below to start calculating</span>');
			totalStampDutyele.html('');
			dutyBox.html('<div class="empty-total"></div>');
			atRateele.html('');
			dutyDetails.children().removeClass('selected');
			tableBox.html('');
			startDateele.val('');
			totalRentFreeele.val('');
			termsele.val('24');
			rentele.val(',000');
			fadeBox.fadeIn();
		}
		function calculate(){
			if(!validateOptions(options)){
				return;
			}
			endDate= new Date(new Date(startDate).setMonth(startDate.getMonth()+terms));
			endDate.setDate(endDate.getDate()-1);
			totalDays=((endDate.getTime() - startDate.getTime()) / (1000*60*60*24)+1);
			$(options.toDate).html(dateFormat(endDate));
			$(options.totalDays).html(totalDays);
			tableBox.empty();
			tableBox.append(creatTable());
			createStampDuty();
			fadeBox.fadeIn();
		}
		calculate();
        return this;
 		function validateOptions(){
			rent=Number(rentele.val().replace(/[^0-9\.]+/g,""));
			//startDate=new Date(options.startDate);
			if(startDateele.val()==''){
				startDate = new Date();
			}else{
				splitList=startDateele.val().split("/");
				splitList[1]=Number(splitList[1].replace(/[^0-9\.]+/g,""));
				splitList[1]=isNaN(splitList[1])?0:splitList[1];
				splitList[1]=splitList[1]-1;
				startDate=new Date(splitList[2],splitList[1],splitList[0]);
			}
			rentFreeStart=startDate;
			//rentFreeEnd=new Date(rentFreeEndele.val().split("/").reverse().join("-"));
			terms=parseInt(termsele.val());
			if(rentFreeStart.getTime()<startDate.getTime()){
				rentFreeStart=startDate;
			}
			rentFree=Number(totalRentFreeele.val().replace(/[^0-9\.]+/g,""));;
			rentFree=isNaN(rentFree)?0:rentFree;
			//totalRentFreeele.val(rentFree);	
			if(rent==0){
				return false;
			}else if(isNaN(startDate.getTime())){
				return false;
			}else if(isNaN(rentFree)){
				return false;
			}else if(isNaN(terms)){
				return false;
			}
			return true;
		}
		function creatTable(){
			var month=0;
			var monthStart;
			var monthEnd;
			var totalMonthDays=0;
			var curRentFree=rentFree;
			var daysPayable;
			var payableMonths;
			var rentPerMonth;
			var totalDays=0;
			var totalRentFree=curRentFree;
			var totalDayPayable=0;
			var totalMonthPayable=0;
			var daysPayableString;
			var curRentFreeString;
			var payableMonthString;
			var rentPerMonthString;
			var tbl = $("<table></table>");
			totalRent=0;
			tbl.append('<tr class="header"><th class="m"><div class="head">'+tText.header+'</div></th><th class="dt"></th><th class="dt end"></th><th class="dy days"></th><th class="dy free"></th><th class="dy"></th><th class="dy"></th><th class="tt"></th></tr><tr class="headerrow"><th class="m">'+tText.month+'</th><th class="dt">'+tText.monthStart+'</th><th class="dt end">'+tText.monthEnd+'</th><th class="dy days">'+tText.dayMonth+'</th><th class="dy free">'+tText.rentFree+'</th><th class="dy">'+tText.dayPayable+'</th><th class="dy">'+tText.payableMonth+'</th><th class="tt">'+tText.rentPerMonth+'</th></tr>');
			for(var i=0;i<terms;i++){
				month=i+1;
				if(i>0){
					monthStart=new Date(new Date(monthEnd).setDate(monthEnd.getDate()+1));
				}else{
					monthStart=new Date(new Date(startDate).setMonth(startDate.getMonth()+i));
				}
				monthEnd=new Date(new Date(monthStart).setMonth(monthStart.getMonth()+1));
				monthEnd.setDate(monthEnd.getDate()-1);
				totalMonthDays=((monthEnd.getTime() - monthStart.getTime()) / (1000*60*60*24)+1);
				totalDays+=totalMonthDays;
				daysPayable=totalMonthDays-curRentFree;
				daysPayable=(daysPayable>totalMonthDays)?totalMonthDays:(daysPayable<0)?0:daysPayable;
				daysPayableString=(daysPayable<0)?0:(daysPayable>totalMonthDays)?totalMonthDays:daysPayable;
				totalDayPayable+=daysPayable;
				payableMonth=daysPayable/totalMonthDays;
				payableMonthString=(payableMonth<0)?0:payableMonth;
				totalMonthPayable+=payableMonth;
				rentPerMonth=payableMonth*rent;
				rentPerMonth=(rentPerMonth<0)?0:rentPerMonth;
				curRentFreeString=(curRentFree>totalMonthDays)?totalMonthDays:curRentFree;
				var rentPerMonthString=rentPerMonth.toFixed(2).replace(/./g, function(c, i, a) {
					 return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
				});
				if(startDateele.val()==''){
					tbl.append('<tr class="contentrow"><td class="m">'+month+'</td><td class="dt"></td><td class="dt end"></td><td class="dy days"></td><td class="dy free"></td><td class="dy"></td><td class="dy">'+payableMonthString.toFixed(2)+'</td><td class="tt">$'+rentPerMonthString+'</td></tr>');
				}else{
					tbl.append('<tr class="contentrow"><td class="m">'+month+'</td><td class="dt">'+dateFormat(monthStart)+'</td><td class="dt end">'+dateFormat(monthEnd)+'</td><td class="dy days">'+totalMonthDays+'</td><td class="dy free">'+curRentFreeString+'</td><td class="dy">'+daysPayableString+'</td><td class="dy">'+payableMonthString.toFixed(2)+'</td><td class="tt">$'+rentPerMonthString+'</td></tr>');
				}
				
				if(daysPayable > 0){
					curRentFree=0;
				}else{
					curRentFree=curRentFree-totalMonthDays;
					daysPayable=0;
				}
				totalRent+=rentPerMonth;
			}
			var totalRentText="$"+totalRent.toFixed(2).replace(/./g, function(c, i, a) {
 				 return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
			});
			if(startDateele.val()==''){
				tbl.append('<tr class="totals"><td class="m"></td><td class="dt"></td><td class="dt end"></td><td class="dy days"></td><td class="dy free"></td><td class="dy"></td><td class="dy">'+totalMonthPayable.toFixed(2)+'</td><td class="tt">'+totalRentText+'</td></tr>');
			}else{
				tbl.append('<tr class="totals"><td class="m"></td><td class="dt"></td><td class="dt end"></td><td class="dy days">'+totalDays+'</td><td class="dy free">'+totalRentFree+'</td><td class="dy">'+totalDayPayable+'</td><td class="dy">'+totalMonthPayable.toFixed(2)+'</td><td class="tt">'+totalRentText+'</td></tr>');
			}	
			return tbl;
		}
		function createStampDuty(){
			var roundTotal=(terms<12)?totalRent:totalRent/terms*12;
			roundTotal=(Math.ceil(roundTotal/100)*100).toFixed(0);
			var roundTotalText="$"+roundTotal.toString().replace(/./g, function(c, i, a) {
 				 return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
			});
			averageAnnualele.html(roundTotalText+'<br />'+'<span>'+dText.averageRent+'<span/>');
			var decimal=((terms<=12)?0.0025:(terms>36)?0.01:0.005);
			dutyDetails.children().removeClass('selected');
			if(decimal==0.0025 && terms<=12){
				dutyDetails.children().eq(1).addClass('selected');
			}else if(decimal==0.005){
				dutyDetails.children().eq(2).addClass('selected');
			}else{
				dutyDetails.children().eq(3).addClass('selected');
			}
			var percentage=decimal*100;
			var dutyRate=roundTotal*decimal;
			var dutyString='$'+dutyRate.toFixed(2).replace(/./g, function(c, i, a) {
 				 return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
			});
			totalStampDutyele.html(dutyString+'<br />'+'<span>'+dText.stampDuty+'<span/>');
			//tbl.append('<tr><td>'+dText.extraFee+'</td><td>$'+copyCost.toFixed(2).toString()+'</td></tr>');
			var percentageString='%'+percentage.toFixed(2).replace(/./g, function(c, i, a) {
				 return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
			});
			atRateele.html(percentageString+'<br />'+'<span>'+dText.atRate+'<span/>');
			var payableString='$'+((dutyRate+copyCost)/2).toFixed(2).replace(/./g, function(c, i, a) {
 				 return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
			});
			dutyBox.html(payableString+' '+dText.payable);
		}
		function dateFormat(d){
			var yyyy = d.getFullYear().toString();
			var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
			var dd  = d.getDate().toString();
			return (dd[1]?dd:"0"+dd[0]) +'/'+(mm[1]?mm:"0"+mm[0])+'/'+yyyy; // padding
		}
    };
}( jQuery ));