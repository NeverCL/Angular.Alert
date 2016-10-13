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
                    func: '&'
                },
                link: alertLink
            };

            function alertLink(scope, ele, attr) {
                ele.click(function () {
                    clickFn(scope, attr);
                });
            }

            function clickFn(scope, attr) {
                var opt = attr;
                opt.success = scope.func;
                scope.alert = new Alert(opt);
                scope.alert.show();
                return false;
            }
        }]);

    function Alert(opt) {
        this.opt = opt;
        this.$modal = {};
        this.init();
    }

    Alert.prototype = {
        defaults: {
            msg: '确认删除?',
            url: '',
            successFn: null,
            doneFn: function () {
                modal.modal('hide');
                $('.btn-default:contains("查询")').click();
            }
        },
        init: function () {
            var opt = $.extend(this.defaults, this.opt);
            var modal = $('<div class="modal fade" style="margin-top: 10%;"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-body">' + opt.msg + '</div><div class="modal-footer"><a data-dismiss="modal" class="btn btn-default btn-sm">取消</a><button class="btn btn-primary btn-sm">确认</button></div></div></div></div>');
            modal.appendTo($('body'));
            this.$modal = modal;
        },
        show: function () {
            var modal = this.$modal;
            modal.modal({
                backdrop: 'static',
                show: true,
                keyboard: false
            });

            var that = this;
            modal.find('.btn-primary:contains("确认")').on('click', function () {
                if (that.successFn)
                    that.successFn();
                else {
                    var url = that.defaults.url;
                    $.get(url).complete(that.doneFn);
                }
            });
            modal.on('hidden.bs.modal', function () { this.remove(); });
        }
    };

}));