
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
        $('#clean_city1').val(_selectedPlaceCode.substring(0,2)).trigger('change');;
    
        setTimeout(function () {
            $('#clean_city2').val(_selectedPlaceCode);
        }, 2000);
        
        $('#clean_city2').prop('disabled', false);
        $('#clean_city2').removeClass('disabled');
        $('#clean_city2').val(_selectedPlaceCode);
    }

    if(_selectedSpace && _selectedSpace > 0) {
        $('#average').val(_selectedSpace);
        $('#average').css('background', '');
        $('#average').prop('disabled', false);
        $('#average').removeClass('disabled');
    }

    if(_selectedBuildingType && _selectedBuildingType != '') {
        $('#my_structure').val(_selectedBuildingType);
	    $('#my_structure').prop('disabled', false).removeClass('disabled');
    }
}

$(document).ready(function () {

    $('#clean_city1').change(function () {
        setSiGuGun();
    });

    $('#clean_city2').change(function () {
        _selectedPlaceCode = $('#clean_city2 :selected').val();

        if (_selectedPlaceCode && _selectedPlaceCode != '') {
            qs.pcode = _selectedPlaceCode;
            $('#average').css('background', '');
            $('#average').prop('disabled', false);
            $('#average').removeClass('disabled');
        }
        else {
            delete qs['pcode'];
            $('#average').val('');
            $('#average').css('background', '#ccc');
            $('#average').prop('disabled', true);
            $('#average').addClass('disabled');
        }
        setCurrentUrl();
    });
    
	$('#average').on('keyup', function () {
        _selectedSpace = $('#average').val().replace(/[^0-9]/g,"");
        $('#average').val(_selectedSpace);
        if (parseInt(_selectedSpace) > 0) {
            qs.spc = _selectedSpace;
        }
        else {
            delete qs['spc'];
        }
        setCurrentUrl();
        qs.spc = _selectedSpace;
		$('#my_structure').prop('disabled', false).removeClass('disabled');
	});

	$('#my_structure').change(function () {
		_selectedBuildingType = $('#my_structure :selected').val();
		qs.btype = _selectedBuildingType;
		setCurrentUrl();
		
		/* - 180717 - 우리집종류 추가 선택으로 인한 다음단계 수동 처리 */
		if(_selectedBuildingType == 'apartment' || _selectedBuildingType == 'villa' || _selectedBuildingType == 'house' || _selectedBuildingType == 'efficiency-apartment'){
			$('#my_structure_detail').addClass('on');		
			$('#my_structure_detail ul li').eq(0).addClass('on');								
			$('#my_room').change(function() {
				var my_room = $('#my_room option:selected').val();
				if(my_room != ''){
					$('#my_structure_detail ul li').eq(1).addClass('on');
					$('#my_room_result').text(my_room);
				}
			});
			$('#my_bathroom').change(function() {
				var my_bathroom = $('#my_bathroom option:selected').val();
				if(my_bathroom != ''){
					$('#my_structure_detail ul li').eq(2).addClass('on');
					$('#my_bathroom_result').text(my_bathroom);
				}
			});
			$('#my_veranda').change(function() {
				var my_veranda = $('#my_veranda option:selected').val();
				if(my_veranda != ''){
					$('#my_structure_detail ul li').eq(3).addClass('on');
					$('#my_veranda_result').text(my_veranda);
				}
			});
			$('#my_str').change(function() {
				var my_str = $('#my_str option:selected').val();
				if(my_str != ''){
					$('#my_structure_detail').removeClass('on');	
					$('#my_structure_result').addClass('on');
				}
			});
		} else {
			location.href = '/search-3#' + serializeQuery(qs);
		}
		/* - 180717 - 우리집종류 추가 선택으로 인한 다음단계 수동 처리 끝 */
	});


		
		/*
		$(document).ready(function () {
			$('#my_structure').change(function () {
				var my_structure = $('#my_structure option:selected').val();
				if(_selectedBuildingType == 'apartment' || _selectedBuildingType == 'villa' || _selectedBuildingType == 'house' || _selectedBuildingType == 'efficiency-apartment'){
				}
			})
		})
		*/
		
		


    $('#btnPrevious').click(function () {
        location.href = '/search-1#' + serializeQuery(qs);
    });

    $('#btnNext').click(function () {

        if (!_selectedPlaceCode || _selectedPlaceCode == '')
        {
            alert('지역(시/구/군)을 선택하여 주십시오');
            return;
        }

        if (!_selectedBuildingType || _selectedBuildingType == '') {
            alert('거주형태를 선택하여 주십시오');
            return;
        }

        if (!_selectedSpace || isNaN(_selectedSpace) || _selectedSpace <= 0) {
            alert('분양평수를 입력하여 주십시오');
            return;
        }

				/* - 180717 - 우리집종류 추가 선택으로 인한 추가 밸리데이션 */
				if (!_selectedBuildingType || _selectedBuildingType == '') {
				alert('우리집 종류를 선택하여 주십시오');
				return;
				} else {
					if (!$('#my_room_result') || $('#my_room_result') == '') {
						alert('방를 선택하여 주십시오');
						return;
					}
					if (!$('#my_bathroom_result') || $('#my_bathroom_result') == '') {
						alert('화장실을 선택하여 주십시오');
						return;
					}
					if (!$('#my_veranda_result') || $('#my_veranda_result') == '') {
						alert('베란다를 선택하여 주십시오');
						return;
					}
					if (!$('#my_str_result') || $('#my_str_result') == '') {
						alert('구조를 선택하여 주십시오');
						return;
					}
				}
				/* - 180717 - 우리집종류 추가 선택으로 인한 추가 밸리데이션 끝 */
			location.href = '/search-3#' + serializeQuery(qs);
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
            
            $('#clean_city1').empty();
            $('#clean_city1').append('<option value="">시/도 선택</option>');

            data.forEach(function (sido) {
                $('#clean_city1').append('<option value="' + sido.key + '">' + sido.value + '</option>');
            });

            init();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('지역정보 조회 실패');
        }
    });
}

var setSiGuGun = function () {

    if (!$('#clean_city1').val() || $('#clean_city1').val() == '') {
        $('#clean_city2').prop('disabled', true);
        $('#clean_city2').addClass('disabled');
        $('#clean_city2').empty();
        $('#clean_city2').append('<option value="">시/구/군 선택</option>');
    }
    else {

        $('#clean_city2').prop('disabled', false);
        $('#clean_city2').removeClass('disabled');

        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            url: '/area/siguguns/' + $('#clean_city1').val(),
            success: function (data) {
                $('#clean_city2').empty();
                $('#clean_city2').append('<option value="">시/구/군 선택</option>');
    
                data.forEach(function (sigugun) {
                    $('#clean_city2').append('<option value="' + sigugun.Code + '">' + sigugun.SiGuGun + '</option>');
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('지역정보 조회 실패');
            }
        });
    }
};

var bindQueryData = function () {

    if (qs.pcode && qs.pcode != '') {
        $('#selSiDo').val(qs.pcode.substring(0,2)).trigger('change');;

        setTimeout(function () {
            $('#selSiGuGun').val(qs.pcode);
        }, 1000);
    }

    if (qs.btype && qs.btype != '') {
        $('#selBuildingType').val(qs.btype);
    }

    if (qs.spc && qs.spc != '') {
        $('#txtSpace').val(qs.spc);
    }
}