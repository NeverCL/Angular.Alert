/*!
 * angular-alert v1.0
 * 
 * Author: Never、C
 * Copyright: 2016, Never、C, neverc.cn
 *
 * https://github.com/NeverCL/Angular.Alert
 */
(function (root, factory) {
    if (typeof root.define === 'function' && root.define.amd) {
        root.define(['angular'], factory);
    } else factory();
}(window, function () {
    'use strict';
    angular.module('bs.alert', [])
        .constant('alertCfg', {
            title: '',
            msg: '确认删除?',
            buttons: [{ text: '确认' }, { text: '取消' }]
        })
        .directive('alert', ['alertCfg', function (cfg) {
            return {
                scope: {
                    click: '&'
                },
                template: '<div class="modal fade">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                    '<h4 class="modal-title">Modal title</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<p>One fine body&hellip;</p>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
                    '<button type="button" class="btn btn-primary">Save changes</button>' +
                    '</div>' +
                    '</div><!-- /.modal-content -->' +
                    '</div><!-- /.modal-dialog -->' +
                    '</div><!-- /.modal -->',
                link: alertLink
            };
            function alertLink(scope, ele, attr) {

            }
        }]);
}));