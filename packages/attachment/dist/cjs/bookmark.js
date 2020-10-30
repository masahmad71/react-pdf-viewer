'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var core = require('@react-pdf-viewer/core');

var BookmarkItem = function (_a) {
    var bookmark = _a.bookmark, depth = _a.depth, doc = _a.doc, onClick = _a.onClick, onJumpToDest = _a.onJumpToDest;
    var toggleRef = React.createRef();
    var subItemRef = React.createRef();
    var subItemsDisplayed = React.useRef(true);
    var hasSubItems = bookmark.items && bookmark.items.length > 0;
    var toggleSubItems = function () {
        subItemsDisplayed.current = !subItemsDisplayed.current;
        var subItemsEle = subItemRef.current;
        var toggleEle = toggleRef.current;
        if (!subItemsEle || !toggleEle) {
            return;
        }
        subItemsEle.style.display = subItemsDisplayed.current ? 'block' : 'none';
        toggleEle.classList.toggle('rpv-bookmark-toggle-expanded');
    };
    var clickBookmak = function () {
        if (hasSubItems && bookmark.dest) {
            onClick(bookmark.dest);
        }
    };
    var clickItem = function () {
        if (!hasSubItems && bookmark.dest) {
            onClick(bookmark.dest);
        }
    };
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement("div", { className: 'rpv-bookmark-item', style: {
                paddingLeft: depth * 20 + 4 + "px",
            }, onClick: clickItem },
            hasSubItems && (React__default.createElement("span", { ref: toggleRef, className: 'rpv-bookmark-toggle', onClick: toggleSubItems }, "\u25BA")),
            bookmark.url
                ? (React__default.createElement("a", { className: 'rpv-bookmark-title', href: bookmark.url, rel: 'noopener noreferrer nofollow', target: bookmark.newWindow ? '_blank' : '' }, bookmark.title))
                : (React__default.createElement("div", { className: 'rpv-bookmark-title', onClick: clickBookmak }, bookmark.title))),
        hasSubItems && (React__default.createElement("div", { ref: subItemRef },
            React__default.createElement(BookmarkList, { bookmarks: bookmark.items, depth: depth + 1, doc: doc, onJumpToDest: onJumpToDest })))));
};

var parse = function (pageIndex, destArray) {
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
                scaleTo: core.SpecialZoomLevel.PageFit,
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
                var target = parse(pageIndex, destArray);
                res(target);
            });
        });
    });
};

var BookmarkList = function (_a) {
    var bookmarks = _a.bookmarks, _b = _a.depth, depth = _b === void 0 ? 0 : _b, doc = _a.doc, onJumpToDest = _a.onJumpToDest;
    var jumpToDest = function (dest) {
        getDestination(doc, dest).then(function (target) {
            var pageIndex = target.pageIndex, bottomOffset = target.bottomOffset, scaleTo = target.scaleTo;
            onJumpToDest(pageIndex + 1, bottomOffset, scaleTo);
        });
    };
    return (React__default.createElement("ul", { className: 'rpv-bookmark-list' }, bookmarks.map(function (bookmark, index) {
        return (React__default.createElement("li", { key: index },
            React__default.createElement(BookmarkItem, { bookmark: bookmark, depth: depth, doc: doc, onClick: jumpToDest, onJumpToDest: onJumpToDest })));
    })));
};

var BookmarkLoader = function (_a) {
    var doc = _a.doc, onJumpToDest = _a.onJumpToDest;
    var l10n = React.useContext(core.LocalizationContext);
    var _b = React.useState({
        isLoaded: false,
        items: [],
    }), bookmarks = _b[0], setBookmarks = _b[1];
    React.useEffect(function () {
        setBookmarks({
            isLoaded: false,
            items: [],
        });
        doc.getOutline().then(function (outline) {
            setBookmarks({
                isLoaded: true,
                items: outline || [],
            });
        });
    }, [doc]);
    return (!bookmarks.isLoaded
        ? React__default.createElement(core.Spinner, null)
        : (bookmarks.items.length === 0
            ? React__default.createElement("div", { className: 'rpv-bookmark-empty' }, l10n && l10n.plugins && l10n.plugins.bookmark ? l10n.plugins.bookmark.noBookmark : 'There is no bookmark')
            : (React__default.createElement(BookmarkList, { bookmarks: bookmarks.items, depth: 0, doc: doc, onJumpToDest: onJumpToDest }))));
};

var BookmarkListWithStore = function (_a) {
    var store = _a.store;
    var _b = React.useState(store.get('doc')), currentDoc = _b[0], setCurrentDoc = _b[1];
    var handleDocumentChanged = function (doc) {
        setCurrentDoc(doc);
    };
    var jump = function (pageIndex, bottomOffset, scaleTo) {
        var jumpToDestination = store.get('jumpToDestination');
        if (jumpToDestination) {
            jumpToDestination(pageIndex, bottomOffset, scaleTo);
        }
    };
    React.useEffect(function () {
        store.subscribe('doc', handleDocumentChanged);
        return function () {
            store.unsubscribe('doc', handleDocumentChanged);
        };
    }, []);
    return (currentDoc
        ? (React__default.createElement(BookmarkLoader, { doc: currentDoc, onJumpToDest: jump }))
        : React__default.createElement("div", { className: 'rpv-bookmark-list-loader' },
            React__default.createElement(core.Spinner, null)));
};

var bookmarkPlugin = function () {
    var store = core.createStore({});
    var BookmarksDecorator = function () { return (React__default.createElement(BookmarkListWithStore, { store: store })); };
    return {
        install: function (pluginFunctions) {
            store.update('jumpToDestination', pluginFunctions.jumpToDestination);
        },
        onDocumentLoad: function (props) {
            store.update('doc', props.doc);
        },
        Bookmarks: BookmarksDecorator,
    };
};

exports.default = bookmarkPlugin;
