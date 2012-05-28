(function($) {
    $.fn.carousel = function(options) {
        var settings = $.extend({
                loop:false,
                autoplay: 5000,
                transitionDuration: 1000,
                showPager: true
            }),
            slide,
            t;

        this.init = function() {
            this.each(function() {
                var obj = this,
                    items = obj.children.length,
                    pager;

                if (settings.showPager) {
                    pager = '<ul class="pager">';
                    for (var i=0; i < items; i++) {
                        pager += '<li></li>';
                    }
                    pager += '</ul>';

                    obj.pager = $(pager).insertAfter($(obj).parent());

                    obj.pager.children().eq(0).addClass('current');

                    obj.pager.children().click(function() {
                        var index = $(this).index();
                        
                        slide.apply(obj, [index]);
                    });
                }

                t = setTimeout(function() {
                    slide.apply(obj);
                    }, settings.autoplay);
            });
            return this;
        };

        slide = function(index) {
            var obj = this,
                $obj = $(this),
                step = $obj.children().eq(0).width(),
                count = $obj.children().length,
                coord;
            
            if(typeof(index) === 'undefined') {
                coord = (parseInt($obj.css('left'), 10) - step) % (step * count);
            } else {
                coord = index * step * -1;
            }

            if(settings.showPager) {
                position = Math.abs(coord) / step;

                $(obj.pager).children().
                    removeClass('current').
                    eq(position).
                    addClass('current');
            }

            $obj.animate({left: coord});
            
            clearTimeout(t);

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
