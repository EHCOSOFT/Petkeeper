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
            // window.addEventListener("wheel", removeDefaultEvent, { passive: false });
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

    function matchSlideHeights() {
        const slides = document.querySelectorAll('.main-swiper .swiper-slide');
        let maxHeight = 0;

        // 각 슬라이드 높이 측정해서 최대값 찾기
        slides.forEach(slide => {
            slide.style.height = 'auto'; // 높이 초기화 후 측정
            const height = slide.offsetHeight;
            if (height > maxHeight) maxHeight = height;
        });

        // 모든 슬라이드 높이를 maxHeight로 맞추기
        slides.forEach(slide => {
            slide.style.height = `${maxHeight}px`;
        });
    }

    // 페이지 로드 후 실행
    window.addEventListener('load', matchSlideHeights);
    // swiper 업데이트 시도 될 수도 있으니 resize나 swiper 이벤트에도 추가하면 좋아
    window.addEventListener('resize', matchSlideHeights);

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
        navigation: {
            nextEl: ".test-swiper-next",
            prevEl: ".test-swiper-prev",
        },
        allowTouchMove: false,
    });

    const noserprintInfoSwiper = new Swiper(".noseprint-info-swiper", {
        pagination: {
            el: ".swiper-pagination",
        },
        navigation: {
            nextEl: ".nose-swiper-next",
            prevEl: ".nose-swiper-prev",
        },
        allowTouchMove: false,
    });

    const swipers = [
        testInfoSwiper,
        noserprintInfoSwiper,
    ];

    const $btnNext = $(".btn-next");
    const $btnPrev = $(".btn-prev");
    const $checkGroup = $(".dismiss-check");

    // 초기 버튼 상태
    $btnPrev.prop("disabled", true);

    // ✅ 현재 보이는 Swiper 찾기
    function getVisibleSwiper() {
        for (const swiper of swipers) {
            const $el = $(swiper.el);
            if ($el.is(":visible")) {
                return swiper;
            }
        }
        return null;
    }

    // 공통 버튼 이벤트
    $btnNext.on("click", function () {
        const swiper = getVisibleSwiper();
        if (!swiper) return;

        const currentIndex = swiper.activeIndex;
        const totalSlides = swiper.slides.length;

        if (currentIndex < totalSlides - 1) {
            // 일반 슬라이드 이동
            swiper.slideNext();
            updateButtons(swiper);
        } else {
            // 마지막 슬라이드일 때: 페이지 이동
            window.location.href = "/your-next-page"; // 원하는 링크로 변경!
        }
    });

    $btnPrev.on("click", function () {
        const swiper = getVisibleSwiper();
        if (!swiper) return;

        swiper.slidePrev();
        updateButtons(swiper);
    });

    function updateButtons(swiper) {
        const currentIndex = swiper.activeIndex;
        const totalSlides = swiper.slides.length;

        // 이전 버튼은 여전히 제어
        $btnPrev.prop("disabled", currentIndex === 0);

        // 다음 버튼은 마지막 슬라이드여도 활성 상태 유지
        $btnNext.prop("disabled", false);

        // 체크박스는 여전히 마지막 슬라이드일 때만 표시
        if ($checkGroup.length) {
            $checkGroup.css("display", currentIndex === totalSlides - 1 ? "block" : "none");
        }
    }
    // 초기 상태 설정
    const firstSwiper = getVisibleSwiper();
    if (firstSwiper) {
        updateButtons(firstSwiper);
    }


    // tab
    $(".tab-link").click(function () {
        var tabID = $(this).data("tab");

        if ($(this).data("url")) {
            window.location.href = $(this).data("url"); // Redirect to a new page
        } else {
            $(".tab-link, .tab-content").removeClass("active");
            $(this).addClass("active");
            $("#" + tabID).addClass("active");
        }
    });

    const petImgSwiper = new Swiper(".pet-img-swiper", {
        pagination: {
            el: ".swiper-pagination",
        },
    });

    $('.btn-service-close').click(function () {
        $(this).parent('.main-service-info').remove();
    })

    // 비문등록 및 조회
    // 버튼 클릭 이벤트
    $(".btn-camera").on("click", function () {
        $(this).siblings(".hidden-camera-input").click();
    });

    // 파일 선택 이벤트
    $(".hidden-camera-input").on("change", function (event) {
        const file = event.target.files[0];
        const parentFilming = $(this).closest(".filming");

        if (file) {
            const reader = new FileReader();

            // 파일 로드 후 실행
            reader.onload = function (e) {
                const imageSrc = e.target.result;

                // 가이드에 맞는지 검증 (여기선 임시로 true/false를 랜덤으로 지정)
                const isImageValid = Math.random() > 0.5; // 가이드 검증 로직 추가 필요

                if (isImageValid) {

                    // 이벤트 확인을 위해 임시로 넣어둠 
                    // 가이드에 맞으면 배경 이미지를 업데이트
                    parentFilming.css("background-image", `url(${imageSrc})`);
                    parentFilming.removeClass("error");
                    parentFilming.next('.btn-camera').remove();
                } else {
                    // 가이드에 맞지 않으면 배경 업데이트 + 에러 처리
                    parentFilming.css("background-image", `url(${imageSrc})`);
                    parentFilming.addClass("error");
                    showToast("이미지를 다시 촬영해주세요");
                }
            };

            reader.readAsDataURL(file);
        } else {
            showToast("촬영이 취소되었습니다.");
        }
    });

    $('.tooltip img').click(function (e) {
        e.stopPropagation();
        $(this).next('.tooltip-box').toggleClass('show');
    });

    $(document).on('click', function () {
        $('.tooltip-box').removeClass('show');
    });

    $('.tooltip-box').click(function (e) {
        e.stopPropagation();
    });

    $('input[name="contact"]').on('change', function () {
        if ($('#contact-phone').is(':checked')) {
            $('.phone-input').addClass('show').show();
            $('.kakao-input').removeClass('show').hide();
        } else if ($('#contact-kakao').is(':checked')) {
            $('.kakao-input').addClass('show').show();
            $('.phone-input').removeClass('show').hide();
        }
    });

    $('.phone-input, .kakao-input').hide();

    // 쿠폰 번호 클릭 시 복사 및 토스트 메시지 표시
    $('.coupon-number').on('click', function (e) {
        e.preventDefault(); // 기본 동작 방지 (스크롤 등)

        // 만약 .exp 클래스가 있으면 이벤트를 중단
        if ($(this).hasClass('exp')) {
            return; // 아무 작업도 수행하지 않음
        }

        // 쿠폰 번호에서 숫자만 추출
        const couponText = $(this).text();
        const couponNumber = couponText.replace(/\D/g, ''); // 숫자 외의 문자를 제거

        // 클립보드에 쿠폰 번호 복사
        navigator.clipboard.writeText(couponNumber).then(() => {
            // 성공 시 토스트 메시지 표시
            showToast(`쿠폰번호 ${couponNumber}이(가) 복사되었습니다.`);
        }).catch(err => {
            // 실패 시 오류 처리 (선택 사항)
            console.error('쿠폰 번호 복사 실패:', err);
        });
    });

    // 애니메이션
    function animateElements() {
        $(".fade-up").each(function () { // 특정 ID만 선택
            var elementTop = $(this).offset().top;  // 요소의 위치
            var windowBottom = $(window).scrollTop() + $(window).height(); // 현재 스크롤 위치

            if (windowBottom > elementTop + 100) { // 요소가 화면에 보이면
                $(this).addClass("show"); // 애니메이션 추가
            }
        });
    }

    // 초기 실행
    animateElements();

    // 스크롤할 때마다 실행
    $(window).scroll(function () {
        animateElements();
    });

    // 20250529 글자 수 제한 처리
    $(".pet-name").each(function () {
        const text = $(this).text();
        if (text.length > 9) {
            $(this).text(text.slice(0, 9) + "...");
        }
    });
});
