﻿'use strict';
var app = angular.module('SwastikaPortal', ['ngRoute', 'components', 'ngFileUpload', 'LocalStorageModule',
    'bw.paging', 'dndLists', 'ngSanitize']);

var modules = angular.module('components', []);

var serviceBase = "/";


app.run(['$rootScope', '$location', 'commonServices', 'authService', function ($rootScope, $location, commonServices, authService) {
    authService.fillAuthData();
    commonServices.fillSettings().then(function (response) {
        $rootScope.settings = response;
        commonServices.fillTranslator(response.lang).then(function (response) {
            $rootScope.translator = response;
        });
    });

    $rootScope.currentContext = $rootScope;
    $rootScope.errors = [];

    $rootScope.message = {
        title: 'test',
        content: '',
        errors: [],
        okFuncName: null,
        okArgs: [],
        cancelFuncName: null,
        cancelArgs: [],
        lblOK: 'OK',
        lblCancel: 'Cancel',
        context: $rootScope
    };

    $rootScope.authentication = authService.authentication;

    $rootScope.swStatus = [
        'Deleted',
        'Preview',
        'Published',
        'Draft',
        'Schedule'
    ]
    $rootScope.orders = [
        {
            value: 'CreatedDateTime',
            title: 'Created Date'
        }
        ,
        {
            value: 'Priority',
            title: 'Priority'
        },

        {
            value: 'Title',
            title: 'Title'
        }
    ];
    $rootScope.directions = [
        {
            value: '0',
            title: 'Asc'
        },
        {
            value: '1',
            title: 'Desc'
        }
    ]
    $rootScope.pageSizes = [
        '5',
        '10',
        '15',
        '20'
    ]
    $rootScope.request = {
        pageSize: '10',
        pageIndex: 0,
        status: $rootScope.swStatus[1],
        orderBy: 'CreatedDateTime',
        direction: '1',
        fromDate: null,
        toDate: null,
        keyword: ''
    };
    $rootScope.configurations = {
        core: {},
        plugins: {
            btnsDef: {
                // Customizables dropdowns
                image: {
                    dropdown: ['insertImage', 'upload', 'base64', 'noembed'],
                    ico: 'insertImage'
                }
            },
            btns: [
                ['viewHTML'],
                ['undo', 'redo'],
                ['formatting'],
                ['strong', 'em', 'del', 'underline'],
                ['link'],
                ['image'],
                ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                ['unorderedList', 'orderedList'],
                ['foreColor', 'backColor'],
                ['preformatted'],
                ['horizontalRule'],
                ['fullscreen']
            ],
            plugins: {
                // Add imagur parameters to upload plugin
                upload: {
                    serverPath: 'https://api.imgur.com/3/image',
                    fileFieldName: 'image',
                    headers: {
                        'Authorization': 'Client-ID 9e57cb1c4791cea'
                    },
                    urlPropertyName: 'data.link'
                }
            }
        },
        dataTypes: [
            { title: 'string', value: 0 },
            { title: 'int', value: 1 },
            { title: 'image', value: 2 },
            { title: 'codeEditor', value: 4 },
            { title: 'html', value: 5 },
            { title: 'textArea', value: 6 },
            { title: 'boolean', value: 7 },
            { title: 'mdTextArea', value: 8 },
            { title: 'date', value: 9 },
            { title: 'datetime', value: 10 },
        ]
    };
    $rootScope.range = function (max) {
        var input = [];
        for (var i = 1; i <= max; i += 1) input.push(i);
        return input;
    };

    $rootScope.$watch('isBusy', function (newValue, oldValue) {
        if (newValue) {
            $rootScope.message.content = '';
            $rootScope.errors = [];
        }
    });    

    $rootScope.logOut = function () {
        authService.logOut();
        $location.path('/backend/login');
    };
    if (!authService.authentication.isAuth || !authService.authentication.isAdmin) {
        authService.authentication.referredUrl = $location.$$url;
        $location.path('/backend/login');
    }
    $rootScope.updateSettings = function () {
        commonServices.removeSettings();
        commonServices.fillSettings($rootScope.settings.lang).then(function (response) {
            $rootScope.settings = response;

        });
        $rootScope.isBusy = false;
    }

    $rootScope.updateTranslator = function () {
        commonServices.removeTranslator();
        commonServices.fillTranslator($rootScope.settings.lang).then(function () {
            window.top.location = location.href;
        });
        $rootScope.isBusy = false;
    }
    $rootScope.updateConfigs = function () {
        $rootScope.updateSettings();
        $rootScope.updateTranslator();
    }
    $rootScope.executeFunctionByName = async function (functionName, args, context) {
        if (functionName !== null) {
            var namespaces = functionName.split(".");
            var func = namespaces.pop();
            for (var i = 0; i < namespaces.length; i++) {
                context = context[namespaces[i]];
            }
            functionName = null;
            return context[func].apply(this, args);
        }
    };

    $rootScope.showConfirm = function (context, okFuncName, okArgs, cancelFuncName, title, msg
        , cancelArgs, lblOK, lblCancel) {
        $rootScope.confirmMessage = {
            title: title,
            content: msg,
            context: context,
            okFuncName: okFuncName,
            okArgs: okArgs,
            cancelFuncName: cancelFuncName,
            cancelArgs: cancelArgs,
            lblOK: lblOK ? lblOK : 'OK',
            lblCancel: lblCancel ? lblCancel : 'Cancel'
        };
        $('#dlg-confirm-msg').modal('show');
    };
    $rootScope.initEditor = function () {
        setTimeout(function () {
            // Init Code editor
            $.each($('.code-editor'), function (i, e) {
                var container = $(this);
                var editor = ace.edit(e);
                if (container.hasClass('json')) {
                    editor.session.setMode("ace/mode/json");
                }
                else {
                    editor.session.setMode("ace/mode/razor");
                }
                editor.setTheme("ace/theme/chrome");
                //editor.setReadOnly(true);

                editor.session.setUseWrapMode(true);
                editor.setOptions({
                    maxLines: Infinity
                });
                editor.getSession().on('change', function (e) {
                    // e.type, etc
                    $(container).parent().find('.code-content').val(editor.getValue());
                });
            })
            $.each($('.editor-content'), function (i, e) {
                var $demoTextarea = $(e);
                $demoTextarea.trumbowyg($rootScope.configurations.plugins);
            });
        }, 200)
    }

    $rootScope.showErrors = function (errors) {
        $.each(errors, function (i, e) {
            $rootScope.showMessage(e, 'danger');
        });
    }

    //type: success / info / danger / warning - bootstrap 
    $rootScope.showMessage = function (content, type) {
        var from = 'bottom';
        var align = 'right';

        $.notify({
            icon: "now-ui-icons ui-1_bell-53",
            message: content,

        }, {
                type: type,
                timer: 2000,
                placement: {
                    from: from,
                    align: align
                }
            });
    }
}]);
