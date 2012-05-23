window.onload = init;

var FUIT = {};

function init() {
        FUIT.carousel.init({
            interval: 4000
        });
    }

FUIT.carousel = (function() {
    var obj,
        that = {},
        interval,
        loop,
        step,
        count,
        t;

    that.init = function(props) {
        if (typeof(props) === 'undefined') {
            return;
        }
        if (typeof(props.target) === 'undefined') {
            if(!FUIT.util.getByClassName('carousel').length) {
                return;
            }
        }
        interval = 'interval' in props ? props.interval : 4000;
        obj = props.target || FUIT.util.getByClassName('carousel')[0];
        step = FUIT.util.width(obj);
        count = FUIT.util.children(obj).length;

        t = setTimeout(that.slide, interval);
    };

    that.slide = function() {
        to = (FUIT.util.left(obj) - step) % (step * count);
        FUIT.util.animate(obj, 'left', to);
        t = setTimeout(that.slide, interval);
    };

    that.getTarget = function () {
        return obj;
    };

    return that;
})();

FUIT.util = {
    getByClassName: function(classList, node) {
        if(document.getElementsByClassName) {
            return (node || document).getElementsByClassName(classList);
        } else {
            var node = node || document,
                list = node.getElementsByTagName('*'), 
                length = list.length,  
                classArray = classList.split(/\s+/), 
                classes = classArray.length, 
                result = [], 
                i,
                j;

            for(i = 0; i < length; i++) {
                for(j = 0; j < classes; j++)  {
                    if(list[i].className.search('\\b' + classArray[j] + '\\b') != -1) {
                        result.push(list[i]);
                        break;
                    }
                }
            }
            return result;
        }
    },
    width: function(el) {
        if(window.getComputedStyle) {
            return parseInt(window.getComputedStyle(el, null).width, 10);
        } else {
            return parseInt(el.currentStyle('width', null), 10);
        }
    },
    left: function(el) {
        if(window.getComputedStyle) {
            return parseInt(window.getComputedStyle(el, null).left, 10) || 0;
        } else {
            return parseInt(el.currentStyle('left', null), 10) || 0;
        }
    },
    children: function(el) {
        var children = [],
            childNodes = el.childNodes;
        for (var i=0, l = childNodes.length; i < l; i++) {
            if (childNodes[i].nodeType !== 3 && childNodes[i].nodeType !== 8) {
                children.push(childNodes[i]);
            }
        }
        return children;
    },
    animate: function(obj, prop, value) {
        var obj = obj,
            prop = prop,
            value = value,
            step = FUIT.util.left(obj) >= value ? -100 : 100;
        function go() {
            if(Math.abs(FUIT.util.left(obj) - value)) {
                obj.style[prop] = (FUIT.util.left(obj) + step) + 'px';
                setTimeout(arguments.callee, 50);
            }
        }
        go();
    }
};