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
        // 약관 전체 동의 체크박스의 상태를 가져옴
        var isChecked = $(this).prop("checked");
        // 아래에 있는 모든 체크박스의 상태를 약관 전체 동의 체크박스와 동일하게 설정
        $(".check-group input[type='checkbox']").prop("checked", isChecked);
    });
    // $("#chkAll").click(function () {
    //     var isChecked = $(this).prop("checked");

    //     $(".check-group input[type='checkbox']").each(function () {
    //         if ($(this).hasClass("terms-essential")) {
    //             if (!isChecked) {
    //                 $(this).prop("checked", true);
    //                 showToast("꼭 동의해야 하는 항목이에요");
    //             } else {
    //                 $(this).prop("checked", true);
    //             }
    //         } else {
    //             $(this).prop("checked", isChecked);
    //         }
    //     });
    // });

    // $(".check-group input[type='checkbox']").click(function () {
    //     if ($(this).hasClass("terms-essential") && !$(this).prop("checked")) {
    //         $(this).prop("checked", true);
    //         showToast("꼭 동의해야 하는 항목이에요");
    //     }
    // });

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

    // 버튼 클릭 시 파일 입력 요소를 클릭하도록 처리
    // $('.profile-upload-btn').on('click', function () {
    //     $('.profile-upload').click();
    // });

    // 파일 입력 요소의 change 이벤트 처리
    // $('.profile-upload').on('change', function (event) {
    //     const file = event.target.files[0]; // 선택한 파일 가져오기

    //     if (file) {
    //         const reader = new FileReader();

    //         reader.onload = function (e) {
    //             // .profile 내부의 모든 자식 요소 제거
    //             $('.profile').empty();

    //             // .profile 요소의 배경 이미지 설정
    //             $('.profile').css({
    //                 background: `url(${e.target.result}) no-repeat center center`, // 배경 이미지 설정
    //                 'background-size': 'cover', // 배경 이미지를 컨테이너에 맞게 조정
    //             });
    //         };

    //         // 파일을 데이터 URL로 읽기
    //         reader.readAsDataURL(file);
    //     }
    // });

    $('.input-group-field.decimal input').on('blur', function () {
        let value = parseFloat($(this).val()); // 입력 값을 숫자로 변환
        if (!isNaN(value)) {
            $(this).val(value.toFixed(2)); // 소수점 둘째 자리까지 표시
        }
    });

    $('.address-detail').click(function () {
        const $this = $(this); // 클릭된 요소를 참조
        const $nextElement = $this.next('ul'); // 다음 요소 (ul)

        if ($this.hasClass('active')) {
            // 이미 열려 있는 경우
            $this.removeClass('active'); // 활성화 클래스 제거
            $nextElement.stop().slideUp(300).removeClass('show'); // 슬라이드 업 및 클래스 제거
        } else {
            // 닫혀 있는 경우
            $this.addClass('active'); // 활성화 클래스 추가
            $nextElement.stop().slideDown(300).addClass('show'); // 슬라이드 다운 및 클래스 추가
        }
    });

    // .header-main이 있는 .header 요소를 저장
    const $header = $('.header.header-main');

    // 스크롤 이벤트 처리
    $(window).on('scroll', function () {
        const scrollTop = $(this).scrollTop(); // 현재 스크롤 위치

        if (scrollTop > 56) {
            // 스크롤이 56px 이상일 때
            if ($header.hasClass('header-main')) {
                $header.removeClass('header-main'); // .header-main 제거
            }
        } else {
            // 스크롤이 0px일 때
            if (!$header.hasClass('header-main')) {
                $header.addClass('header-main'); // .header-main 복원
            }
        }
    });

    const mainSwiper = new Swiper(".main-swiper", {
        pagination: {
            el: ".swiper-pagination",
        },
    });

    $('.accordion-header').on('click', function () {
        // $('.accordion-content').slideUp();
        // $('.accordion-header').not(this).removeClass('active');

        const content = $(this).next('.accordion-content');
        if (content.is(':visible')) {
            content.slideUp();
            $(this).removeClass('active');
        } else {
            content.slideDown();
            $(this).addClass('active');
        }
    });

    const testInfoSwiper = new Swiper(".test-info-swiper", {
        pagination: {
            el: ".swiper-pagination",
        },
    });
});
