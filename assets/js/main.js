/*
[MAIN.js]
*/

(function () {
    'use strict';

    $(document).ready(function ($) {
        window.requestAnimationFrame = (function () {
            return window.requestAnimationFrame
                || window.webkitRequestAnimationFrame
                || window.mozRequestAnimationFrame
                || window.oRequestAnimationFrame
                || window.msRequestAnimationFrame
                || function (callback) {
                    return window.setTimeout(callback, 1000 / 60);
                };
        })();

        /* [1] Declaration of functions */

        /* (1) Counters */
        function counters_init(element, count) {
            $(element).waypoint(function () {
                if (!$(element).hasClass("finished_counters")) {
                    let propertiesObj = {};
                    let param = {
                        targets: propertiesObj,
                        easing: 'easeInQuad',
                        round: 1,
                        duration: function (el, i, l) {
                            return 4000 + (i * 300);
                        },
                        update: function () {
                            let el = $(element).find(".prop-obj");
                            let i = 0;
                            for (const prop in propertiesObj) {
                                el[i].innerHTML = JSON.stringify(propertiesObj[prop]);
                                i++;
                            }
                        }
                    }
                    for (let i = 1; i < count + 1; i++) {
                        propertiesObj['prop' + i] = 0;
                        param['prop' + i] = $(element).find(".prop-obj" + i).data("count");
                    }
                    anime(param);
                    $(element).addClass("finished_counters");
                }
            }, {
                offset: '100%'
            });
        }

        /* (1.1) Accordion */
        function accordion_init(element, speed) {
            let accordion = $(element).find('.accordion');
            let accordion_header = accordion.find('.accordion-header');
            let accordion_body = accordion.find('.accordion-body');
            $(element).find('.active-accordion').find('.accordion-body').slideDown(speed);
            accordion_header.on('click', function () {
                let body = $(this).parent().find('.accordion-body');
                let parent = $(this).parent();
                if (!parent.hasClass('active-accordion')) {
                    accordion.removeClass('active-accordion');
                    accordion_body.slideUp(speed);
                }
                parent.toggleClass('active-accordion');
                body.slideToggle(speed);
            });
        }

        /* (1.2) Tabs */
        function tabs_init(element) {
            let tab_header = $(element).find('.tabs-header');
            let tab_trigger = tab_header.find('.tab-trigger');
            let tab_body_wrapper = $(element).find('.tabs-body-wrapper');
            let tab_body = tab_body_wrapper.find('.tab-body');
            tab_trigger.on('click', function () {
                let tab_body_data = $(this).data('tab');
                tab_body.removeClass('active-body');
                tab_trigger.removeClass('active');
                $(tab_body_data).addClass('active-body');
                $(this).addClass('active');
            });
        }

        /* (1.3) Progress bars */
        function progress_bars_init(element, progress) {
            let bar = new ProgressBar.Line(element, {
                strokeWidth: 4,
                easing: 'easeInOut',
                duration: 1400,
                color: color_scheme_color,
                trailColor: '#eee',
                trailWidth: 1,
                svgStyle: {width: '100%', height: '3px'},
                text: {
                    style: {},
                    autoStyleContainer: false
                },
                from: {color: '#FFEA82'},
                to: {color: '#ED6A5A'},
                step: (state, bar) => {
                    bar.setText(Math.round(bar.value() * 100) + ' %');
                }
            });
            bar.animate(progress);
        }

        /* (1.4) Isotope grid */
        function isotope_grid_init(handler, button_group) {
            let grid = handler.isotope({
                transitionDuration: '0.7s',
                stagger: 50
            });
            let buttons = $(button_group).find('button');
            button_group.on('click', 'button', function () {
                $(buttons).removeClass('active-button');
                $(this).addClass('active-button');
                let filter_value = $(this).attr('data-filter');
                grid.isotope({
                    filter: filter_value
                });
            });
        }

        /* (1.7) Parallax */
        function parallax_init(container) {
            for (let i = 0; i < container.length; i++) {
                let data = $(container[i]).data('src');
                let speed = $(container[i]).data('speed');
                $(container[i]).parallax({
                    imageSrc: data,
                    speed: speed
                });
            }
        }

        /* (2) Sizes for flip cards */
        function sizes_flip_cards(section) {
            let flip_container = section.find('.flip-container');
            let flip_card_img = flip_container.find('img');
            let flip_front = flip_container.find('.front');
            let flip_back = flip_container.find('.back');
            for (let i = 0; i < flip_container.length; i++) {
                let height_img = $(flip_card_img[i]).innerHeight();
                $(flip_container[i]).css('height', height_img);
                $(flip_front[i]).css('height', height_img);
                $(flip_back[i]).css('height', height_img);
            }
        }

        /* (2.1) Swiper */
        function swiper_init() {
            // Swiper team
            let swiper_team = new Swiper('.swiper-team', {
                loop: true,
                speed: 500,
                spaceBetween: 8,
                slidesPerView: 3,
                pagination: {
                    el: '.swiper-pagination-bullets-common',
                    type: 'bullets',
                    clickable: true,
                },
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: true
                },
                breakpoints: {
                    767: {
                        slidesPerView: 2,
                    },
                    450: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    0: {
                        spaceBetween: 0
                    }
                }
            });

            // Swiper testimonials
            let swiper_testimonials = new Swiper('.swiper-testimonials', {
                speed: 600,
                loop: true,
                effect: 'flip',
                flipEffect: {
                    rotate: 30,
                    slideShadows: false,
                },
                autoplay: {
                    delay: 4500,
                    disableOnInteraction: true,
                },
                slidesPerView: 1,
                pagination: {
                    el: '.swiper-pagination-bullets-default',
                    type: 'bullets',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next-testimonials',
                    prevEl: '.swiper-button-prev-testimonials',
                }
            });

            // Swiper portfolio
            let swiper_portfolio = new Swiper('.swiper-portfolio', {
                slidesPerView: 4,
                spaceBetween: 10,
                loop: true,
                autoplay: {
                    delay: 3000,
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 1,
                    }
                },
                navigation: {
                    nextEl: '.swiper-button-next-portfolio',
                    prevEl: '.swiper-button-prev-portfolio',
                }
            });

            // Swiper clients
            let swiper_clients = new Swiper('.swiper-clients', {
                slidesPerView: 4,
                loop: true,
                autoplay: {
                    delay: 2000,
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 1,
                    }
                }
            });

            // Swiper default
            let swiper_default = new Swiper('.swiper-default', {
                loop: true,
                autoplay: {
                    delay: 2000,
                },
                navigation: {
                    nextEl: '.swiper-button-next-portfolio',
                    prevEl: '.swiper-button-prev-portfolio',
                },
                pagination: {
                    el: '.swiper-pagination-bullets-common',
                    type: 'bullets',
                    clickable: true,
                },
            });

            // Swiper post
            let swiper_post = new Swiper('.swiper-post', {
                loop: true,
                autoplay: {
                    delay: 2000,
                },
                pagination: {
                    el: '.swiper-pagination-bullets-default',
                    type: 'bullets',
                    clickable: true,
                },
            });
        }

        /* (2.2) Ajax Contact Form */
        function ajax_contact_init() {
            $(form).submit(function (e) {
                e.preventDefault();
                let form_data = $(this).serialize();
                $.ajax({
                    type: "POST",
                    url: "mailer.php",
                    data: form_data,
                    success: function () {
                        alert("Your message send");
                    }
                });
            });
        }

        /* (2.3) Form Focus */
        function form_focus() {
            let form_div = $('.form-div');
            form_div.on('click', function () {
                form_div.removeClass('form-div-focus');
                $(this).addClass('form-div-focus');
            });
        }

        /* [2] Declaration of variables */
        // Common constants
        const COMMON = {
            win: window,
            doc: document,
            body: $('body')
        };

        // Viewport sizes
        const VIEWPORT = {
            w: COMMON.win.innerWidth,
            h: COMMON.win.innerHeight
        };

        // ROOT
        let root = COMMON.doc.querySelector(':root');

        // Page width
        let page_width = VIEWPORT.w;

        // Main wrapper
        let wrapper = $('#main-wrapper');

        // Page loader
        let loader = $('.loader');

        // Color scheme
        let color_scheme_color = '#ee3158';

        // Counters wrapper
        let counters_wrapper = $('.counters-wrapper');

        // Tabs wrapper
        let tabs_wrapper = $('.tabs-wrapper');

        // Accordions wrapper
        let accordions_wrapper = $('.accordion-wrapper');

        // Flip cards section
        let flip_section = $('.flip-section');

        // Parallax background
        let parallax_background = $('.parallax-window');

        // Progress bar
        let progress_bar = '.progress-bar-line';

        // Progress bar test variable
        let progress_check = true;

        // Progress bars count
        let progress_bar_count = $(progress_bar).length;

        // Contact form
        let form = $('#ajax-contact');

        // Isotope grid
        let isotope_grid = $('.grid');

        // Isotope button group
        let button_group = $('.button-group-default');

        // Background gradient
        let bg_gradient = $('.gradient-background');


        /* [7] Images Loaded */
        $(COMMON.body).imagesLoaded({background: '.bg_img'}, function () {
            isotope_grid_init(isotope_grid, button_group);
            loader.addClass('off_loader');
            wrapper.addClass('on_wrapper');
            AOS.init();
            /* [8] Sizes flip cards init */
            sizes_flip_cards(flip_section);

            /* [9] Sizes flip cards reinit */
            $(COMMON.win).resize(function () {
                sizes_flip_cards(flip_section);
            });
        });

        /* [10] Tabs init */
        if (tabs_wrapper.length) {
            for (let i = 0; i < tabs_wrapper.length; i++) {
                tabs_init(tabs_wrapper[i]);
            }
        }

        /* [11] Accordions init */
        if (accordions_wrapper.length) {
            for (let i = 0; i < accordions_wrapper.length; i++) {
                accordion_init(accordions_wrapper[i], 'fast');
            }
        }

        /* [12] Counters init */
        if (counters_wrapper.length) {
            for (let i = 0; i < counters_wrapper.length; i++) {
                let count = $(counters_wrapper[i]).find('.counter-box').length;
                counters_init(counters_wrapper[i], count);
            }
        }

        /* [13] Progress bars init */
        $(progress_bar).waypoint(() => {
            if (progress_check) {
                progress_check = false;
                if (progress_bar_count > 0) {
                    for (let i = 1; i < progress_bar_count + 1; i++) {
                        let progress = $(progress_bar + i).data('progress');
                        progress_bars_init(progress_bar + i, progress);
                    }
                }
            }
        }, {offset: '100%'});

        /* [16] Parallax init */
        parallax_init(parallax_background);

        /* [20] Swiper init */
        swiper_init();

        /* [22] Ajax contact form init */
        ajax_contact_init();

        /* [23] Form focus init */
        form_focus();

    });

})();
