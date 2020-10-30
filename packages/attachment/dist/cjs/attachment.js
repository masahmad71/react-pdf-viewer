'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var core = require('@react-pdf-viewer/core');

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

var AttachmentList = function (_a) {
    var files = _a.files;
    var l10n = React.useContext(core.LocalizationContext);
    var renderItem = function (file) {
        var onClick = function () { return downloadFile(file.fileName, file.data); };
        return (React__default.createElement("li", { className: 'rpv-attachment-item', key: "attachment-" + file.fileName, title: (l10n && l10n.plugins && l10n.plugins.attachment
                ? l10n.plugins.attachment.clickToDownload
                : 'Click to download'), onClick: onClick }, file.fileName));
    };
    return (files.length === 0
        ? React__default.createElement("div", { className: 'rpv-attachment-list-empty' }, l10n && l10n.plugins && l10n.plugins.attachment
            ? l10n.plugins.attachment.noAttachment
            : 'There is no attachment')
        : (React__default.createElement("ul", { className: 'rpv-attachment-list' }, files.map(renderItem))));
};

var AttachmentLoader = function (_a) {
    var doc = _a.doc;
    var _b = React.useState({
        files: [],
        isLoaded: false,
    }), attachments = _b[0], setAttachments = _b[1];
    React.useEffect(function () {
        doc.getAttachments().then(function (response) {
            var files = response
                ? Object.keys(response).map(function (file) {
                    return {
                        data: response[file].content,
                        fileName: response[file].filename,
                    };
                })
                : [];
            setAttachments({
                files: files,
                isLoaded: true,
            });
        });
    }, [doc]);
    return (!attachments.isLoaded
        ? React__default.createElement(core.Spinner, null)
        : React__default.createElement(AttachmentList, { files: attachments.files }));
};

var AttachmentListWithStore = function (_a) {
    var store = _a.store;
    var _b = React.useState(store.get('doc')), currentDoc = _b[0], setCurrentDoc = _b[1];
    var handleDocumentChanged = function (doc) {
        setCurrentDoc(doc);
    };
    React.useEffect(function () {
        store.subscribe('doc', handleDocumentChanged);
        return function () {
            store.unsubscribe('doc', handleDocumentChanged);
        };
    }, []);
    return (currentDoc
        ? React__default.createElement(AttachmentLoader, { doc: currentDoc })
        : React__default.createElement("div", { className: 'rpv-attachment-list-loader' },
            React__default.createElement(core.Spinner, null)));
};

var attachmentPlugin = function () {
    var store = core.createStore({});
    var AttachmentsDecorator = function () { return (React__default.createElement(AttachmentListWithStore, { store: store })); };
    return {
        onDocumentLoad: function (props) {
            store.update('doc', props.doc);
        },
        Attachments: AttachmentsDecorator,
    };
};

exports.default = attachmentPlugin;
