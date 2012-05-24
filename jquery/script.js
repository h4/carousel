(function($) {
    $.fn.carousel = function(options) {
        var settings = $.extend({
                loop:false,
                autoplay: 5000,
                transitionDuration: 1000,
                showPager: true
            }),
            // step,
            count,
            pager,
            slide,
            t;

        this.init = function() {
            this.each(function() {
                var obj = this,
                    t;

                t = setTimeout(function() {
                    slide.apply(obj);
                }, settings.autoplay);
            });
            return this;
        };

        slide = function() {
            var obj = $(this),
                step = obj.children().eq(0).width(),
                count = obj.children().length,
                coord = (parseInt(obj.css('left'), 10) - step) % (step * count),
                t;

            obj.animate({left: coord});

            t = setTimeout(function() {
                slide.apply(obj);
            }, settings.autoplay);
        };

        return this.init();
    };
})(jQuery);

$(function(){
    var c = $(".carousel").carousel();
});
