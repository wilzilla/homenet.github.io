
$(document).ready(function() {
						   
						   
  $('.mobile_menu').click(function(){
		if($('.navigation').css('display')=='block'){
			$(this).find('.fa').addClass('fa-navicon');
			$(this).find('.fa').removeClass('fa-close');
			$('.navigation').slideUp(300);
		}
		if($('.navigation').css('display')=='none'){						   
			$(this).find('.fa').removeClass('fa-navicon');
			$(this).find('.fa').addClass('fa-close');
			$('.navigation').slideDown(300);
		}
	
  })
  
  $('.lng_btn > a').click(function(){
		if($('.language_dd').css('display')=='block'){
			$('.language_dd').slideUp(300);
		}
		if($('.language_dd').css('display')=='none'){						   
			$('.language_dd').slideDown(300);
		}
	})
  
  
})































