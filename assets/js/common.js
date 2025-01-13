$(document).ready(function () {

    /**** 모달 이벤트 ****/

    function removeDefaultEvent(e) {
        e.preventDefault();
    }

    // 모달 열기 버튼 클릭 이벤트
    $(".open-modal").click(function () {
        var modalId = $(this).data("modal-id");
        var $modal = $("#" + modalId);
        $("#" + modalId).addClass("active");
        if (!($modal.hasClass("full-modal") || $modal.hasClass("toggle-modal"))) {
            window.addEventListener("wheel", removeDefaultEvent, { passive: false });
        }

        if ($modal.hasClass("toggle-modal")) {
            window.addEventListener("touchmove", removeDefaultEvent, { passive: false });
        }
    });

    // 모달 닫기 버튼 클릭 이벤트
    $(".btn-modal-close").click(function () {
        var modal = $(this).closest(".modal-wrap"); // 가장 가까운 모달 찾기
        modal.removeClass("active");
        window.removeEventListener("wheel", removeDefaultEvent);
        window.removeEventListener("touchmove", removeDefaultEvent); // 모달 닫을 때 터치 이벤트 제거
    });

    // 모달 영역 외부를 클릭하여 닫기
    $(".modal-wrap").click(function (e) {
        if ($(e.target).hasClass("modal-wrap")) { // 클릭이 모달 콘텐츠 외부인지 확인
            $(this).removeClass("active");
            $('.wrap').on("wheel", removeDefaultEvent);
        }

        var modal = $(this).closest(".modal-wrap");
        modal.removeClass("active");
        window.removeEventListener("wheel", removeDefaultEvent);
        window.removeEventListener("touchmove", removeDefaultEvent); // 모달 닫을 때 터치 이벤트 제거
    });

    // 모달 내부 클릭 시 닫기 방지
    $(".modal-content").click(function (e) {
        e.stopPropagation();
    });

    /**** ios 키보드 scroll resize (modal 에서만 생기는 현상) ****/
    $('.modal-wrap input').keydown(function (event) {
        if (event.key === "Enter") {
            $(this).blur();
        }
    });

    $('.modal-wrap input').bind('blur', function (e) {
        window.scrollTo(0, 1);
    });

    /**** 필수 체크 요소 해제 시 ****/
    function showToast(message) {
        var toast = $('<div class="toast"><img src="img/ico/i-toast.svg">' + message + '</div>');
        $("body").append(toast);

        setTimeout(() => toast.css("opacity", 1), 10);
        setTimeout(() => toast.fadeOut(500, () => toast.remove()), 3000);
    }

    /**** 약관 전체 동의 체크박스 클릭 이벤트 ****/
    $("#chkAll").click(function () {
        var isChecked = $(this).prop("checked");

        $(".check-group input[type='checkbox']").each(function () {
            if ($(this).hasClass("terms-essential")) {
                if (!isChecked) {
                    $(this).prop("checked", true);
                    showToast("꼭 동의해야 하는 항목이에요");
                } else {
                    $(this).prop("checked", true);
                }
            } else {
                $(this).prop("checked", isChecked);
            }
        });
    });
    
    $(".check-group input[type='checkbox']").click(function () {
        if ($(this).hasClass("terms-essential") && !$(this).prop("checked")) {
            $(this).prop("checked", true);
            showToast("꼭 동의해야 하는 항목이에요");
        }
    });

    /**** Bottom Sheet ****/
    var triggerHeight = 600; // 특정 px 값 설정
    var isClosed = false;    // .bottom-sheet-close가 눌렸는지 확인하는 변수

    // 스크롤 이벤트 처리
    $(window).scroll(function () {
        if (!isClosed) { // .bottom-sheet-close가 눌리지 않은 경우에만 실행
            var scrollTop = $(window).scrollTop();

            if (scrollTop > triggerHeight) {
                $(".bottom-sheet").addClass("active");
                // $(".main").addClass("show");
            } else {
                $(".bottom-sheet").removeClass("active");
                // $(".main").removeClass("show");
            }
        }
    });

    // .bottom-sheet-close 버튼 클릭 이벤트 처리
    $(".bottom-sheet-close").click(function () {
        $(".bottom-sheet").removeClass("active");
        // $(".main").removeClass("show");
        isClosed = true; // .bottom-sheet-close 클릭 상태로 설정
    });

});
