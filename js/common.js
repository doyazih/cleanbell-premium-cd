var PartnerStatusType = {
    Pre: 'pre',             //가입대기
    New: 'new',             //신규가입
    Normal: 'normal',       //일반 영업중
    Great: 'great',         //우수 업체
    Suspended: 'suspended', //보류
    Pointless: 'pointless', //포인트부족
    Withdrawn: 'withdrawn'  //탈퇴
};

var RequestAssignmentStatusType = {
    Assigned: 'assigned',               // 업체 배정됨
    WaitingCall: 'waiting-call',        // 상담신청
    CompletedCall: 'completed-call',    // 통화완료
    Reserved: 'reserved',               // 예약완료
    Canceled: 'canceled',               // 고객취소
    Claimed: 'claimed',                 // 포인트 복구 요청
    Rejected: 'rejected',               // 포인트 복구 불가
    Returned: 'returned'                // 포인트 복구 완료
};

var ClientDeviceType = {
    PC: 'pc',
    Mobile: 'mobile'
}

function parseQuery(qstr) {
    var query = {};
    if (qstr && qstr != '') {
        var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
    }
    return query;
}

function serializeQuery(data) {
    var ret = [];
    for (var d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}


function isMobile(){
	var UserAgent = navigator.userAgent;

	if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) || UserAgent.match(/LG|SAMSUNG|Samsung/))
	{
		return true;
    }
    else
    {
		return false;
	}
}

var BuildingType = {
    Apartment: { code: 'apartment', name: '아파트' },
    Villa: { code: 'villa', name: '빌라' },
    House: { code: 'house', name: '주택' },
    EfficiencyApartment: { code: 'efficiency-apartment', name: '오피스텔' },
    Studio: { code: 'studio', name: '원룸' },
    Office: { code: 'office', name: '사무실' },
    Store: { code: 'store', name: '상가' },
    Factory: { code: 'factory', name: '공장' }
}

var CleaningType = {
    NewBuildingCleaning: { code: 'new-building-cleaning', name: '입주청소' },
    MovingCleaning: { code: 'moving-cleaning', name: '이사청소' },
    SickHouseSyndrome: { code: 'sick-house-syndrome', name: '새집증후군' },
    FloorPolishing: { code: 'floor-polishing', name: '마루광택' },
    SiliconeConstruction: { code: 'silicone-construction', name: '실리콘시공' },
    SinkPolishing: { code: 'polishing-sink', name: '싱크대연마' },
    JointConstruction: { code: 'joint-construction', name: '줄눈시공' }
}