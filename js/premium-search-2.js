
var qs = parseQuery(location.hash.substr(1));

var _selectedPlaceCode = (qs.pcode && qs.pcode != '') ? qs.pcode : null;
var _selectedBuildingType = (qs.btype && qs.btype != '') ? qs.btype : null;
var _selectedSpace = (qs.spc && !isNaN(parseInt(qs.spc)) && parseInt(qs.spc) > 0) ? parseInt(qs.spc) : null;

var setCurrentUrl = function () {

    location.hash = serializeQuery(qs);
};

var init = function () {
    if (_selectedPlaceCode && _selectedPlaceCode != '')
    {
        $('#clean_structure').val(_selectedPlaceCode.substring(0,2)).trigger('change');;

        setTimeout(function () {
            $('#clean_kind').val(_selectedPlaceCode);
        }, 2000);

        $('#clean_kind').prop('disabled', false);
        $('#clean_kind').removeClass('disabled');
        $('#clean_kind').val(_selectedPlaceCode);
    }

}

$(document).ready(function () {

    $('#clean_structure').change(function () {
        setSiGuGun();
    });


    $('.premiumPrevSearch2_1').click(function () {
        location.href = '/premium/search-1.html';
    });

    $('.premiumNextSearch2_1').click(function () {

        if (!_selectedPlaceCode || _selectedPlaceCode == '')
        {
            alert('청소 종류를 선택하여 주십시오');
            return;
        }
			location.href = '/premium/search-2-2.html';
		});

    $('.premiumPrevSearch2_2').click(function () {
        location.href = '/premium/search-2-1.html';
    });

    $('.premiumNextSearch2_2').click(function () {
			location.href = '/premium/search-3.html';
		});

    setSiDo();
});

var setSiDo = function () {

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        url: '/area/sidos',
        success: function (data) {

            $('#clean_structure').empty();
            $('#clean_structure').append('<option value="">구조 선택</option>');

            data.forEach(function (sido) {
                $('#clean_structure').append('<option value="' + sido.key + '">' + sido.value + '</option>');
            });

            init();
        }
    });
}

var setSiGuGun = function () {

    if (!$('#clean_structure').val() || $('#clean_structure').val() == '') {
        $('#clean_kind').prop('disabled', true);
        $('#clean_kind').addClass('disabled');
        $('#clean_kind').empty();
        $('#clean_kind').append('<option value="">청소 종류 선택</option>');
    }
    else {

        $('#clean_kind').prop('disabled', false);
        $('#clean_kind').removeClass('disabled');

        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            url: '/area/siguguns/' + $('#clean_structure').val(),
            success: function (data) {
                $('#clean_kind').empty();
                $('#clean_kind').append('<option value="">청소 종류 선택</option>');

                data.forEach(function (sigugun) {
                    $('#clean_kind').append('<option value="' + sigugun.Code + '">' + sigugun.SiGuGun + '</option>');
                });
            }
        });
    }
};
