
var qs = parseQuery(location.hash.substr(1));

var _cleanDate = (qs.cdate && qs.cdate != '') ? new Date(qs.cdate) : new Date(moment().add(1, 'day').format('YYYY-MM-DD'));
var _moveDate = (qs.mdate && qs.mdate != '') ? new Date(qs.mdate) : new Date(moment().add(1, 'day').format('YYYY-MM-DD'));

$(document).ready(function () {

    $(function () {

        // 달력 라이브러리 초기화

        // 업체 검색 - 청소날짜
        $('#search_clean_data').datepicker({
            dateFormat: 'yy-mm-dd',
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            showMonthAfterYear: true,
            yearSuffix: '년',
            minDate: 1,
            maxDate: 60,
            onSelect: function (dateText, inst) {
                $('#search_clean_data .clean_data').val(dateText);
                _cleanDate = new Date(dateText);
                setCurrentUrl();

                if ($('#search_move_data .move_data').val() != '') {
                    next();
                }
            }
        });
        $('#search_clean_data').datepicker('setDate', _cleanDate);

        // 업체 검색 - 이사날짜
        $('#search_move_data').datepicker({
            dateFormat: 'yy-mm-dd',
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            showMonthAfterYear: true,
            yearSuffix: '년',
            minDate: 1,
            maxDate: 60,
            onSelect: function (dateText, inst) {
                $('#search_move_data .move_data').val(dateText);
                _moveDate = new Date(dateText);
                setCurrentUrl();

                if ($('#search_clean_data .clean_data').val() != '') {
                    next();
                }
            }
        });
        $('#search_move_data').datepicker('setDate', _moveDate);
    })

    $('#btnNext').click(function () {
        next();
    });

});

var setCurrentUrl = function () {

    var qs = serializeQuery({
        cdate: moment(_cleanDate).format('YYYY-MM-DD'),
        mdate: moment(_moveDate).format('YYYY-MM-DD')
    });

    location.hash = qs;
};

var next = function () {

    if (moment(_cleanDate).diff(moment(moment().format('YYYY-MM-DD')), 'days') > 60) {
        alert('신청일자는 60일을 초과할 수 없습니다.');
        return;
    }
    else {

        var qs = serializeQuery({
            cdate: moment(_cleanDate).format('YYYY-MM-DD'),
            mdate: moment(_moveDate).format('YYYY-MM-DD')
        });

        location.href = '/search-2#' + qs;

    }
};
