# tcx-js
[Angular](https://angular.io/) Library for [TCX Authentication Module](https://github.com/verzth/tcx), it use in client side to help make auth simpler.

It's standalone library (not include [TCX JS](https://github.com/verzth/tcx-js))

### Dependencies
- [crypto-js](https://www.npmjs.com/package/crypto-js)
- [jquery](https://jquery.com/)
- [moment](http://momentjs.com)

### Installation
NPM
```
npm i verzth-tcx-js-angular
```
or
```
npm i --save verzth-tcx-js-angular
```

### How to Use:
1. Use **TCX** in your providers and inject it in your related component constructor.
   ```
   .....
   import {TCX} from 'verzth-tcx-js-angular/tcx-ng';
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
   ```
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

   - getAppID() : string
   - getAppPass(object: Object) : string
   - getToken(callback)
   - getRefreshToken(callback)
   - clearToken()
   - getMasterToken() : string
   - getTime() : string // return tcx_datetime value, but you need to assign it to your parameter (assign it before call getAppPass!).
   - appendTime(object: Object) : object // return your parameter with tcx_datetime injected (assign it before call getAppPass!).

Note: This module not handle your http request, it just help you create the credentials.

TCX JS also provide Javascript Library, available in this repository [TCX JS](https://github.com/verzth/tcx-js)
