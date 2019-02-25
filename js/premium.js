
$(function () {
	$('.showDropmenu').on('click',function(){
		if($('.premium-dropmenu').hasClass('hover')){
			$('.premium-dropmenu').removeClass('hover');
		} else {
			$('.premium-dropmenu').addClass('hover');

		}
	})
	$('.premium-dropmenu').on('mouseleave',function(){
		$(this).removeClass('hover');
	})

  //청소업체 검색
  $('.cleanbellDrop').hover(function(){
    $('.cleanbellDrop > a').addClass("before");
    $('.cleanbell-dropmenu').addClass("hover");
  }, function(){
    $('.cleanbellDrop > a').removeClass("before");
    $('.cleanbell-dropmenu').removeClass("hover");
  });
  //프리미엄 청소 드롭다운 메뉴
  $('.premiumDrop').hover(function(){
    $('.showDropmenu').addClass("imgChange");
    $('.premiumDrop > a').addClass("before");
    $('.premium-dropmenu').addClass("hover");
  }, function(){
    $('.showDropmenu').removeClass("imgChange");
    $('.premiumDrop > a').removeClass("before");
    $('.premium-dropmenu').removeClass("hover");
  });
  //모바일 메인 - 가장 깨끗한 보금자리로 만드는 클린벨
  $('.nestSlider').owlCarousel({
    items: 1,
    loop: true,
    center:true,
    margin: 0,
    nav:true,
    navText:["<span></span>","<span></span>"],
    dots:false
  });
  //고객 리뷰 슬라이드
  $('.reviewSlide').owlCarousel({
    items: 1,
    loop: false,
    margin: 15,
    nav: true,
    dots: false
  });
  //청소하는 범위 모달 내부 슬라이드
  $('.cleanRangeDetail').owlCarousel({
    items: 1,
    loop: false,
    center:true,
    margin: 0,
    autoHeight:true,
    nav: true,
    navText:["<span></span>","<span></span>"],
    dots: true,
    URLhashListrener:true,
    autoplayHoverPause:true,
    startPosition:'URLHash'
  });
  //청소범위 모바일 모달 내부 슬라이드 dots
  $('.dotSlide').owlCarousel({
    items:1,
    loop:false,
    center:false,
    margin:5,
    nav:false,
    dots:false,
    URLhashListrener:true,
    autoplayHoverPause:true,
    startPosition:'URLHash'
  });
  //청소 전 안내사항 모달 내부 슬라이드
  $('.cleanNoticeDetail').owlCarousel({
    items: 1,
    loop: false,
    center:true,
    margin: 0,
    autoHeight:true,
    nav: true,
    //navText:["<img src='../images-v3/rangePrev.png'>","<img src='../images-v3/rangeNext.png'>"],
    navText:["<span></span>","<span></span>"],
    dots: true
  });

  //청소구조 선택 - 자동텍스트
  $('#clean_kind').change(function(){
      $('.autoText').hide();
      $('#' + $(this).val()).show();
  });

	//메인 모달관련
	$('#detailCleanRange').on('click',function(){
		if($('#cleanRange').hasClass('none')){
			$('#cleanRange').removeClass('none');
		};

	});
	$('#detailCleanNotice').on('click',function(){
		if($('#cleanNotice').hasClass('none')){
			$('#cleanNotice').removeClass('none');
		}
	});

  //closeModal - 청소하는 범위
  $("#closeRangeModal").click(function(){
    $("#cleanRange").addClass('none');
  });

  //closeModal - 청소 전 안내사항
  $("#closeNoticeModal").click(function(){
    $("#cleanNotice").addClass('none');
  });

  $(".checkModal").attr('style','display:none');
  //사업장선택시
  $("#clean_structure").change(function(){
    var opBusyModal = $(this).val();
    if(opBusyModal == "21"){
      $("#businessModal").attr('style','display:block');
    }
  });
  $("#businessModal .closeModal").click(function(){
    $("#businessModal").hide();
  });
  //줄눈선택시
  $("#checkaddService02").click(function(){
    $("#zulnoonModal").attr('style','display:block');
  });
  $("#zulnoonModal .closeModal").click(function(){
    $("#zulnoonModal").hide();
  });
  //팀선택 고객한줄평 슬라이드
  $('.teamReviewSlider').owlCarousel({
    items: 1,
    loop: true,
    center:true,
    margin: 0,
    dots:false,
    nav: true,
    navText:["<img src='../images-v3/teamReviewPrev.png'>","<img src='../images-v3/teamReviewNext.png'>"]
  });
  //예약률 퍼센트
  $('.bar i').each(function(){
		var txt = $(this).siblings('span').text();
		$(this).stop().animate({'width': txt+'%'},1000);
	});
  //상담요청-제출하기
  $(".thanksModal").attr('style','display:none');
  $('.counselSubmit').click(function(){
    $("#counselModal").attr('style','display:block');
  });
  //고객만족도조사-제출하기
  $('.surveySubmit').click(function(){
    $("#surveyModal").attr('style','display:block');
  });
  //프리미엄 고객후기
  $('.no128').click(function(){
    $("#no128").toggle();
    if($("#no128:visible").size() !=0){
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    };
  });
  $('.no127').click(function(){
    $("#no127").toggle();
    if($("#no127:visible").size() !=0){
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    };
  });
  $('.no126').click(function(){
    $("#no126").toggle();
    if($("#no126:visible").size() !=0){
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    };
  });
  $('.no125').click(function(){
    $("#no125").toggle();
    if($("#no125:visible").size() !=0){
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    };
  });
  $('.no124').click(function(){
    $("#no124").toggle();
    if($("#no124:visible").size() !=0){
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    };
  });
  //고객센터-FAQ
  $('.no1').click(function(){
    $("#no1").toggle();
    if($("#no1:visible").size() !=0){
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    };
  });
  $('.no2').click(function(){
    $("#no2").toggle();
    if($("#no2:visible").size() !=0){
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    };
  });
  $('.no3').click(function(){
    $("#no3").toggle();
    if($("#no3:visible").size() !=0){
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    };
  });
  $('.no4').click(function(){
    $("#no4").toggle();
    if($("#no4:visible").size() !=0){
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    };
  });
});
