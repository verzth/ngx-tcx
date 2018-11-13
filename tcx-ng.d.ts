export declare class TCX {
    constructor(o:any);
    init(o:any);
    getAppID():string;
    getAppPass(o:object):string;
    getToken(o:object):string;
    getRefreshToken(o:object):string;
    clearToken();
    getMasterToken():string;
    getTime():string;
    appendTime(o:object):object;
}
