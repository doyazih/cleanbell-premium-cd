
var _requestId;
var _partnerId;

var _partnerConstructionTemplateData;

var getPartner = function () {

    var url = '/result/:requestId/partners/detail/:partnerId';
    url = url.replace(':requestId', _requestId);
    url = url.replace(':partnerId', _partnerId);

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        url: url,
        success: function (partner) {

            $('#listQuality').empty();
            $('#listWorker').empty();
            $('#listPayment').empty();
            $('#listAdditionalSerivce').empty();

            if (partner) {
                $('#lblPartnerName').text(partner.name);
                $('#lblSlogan').text(partner.slogan);
                $('#imgPartnerLogo').prop('src', partner.logoUrl);
                $('#lblAssingedCount').text(partner.assignedCount);
                $('#lblIntroduction').append(partner.introduction ? '<p>' + partner.introduction + '</p>' : '');

                if (partner.status == PartnerStatusType.New) {
                    $('#lblPartnerName').append('<span class="new">신규업체</span>');
                }
                else if (partner.status == PartnerStatusType.Normal) {
                    $('#lblPartnerName').append('<span class="existing">기존업체</span>');
                }
                else if (partner.status == PartnerStatusType.Great) {
                    $('#lblPartnerName').append('<span class="great">우수업체</span>');
                }

                $('#btnCall').prop('href', 'tel:' + partner.phone.replace(/-/g, ''));

                if (partner.events && partner.events.replace(/ /g, '') != '') {
                    $('#lblEvent').append(partner.events);
                    $('#lblEvent').show();
                }

                $('#lblWorkTimeTotal').text(partner.workTimeTotal);
                $('#lblWorkerCountTotal').text(partner.workerCountTotal);
                $('#lblMajorAges').text(partner.majorAges);

                if (partner.PartnerQualities && Array.isArray(partner.PartnerQualities) && partner.PartnerQualities.length > 0) {

                    partner.PartnerQualities.forEach(function (quality) {

                        if (quality && quality.name && quality.name != '') {
                            if (quality.exists) {
                                $('#listQuality').append('<span class="on">' + quality.name + '</span>');
                            }
                            else {
                                $('#listQuality').append('<span>' + quality.name + '</span>');
                            }
                        }
                    });
                }

                if (partner.afterServiceDays && partner.afterServiceDays > 0) {
                    $('#lblAfterService').text(partner.afterServiceDays);
                }

                if (partner.PartnerWorkers && Array.isArray(partner.PartnerWorkers) && partner.PartnerWorkers.length > 0) {

                    partner.PartnerWorkers.forEach(function (worker) {

                        if (worker && worker.name && worker.name != '') {
                            if (worker.exists) {
                                $('#listWorker').append('<span class="on">' + worker.name + '</span>');
                            }
                            else {
                                $('#listWorker').append('<span>' + worker.name + '</span>');
                            }
                        }
                    });
                }

                if (partner.PartnerPayments && Array.isArray(partner.PartnerPayments) && partner.PartnerPayments.length > 0) {

                    partner.PartnerPayments.forEach(function (payment) {

                        if (payment && payment.name && payment.name != '') {
                            if (payment.exists) {
                                $('#listPayment').append('<span class="on">' + payment.name + '</span>');
                            }
                            else {
                                $('#listPayment').append('<span>' + payment.name + '</span>');
                            }
                        }
                    });
                }

                if (partner.PartnerAdditionalServices && Array.isArray(partner.PartnerAdditionalServices) && partner.PartnerAdditionalServices.length > 0) {
                    partner.PartnerAdditionalServices.forEach(function (additionalService) {

                        if (additionalService && additionalService.name && additionalService.name != '') {
                            if (additionalService.exists) {
                                $('#listAdditionalSerivce').append('<span class="on">' + additionalService.name + '</span>');
                            }
                            else {
                                $('#listAdditionalSerivce').append('<span>' + additionalService.name + '</span>');
                            }
                        }
                    });
                }
            }
            else {
                alert('데이터 없음');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            //alert('조회 실패');
        }
    });
}

var getPartnerConstructionPhotos = function () {

    var url = '/result/:requestId/partners/detail/:partnerId/construction-photos';
    url = url.replace(':requestId', _requestId);
    url = url.replace(':partnerId', _partnerId);

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        url: url,
        success: function (constructionPhotos) {

            $('#listConstructionPhotos').empty();

            constructionPhotos.forEach(function (constructionPhoto) {

                var renderData = _partnerConstructionTemplateData.toString();
                renderData = renderData.replace('#{imageUrl}', constructionPhoto.PartnerConstructionPhotoImages[0].url);
                renderData = renderData.replace(/#{title}/gi, constructionPhoto.title);
                renderData = renderData.replace('#{constructionDate}', moment(constructionPhoto.date).format('YY.MM.DD'));
                renderData = renderData.replace('#{housingType}', convertBulidingTypeName(constructionPhoto.housingType));
                renderData = renderData.replace('#{space}', constructionPhoto.space);
                renderData = renderData.replace('#{area}', constructionPhoto.area);

                var cleaningTypes = '';
                constructionPhoto.PartnerConstructionPhotoCleaningTypes.forEach(function (cleaningType) {
                    cleaningTypes = cleaningTypes + ' | ' + convertCleaningTypeName(cleaningType.type);
                });

                cleaningTypes = cleaningTypes.replace(' | ', '');

                renderData = renderData.replace('#{cleaningTypes}', cleaningTypes);

                $('#listConstructionPhotos').append(renderData);
            });

            // 업체 상세 - 시공사진
            $('.construction .construction_img').on('click', function () {
                $(this).parent().siblings().find('.construction_img').removeClass('active')
                if($(this).hasClass('active')){
                    $(this).removeClass('active').siblings('.construction_cnt').slideUp('fast');
                }else{
                    $(this).parent().siblings().find('.construction_cnt').stop().slideUp('fast');
                    $(this).addClass('active').siblings('.construction_cnt').stop().slideDown();
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            //alert('조회 실패');
        }
    });
}

function ToFloat(number) {

    var tmp = number + "";

    if (tmp.indexOf(".") != -1) {

        number = number.toFixed(2);

        number = number.replace(/(0+$)/, "");

    }
    return number;
}

var getPartnerReviews = function () {

    var url = '/result/:requestId/partners/detail/:partnerId/reviews';
    url = url.replace(':requestId', _requestId);
    url = url.replace(':partnerId', _partnerId);

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        url: url,
        success: function (partner) {

            if (partner.ReviewPartnerStatistic) {
                $('#lblGradeAverageTop').text(ToFloat(partner.ReviewPartnerStatistic.PartnerTotalScore));
                $('#lblGradeAverage').text(ToFloat(partner.ReviewPartnerStatistic.PartnerTotalScore));

                $('#lblReviewCountTop').text(partner.ReviewPartnerStatistic.ReviewCount);
                $('#lblReviewCount').text(partner.ReviewPartnerStatistic.ReviewCount);

                $('#qualityPercent').css('width', Math.round(partner.ReviewPartnerStatistic.CQAverageScore * 10) + '%');
                $('#qualityPercent strong').text(Math.round(partner.ReviewPartnerStatistic.CQAverageScore * 10) + '%');

                $('#pricePercent').css('width', Math.round(partner.ReviewPartnerStatistic.PSAverageScore * 10) + '%');
                $('#pricePercent strong').text(Math.round(partner.ReviewPartnerStatistic.PSAverageScore * 10) + '%');

                $('#kindnessPercent').css('width', Math.round(partner.ReviewPartnerStatistic.KindnessAverageScore * 10) + '%');
                $('#kindnessPercent strong').text(Math.round(partner.ReviewPartnerStatistic.KindnessAverageScore * 10) + '%');

                $('#recommendationPercent').css('width', Math.round(partner.ReviewPartnerStatistic.RecommendationScore * 10) + '%');
                $('#recommendationPercent strong').text(Math.round(partner.ReviewPartnerStatistic.RecommendationScore * 10) + '%');

                $('#listStar').empty();
                renderStarCount($('#listStar'), partner.ReviewPartnerStatistic.PartnerTotalScore);
                renderStarCount($('#listStarTop'), partner.ReviewPartnerStatistic.PartnerTotalScore);
            }

            $('#listReviews').empty();
            if (partner.CustomerReviewInfos && Array.isArray(partner.CustomerReviewInfos) && partner.CustomerReviewInfos.length > 0) {

                partner.CustomerReviewInfos.forEach(function (review) {
                    $('#listReviews').append('<li><h3>' + review.customerName + '<span>' + moment(review.createdAt).format('YYYY.MM.DD') + '</span></h3><div class="biz_score"><img src="' + getReviewStarCountImgUrl(review.averageScore) + '" alt=""></div><p>' + review.comment + '</p></li>');
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            //alert('조회 실패');
        }
    });
}

var getBestPartnerReviews = function () {

    var url = '/result/:requestId/partners/detail/:partnerId/best-reviews';
    url = url.replace(':requestId', _requestId);
    url = url.replace(':partnerId', _partnerId);

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        url: url,
        success: function (partner) {

            $('#listBestReviews').empty();

            if (partner.CustomerReviewInfos && Array.isArray(partner.CustomerReviewInfos) && partner.CustomerReviewInfos.length > 0) {

                partner.CustomerReviewInfos.forEach(function (review) {
                    $('#listBestReviews').append('<li><h3><span><img width="22" src="https://cleanbell.blob.core.windows.net/images-v2/thumb_up.png" />BEST &nbsp;</span>' + review.customerName + '<span>' + moment(review.createdAt).format('YYYY.MM.DD') + '</span></h3><div class="biz_score"><img src="' + getReviewStarCountImgUrl(review.averageScore) + '" alt=""></div><p>' + review.comment + '</p></li>');
                });
            }
            else {
                $('#listBestReviews').parent().remove();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            //alert('조회 실패');
        }
    });
}

var convertBulidingTypeName = function (typeCode) {

    var result = '';

    for (var key in BuildingType) {

        var buildingType = BuildingType[key];

        if (buildingType.code.toLowerCase() == typeCode.toLowerCase()) {
            result = buildingType.name;
            break;
        }
    }

    return result;
};

var convertCleaningTypeName = function (typeCode) {

    var result = '';

    for (var key in CleaningType) {

        var cleaningType = CleaningType[key];

        if (cleaningType.code.toLowerCase() == typeCode.toLowerCase()) {
            result = cleaningType.name;
            break;
        }
    }

    return result;
};


var getPlaceStyleNo = function (placeCode) {

    switch (placeCode) {
        case 'room':
            return '01 on';
            break;
        case 'kitchen':
            return '02';
            break;
        case 'restroom':
            return '03';
            break;
        case 'entrance':
            return '04';
            break;
        case 'balcony':
            return '05';
            break;
        case 'livingroom':
            return '06';
            break;
        default:
            return '';
    }
}

var getPartnerCleaningRanges = function () {

    var url = '/result/:requestId/partners/detail/:partnerId/cleaningranges';
    url = url.replace(':requestId', _requestId);
    url = url.replace(':partnerId', _partnerId);

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        url: url,
        success: function (partner) {
            if (partner.PartnerCleaningRanges) {
                for (var place in partner.PartnerCleaningRanges) {

                    var placeCode = place.split('-')[0];
                    var placeName = place.split('-')[1];
                    var placeId = 'list-place-' + placeCode;

                    $('#listCleaningRange-mobile').append('<li class="range_list' + getPlaceStyleNo(placeCode) + '"><a href="#">' + placeName + '</a><div id="' + placeId + '-mobile" class="clean_range blind_pc"></div></li>');

                    if (placeCode == 'room') {
                        $('#listCleaningRange-pc').append('<div class="first" id="' + placeId + '-pc"></div>');
                    }
                    else {
                        $('#listCleaningRange-pc').append('<div id="' + placeId + '-pc"></div>');
                    }

                    partner.PartnerCleaningRanges[place].forEach(function (placeDetail) {
                        if (placeDetail.exists) {
                            $('#' + placeId + '-mobile').append('<span class="on">' + placeDetail.placeDetail + '</span>');
                            $('#' + placeId + '-pc').append('<span class="on">' + placeDetail.placeDetail + '</span>');
                        }
                        else {
                            $('#' + placeId + '-mobile').append('<span>' + placeDetail.placeDetail + '</span>');
                            $('#' + placeId + '-pc').append('<span>' + placeDetail.placeDetail + '</span>');
                        }
                    });
                }
                
                if ($(window).width() < 641) {
                    // 업체검색 상세 - 청소범위- 탭
                    $('.range_list > li > a').on('click', function (e) {
                        e.preventDefault();
                        $(this).parent().addClass('on').siblings().removeClass('on');
                        $(this).siblings('.clean_range').stop().slideDown().closest('li').siblings().find('.clean_range').stop().slideUp();
                    });
                    if ($('.range_list > li').hasClass('on')) {
                        $('.range_list > li.on').find('>.clean_range').show();
                    }
                }
                else {
                    // 업체검색 상세 - 청소범위- 탭
                    $('.range_list > li > a').on('click', function (e) {
                        e.preventDefault();
                        var idx = $(this).parent().index();
                        $(this).parent().addClass('on').siblings().removeClass('on');
                        $('.pc_clean_range').find('>div').eq(idx).show().siblings().hide();
                        $('.clean_range').hide();
                    });
                    if ($('.range_list > li').hasClass('on')) {
                        $('.range_list > li').find('>.clean_range').hide();
                    }
                }

                $(window).on('resize', function () {
                    if ($(window).width() < 641) {
                        // 업체검색 상세 - 청소범위- 탭
                        $('.range_list > li > a').on('click', function (e) {
                            e.preventDefault();
                            $(this).parent().addClass('on').siblings().removeClass('on');
                            $(this).siblings('.clean_range').stop().slideDown().closest('li').siblings().find('.clean_range').stop().slideUp();
                        });
                        if ($('.range_list > li').hasClass('on')) {
                            $('.range_list > li.on').find('>.clean_range').show();
                        }
                    }
                    else {
                        // 업체검색 상세 - 청소범위- 탭
                        $('.range_list > li > a').on('click', function (e) {
                            e.preventDefault();
                            var idx = $(this).parent().index();
                            $(this).parent().addClass('on').siblings().removeClass('on');
                            $('.pc_clean_range').find('>div').eq(idx).show().siblings().hide();
                            $('.clean_range').hide();
                        });
                        if ($('.range_list > li').hasClass('on')) {
                            $('.range_list > li').find('>.clean_range').hide();
                        }
                    }
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            //alert('조회 실패');
        }
    });
}


var renderStarCount = function (element, gradeAverage) {

    var starCount = 90;

    if (gradeAverage && !isNaN(gradeAverage)) {

        if (gradeAverage >= 9.5) {
            starCount = 100;
        }
        else if (gradeAverage >= 9) {
            starCount = 90;
        }
        else if (gradeAverage >= 8.5) {
            starCount = 80;
        }
        else if (gradeAverage >= 8) {
            starCount = 70;
        }
        else {
            starCount = 60;
        }
    }

    element.prop('src', 'https://cleanbell.blob.core.windows.net/images-v2/star' + starCount + '.png');
}

var getReviewStarCountImgUrl = function (average) {

    var ceil = Math.ceil(average);
    var starCount = 2;
    if (ceil > 9) {
        starCount = 5;
    }
    else if (ceil > 8) {
        starCount = 4;
    }
    else if (ceil > 7) {
        starCount = 3;
    }
    return 'https://cleanbell.blob.core.windows.net/images-v2/biz_score0' + starCount + '.png';
}

$(document).ready(function () {
    getPartner();
    getPartnerReviews();
    getBestPartnerReviews();
    getPartnerCleaningRanges();

    $.get('/partial/result/detail-construction-template.html', function (data, status) {

        if (status == 'success') {
            _partnerConstructionTemplateData = data.toString();
            getPartnerConstructionPhotos();
        }
    });

    $('#btnRequestCallback').click(function () {

        if (!$('#consulting_time :selected').val() || $('#consulting_time :selected').val() == '') {
            alert('상담가능시간을 선택하여 주십시오');
            return;
        }

        var url = '/result/:requestId/partners/detail/:partnerId/assigments';
        url = url.replace(':requestId', _requestId);
        url = url.replace(':partnerId', _partnerId);

        var param = {
            status: RequestAssignmentStatusType.WaitingCall,
            availableCallTimeHour: $('#consulting_time :selected').val()
        };

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: url,
            data: param,
            success: function (result) {
                if (result) {
                    if (confirm('상담신청 등록 되었습니다\n다른 청소업체들을 보시겠습니까?')) {
                        location.href = location.href.substr(0, location.href.indexOf('/company/'));
                    }
                    else {
                        popClose('consulting_popup');
                        return;
                    }
                }
                else {
                    alert('오류가 발생하였습니다\n다시 시도 해주십시오')
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText);
                alert('처리 실패');
            }
        });
    });

    var now = new Date();
    if (moment(now).format('HH') >= '22' || moment(now).format('HH') < '08') {
        $('#btnCall').hide();
    }
    else {
        $('#btnCall').click(function () {

            var url = '/result/:requestId/partners/detail/:partnerId/assigments';
            url = url.replace(':requestId', _requestId);
            url = url.replace(':partnerId', _partnerId);

            var param = {
                status: RequestAssignmentStatusType.CompletedCall
            };

            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: url,
                data: param,
                success: function (result) {
                    if (confirm('통화는 만족스러우셨나요?\n다른 청소업체들을 보시겠습니까?')) {
                        location.href = location.href.substr(0, location.href.indexOf('/company/'));
                    }
                    else {
                        return;
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText);
                    alert('처리 실패');
                }
            });
        });

    }

    $('#btnReview').click(function () {
        $('#tabReview').trigger('click');
    });

    if (location.hash.substring(1).indexOf('review') >= 0) {
        $('#tabReview').trigger('click');
    }
});

$(function () {
    if ($(window).width() < 641) {
        // 업체검색 상세 - 후기
        $('.cleanbell_policy a').on('click', function (e) {
            e.preventDefault();
            if ($(this).hasClass('on')) {
                $(this).siblings().slideUp();
                $(this).removeClass('on');
            } else {
                $(this).siblings().slideDown();
                $(this).addClass('on');
            }
        });
    };
});