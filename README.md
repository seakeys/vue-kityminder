# vue-kityminder

## use

`npm install vue-kityminder --save`

## main.js
```js
import vueKityminder from 'vue-kityminder'

import 'vue-kityminder/dist/static/kityminder.min.css'

Vue.use(vueKityminder);
```
## **.vue

`<KityMinder :importDate='[{ "data": { "text": "测试1", "id": 1 }, "children": []}]' />`
