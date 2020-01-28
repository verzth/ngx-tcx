[![Release](https://img.shields.io/npm/v/@verzth/ngx-tcx.svg)](https://www.npmjs.com/package/@verzth/ngx-tcx)
[![Release](https://img.shields.io/github/v/release/verzth/ngx-tcx)](https://github.com/verzth/ngx-tcx)
# NGX-TCX
[Angular](https://angular.io/) Library for [TCX Authentication Module](https://github.com/verzth/tcx), it use in client side to help make auth simpler.

It's standalone library (not include [TCX JS](https://github.com/verzth/tcx-js))

### Dependencies
- [crypto-js](https://www.npmjs.com/package/crypto-js)
- [moment](http://momentjs.com)

### Installation
NPM
```bash
npm i @verzth/ngx-tcx
```
or
```bash
npm i --save @verzth/ngx-tcx
```

Yarn
```bash
yarn add @verzth/ngx-tcx
```

### How to Use:
1. Use **TCX** in your providers and inject it in your related component constructor.
   ```typescript jsx
   .....
   import {TCX} from 'ngx-tcx';
   .....

   @Component(
    {
        ...
        providers: [
            TCX
        ]
        ...
    }
   )
   export class YourComponent{
   ...
    constructor(tcx: TCX) {}
   .....
   ```

2. Initialize tcx service with params, it will use default value if you don't provide params.
   ```typescript jsx
       ...
       constructor(tcx: TCX) {
        tcx.init({
         url : '',
         app_id : '',
         secret_key : '',
         public_key : '',
         auth : 'param', // available param, time and none.
         master_key : ''
        });
       }
       ...
   ```
3. Available function:

   - getAuth(): string
   - getAppID(): string
   - getAppPass(params: any): string
   - getToken(): Observable<any>
   - getRefreshToken(): Observable<any>
   - clearToken()
   - getMasterToken(): string
   - getTime(): string // return tcx_datetime value, but you need to assign it to your parameter (assign it before call getAppPass!).
   - appendTime(params: any): params // return your parameter with tcx_datetime injected (assign it before call getAppPass!).

Note: You need to intercept the http request using HttpInterceptor, don't forget to skip **/tcx/authorize** and **/tcx/reauthorize** (url) to prevent infinity loop intercept.

TCX JS also provide Javascript Library, available in this repository [TCX JS](https://github.com/verzth/tcx-js)
