import {Injectable, Inject} from '@angular/core';
import * as $ from 'jquery';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';

var TCX = (function ($,crypt) {
    var $_COOKIE_NAME = '_tcx_token';
    var defaults = {
        url : '',
        app_id : '',
        secret_key : '',
        public_key : '',
        auth : 'param',
        master_key : ''
    };
    function extendDefaults(source,properties) {
        var property;
        for(property in properties){
            if(properties.hasOwnProperty(property)){
                source[property] = properties[property];
            }
        }
        return source;
    }

    function random(){
        let text = '';
        const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 16; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    function getCookie() {
        var x = document.cookie.split(";");
        var val=false;
        x.forEach(function (y,i) {
            while (y.charAt(0) == " ")y = y.substring(1,y.length);
            var t = y.split("=");
            if($_COOKIE_NAME === t[0]){
                val=t[1];
            }
        });
        if(!val){
            setCookie({});
            val = crypt.AES.encrypt(JSON.stringify({}),crypt.enc.Base64.stringify(crypt.enc.Utf8.parse("tcx-js")));
        }
        return JSON.parse(crypt.AES.decrypt(val,crypt.enc.Base64.stringify(crypt.enc.Utf8.parse("tcx-js"))).toString(crypt.enc.Utf8));
    }
    function setCookie(cookie) {
        var date = new Date();
        date.setFullYear(date.getFullYear()+3);
        document.cookie = $_COOKIE_NAME+"="+crypt.AES.encrypt(JSON.stringify(cookie),crypt.enc.Base64.stringify(crypt.enc.Utf8.parse("tcx-js")))+";expires="+date.toGMTString()+";path=/";
    }

    function TCX() {
        if(arguments[0] && typeof arguments[0] === "object"){
            this.options = extendDefaults(defaults,arguments[0]);
        }else{
            this.options = extendDefaults(defaults,{});
        }
    };

    TCX.prototype.init = function(options){
        this.options = extendDefaults(defaults,options);
    };

    TCX.prototype.getAppID = function () {
        return this.options.app_id;
    };

    TCX.prototype.getAppPass = function (params) {
        var paramText = '', clientKey = random();
        switch (this.options.auth) {
            case 'param':{
                Object.keys(params).sort().forEach(function (i,d) {
                    console.log(i);
                    paramText+=i+'='+d+'&';
                });
                paramText.replace(/^&+|&+$/g, '');
            }break;
            case 'time':{
                paramText+=params.tcx_datetime;
            }break;
        }
        var auth = crypt.enc.Hex.stringify(crypt.SHA1(paramText+this.options.public_key+clientKey));
        auth = crypt.enc.Utf8.parse(auth+':'+clientKey);
        auth = crypt.enc.Base64.stringify(auth);
        return auth;
    };

    TCX.prototype.getToken = function(callback){
        if(getCookie().token===undefined) {
            var cr;
            if(this.options.auth==='time'){
                var time = this.getTime();
                cr = {
                    app_id: this.getAppID(),
                    app_pass: this.getAppPass({tcx_datetime: time}),
                    tcx_datetime: time
                };
            }else{
                cr = {
                    app_id: this.getAppID(),
                    app_pass: this.getAppPass({})
                };
            }
            $.ajax({
                url: this.options.url + '/tcx/authorize',
                type: 'POST',
                data: JSON.stringify(cr),
                dataType: 'json',
                contentType: 'application/json',
                success: function (res) {
                    if (res.status === 1) {
                        setCookie(res.data);
                        callback(res.data.token);
                    }else callback(false);
                },
                error: function () {
                    callback(false);
                }
            });
        }else{
            callback(getCookie().token);
        }
    };
    TCX.prototype.refreshToken = function(callback){
        if(getCookie().token===undefined) {
            this.getToken(callback);
        }else{
            if(getCookie().refresh){
                $.ajax({
                    url: this.options.url + '/tcx/reauthorize',
                    type: 'POST',
                    data: JSON.stringify({
                        app_id: this.getAppID(),
                        token: getCookie().refresh
                    }),
                    contentType: 'application/json',
                    dataType: 'json',
                    success: function (res) {
                        if (res.status === 1) {
                            setCookie(res.data);
                            callback(res.data.token);
                        }else callback(false);
                    },
                    error: function () {
                        callback(false);
                    }
                });
            }else callback(getCookie().token);
        }
    };
    TCX.prototype.clearToken = function(){
        setCookie({});
    };

    TCX.prototype.getMasterToken = function(){
        var token = crypt.enc.Utf8.parse(this.options.master_key);
        return crypt.enc.Base64.stringify(token);
    };

    TCX.prototype.getTime = function () {
        return moment().format('YYYYMMDDHHmmss');
    };

    TCX.prototype.appendTime = function (params) {
        params['tcx_datetime'] = this.getTime();
        return params;
    };

    return TCX;
}(jQuery, CryptoJS));

export {TCX};

TCX.decorators = [
    { type: Injectable },
];
