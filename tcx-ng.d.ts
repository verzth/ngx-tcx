import {Observable} from "rxjs";

export declare class TCX {
    constructor(o:any);
    static random(): string;
    static getTime(): string;
    init(o:any);
    getCookie():object;
    setCookie(o:object);
    getAppID():string;
    getAppPass(o:object):string;
    getToken(): Observable<any>;
    getRefreshToken(): Observable<any>;
    clearToken();
    getMasterToken():string;
    getTime():string;
    appendTime(o:object):object;
}

export declare interface TCXOption {
    
}
