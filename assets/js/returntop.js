    // ===== Return to Top ==== 

    // Utility function
    function Util() {};

    /* 
    class manipulation functions
    */

    Util.addClass = function(el, className) {
        var classList = className.split(' ');
        if (el.classList) el.classList.add(classList[0]);
        else if (!Util.hasClass(el, classList[0])) el.className += " " + classList[0];
        if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
    };

    Util.removeClass = function(el, className) {
        var classList = className.split(' ');
        if (el.classList) el.classList.remove(classList[0]);
        else if (Util.hasClass(el, classList[0])) {
            var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
        if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
    };

    /* 
    Smooth Scroll
    */

    Util.scrollTo = function(final, duration, cb) {
        var start = window.scrollY || document.documentElement.scrollTop,
            currentTime = null;

        var animateScroll = function(timestamp) {
            if (!currentTime) currentTime = timestamp;
            var progress = timestamp - currentTime;
            if (progress > duration) progress = duration;
            var val = Math.easeInOutQuad(progress, start, final - start, duration);
            window.scrollTo(0, val);
            if (progress < duration) {
                window.requestAnimationFrame(animateScroll);
            } else {
                cb && cb();
            }
        };

        window.requestAnimationFrame(animateScroll);
    };

    /* 
    Animation curves
    */
    Math.easeInOutQuad = function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    (function() {

        // Back to Top 
        var backTop = document.getElementsByClassName('js-pg-top')[0],
            offset = 300, // browser window scroll (in pixels) after which the "back to top" link is shown
            offsetOpacity = 1200, //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
            scrollDuration = 700,
            scrolling = false;

        if (backTop) {
            //update back to top visibility on scrolling
            window.addEventListener("scroll", function(event) {
                if (!scrolling) {
                    scrolling = true;
                    (!window.requestAnimationFrame) ? setTimeout(checkBackToTop, 250): window.requestAnimationFrame(checkBackToTop);
                }
            });

            //smooth scroll to top
            backTop.addEventListener('click', function(event) {
                event.preventDefault();
                (!window.requestAnimationFrame) ? window.scrollTo(0, 0): Util.scrollTo(0, scrollDuration);
            });
        }

        function checkBackToTop() {
            var windowTop = window.scrollY || document.documentElement.scrollTop;
            (windowTop > offset) ? Util.addClass(backTop, 'pg-top-is-visible'): Util.removeClass(backTop, 'pg-top-is-visible pg-top-fade-out');
            (windowTop > offsetOpacity) && Util.addClass(backTop, 'pg-top-fade-out');
            scrolling = false;
        }
    })();