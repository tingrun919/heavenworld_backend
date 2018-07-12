tinymce.PluginManager.add('imageSelector', function (editor, url) {
    // Add a button that opens a window
    editor.addButton('imageSelector', {
        icon: 'image',
        tooltip: "添加本地图片",
        onclick: function () {
            editor.settings.imageSelectorCallback(function (r) {
                editor.execCommand('mceInsertContent', false, '<img alt="Smiley face" src="' + r + '"/>');
            });
        }
    });

});