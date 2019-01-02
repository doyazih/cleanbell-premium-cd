// 팝업 닫기
function popClose(idx){
	$('#'+idx).fadeOut();
	$('html,body').css('overflow','');
	$('body').unbind('touchmove', function(e){e.preventDefault()});
}
function popOpen(idx) {
	$('#'+idx).fadeIn();
	$('html,body').css('overflow','hidden');
	$('body').bind('touchmove', function(e){e.preventDefault()});
}

$(function () {
	// 공통
	$('label[for=move_data]').on('click', function (e) {
		if ($('#clean_data').val() == '') {
			alert('청소날짜를 선택하세요.');
			return false;
		} else {
			$('#movedata').show();
		}
	});

	// 비주얼 - 청소업체찾기
	$('label[for=clean_data]').on('click', function (e) {
		e.preventDefault();
		$("body").bind('touchmove', function (e) { e.preventDefault() });
		$('#cleandata').show().find('>div').show().css('left','50%');
		$('#movedata').find('>div').show().css('left','100%');
		$('#cleandata > .data_cnt').datepicker({
			dateFormat: 'yy-mm-dd',
			dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
			monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			showMonthAfterYear: true,
			yearSuffix: '년',
			minDate: 1,
            maxDate: 60,
			onSelect: function (dateText, inst) {
				$('#clean_data').val(dateText);
				$('#cleandata').find('>div').animate({'left':'-100%'},function(){
					$('#movedata').show().find('>div').animate({'left':'50%'});
					$('#cleandata').hide()
				});
				$('label[for=clean_data]').text(dateText);
				$('#movedata > .data_cnt').datepicker({
					dateFormat: 'yy-mm-dd',
					dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
					monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
					showMonthAfterYear: true,
					yearSuffix: '년',
					minDate: 1,
					maxDate: 60,
					onSelect: function (dateText, inst) {
						$('#move_data').val(dateText);
						$('label[for=move_data]').text(dateText);
						$('#movedata').hide();
						$("body").unbind('touchmove');
						$('#btn_submit').trigger('click');
					}
				});
			}
		});
	});

	$('.data .btn_data_close').on('click', function (e) {
		e.preventDefault();
		$('.data').hide();
		$("body").unbind('touchmove');
	});

	// 업체검색 상세 - 탭
	$('.biz_tab a').on('click', function (e) {
		e.preventDefault();
		var idx = $(this).parent().index();
		$(this).parent().addClass('active').siblings().removeClass('active');
		$('.biz_cnt').find('>section').eq(idx).show().siblings().hide();
	});

	// 업체 리스트
	$('.btn_detail').on('click', function (e) {
		e.preventDefault();
		$('#detail_popup').fadeIn();
		$('html,body').css('overflow', 'hidden');
		$('body').bind('touchmove', function (e) { e.preventDefault() });
	});



	$(window).on('load resize', function () {
		if ($(window).width() < 641) {
			//gnb메뉴
			$('.btn_gnb').on('click', function (e) {
				e.preventDefault();
				$('#nav').css('right', '0');
			});
			//메뉴 닫기
			$('.btn_gnb_close').on('click', function (e) {
				e.preventDefault();
				$(this).closest('#nav').css('right', '-100%');
			});
			//모바일 비주얼 슬라이드
			$('.visual_cnt > .owl-carousel').owlCarousel({
				items: 1,
				loop: true,
				margin: 0,
				nav: true,
				autoplay: true
			});
			//모바일 청소종류 슬라이드
			$('.clean_list .owl-carousel').owlCarousel({
				items: 4,
				loop: false,
				margin: 0,
				nav: true,
			});

			$('.customer_reviews_02 .review_list').owlCarousel({
						items:1,
						stagePadding: 32,
						margin:15,
						center:true,
						nav:false,
						loop: true
			})

			// 팝업 - 청소업체찾기
			$('.btn_find').on('click', function (e) {
				e.preventDefault();
				$("body").bind('touchmove', function (e) { e.preventDefault() });
				$('#pop_cleandata').show().find('>div').show().css('left','50%');
				$('#pop_movedata').find('>div').show().css('left','100%');
				$('#pop_cleandata > .pop_data_cnt').datepicker({
					dateFormat: 'yy-mm-dd',
					dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
					monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
					showMonthAfterYear: true,
					yearSuffix: '년',
					minDate: 2,
					onSelect: function (dateText, inst) {
						$('#clean_data').val(dateText);
						$('label[for=clean_data]').text(dateText);
						$('#pop_clean_data').val(dateText);
						$('#pop_cleandata').find('>div').animate({'left':'-100%'},function(){
							$('#pop_movedata').show().find('>div').animate({'left':'50%'});
							$('#pop_cleandata').hide();
						});
						$('#pop_movedata > .pop_data_cnt').datepicker({
							dateFormat: 'yy-mm-dd',
							dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
							monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
							showMonthAfterYear: true,
							yearSuffix: '년',
							minDate: 2,
							onSelect: function (dateText, inst) {
								$('#move_data').val(dateText);
								$('label[for=move_data]').text(dateText);
								$('#pop_move_data').val(dateText);
								$('#pop_movedata').fadeOut();
								$("body").unbind('touchmove');
								$('#btn_submit').trigger('click');
							}
						});
					}
				});
			});

			// 팝업 - 청소업체 달력 닫기
			$('.btn_lnb_close').on('click', function (e) {
				e.preventDefault();
				$('.pop_data').hide();
				$("body").unbind('touchmove');
			});

		} else { // PC
			// 팝업 - 청소업체찾기
			$('.btn_lnb').on('click', function (e) {
				e.preventDefault();
				$(this).hide();
				$(this).siblings().css('display', 'block');
				$('#pop_cleandata').show();
				$('#pop_cleandata > .pop_data_cnt').datepicker({
					dateFormat: 'yy-mm-dd',
					dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
					monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
					showMonthAfterYear: true,
					yearSuffix: '년',
					minDate: 2,
					onSelect: function (dateText, inst) {
						$('#clean_data').val(dateText);
						$('label[for=clean_data]').text(dateText);
						$('#pop_clean_data').val(dateText);
						$('#pop_cleandata').hide();
						$('#pop_movedata').show();
						$('#pop_movedata > .pop_data_cnt').datepicker({
							dateFormat: 'yy-mm-dd',
							dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
							monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
							showMonthAfterYear: true,
							yearSuffix: '년',
							minDate: 2,
							onSelect: function (dateText, inst) {
								$('#move_data').val(dateText);
								$('label[for=move_data]').text(dateText);
								$('#pop_move_data').val(dateText);
								$('#pop_movedata').hide();
								$('.btn_lnb_close').hide().siblings().show();
								$('#btn_submit').trigger('click');
							}
						});
					}
				});
			});

			// 팝업 - 청소업체 달력 닫기
			$('.btn_lnb_close').on('click', function (e) {
				e.preventDefault();
				$(this).hide();
				$('.pop_data').hide();
				$(this).siblings('.btn_lnb').show();
			});

			//상세페이지 - 후기
			$('.biz_views').on('click', function () {
				$('.biz_tab li').eq(1).find('a').trigger('click');
			});

		}
	});
});

// 시공상세보기 slider
$(function(){
	$('.const_detail_list').owlCarousel({
		items:1,
    thumbs: true,
    loop:true,
    nav:true,
    dots:true,
    thumbImage: true,
    thumbsPrerendered: true,
    thumbContainerClass: 'const_detail_thumb',
    thumbItemClass: 'const_thumb_item'
	})
})
