'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PdfJs = require('pdfjs-dist');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PdfJs__namespace = /*#__PURE__*/_interopNamespace(PdfJs);

var ThemeContext = React__default['default'].createContext({
    prefixClass: 'rpv-core',
});

var classNames = function (classes) {
    var result = [];
    Object.keys(classes).forEach(function (clazz) {
        if (clazz && classes[clazz]) {
            result.push(clazz);
        }
    });
    return result.join(' ');
};

var Button = function (_a) {
    var _b;
    var children = _a.children, _c = _a.isSelected, isSelected = _c === void 0 ? false : _c, onClick = _a.onClick;
    var theme = React.useContext(ThemeContext);
    return (React__default['default'].createElement("button", { className: classNames((_b = {},
            _b[theme.prefixClass + "-button"] = true,
            _b[theme.prefixClass + "-button-selected"] = isSelected,
            _b)), onClick: onClick }, children));
};

var Menu = function (_a) {
    var children = _a.children;
    var theme = React.useContext(ThemeContext);
    return (React__default['default'].createElement("ul", { className: theme.prefixClass + "-menu" }, children));
};

var MenuDivider = function () {
    var theme = React.useContext(ThemeContext);
    return (React__default['default'].createElement("li", { className: theme.prefixClass + "-menu-divider" }));
};

var Icon = function (_a) {
    var children = _a.children, _b = _a.size, size = _b === void 0 ? 24 : _b;
    var theme = React.useContext(ThemeContext);
    var width = (size || 24) + "px";
    return (React__default['default'].createElement("svg", { className: theme.prefixClass + "-icon", height: width, viewBox: "0 0 24 24", width: width }, children));
};

var CheckIcon = function () {
    return (React__default['default'].createElement(Icon, { size: 16 },
        React__default['default'].createElement("path", { d: "M23.5,0.499l-16.5,23l-6.5-6.5" })));
};

var MenuItem = function (_a) {
    var _b = _a.checked, checked = _b === void 0 ? false : _b, children = _a.children, _c = _a.icon, icon = _c === void 0 ? null : _c, onClick = _a.onClick;
    var theme = React.useContext(ThemeContext);
    return (React__default['default'].createElement("li", { className: theme.prefixClass + "-menu-item", onClick: onClick },
        React__default['default'].createElement("div", { className: theme.prefixClass + "-menu-item-icon" }, icon),
        React__default['default'].createElement("div", { className: theme.prefixClass + "-menu-item-label" }, children),
        React__default['default'].createElement("div", { className: theme.prefixClass + "-menu-item-check" }, checked && React__default['default'].createElement(CheckIcon, null))));
};

var PrimaryButton = function (_a) {
    var children = _a.children, onClick = _a.onClick;
    var theme = React.useContext(ThemeContext);
    return (React__default['default'].createElement("button", { className: theme.prefixClass + "-primary-button", onClick: onClick }, children));
};

var ProgressBar = function (_a) {
    var progress = _a.progress;
    var theme = React.useContext(ThemeContext);
    return (React__default['default'].createElement("div", { className: theme.prefixClass + "-progress-bar" },
        React__default['default'].createElement("div", { className: theme.prefixClass + "-progress-bar-inner", style: { width: progress + "%" } },
            progress,
            "%")));
};

var Separator = function () {
    var theme = React.useContext(ThemeContext);
    return (React__default['default'].createElement("div", { className: theme.prefixClass + "-separator" }));
};

var Spinner = function () {
    var theme = React.useContext(ThemeContext);
    return (React__default['default'].createElement("svg", { className: theme.prefixClass + "-spinner", width: "64px", height: "64px", viewBox: "0 0 32 32" },
        React__default['default'].createElement("circle", { className: theme.prefixClass + "-spinner-circle", cx: "16", cy: "16", r: "12", strokeDasharray: Math.PI * 2 * 9 })));
};

var Observer = function (_a) {
    var children = _a.children, threshold = _a.threshold, onVisibilityChanged = _a.onVisibilityChanged;
    var containerRef = React.useRef(null);
    React.useLayoutEffect(function () {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var isVisible = entry.isIntersecting;
                var ratio = entry.intersectionRatio;
                onVisibilityChanged({ isVisible: isVisible, ratio: ratio });
            });
        }, {
            threshold: threshold || 0,
        });
        var container = containerRef.current;
        if (!container) {
            return;
        }
        io.observe(container);
        return function () {
            io.unobserve(container);
        };
    }, []);
    return (React__default['default'].createElement("div", { ref: containerRef }, children));
};

var LocalizationContext = React__default['default'].createContext({});

var askingPassword = {
	requirePasswordToOpen: "This document requires a password to open",
	submit: "Submit"
};
var wrongPassword = {
	submit: "Submit",
	tryAgain: "The password is wrong. Please try again"
};
var enUs = {
	askingPassword: askingPassword,
	wrongPassword: wrongPassword
};

var LocalizationProvider = function (_a) {
    var children = _a.children, localization = _a.localization;
    var defaultL10n = enUs;
    var _b = React.useState(localization || defaultL10n), l10nData = _b[0], setL10nData = _b[1];
    var setLocalization = function (l10n) { return setL10nData(l10n); };
    return (React__default['default'].createElement(LocalizationContext.Provider, { value: l10nData }, children(setLocalization)));
};

var useClickOutside = function (closeOnClickOutside, targetRef, onClickOutside) {
    var clickHandler = function (e) {
        var target = targetRef.current;
        if (target && !target.contains(e.target)) {
            onClickOutside();
        }
    };
    React.useEffect(function () {
        if (!closeOnClickOutside) {
            return;
        }
        document.addEventListener('click', clickHandler);
        return function () {
            document.removeEventListener('click', clickHandler);
        };
    }, []);
};

var useKeyUp = function (targetKeyCode, handler) {
    var keyUpHandler = function (e) {
        (e.keyCode === targetKeyCode) && handler();
    };
    React.useEffect(function () {
        document.addEventListener('keyup', keyUpHandler);
        return function () {
            document.removeEventListener('keyup', keyUpHandler);
        };
    }, []);
};

var useLockScroll = function () {
    React.useEffect(function () {
        var originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return function () {
            document.body.style.overflow = originalStyle;
        };
    }, []);
};

var ModalBody = function (_a) {
    var children = _a.children, closeOnClickOutside = _a.closeOnClickOutside, closeOnEscape = _a.closeOnEscape, onToggle = _a.onToggle;
    var theme = React.useContext(ThemeContext);
    var contentRef = React.createRef();
    useLockScroll();
    useKeyUp(27, function () { return closeOnEscape && onToggle(); });
    useClickOutside(closeOnClickOutside, contentRef, onToggle);
    return (React__default['default'].createElement("div", { className: theme.prefixClass + "-modal-body", ref: contentRef }, children));
};

var ModalOverlay = function (_a) {
    var children = _a.children;
    var theme = React.useContext(ThemeContext);
    return (React__default['default'].createElement("div", { className: theme.prefixClass + "-modal-overlay" }, children));
};

var ToggleStatus;
(function (ToggleStatus) {
    ToggleStatus["Close"] = "Close";
    ToggleStatus["Open"] = "Open";
    ToggleStatus["Toggle"] = "Toggle";
})(ToggleStatus || (ToggleStatus = {}));
var useToggle = function () {
    var _a = React.useState(false), opened = _a[0], setOpened = _a[1];
    var toggle = function (status) {
        switch (status) {
            case ToggleStatus.Close:
                setOpened(false);
                break;
            case ToggleStatus.Open:
                setOpened(true);
                break;
            case ToggleStatus.Toggle:
            default:
                setOpened(function (isOpened) { return !isOpened; });
                break;
        }
    };
    return { opened: opened, toggle: toggle };
};

var Portal = function (_a) {
    var content = _a.content, target = _a.target;
    var _b = useToggle(), opened = _b.opened, toggle = _b.toggle;
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        target(toggle, opened),
        opened && content(toggle)));
};

var Modal = function (_a) {
    var closeOnClickOutside = _a.closeOnClickOutside, closeOnEscape = _a.closeOnEscape, content = _a.content, target = _a.target;
    var renderContent = function (toggle) { return (React__default['default'].createElement(ModalOverlay, null,
        React__default['default'].createElement(ModalBody, { closeOnClickOutside: closeOnClickOutside, closeOnEscape: closeOnEscape, onToggle: toggle }, content(toggle)))); };
    return (React__default['default'].createElement(Portal, { target: target, content: renderContent }));
};

var Position;
(function (Position) {
    Position["TopLeft"] = "TOP_LEFT";
    Position["TopCenter"] = "TOP_CENTER";
    Position["TopRight"] = "TOP_RIGHT";
    Position["RightTop"] = "RIGHT_TOP";
    Position["RightCenter"] = "RIGHT_CENTER";
    Position["RightBottom"] = "RIGHT_BOTTOM";
    Position["BottomLeft"] = "BOTTOM_LEFT";
    Position["BottomCenter"] = "BOTTOM_CENTER";
    Position["BottomRight"] = "BOTTOM_RIGHT";
    Position["LeftTop"] = "LEFT_TOP";
    Position["LeftCenter"] = "LEFT_CENTER";
    Position["LeftBottom"] = "LEFT_BOTTOM";
})(Position || (Position = {}));
var Position$1 = Position;

var calculatePosition = function (content, target, position, offset) {
    var targetRect = target.getBoundingClientRect();
    var contentRect = content.getBoundingClientRect();
    var height = contentRect.height, width = contentRect.width;
    var top = 0;
    var left = 0;
    switch (position) {
        case Position$1.TopLeft:
            top = targetRect.top - height;
            left = targetRect.left;
            break;
        case Position$1.TopCenter:
            top = targetRect.top - height;
            left = targetRect.left + targetRect.width / 2 - width / 2;
            break;
        case Position$1.TopRight:
            top = targetRect.top - height;
            left = targetRect.left + targetRect.width - width;
            break;
        case Position$1.RightTop:
            top = targetRect.top;
            left = targetRect.left + targetRect.width;
            break;
        case Position$1.RightCenter:
            top = targetRect.top + targetRect.height / 2 - height / 2;
            left = targetRect.left + targetRect.width;
            break;
        case Position$1.RightBottom:
            top = targetRect.top + targetRect.height - height;
            left = targetRect.left + targetRect.width;
            break;
        case Position$1.BottomLeft:
            top = targetRect.top + targetRect.height;
            left = targetRect.left;
            break;
        case Position$1.BottomCenter:
            top = targetRect.top + targetRect.height;
            left = targetRect.left + targetRect.width / 2 - width / 2;
            break;
        case Position$1.BottomRight:
            top = targetRect.top + targetRect.height;
            left = targetRect.left + targetRect.width - width;
            break;
        case Position$1.LeftTop:
            top = targetRect.top;
            left = targetRect.left - width;
            break;
        case Position$1.LeftCenter:
            top = targetRect.top + targetRect.height / 2 - height / 2;
            left = targetRect.left - width;
            break;
        case Position$1.LeftBottom:
            top = targetRect.top + targetRect.height - height;
            left = targetRect.left - width;
            break;
    }
    return {
        left: left + (offset.left || 0),
        top: top + (offset.top || 0),
    };
};

var usePosition = function (contentRef, targetRef, anchorRef, position, offset) {
    React.useLayoutEffect(function () {
        var targetEle = targetRef.current;
        var contentEle = contentRef.current;
        var anchorEle = anchorRef.current;
        if (!contentEle || !targetEle || !anchorEle) {
            return;
        }
        var anchorRect = anchorEle.getBoundingClientRect();
        var _a = calculatePosition(contentEle, targetEle, position, offset), top = _a.top, left = _a.left;
        contentEle.style.top = top - anchorRect.top + "px";
        contentEle.style.left = left - anchorRect.left + "px";
    }, []);
};

var Arrow = function (_a) {
    var _b;
    var customClassName = _a.customClassName, position = _a.position;
    var theme = React.useContext(ThemeContext);
    return (React__default['default'].createElement("div", { className: classNames((_b = {},
            _b[theme.prefixClass + "-arrow"] = true,
            _b[theme.prefixClass + "-arrow-tl"] = position === Position$1.TopLeft,
            _b[theme.prefixClass + "-arrow-tc"] = position === Position$1.TopCenter,
            _b[theme.prefixClass + "-arrow-tr"] = position === Position$1.TopRight,
            _b[theme.prefixClass + "-arrow-rt"] = position === Position$1.RightTop,
            _b[theme.prefixClass + "-arrow-rc"] = position === Position$1.RightCenter,
            _b[theme.prefixClass + "-arrow-rb"] = position === Position$1.RightBottom,
            _b[theme.prefixClass + "-arrow-bl"] = position === Position$1.BottomLeft,
            _b[theme.prefixClass + "-arrow-bc"] = position === Position$1.BottomCenter,
            _b[theme.prefixClass + "-arrow-br"] = position === Position$1.BottomRight,
            _b[theme.prefixClass + "-arrow-lt"] = position === Position$1.LeftTop,
            _b[theme.prefixClass + "-arrow-lc"] = position === Position$1.LeftCenter,
            _b[theme.prefixClass + "-arrow-lb"] = position === Position$1.LeftBottom,
            _b["" + customClassName] = customClassName !== '',
            _b)) }));
};

var PopoverBody = function (_a) {
    var children = _a.children, closeOnClickOutside = _a.closeOnClickOutside, offset = _a.offset, position = _a.position, targetRef = _a.targetRef, onClose = _a.onClose;
    var theme = React.useContext(ThemeContext);
    var contentRef = React.createRef();
    var anchorRef = React.createRef();
    useClickOutside(closeOnClickOutside, contentRef, onClose);
    usePosition(contentRef, targetRef, anchorRef, position, offset);
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement("div", { ref: anchorRef, style: { left: 0, position: 'absolute', top: 0 } }),
        React__default['default'].createElement("div", { className: theme.prefixClass + "-popover-body", ref: contentRef },
            React__default['default'].createElement(Arrow, { customClassName: theme.prefixClass + "-popover-body-arrow", position: position }),
            children)));
};

var PopoverOverlay = function (_a) {
    var closeOnEscape = _a.closeOnEscape, onClose = _a.onClose;
    var theme = React.useContext(ThemeContext);
    useKeyUp(27, function () { return closeOnEscape && onClose(); });
    return (React__default['default'].createElement("div", { className: theme.prefixClass + "-popover-overlay" }));
};

var Popover = function (_a) {
    var closeOnClickOutside = _a.closeOnClickOutside, closeOnEscape = _a.closeOnEscape, content = _a.content, offset = _a.offset, position = _a.position, target = _a.target;
    var targetRef = React__default['default'].createRef();
    var renderTarget = function (toggle, opened) { return (React__default['default'].createElement("div", { ref: targetRef }, target(toggle, opened))); };
    var renderContent = function (toggle) { return (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(PopoverOverlay, { closeOnEscape: closeOnEscape, onClose: toggle }),
        React__default['default'].createElement(PopoverBody, { closeOnClickOutside: closeOnClickOutside, offset: offset, position: position, targetRef: targetRef, onClose: toggle }, content(toggle)))); };
    return (React__default['default'].createElement(Portal, { content: renderContent, target: renderTarget }));
};

var TooltipBody = function (_a) {
    var children = _a.children, offset = _a.offset, position = _a.position, targetRef = _a.targetRef;
    var theme = React.useContext(ThemeContext);
    var contentRef = React.createRef();
    var anchorRef = React.createRef();
    usePosition(contentRef, targetRef, anchorRef, position, offset);
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement("div", { ref: anchorRef, style: { left: 0, position: 'absolute', top: 0 } }),
        React__default['default'].createElement("div", { className: theme.prefixClass + "-tooltip-body", ref: contentRef },
            React__default['default'].createElement(Arrow, { customClassName: theme.prefixClass + "-tooltip-body-arrow", position: position }),
            React__default['default'].createElement("div", { className: theme.prefixClass + "-tooltip-body-content" }, children))));
};

var Tooltip = function (_a) {
    var content = _a.content, offset = _a.offset, position = _a.position, target = _a.target;
    var targetRef = React__default['default'].createRef();
    var renderTarget = function (toggle) {
        var show = function () { toggle(ToggleStatus.Open); };
        var hide = function () { toggle(ToggleStatus.Close); };
        return (React__default['default'].createElement("div", { ref: targetRef, onMouseEnter: show, onMouseLeave: hide }, target));
    };
    var renderContent = function () { return (React__default['default'].createElement(TooltipBody, { offset: offset, position: position, targetRef: targetRef }, content())); };
    return (React__default['default'].createElement(Portal, { target: renderTarget, content: renderContent }));
};

var SpecialZoomLevel;
(function (SpecialZoomLevel) {
    SpecialZoomLevel["ActualSize"] = "ActualSize";
    SpecialZoomLevel["PageFit"] = "PageFit";
    SpecialZoomLevel["PageWidth"] = "PageWidth";
})(SpecialZoomLevel || (SpecialZoomLevel = {}));
var SpecialZoomLevel$1 = SpecialZoomLevel;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function createStore(initialState) {
    var state = initialState || {};
    var listeners = {};
    return {
        subscribe: function (key, handler) {
            listeners[key] = (listeners[key] || []).concat(handler);
        },
        unsubscribe: function (key, handler) {
            listeners[key] = (listeners[key] || []).filter(function (f) { return f !== handler; });
        },
        update: function (key, data) {
            var _a;
            state = __assign(__assign({}, state), (_a = {}, _a[key] = data, _a));
            (listeners[key] || []).forEach(function (handler) { return handler(state[key]); });
        },
        get: function (key) {
            return state[key];
        },
    };
}

var TextLayerRenderStatus;
(function (TextLayerRenderStatus) {
    TextLayerRenderStatus[TextLayerRenderStatus["PreRender"] = 0] = "PreRender";
    TextLayerRenderStatus[TextLayerRenderStatus["DidRender"] = 1] = "DidRender";
})(TextLayerRenderStatus || (TextLayerRenderStatus = {}));
var TextLayerRenderStatus$1 = TextLayerRenderStatus;

var AnnotationLoader = function (_a) {
    var page = _a.page, renderAnnotations = _a.renderAnnotations;
    var _b = React.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = React.useState([]), annotations = _c[0], setAnnotations = _c[1];
    React.useEffect(function () {
        page.getAnnotations({ intent: 'display' }).then(function (result) {
            setLoading(false);
            setAnnotations(result);
        });
    }, []);
    return (loading
        ? React__default['default'].createElement(React__default['default'].Fragment, null)
        : renderAnnotations(annotations));
};

var AnnotationType;
(function (AnnotationType) {
    AnnotationType[AnnotationType["Text"] = 1] = "Text";
    AnnotationType[AnnotationType["Link"] = 2] = "Link";
    AnnotationType[AnnotationType["FreeText"] = 3] = "FreeText";
    AnnotationType[AnnotationType["Line"] = 4] = "Line";
    AnnotationType[AnnotationType["Square"] = 5] = "Square";
    AnnotationType[AnnotationType["Circle"] = 6] = "Circle";
    AnnotationType[AnnotationType["Polygon"] = 7] = "Polygon";
    AnnotationType[AnnotationType["Polyline"] = 8] = "Polyline";
    AnnotationType[AnnotationType["Highlight"] = 9] = "Highlight";
    AnnotationType[AnnotationType["Underline"] = 10] = "Underline";
    AnnotationType[AnnotationType["Squiggly"] = 11] = "Squiggly";
    AnnotationType[AnnotationType["StrikeOut"] = 12] = "StrikeOut";
    AnnotationType[AnnotationType["Stamp"] = 13] = "Stamp";
    AnnotationType[AnnotationType["Caret"] = 14] = "Caret";
    AnnotationType[AnnotationType["Ink"] = 15] = "Ink";
    AnnotationType[AnnotationType["Popup"] = 16] = "Popup";
    AnnotationType[AnnotationType["FileAttachment"] = 17] = "FileAttachment";
})(AnnotationType || (AnnotationType = {}));
var AnnotationType$1 = AnnotationType;

var AnnotationBorderStyleType;
(function (AnnotationBorderStyleType) {
    AnnotationBorderStyleType[AnnotationBorderStyleType["Solid"] = 1] = "Solid";
    AnnotationBorderStyleType[AnnotationBorderStyleType["Dashed"] = 2] = "Dashed";
    AnnotationBorderStyleType[AnnotationBorderStyleType["Beveled"] = 3] = "Beveled";
    AnnotationBorderStyleType[AnnotationBorderStyleType["Inset"] = 4] = "Inset";
    AnnotationBorderStyleType[AnnotationBorderStyleType["Underline"] = 5] = "Underline";
})(AnnotationBorderStyleType || (AnnotationBorderStyleType = {}));
var AnnotationBorderStyleType$1 = AnnotationBorderStyleType;

var dateRegex = new RegExp('^D:' +
    '(\\d{4})' +
    '(\\d{2})?' +
    '(\\d{2})?' +
    '(\\d{2})?' +
    '(\\d{2})?' +
    '(\\d{2})?' +
    '([Z|+|-])?' +
    '(\\d{2})?' +
    '\'?' +
    '(\\d{2})?' +
    '\'?');
var parse = function (value, min, max, defaultValue) {
    var parsed = parseInt(value, 10);
    return (parsed >= min && parsed <= max) ? parsed : defaultValue;
};
var convertDate = function (input) {
    var matches = dateRegex.exec(input);
    if (!matches) {
        return null;
    }
    var year = parseInt(matches[1], 10);
    var month = parse(matches[2], 1, 12, 1) - 1;
    var day = parse(matches[3], 1, 31, 1);
    var hour = parse(matches[4], 0, 23, 0);
    var minute = parse(matches[5], 0, 59, 0);
    var second = parse(matches[6], 0, 59, 0);
    var universalTimeRelation = matches[7] || 'Z';
    var offsetHour = parse(matches[8], 0, 23, 0);
    var offsetMinute = parse(matches[9], 0, 59, 0);
    switch (universalTimeRelation) {
        case '-':
            hour += offsetHour;
            minute += offsetMinute;
            break;
        case '+':
            hour -= offsetHour;
            minute -= offsetMinute;
            break;
    }
    return new Date(Date.UTC(year, month, day, hour, minute, second));
};

var PopupWrapper = function (_a) {
    var annotation = _a.annotation;
    var theme = React.useContext(ThemeContext);
    var dateStr = '';
    if (annotation.modificationDate) {
        var date = convertDate(annotation.modificationDate);
        dateStr = date ? date.toLocaleDateString() + ", " + date.toLocaleTimeString() : '';
    }
    return (React__default['default'].createElement("div", { className: theme.prefixClass + "-annotation-popup-wrapper", style: {
            top: annotation.annotationType === AnnotationType$1.Popup ? '' : '100%',
        } },
        (annotation.title) && (React__default['default'].createElement("div", { className: theme.prefixClass + "-annotation-popup-wrapper-header" },
            React__default['default'].createElement("div", { className: theme.prefixClass + "-annotation-popup-wrapper-title" }, annotation.title),
            React__default['default'].createElement("span", { className: theme.prefixClass + "-annotation-popup-wrapper-date" }, dateStr))),
        annotation.contents && (React__default['default'].createElement("div", { className: theme.prefixClass + "-annotation-popup-wrapper-content" }, annotation.contents.split('\n').map(function (item, index) { return React__default['default'].createElement(React.Fragment, { key: index },
            item,
            React__default['default'].createElement("br", null)); })))));
};

var TogglePopupBy;
(function (TogglePopupBy) {
    TogglePopupBy["Click"] = "Click";
    TogglePopupBy["Hover"] = "Hover";
})(TogglePopupBy || (TogglePopupBy = {}));
var useTogglePopup = function () {
    var _a = useToggle(), opened = _a.opened, toggle = _a.toggle;
    var _b = React.useState(TogglePopupBy.Hover), togglePopupBy = _b[0], setTooglePopupBy = _b[1];
    var toggleOnClick = function () {
        switch (togglePopupBy) {
            case TogglePopupBy.Click:
                opened && setTooglePopupBy(TogglePopupBy.Hover);
                toggle(ToggleStatus.Toggle);
                break;
            case TogglePopupBy.Hover:
                setTooglePopupBy(TogglePopupBy.Click);
                toggle(ToggleStatus.Open);
                break;
        }
    };
    var openOnHover = function () {
        togglePopupBy === TogglePopupBy.Hover && toggle(ToggleStatus.Open);
    };
    var closeOnHover = function () {
        togglePopupBy === TogglePopupBy.Hover && toggle(ToggleStatus.Close);
    };
    return {
        opened: opened,
        closeOnHover: closeOnHover,
        openOnHover: openOnHover,
        toggleOnClick: toggleOnClick,
    };
};

var Annotation = function (_a) {
    var annotation = _a.annotation, children = _a.children, ignoreBorder = _a.ignoreBorder, hasPopup = _a.hasPopup, isRenderable = _a.isRenderable, page = _a.page, viewport = _a.viewport;
    var rect = annotation.rect;
    var _b = useTogglePopup(), closeOnHover = _b.closeOnHover, opened = _b.opened, openOnHover = _b.openOnHover, toggleOnClick = _b.toggleOnClick;
    var normalizeRect = function (r) { return [
        Math.min(r[0], r[2]),
        Math.min(r[1], r[3]),
        Math.max(r[0], r[2]),
        Math.max(r[1], r[3]),
    ]; };
    var bound = normalizeRect([
        rect[0],
        page.view[3] + page.view[1] - rect[1],
        rect[2],
        page.view[3] + page.view[1] - rect[3],
    ]);
    var width = rect[2] - rect[0];
    var height = rect[3] - rect[1];
    var styles = {
        borderColor: '',
        borderRadius: '',
        borderStyle: '',
        borderWidth: '',
    };
    if (!ignoreBorder && annotation.borderStyle.width > 0) {
        switch (annotation.borderStyle.style) {
            case AnnotationBorderStyleType$1.Dashed:
                styles.borderStyle = 'dashed';
                break;
            case AnnotationBorderStyleType$1.Solid:
                styles.borderStyle = 'solid';
                break;
            case AnnotationBorderStyleType$1.Underline:
                styles = Object.assign({
                    borderBottomStyle: 'solid',
                }, styles);
                break;
            case AnnotationBorderStyleType$1.Beveled:
            case AnnotationBorderStyleType$1.Inset:
        }
        var borderWidth = annotation.borderStyle.width;
        styles.borderWidth = borderWidth + "px";
        if (annotation.borderStyle.style !== AnnotationBorderStyleType$1.Underline) {
            width = width - 2 * borderWidth;
            height = height - 2 * borderWidth;
        }
        var _c = annotation.borderStyle, horizontalCornerRadius = _c.horizontalCornerRadius, verticalCornerRadius = _c.verticalCornerRadius;
        if (horizontalCornerRadius > 0 || verticalCornerRadius > 0) {
            styles.borderRadius = horizontalCornerRadius + "px / " + verticalCornerRadius + "px";
        }
        annotation.color
            ? (styles.borderColor = "rgb(" + (annotation.color[0] | 0) + ", " + (annotation.color[1] | 0) + ", " + (annotation.color[2] | 0) + ")")
            : (styles.borderWidth = '0');
    }
    return (React__default['default'].createElement(React__default['default'].Fragment, null, isRenderable &&
        children({
            popup: {
                opened: opened,
                closeOnHover: closeOnHover,
                openOnHover: openOnHover,
                toggleOnClick: toggleOnClick,
            },
            slot: {
                attrs: {
                    style: Object.assign({
                        height: height + "px",
                        left: bound[0] + "px",
                        top: bound[1] + "px",
                        transform: "matrix(" + viewport.transform.join(',') + ")",
                        transformOrigin: "-" + bound[0] + "px -" + bound[1] + "px",
                        width: width + "px",
                    }, styles),
                },
                children: (React__default['default'].createElement(React__default['default'].Fragment, null, hasPopup && opened && (React__default['default'].createElement(PopupWrapper, { annotation: annotation })))),
            }
        })));
};

var Caret = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    return (React__default['default'].createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default['default'].createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-caret", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }), props.slot.children)); }));
};

var Circle = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    var rect = annotation.rect;
    var width = rect[2] - rect[0];
    var height = rect[3] - rect[1];
    var borderWidth = annotation.borderStyle.width;
    return (React__default['default'].createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default['default'].createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-circle", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }),
        React__default['default'].createElement("svg", { height: height + "px", preserveAspectRatio: 'none', version: '1.1', viewBox: "0 0 " + width + " " + height, width: width + "px" },
            React__default['default'].createElement("circle", { cy: height / 2, fill: 'none', rx: width / 2 - borderWidth / 2, ry: height / 2 - borderWidth / 2, stroke: 'transparent', strokeWidth: borderWidth || 1 })),
        props.slot.children)); }));
};

var fileName = function (url) {
    var str = url.split('/').pop();
    return str ? str.split('#')[0].split('?')[0] : url;
};

var downloadFile = function (url, data) {
    var blobUrl = (typeof data === 'string')
        ? ''
        : URL.createObjectURL(new Blob([data], { type: '' }));
    var link = document.createElement('a');
    link.style.display = 'none';
    link.href = blobUrl || url;
    link.setAttribute('download', fileName(url));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
    }
};

var FileAttachment = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false && (!!annotation.title || !!annotation.contents);
    var doubleClick = function () {
        var file = annotation.file;
        file && downloadFile(file.filename, file.content);
    };
    return (React__default['default'].createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: true, page: page, viewport: viewport }, function (props) { return (React__default['default'].createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-file-attachment", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onDoubleClick: doubleClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }), props.slot.children)); }));
};

var FreeText = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    return (React__default['default'].createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default['default'].createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-free-text", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }), props.slot.children)); }));
};

var Highlight = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    return (React__default['default'].createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default['default'].createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-highlight", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }), props.slot.children)); }));
};

var Ink = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    var rect = annotation.rect;
    var width = rect[2] - rect[0];
    var height = rect[3] - rect[1];
    var borderWidth = annotation.borderStyle.width;
    return (React__default['default'].createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default['default'].createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-ink", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }),
        annotation.inkLists && annotation.inkLists.length && (React__default['default'].createElement("svg", { height: height + "px", preserveAspectRatio: 'none', version: '1.1', viewBox: "0 0 " + width + " " + height, width: width + "px" }, annotation.inkLists.map(function (inkList, index) { return (React__default['default'].createElement("polyline", { key: index, fill: 'none', stroke: 'transparent', strokeWidth: borderWidth || 1, points: inkList.map(function (item) { return item.x - rect[0] + "," + (rect[3] - item.y); }).join(' ') })); }))),
        props.slot.children)); }));
};

var Line = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    var rect = annotation.rect;
    var width = rect[2] - rect[0];
    var height = rect[3] - rect[1];
    var borderWidth = annotation.borderStyle.width;
    return (React__default['default'].createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default['default'].createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-line", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }),
        React__default['default'].createElement("svg", { height: height + "px", preserveAspectRatio: 'none', version: '1.1', viewBox: "0 0 " + width + " " + height, width: width + "px" },
            React__default['default'].createElement("line", { stroke: 'transparent', strokeWidth: borderWidth || 1, x1: rect[2] - annotation.lineCoordinates[0], x2: rect[2] - annotation.lineCoordinates[2], y1: rect[3] - annotation.lineCoordinates[1], y2: rect[3] - annotation.lineCoordinates[3] })),
        props.slot.children)); }));
};

var parse$1 = function (pageIndex, destArray) {
    var bottomOffset;
    var scale;
    switch (destArray[1].name) {
        case 'XYZ':
            bottomOffset = destArray[3];
            scale = destArray[4];
            return {
                bottomOffset: bottomOffset,
                pageIndex: pageIndex - 1,
                scaleTo: scale,
            };
        case 'Fit':
            return {
                bottomOffset: 0,
                pageIndex: pageIndex - 1,
                scaleTo: SpecialZoomLevel$1.PageFit,
            };
        default:
            return {
                bottomOffset: 0,
                pageIndex: pageIndex - 1,
                scaleTo: 1,
            };
    }
};
var getDestination = function (doc, dest) {
    return new Promise(function (res) {
        new Promise(function (resolve) {
            if (typeof dest === 'string') {
                doc.getDestination(dest).then(function (destArray) {
                    resolve(destArray);
                });
            }
            else {
                resolve(dest);
            }
        }).then(function (destArray) {
            doc.getPageIndex(destArray[0]).then(function (pageIndex) {
                var target = parse$1(pageIndex, destArray);
                res(target);
            });
        });
    });
};

var Link = function (_a) {
    var annotation = _a.annotation, doc = _a.doc, page = _a.page, viewport = _a.viewport, onExecuteNamedAction = _a.onExecuteNamedAction, onJumpToDest = _a.onJumpToDest;
    var theme = React.useContext(ThemeContext);
    var link = function (e) {
        e.preventDefault();
        annotation.action
            ? onExecuteNamedAction(annotation.action)
            : getDestination(doc, annotation.dest).then(function (target) {
                var pageIndex = target.pageIndex, bottomOffset = target.bottomOffset, scaleTo = target.scaleTo;
                onJumpToDest(pageIndex + 1, bottomOffset, scaleTo);
            });
    };
    var isRenderable = !!(annotation.url || annotation.dest || annotation.action);
    var attrs = annotation.url
        ? {
            href: annotation.url,
            rel: 'noopener noreferrer nofollow',
            target: annotation.newWindow ? '_blank' : '',
            title: annotation.url,
        }
        : {
            href: '',
            onClick: link,
        };
    return (React__default['default'].createElement(Annotation, { annotation: annotation, hasPopup: false, ignoreBorder: false, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default['default'].createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-link", "data-annotation-id": annotation.id }),
        React__default['default'].createElement("a", __assign({}, attrs)))); }));
};

var Polygon = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    var rect = annotation.rect;
    var width = rect[2] - rect[0];
    var height = rect[3] - rect[1];
    var borderWidth = annotation.borderStyle.width;
    return (React__default['default'].createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default['default'].createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-polygon", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }),
        annotation.vertices && annotation.vertices.length && (React__default['default'].createElement("svg", { height: height + "px", preserveAspectRatio: 'none', version: '1.1', viewBox: "0 0 " + width + " " + height, width: width + "px" },
            React__default['default'].createElement("polygon", { fill: 'none', stroke: 'transparent', strokeWidth: borderWidth || 1, points: annotation.vertices.map(function (item) { return item.x - rect[0] + "," + (rect[3] - item.y); }).join(' ') }))),
        props.slot.children)); }));
};

var Polyline = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    var rect = annotation.rect;
    var width = rect[2] - rect[0];
    var height = rect[3] - rect[1];
    var borderWidth = annotation.borderStyle.width;
    return (React__default['default'].createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default['default'].createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-polyline", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }),
        annotation.vertices && annotation.vertices.length && (React__default['default'].createElement("svg", { height: height + "px", preserveAspectRatio: 'none', version: '1.1', viewBox: "0 0 " + width + " " + height, width: width + "px" },
            React__default['default'].createElement("polyline", { fill: 'none', stroke: 'transparent', strokeWidth: borderWidth || 1, points: annotation.vertices.map(function (item) { return item.x - rect[0] + "," + (rect[3] - item.y); }).join(' ') }))),
        props.slot.children)); }));
};

var Popup = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var isRenderable = !!(annotation.title || annotation.contents);
    var ignoredParents = ['Circle', 'Ink', 'Line', 'Polygon', 'PolyLine', 'Square'];
    var hasPopup = !annotation.parentType || ignoredParents.indexOf(annotation.parentType) !== -1;
    React.useLayoutEffect(function () {
        if (!annotation.parentId) {
            return;
        }
        var parent = document.querySelector("[data-annotation-id=\"" + annotation.parentId + "\"]");
        var container = document.querySelector("[data-annotation-id=\"" + annotation.id + "\"]");
        if (!parent || !container) {
            return;
        }
        var left = parseFloat(parent.style.left);
        var top = parseFloat(parent.style.top) + parseFloat(parent.style.height);
        container.style.left = left + "px";
        container.style.top = top + "px";
        container.style.transformOrigin = "-" + left + "px -" + top + "px";
    }, []);
    return (React__default['default'].createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: false, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default['default'].createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-popup", "data-annotation-id": annotation.id }),
        React__default['default'].createElement(PopupWrapper, { annotation: annotation }))); }));
};

var Square = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    var rect = annotation.rect;
    var width = rect[2] - rect[0];
    var height = rect[3] - rect[1];
    var borderWidth = annotation.borderStyle.width;
    return (React__default['default'].createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default['default'].createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-square", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }),
        React__default['default'].createElement("svg", { height: height + "px", preserveAspectRatio: 'none', version: '1.1', viewBox: "0 0 " + width + " " + height, width: width + "px" },
            React__default['default'].createElement("rect", { height: height - borderWidth, fill: 'none', stroke: 'transparent', strokeWidth: borderWidth || 1, x: borderWidth / 2, y: borderWidth / 2, width: width - borderWidth })),
        props.slot.children)); }));
};

var Squiggly = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    return (React__default['default'].createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default['default'].createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-squiggly", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }), props.slot.children)); }));
};

var Stamp = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    return (React__default['default'].createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default['default'].createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-stamp", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }), props.slot.children)); }));
};

var StrikeOut = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    return (React__default['default'].createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default['default'].createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-strike-out", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }), props.slot.children)); }));
};

var CommentIcon = function () {
    return (React__default['default'].createElement(Icon, { size: 16 },
        React__default['default'].createElement("path", { d: 'M.5,16.5a1,1,0,0,0,1,1h2v4l4-4h15a1,1,0,0,0,1-1V3.5a1,1,0,0,0-1-1H1.5a1,1,0,0,0-1,1Z' }),
        React__default['default'].createElement("path", { d: 'M7.25,9.75A.25.25,0,1,1,7,10a.25.25,0,0,1,.25-.25' }),
        React__default['default'].createElement("path", { d: 'M12,9.75a.25.25,0,1,1-.25.25A.25.25,0,0,1,12,9.75' }),
        React__default['default'].createElement("path", { d: 'M16.75,9.75a.25.25,0,1,1-.25.25.25.25,0,0,1,.25-.25' })));
};

var HelpIcon = function () {
    return (React__default['default'].createElement(Icon, { size: 16 },
        React__default['default'].createElement("path", { d: 'M0.500 12.001 A11.500 11.500 0 1 0 23.500 12.001 A11.500 11.500 0 1 0 0.500 12.001 Z' }),
        React__default['default'].createElement("path", { d: 'M6.000 12.001 A6.000 6.000 0 1 0 18.000 12.001 A6.000 6.000 0 1 0 6.000 12.001 Z' }),
        React__default['default'].createElement("path", { d: 'M21.423 5.406L17.415 9.414' }),
        React__default['default'].createElement("path", { d: 'M14.587 6.585L18.607 2.565' }),
        React__default['default'].createElement("path", { d: 'M5.405 21.424L9.413 17.416' }),
        React__default['default'].createElement("path", { d: 'M6.585 14.588L2.577 18.596' }),
        React__default['default'].createElement("path", { d: 'M18.602 21.419L14.595 17.412' }),
        React__default['default'].createElement("path", { d: 'M17.419 14.58L21.428 18.589' }),
        React__default['default'].createElement("path", { d: 'M2.582 5.399L6.588 9.406' }),
        React__default['default'].createElement("path", { d: 'M9.421 6.581L5.412 2.572' })));
};

var KeyIcon = function () {
    return (React__default['default'].createElement(Icon, { size: 16 },
        React__default['default'].createElement("path", { d: 'M4.000 18.500 A1.500 1.500 0 1 0 7.000 18.500 A1.500 1.500 0 1 0 4.000 18.500 Z' }),
        React__default['default'].createElement("path", { d: 'M20.5.5l-9.782,9.783a7,7,0,1,0,3,3L17,10h1.5V8.5L19,8h1.5V6.5L21,6h1.5V4.5l1-1V.5Z' })));
};

var NoteIcon = function () {
    return (React__default['default'].createElement(Icon, { size: 16 },
        React__default['default'].createElement("path", { d: 'M2.000 2.500 L22.000 2.500 L22.000 23.500 L2.000 23.500 Z' }),
        React__default['default'].createElement("path", { d: 'M6 4.5L6 0.5' }),
        React__default['default'].createElement("path", { d: 'M18 4.5L18 0.5' }),
        React__default['default'].createElement("path", { d: 'M10 4.5L10 0.5' }),
        React__default['default'].createElement("path", { d: 'M14 4.5L14 0.5' })));
};

var ParagraphIcon = function () {
    return (React__default['default'].createElement(Icon, { size: 16 },
        React__default['default'].createElement("path", { d: 'M17.5 0.498L17.5 23.498' }),
        React__default['default'].createElement("path", { d: 'M10.5 0.498L10.5 23.498' }),
        React__default['default'].createElement("path", { d: 'M23.5.5H6.5a6,6,0,0,0,0,12h4' })));
};

var TriangleIcon = function () {
    return (React__default['default'].createElement(Icon, { size: 16 },
        React__default['default'].createElement("path", { d: 'M2.5 22.995L12 6.005 21.5 22.995 2.5 22.995z' })));
};

var Text = function (_a) {
    var annotation = _a.annotation, childAnnotation = _a.childAnnotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    var name = annotation.name ? annotation.name.toLowerCase() : '';
    return (React__default['default'].createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: false, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-text", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }),
            name && (React__default['default'].createElement("div", { className: theme.prefixClass + "-annotation-text-icon" },
                name === 'check' && React__default['default'].createElement(CheckIcon, null),
                name === 'comment' && React__default['default'].createElement(CommentIcon, null),
                name === 'help' && React__default['default'].createElement(HelpIcon, null),
                name === 'insert' && React__default['default'].createElement(TriangleIcon, null),
                name === 'key' && React__default['default'].createElement(KeyIcon, null),
                name === 'note' && React__default['default'].createElement(NoteIcon, null),
                (name === 'newparagraph' || name === 'paragraph') && React__default['default'].createElement(ParagraphIcon, null))),
            props.slot.children),
        childAnnotation && childAnnotation.annotationType === AnnotationType$1.Popup && props.popup.opened && (React__default['default'].createElement(Popup, { annotation: childAnnotation, page: page, viewport: viewport })))); }));
};

var Underline = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    return (React__default['default'].createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default['default'].createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-underline", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }), props.slot.children)); }));
};

var AnnotationLayer = function (_a) {
    var doc = _a.doc, page = _a.page, rotation = _a.rotation, scale = _a.scale, onExecuteNamedAction = _a.onExecuteNamedAction, onJumpToDest = _a.onJumpToDest;
    var theme = React.useContext(ThemeContext);
    var renderAnnotations = function (annotations) {
        var viewport = page.getViewport({ rotation: rotation, scale: scale });
        var clonedViewPort = viewport.clone({ dontFlip: true });
        return (React__default['default'].createElement(React__default['default'].Fragment, null, annotations
            .filter(function (annotation) { return !annotation.parentId; })
            .map(function (annotation) {
            var childAnnotation = annotations.find(function (item) { return item.parentId === annotation.id; });
            switch (annotation.annotationType) {
                case AnnotationType$1.Caret:
                    return (React__default['default'].createElement(Caret, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Circle:
                    return (React__default['default'].createElement(Circle, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.FileAttachment:
                    return (React__default['default'].createElement(FileAttachment, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.FreeText:
                    return (React__default['default'].createElement(FreeText, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Highlight:
                    return (React__default['default'].createElement(Highlight, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Ink:
                    return (React__default['default'].createElement(Ink, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Line:
                    return (React__default['default'].createElement(Line, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Link:
                    return (React__default['default'].createElement(Link, { key: annotation.id, annotation: annotation, doc: doc, page: page, viewport: clonedViewPort, onExecuteNamedAction: onExecuteNamedAction, onJumpToDest: onJumpToDest }));
                case AnnotationType$1.Polygon:
                    return (React__default['default'].createElement(Polygon, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Polyline:
                    return (React__default['default'].createElement(Polyline, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Popup:
                    return (React__default['default'].createElement(Popup, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Square:
                    return (React__default['default'].createElement(Square, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Squiggly:
                    return (React__default['default'].createElement(Squiggly, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Stamp:
                    return (React__default['default'].createElement(Stamp, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.StrikeOut:
                    return (React__default['default'].createElement(StrikeOut, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Text:
                    return (React__default['default'].createElement(Text, { key: annotation.id, annotation: annotation, childAnnotation: childAnnotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Underline:
                    return (React__default['default'].createElement(Underline, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                default:
                    return React__default['default'].createElement(React.Fragment, { key: annotation.id });
            }
        })));
    };
    return (React__default['default'].createElement("div", { className: theme.prefixClass + "-annotation-layer" },
        React__default['default'].createElement(AnnotationLoader, { page: page, renderAnnotations: renderAnnotations })));
};

var WithScale = function (_a) {
    var callback = _a.callback, children = _a.children, rotation = _a.rotation, scale = _a.scale;
    React.useLayoutEffect(function () {
        callback();
    }, [rotation, scale]);
    return (React__default['default'].createElement(React__default['default'].Fragment, null, children));
};

var CanvasLayer = function (_a) {
    var height = _a.height, page = _a.page, pageIndex = _a.pageIndex, rotation = _a.rotation, scale = _a.scale, width = _a.width, onCanvasLayerRender = _a.onCanvasLayerRender;
    var theme = React.useContext(ThemeContext);
    var canvasRef = React.createRef();
    var renderTask = React.useRef();
    var devicePixelRatio = window.devicePixelRatio || 1;
    var renderCanvas = function () {
        var task = renderTask.current;
        if (task) {
            task.cancel();
        }
        var canvasEle = canvasRef.current;
        canvasEle.height = height * devicePixelRatio;
        canvasEle.width = width * devicePixelRatio;
        var canvasContext = canvasEle.getContext('2d', { alpha: false });
        var viewport = page.getViewport({ rotation: rotation, scale: scale * devicePixelRatio });
        renderTask.current = page.render({ canvasContext: canvasContext, viewport: viewport });
        renderTask.current.promise.then(function () {
            onCanvasLayerRender({
                ele: canvasEle,
                pageIndex: pageIndex,
                rotation: rotation,
                scale: scale,
            });
        }, function () { });
    };
    return (React__default['default'].createElement(WithScale, { callback: renderCanvas, rotation: rotation, scale: scale },
        React__default['default'].createElement("div", { className: theme.prefixClass + "-canvas-layer", style: {
                height: height + "px",
                width: width + "px",
            } },
            React__default['default'].createElement("canvas", { ref: canvasRef, style: {
                    transform: "scale(" + 1 / devicePixelRatio + ")",
                    transformOrigin: "top left",
                } }))));
};

var SvgLayer = function (_a) {
    var height = _a.height, page = _a.page, rotation = _a.rotation, scale = _a.scale, width = _a.width;
    var theme = React.useContext(ThemeContext);
    var containerRef = React.createRef();
    var empty = function () {
        var containerEle = containerRef.current;
        if (!containerEle) {
            return;
        }
        containerEle.innerHTML = '';
    };
    var renderSvg = function () {
        var containerEle = containerRef.current;
        var viewport = page.getViewport({ rotation: rotation, scale: scale });
        page.getOperatorList().then(function (operatorList) {
            empty();
            var graphic = new PdfJs__namespace.SVGGraphics(page.commonObjs, page.objs);
            graphic.getSVG(operatorList, viewport).then(function (svg) {
                svg.style.height = height + "px";
                svg.style.width = width + "px";
                containerEle.appendChild(svg);
            });
        });
    };
    return (React__default['default'].createElement(WithScale, { callback: renderSvg, rotation: rotation, scale: scale },
        React__default['default'].createElement("div", { className: theme.prefixClass + "-svg-layer", ref: containerRef })));
};

var TextLayer = function (_a) {
    var page = _a.page, pageIndex = _a.pageIndex, plugins = _a.plugins, rotation = _a.rotation, scale = _a.scale;
    var theme = React.useContext(ThemeContext);
    var containerRef = React.createRef();
    var renderTask = React.useRef();
    var empty = function () {
        var containerEle = containerRef.current;
        if (!containerEle) {
            return;
        }
        var spans = containerEle.querySelectorAll("span." + theme.prefixClass + "-text");
        var numSpans = spans.length;
        for (var i = 0; i < numSpans; i++) {
            var span = spans[i];
            containerEle.removeChild(span);
        }
    };
    var renderText = function () {
        var task = renderTask.current;
        if (task) {
            task.cancel();
        }
        var containerEle = containerRef.current;
        if (!containerEle) {
            return;
        }
        var viewport = page.getViewport({ rotation: rotation, scale: scale });
        plugins.forEach(function (plugin) {
            if (plugin.onTextLayerRender) {
                plugin.onTextLayerRender({
                    ele: containerEle,
                    pageIndex: pageIndex,
                    scale: scale,
                    status: TextLayerRenderStatus$1.PreRender,
                });
            }
        });
        page.getTextContent().then(function (textContent) {
            empty();
            renderTask.current = PdfJs__namespace.renderTextLayer({
                container: containerEle,
                textContent: textContent,
                viewport: viewport,
            });
            renderTask.current.promise.then(function () {
                var spans = containerEle.childNodes;
                var numSpans = spans.length;
                for (var i = 0; i < numSpans; i++) {
                    var span = spans[i];
                    span.classList.add(theme.prefixClass + "-text");
                }
                plugins.forEach(function (plugin) {
                    if (plugin.onTextLayerRender) {
                        plugin.onTextLayerRender({
                            ele: containerEle,
                            pageIndex: pageIndex,
                            scale: scale,
                            status: TextLayerRenderStatus$1.DidRender,
                        });
                    }
                });
            }, function () { });
        });
    };
    return (React__default['default'].createElement(WithScale, { callback: renderText, rotation: rotation, scale: scale },
        React__default['default'].createElement("div", { className: theme.prefixClass + "-text-layer", ref: containerRef })));
};

var PageLayer = function (_a) {
    var doc = _a.doc, height = _a.height, pageIndex = _a.pageIndex, plugins = _a.plugins, renderPage = _a.renderPage, rotation = _a.rotation, scale = _a.scale, width = _a.width, onCanvasLayerRender = _a.onCanvasLayerRender, onExecuteNamedAction = _a.onExecuteNamedAction, onJumpToDest = _a.onJumpToDest, onPageVisibilityChanged = _a.onPageVisibilityChanged;
    var theme = React.useContext(ThemeContext);
    var _b = React.useState({
        isCalculated: false,
        page: null,
        pageHeight: height,
        pageWidth: width,
        viewportRotation: 0,
    }), pageSize = _b[0], setPageSize = _b[1];
    var isCalculated = pageSize.isCalculated, page = pageSize.page, pageHeight = pageSize.pageHeight, pageWidth = pageSize.pageWidth;
    var intersectionThreshold = Array(10).fill(null).map(function (_, i) { return i / 10; });
    var scaledWidth = pageWidth * scale;
    var scaledHeight = pageHeight * scale;
    var isVertical = Math.abs(rotation) % 180 === 0;
    var w = isVertical ? scaledWidth : scaledHeight;
    var h = isVertical ? scaledHeight : scaledWidth;
    var visibilityChanged = function (params) {
        onPageVisibilityChanged(pageIndex, params.isVisible ? params.ratio : -1);
        if (params.isVisible && !isCalculated) {
            doc.getPage(pageIndex + 1).then(function (pdfPage) {
                var viewport = pdfPage.getViewport({ scale: 1 });
                setPageSize({
                    isCalculated: true,
                    page: pdfPage,
                    pageHeight: viewport.height,
                    pageWidth: viewport.width,
                    viewportRotation: viewport.rotation,
                });
            });
        }
    };
    var defaultPageRenderer = function (props) { return (React__default['default'].createElement(React__default['default'].Fragment, null,
        props.canvasLayer.children,
        props.textLayer.children,
        props.annotationLayer.children)); };
    var renderPageLayer = renderPage || defaultPageRenderer;
    var rotationNumber = (rotation + pageSize.viewportRotation) % 360;
    return (React__default['default'].createElement(Observer, { onVisibilityChanged: visibilityChanged, threshold: intersectionThreshold },
        React__default['default'].createElement("div", { className: theme.prefixClass + "-page-layer", style: {
                height: h + "px",
                width: w + "px",
            } }, !page
            ? React__default['default'].createElement(Spinner, null)
            : renderPageLayer({
                annotationLayer: {
                    attrs: {},
                    children: (React__default['default'].createElement(AnnotationLayer, { doc: doc, page: page, rotation: rotationNumber, scale: scale, onExecuteNamedAction: onExecuteNamedAction, onJumpToDest: onJumpToDest }))
                },
                canvasLayer: {
                    attrs: {},
                    children: (React__default['default'].createElement(CanvasLayer, { height: h, page: page, pageIndex: pageIndex, rotation: rotationNumber, scale: scale, width: w, onCanvasLayerRender: onCanvasLayerRender })),
                },
                doc: doc,
                height: h,
                pageIndex: pageIndex,
                rotation: rotation,
                scale: scale,
                svgLayer: {
                    attrs: {},
                    children: (React__default['default'].createElement(SvgLayer, { height: h, page: page, rotation: rotationNumber, scale: scale, width: w })),
                },
                textLayer: {
                    attrs: {},
                    children: (React__default['default'].createElement(TextLayer, { page: page, pageIndex: pageIndex, plugins: plugins, rotation: rotationNumber, scale: scale }))
                },
                width: w,
            }))));
};

var getFileExt = function (url) {
    var str = url.split(/\./).pop();
    return str ? str.toLowerCase() : '';
};

var SCROLL_BAR_WIDTH = 17;
var PAGE_PADDING = 8;
var Inner = function (_a) {
    var defaultScale = _a.defaultScale, doc = _a.doc, initialPage = _a.initialPage, pageSize = _a.pageSize, plugins = _a.plugins, renderPage = _a.renderPage, viewerState = _a.viewerState, onCanvasLayerRender = _a.onCanvasLayerRender, onDocumentLoad = _a.onDocumentLoad, onOpenFile = _a.onOpenFile, onPageChange = _a.onPageChange, onZoom = _a.onZoom;
    var theme = React.useContext(ThemeContext);
    var containerRef = React.useRef(null);
    var pagesRef = React.useRef(null);
    var _b = React.useState(pageSize.scale), scale = _b[0], setScale = _b[1];
    var _c = React.useState(0), currentPage = _c[0], setCurrentPage = _c[1];
    var _d = React.useState(0), rotation = _d[0], setRotation = _d[1];
    var stateRef = React.useRef(viewerState);
    var numPages = doc.numPages;
    var pageWidth = pageSize.pageWidth, pageHeight = pageSize.pageHeight;
    var arr = Array(numPages).fill(null);
    var pageVisibility = arr.map(function () { return 0; });
    var pageRefs = arr.map(function () { return React.useRef(); });
    var setViewerState = function (viewerState) {
        var newState = viewerState;
        plugins.forEach(function (plugin) {
            if (plugin.onViewerStateChange) {
                newState = plugin.onViewerStateChange(newState);
            }
        });
        stateRef.current = newState;
    };
    var getPagesRef = function () { return pagesRef; };
    var getViewerState = function () { return stateRef.current; };
    var jumpToDestination = function (pageIndex, bottomOffset, scaleTo) {
        var pagesContainer = pagesRef.current;
        var currentState = stateRef.current;
        if (!pagesContainer || !currentState) {
            return;
        }
        var newPageIndex = pageIndex + 1;
        doc.getPage(newPageIndex).then(function (page) {
            var viewport = page.getViewport({ scale: 1 });
            var top = 0;
            var bottom = bottomOffset || 0;
            switch (scaleTo) {
                case SpecialZoomLevel$1.PageFit:
                    top = 0;
                    zoom(SpecialZoomLevel$1.PageFit);
                    break;
                default:
                    top = (viewport.height - bottom) * currentState.scale;
                    break;
            }
            var targetPageEle = pageRefs[pageIndex].current;
            if (targetPageEle) {
                pagesContainer.scrollTop = targetPageEle.offsetTop + top;
            }
        });
    };
    var jumpToPage = function (pageIndex) {
        if (pageIndex < 0 || pageIndex >= numPages) {
            return;
        }
        var pagesContainer = pagesRef.current;
        var targetPage = pageRefs[pageIndex].current;
        if (pagesContainer && targetPage) {
            pagesContainer.scrollTop = targetPage.offsetTop;
        }
        setCurrentPage(pageIndex);
    };
    var openFile = function (file) {
        if (getFileExt(file.name).toLowerCase() !== 'pdf') {
            return;
        }
        new Promise(function (resolve) {
            var reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = function () {
                var bytes = new Uint8Array(reader.result);
                resolve(bytes);
            };
        }).then(function (data) {
            onOpenFile(file.name, data);
        });
    };
    var rotate = function (updateRotation) {
        setRotation(updateRotation);
        setViewerState({
            file: viewerState.file,
            pageIndex: currentPage,
            pageHeight: pageHeight,
            pageWidth: pageWidth,
            rotation: updateRotation,
            scale: scale,
        });
    };
    var zoom = function (newScale) {
        var pagesEle = pagesRef.current;
        if (!pagesEle) {
            return;
        }
        var updateScale = 1;
        switch (newScale) {
            case SpecialZoomLevel$1.ActualSize:
                updateScale = 1;
                break;
            case SpecialZoomLevel$1.PageFit:
                updateScale = Math.min((pagesEle.offsetWidth - SCROLL_BAR_WIDTH) / pageWidth, (pagesEle.offsetHeight - 2 * PAGE_PADDING) / pageHeight);
                break;
            case SpecialZoomLevel$1.PageWidth:
                updateScale = (pagesEle.offsetWidth - SCROLL_BAR_WIDTH) / pageWidth;
                break;
            default:
                updateScale = newScale;
                break;
        }
        setScale(updateScale);
        onZoom({ doc: doc, scale: updateScale });
        setViewerState({
            file: viewerState.file,
            pageIndex: currentPage,
            pageHeight: pageHeight,
            pageWidth: pageWidth,
            rotation: rotation,
            scale: updateScale,
        });
    };
    var getPluginMethods = function () { return ({
        getPagesRef: getPagesRef,
        getViewerState: getViewerState,
        jumpToDestination: jumpToDestination,
        jumpToPage: jumpToPage,
        openFile: openFile,
        rotate: rotate,
        setViewerState: setViewerState,
        zoom: zoom,
    }); };
    React.useEffect(function () {
        var pluginMethods = getPluginMethods();
        plugins.forEach(function (plugin) {
            if (plugin.install) {
                plugin.install(pluginMethods);
            }
        });
        return function () {
            plugins.forEach(function (plugin) {
                if (plugin.uninstall) {
                    plugin.uninstall(pluginMethods);
                }
            });
        };
    }, []);
    React.useEffect(function () {
        onDocumentLoad({ doc: doc });
        plugins.forEach(function (plugin) {
            plugin.onDocumentLoad && plugin.onDocumentLoad({ doc: doc });
        });
        if (initialPage) {
            jumpToPage(initialPage);
        }
    }, []);
    React.useEffect(function () {
        onPageChange({ currentPage: currentPage, doc: doc });
        setViewerState({
            file: viewerState.file,
            pageIndex: currentPage,
            pageHeight: pageHeight,
            pageWidth: pageWidth,
            rotation: rotation,
            scale: scale,
        });
    }, [currentPage]);
    React.useEffect(function () {
        if (defaultScale) {
            zoom(defaultScale);
        }
    }, []);
    var pageVisibilityChanged = function (pageIndex, ratio) {
        pageVisibility[pageIndex] = ratio;
        var maxRatioPage = pageVisibility.reduce(function (maxIndex, item, index, array) {
            return item > array[maxIndex] ? index : maxIndex;
        }, 0);
        setCurrentPage(maxRatioPage);
    };
    var executeNamedAction = function (action) {
        var previousPage = currentPage - 1;
        var nextPage = currentPage + 1;
        switch (action) {
            case 'FirstPage':
                jumpToPage(0);
                break;
            case 'LastPage':
                jumpToPage(numPages - 1);
                break;
            case 'NextPage':
                (nextPage < numPages) && jumpToPage(nextPage);
                break;
            case 'PrevPage':
                (previousPage >= 0) && jumpToPage(previousPage);
                break;
        }
    };
    var renderViewer = function () {
        var slot = {
            attrs: {
                ref: containerRef,
                style: {
                    height: '100%',
                },
            },
            subSlot: {
                attrs: {
                    ref: pagesRef,
                    style: {
                        height: '100%',
                        overflow: 'auto',
                        position: 'relative',
                    },
                },
                children: (React__default['default'].createElement(React__default['default'].Fragment, null, Array(numPages).fill(0).map(function (_, index) {
                    return (React__default['default'].createElement("div", { className: theme.prefixClass + "-inner-page", key: "pagelayer-" + index, ref: function (ref) {
                            pageRefs[index].current = ref;
                        } },
                        React__default['default'].createElement(PageLayer, { doc: doc, height: pageHeight, pageIndex: index, plugins: plugins, renderPage: renderPage, rotation: rotation, scale: scale, width: pageWidth, onCanvasLayerRender: onCanvasLayerRender, onExecuteNamedAction: executeNamedAction, onJumpToDest: jumpToDestination, onPageVisibilityChanged: pageVisibilityChanged })));
                }))),
            },
        };
        plugins.forEach(function (plugin) {
            if (plugin.renderViewer) {
                slot = plugin.renderViewer({
                    containerRef: containerRef,
                    doc: doc,
                    pageHeight: pageHeight,
                    pageWidth: pageWidth,
                    rotation: rotation,
                    slot: slot,
                    jumpToPage: jumpToPage,
                    openFile: openFile,
                    rotate: rotate,
                    zoom: zoom,
                });
            }
        });
        return slot;
    };
    var renderSlot = function (slot) { return (React__default['default'].createElement("div", __assign({}, slot.attrs, { style: slot.attrs && slot.attrs.style ? slot.attrs.style : {} }),
        slot.children,
        slot.subSlot && renderSlot(slot.subSlot))); };
    return renderSlot(renderViewer());
};

var LEVELS = [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9,
    1, 1.1, 1.3, 1.5, 1.7, 1.9,
    2.1, 2.4, 2.7,
    3.0, 3.3, 3.7,
    4.1, 4.6,
    5.1, 5.7,
    6.3,
    7.0, 7.7,
    8.5,
    9.4,
    10,
];
var decrease = function (currentLevel) {
    var found = LEVELS.findIndex(function (item) { return item >= currentLevel; });
    return found === -1 || found === 0 ? currentLevel : LEVELS[found - 1];
};

var PageSizeCalculator = function (_a) {
    var doc = _a.doc, render = _a.render;
    var theme = React.useContext(ThemeContext);
    var pagesRef = React.useRef(null);
    var _b = React.useState({
        pageHeight: 0,
        pageWidth: 0,
        scale: 1,
    }), pageSize = _b[0], setPageSize = _b[1];
    React.useEffect(function () {
        doc.getPage(1).then(function (pdfPage) {
            var viewport = pdfPage.getViewport({ scale: 1 });
            var w = viewport.width;
            var h = viewport.height;
            var pagesEle = pagesRef.current;
            if (!pagesEle) {
                return;
            }
            var scaled = pagesEle.offsetWidth / w;
            var scale = decrease(Math.max(1, scaled));
            setPageSize({
                pageHeight: h,
                pageWidth: w,
                scale: scale,
            });
        });
    }, [doc]);
    var pageWidth = pageSize.pageWidth;
    return (pageWidth === 0
        ? (React__default['default'].createElement("div", { className: theme.prefixClass + "-page-size-calculator", ref: pagesRef },
            React__default['default'].createElement(Spinner, null)))
        : render(pageSize));
};

var LoadingStatus = (function () {
    function LoadingStatus() {
    }
    return LoadingStatus;
}());

var AskForPasswordState = (function (_super) {
    __extends(AskForPasswordState, _super);
    function AskForPasswordState(verifyPasswordFn) {
        var _this = _super.call(this) || this;
        _this.verifyPasswordFn = verifyPasswordFn;
        return _this;
    }
    return AskForPasswordState;
}(LoadingStatus));

var AskingPassword = function (_a) {
    var verifyPasswordFn = _a.verifyPasswordFn;
    var l10n = React.useContext(LocalizationContext);
    var theme = React.useContext(ThemeContext);
    var _b = React.useState(''), password = _b[0], setPassword = _b[1];
    var changePassword = function (e) { return setPassword(e.target.value); };
    var submit = function () { return verifyPasswordFn(password); };
    return (React__default['default'].createElement("div", { className: theme.prefixClass + "-asking-password" },
        React__default['default'].createElement("div", null,
            React__default['default'].createElement("div", { className: theme.prefixClass + "-asking-password-message" },
                l10n.askingPassword.requirePasswordToOpen,
                ":"),
            React__default['default'].createElement("div", { className: theme.prefixClass + "-asking-password-input-container" },
                React__default['default'].createElement("input", { className: theme.prefixClass + "-asking-password-input", type: "password", onChange: changePassword }),
                React__default['default'].createElement("button", { className: theme.prefixClass + "-asking-password-button", onClick: submit }, l10n.askingPassword.submit)))));
};

var CompletedState = (function (_super) {
    __extends(CompletedState, _super);
    function CompletedState(doc) {
        var _this = _super.call(this) || this;
        _this.doc = doc;
        return _this;
    }
    return CompletedState;
}(LoadingStatus));

var FailureState = (function (_super) {
    __extends(FailureState, _super);
    function FailureState(error) {
        var _this = _super.call(this) || this;
        _this.error = error;
        return _this;
    }
    return FailureState;
}(LoadingStatus));

var LoadingState = (function (_super) {
    __extends(LoadingState, _super);
    function LoadingState(percentages) {
        var _this = _super.call(this) || this;
        _this.percentages = percentages;
        return _this;
    }
    return LoadingState;
}(LoadingStatus));

var WrongPassword = function (_a) {
    var verifyPasswordFn = _a.verifyPasswordFn;
    var l10n = React.useContext(LocalizationContext);
    var theme = React.useContext(ThemeContext);
    var _b = React.useState(''), password = _b[0], setPassword = _b[1];
    var changePassword = function (e) { return setPassword(e.target.value); };
    var submit = function () { return verifyPasswordFn(password); };
    return (React__default['default'].createElement("div", { className: theme.prefixClass + "-asking-password" },
        React__default['default'].createElement("div", null,
            React__default['default'].createElement("div", { className: theme.prefixClass + "-asking-password-message" },
                l10n.wrongPassword.tryAgain,
                ":"),
            React__default['default'].createElement("div", { className: theme.prefixClass + "-asking-password-input-container" },
                React__default['default'].createElement("input", { className: theme.prefixClass + "-asking-password-input", type: "password", onChange: changePassword }),
                React__default['default'].createElement("button", { className: theme.prefixClass + "-asking-password-button", onClick: submit }, l10n.wrongPassword.submit)))));
};

var WrongPasswordState = (function (_super) {
    __extends(WrongPasswordState, _super);
    function WrongPasswordState(verifyPasswordFn) {
        var _this = _super.call(this) || this;
        _this.verifyPasswordFn = verifyPasswordFn;
        return _this;
    }
    return WrongPasswordState;
}(LoadingStatus));

var DocumentLoader = function (_a) {
    var characterMap = _a.characterMap, file = _a.file, render = _a.render, renderError = _a.renderError;
    var theme = React.useContext(ThemeContext);
    var _b = React.useState(new LoadingState(0)), status = _b[0], setStatus = _b[1];
    React.useEffect(function () {
        setStatus(new LoadingState(0));
        var params = Object.assign({}, ('string' === typeof file) ? { url: file, withCredentials: true } : { data: file }, characterMap ? { cMapUrl: characterMap.url, cMapPacked: characterMap.isCompressed } : {});
        var loadingTask = PdfJs__namespace.getDocument(params);
        loadingTask.onPassword = function (verifyPassword, reason) {
            switch (reason) {
                case PdfJs__namespace.PasswordResponses.NEED_PASSWORD:
                    setStatus(new AskForPasswordState(verifyPassword));
                    break;
                case PdfJs__namespace.PasswordResponses.INCORRECT_PASSWORD:
                    setStatus(new WrongPasswordState(verifyPassword));
                    break;
            }
        };
        loadingTask.promise.then(function (doc) { return setStatus(new CompletedState(doc)); }, function (err) { return setStatus(new FailureState({
            message: err.message || 'Cannot load document',
            name: err.name,
        })); });
        return function () {
            loadingTask.destroy();
        };
    }, [file]);
    switch (true) {
        case (status instanceof AskForPasswordState):
            return React__default['default'].createElement(AskingPassword, { verifyPasswordFn: status.verifyPasswordFn });
        case (status instanceof WrongPasswordState):
            return React__default['default'].createElement(WrongPassword, { verifyPasswordFn: status.verifyPasswordFn });
        case (status instanceof CompletedState):
            return render(status.doc);
        case (status instanceof FailureState):
            return renderError
                ? renderError(status.error)
                : (React__default['default'].createElement("div", { className: theme.prefixClass + "-doc-error" },
                    React__default['default'].createElement("div", { className: theme.prefixClass + "-doc-error-text" }, status.error.message)));
        case (status instanceof LoadingState):
        default:
            return (React__default['default'].createElement("div", { className: theme.prefixClass + "-doc-loading" },
                React__default['default'].createElement(Spinner, null)));
    }
};

var ThemeProvider = function (_a) {
    var children = _a.children, prefixClass = _a.prefixClass;
    return (React__default['default'].createElement(ThemeContext.Provider, { value: { prefixClass: prefixClass || 'rpv-core' } }, children));
};

var Viewer = function (_a) {
    var characterMap = _a.characterMap, defaultScale = _a.defaultScale, fileUrl = _a.fileUrl, _b = _a.initialPage, initialPage = _b === void 0 ? 0 : _b, localization = _a.localization, _c = _a.plugins, plugins = _c === void 0 ? [] : _c, prefixClass = _a.prefixClass, renderError = _a.renderError, renderPage = _a.renderPage, _d = _a.onCanvasLayerRender, onCanvasLayerRender = _d === void 0 ? function () { } : _d, _e = _a.onDocumentLoad, onDocumentLoad = _e === void 0 ? function () { } : _e, _f = _a.onPageChange, onPageChange = _f === void 0 ? function () { } : _f, _g = _a.onZoom, onZoom = _g === void 0 ? function () { } : _g;
    var _h = React.useState({
        data: fileUrl,
        name: (typeof fileUrl === 'string') ? fileUrl : '',
    }), file = _h[0], setFile = _h[1];
    var openFile = function (fileName, data) {
        setFile({
            data: data,
            name: fileName,
        });
    };
    React.useEffect(function () {
        setFile({
            data: fileUrl,
            name: (typeof fileUrl === 'string') ? fileUrl : '',
        });
    }, [fileUrl]);
    return (React__default['default'].createElement(ThemeProvider, { prefixClass: prefixClass },
        React__default['default'].createElement(LocalizationProvider, { localization: localization }, function (_) { return (React__default['default'].createElement(DocumentLoader, { characterMap: characterMap, file: file.data, render: function (doc) { return (React__default['default'].createElement(PageSizeCalculator, { doc: doc, render: function (ps) { return (React__default['default'].createElement(Inner, { defaultScale: defaultScale, doc: doc, initialPage: initialPage, pageSize: ps, plugins: plugins, renderPage: renderPage, viewerState: {
                        file: file,
                        pageIndex: initialPage,
                        pageHeight: ps.pageHeight,
                        pageWidth: ps.pageWidth,
                        rotation: 0,
                        scale: ps.scale,
                    }, onCanvasLayerRender: onCanvasLayerRender, onDocumentLoad: onDocumentLoad, onOpenFile: openFile, onPageChange: onPageChange, onZoom: onZoom })); } })); }, renderError: renderError })); })));
};

var Worker = function (_a) {
    var children = _a.children, workerUrl = _a.workerUrl;
    PdfJs__namespace.GlobalWorkerOptions.workerSrc = workerUrl;
    return React__default['default'].createElement(React__default['default'].Fragment, null, children);
};

exports.Button = Button;
exports.Icon = Icon;
exports.LocalizationContext = LocalizationContext;
exports.LocalizationProvider = LocalizationProvider;
exports.Menu = Menu;
exports.MenuDivider = MenuDivider;
exports.MenuItem = MenuItem;
exports.Modal = Modal;
exports.Observer = Observer;
exports.Popover = Popover;
exports.Position = Position$1;
exports.PrimaryButton = PrimaryButton;
exports.ProgressBar = ProgressBar;
exports.Separator = Separator;
exports.SpecialZoomLevel = SpecialZoomLevel$1;
exports.Spinner = Spinner;
exports.TextLayerRenderStatus = TextLayerRenderStatus$1;
exports.Tooltip = Tooltip;
exports.Worker = Worker;
exports.createStore = createStore;
exports.default = Viewer;
