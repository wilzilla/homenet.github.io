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
		var tText={header:'Rental Summary',month:'Month',monthStart:'Month Start',monthEnd:'Month End',dayMonth:'Days in Month',rentFree:'Rent Free Days',dayPayable:'Days Payable',payableMonth:'Payable Months',rentPerMonth:'Payable Rent Per Month'};
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
			averageAnnualele.html('---');
			totalStampDutyele.html('---');
			dutyBox.html('---');
			atRateele.html('---');
			dutyDetails.children().removeClass('selected');
			tableBox.html('');
			startDateele.val('');
			totalRentFreeele.val('');
			termsele.val('');
			rentele.val('');
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
			tbl.append('<tr><th colspan="4">'+tText.header+'</th></tr><tr><th>'+tText.month+'</th><th>'+tText.monthStart+'</th><th>'+tText.monthEnd+'</th><th>'+tText.dayMonth+'</th><th>'+tText.rentFree+'</th><th>'+tText.dayPayable+'</th><th>'+tText.payableMonth+'</th><th>'+tText.rentPerMonth+'</th></tr>');
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
					tbl.append('<tr><td>'+month+'</td><td></td><td></td><td></td><td></td><td></td><td>'+payableMonthString.toFixed(2)+'</td><td>$'+rentPerMonthString+'</td></tr>');
				}else{
					tbl.append('<tr><td>'+month+'</td><td>'+dateFormat(monthStart)+'</td><td>'+dateFormat(monthEnd)+'</td><td>'+totalMonthDays+'</td><td>'+curRentFreeString+'</td><td>'+daysPayableString+'</td><td>'+payableMonthString.toFixed(2)+'</td><td>$'+rentPerMonthString+'</td></tr>');
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
				tbl.append('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td>'+totalMonthPayable.toFixed(2)+'</td><td>'+totalRentText+'</td></tr>');
			}else{
				tbl.append('<tr><td></td><td></td><td></td><td>'+totalDays+'</td><td>'+totalRentFree+'</td><td>'+totalDayPayable+'</td><td>'+totalMonthPayable.toFixed(2)+'</td><td>'+totalRentText+'</td></tr>');
			}	
			return tbl;
		}
		function createStampDuty(){
			var roundTotal=(terms<12)?totalRent:totalRent/terms*12;
			roundTotal=(Math.ceil(roundTotal/100)*100).toFixed(2);
			var roundTotalText="$"+roundTotal.toString().replace(/./g, function(c, i, a) {
 				 return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
			});
			averageAnnualele.html(roundTotalText+'<br />'+dText.averageRent);
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
			totalStampDutyele.html(dutyString+'<br />'+dText.stampDuty);
			//tbl.append('<tr><td>'+dText.extraFee+'</td><td>$'+copyCost.toFixed(2).toString()+'</td></tr>');
			var percentageString='%'+percentage.toFixed(2).replace(/./g, function(c, i, a) {
				 return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
			});
			atRateele.html(percentageString+'<br />'+dText.atRate);
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