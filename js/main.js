
$(document).ready(function () {

    $('#btn_submit').click(function () {

        if (!$('#clean_data').val() || $('#clean_data').val() == '') {
			alert('청소날짜를 선택해주세요.');
			return false;
		} else if (!$('#move_data').val() || $('#move_data').val() == '') {
			alert('이사날짜를 선택해주세요.');
			return false;
        }
        
        var qs = serializeQuery({
            cdate: moment($('#clean_data').val()).format('YYYY-MM-DD'),
            mdate: moment($('#move_data').val()).format('YYYY-MM-DD')
        });

        location.href = '/search-2#' + qs;
    });

    $('#panelStepDesc-pc').click(function () {
        location.href = '/search-1';
    });

    $('#panelStepDesc-mobile').click(function () {
        location.href = '/search-1';
    });

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        url: '/partner/count',
        success: function (result) {
            $('#lblPartnerCount').html(result.toLocaleString() + ' <span>팀</span>');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
        }
    });

    loadRealtimeReviews();
    loadRealtimeRequests();
    setInterval(loadRealtimeRequests, 5000);
});

var getStatusLable = function (status) {

    if (status == RequestStatusType.Requested) {
        return '<span class="icon_info">정보입력</span>';
    }
    else if (status == RequestStatusType.Searched) {
        return '<span class="icon_lookup">업체조회</span>';
    }
    else if (status == RequestStatusType.WaitingCall) {
        return '<span class="icon_apply">상담신청</span>';
    }
    else if (status == RequestStatusType.CompletedCall) {
        return '<span class="icon_currency">통화완료</span>';
    }
    else {
        return '';   
    }
}

var RequestStatusType = {
    Requested: 'requested',             //정보입력
    Searched: 'searched',               //업체조회
    WaitingCall: 'waiting-call',        //상담신청(PC)
    CompletedCall: 'completed-call',    //통화완료(Mobile)
    Canceled: 'canceled'                //고객취소
};

var loadRealtimeReviews = function () {
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        url: '/main/front-customer-reviews',
        success: function (reviews) {
            if (reviews && Array.isArray(reviews) && reviews.length > 0) {
                $('#customerReviewList').empty();
                reviews.forEach(function (review, idx) {
                    var order = idx % 2 == 0 ? '' : '2';
                    $('#customerReviewList').append('<li><div class="left' + order + '"><img src="https://cleanbell.blob.core.windows.net/images-v2/customer_reviews0' + (idx+1) + '.png" alt=""></div><div class="right' + order + '"><div class="review_text"><p>' + review.comment + '</p><dl><dt>업체명 :</dt><dd>' + review.partnerName + '</dd></dl></div></div></li>');
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
        }
    });
}

var loadRealtimeRequests = function () {

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        url: '/request/partners-average',
        success: function (result) {
            $('#lblPartnersAverage').html('<span>평균</span> ' + result.toLocaleString() + ' <span>개 상담</span>');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
        }
    });

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        url: '/request/count',
        success: function (result) {
            //$('#lblRequestCount').text(result.toLocaleString());
            $('#lblRealtimeRequestCount').text(result.toLocaleString());
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
        }
    });

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        url: '/requests',
        success: function (results) {
            //$('#lblRealtimeRequestCount').text(results.count.toLocaleString());
            $('#listRealtimeRequests').empty();
            results.rows.forEach(function (result) {
                $('#listRealtimeRequests').append('<tr><td>' + result.areaName + '</td><td>' + result.name +'</td><td>' + moment(result.requestDate).format('HH:mm') + '</td><td>' + getStatusLable(result.status) + '</td></tr>');
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
        }
    });
}