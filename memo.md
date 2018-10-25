## 参考
### esModuleInterop について
- [TypeScriptの`--esModuleInterop`は一体何をやっているのか - stone's throw](http://osamtimizer.hatenablog.com/entry/2018/06/28/122502)

### tsconfig.json について
- tsc --init で作るとコメント付きのテンプレート tsconfig.json が出力される
なお、バージョンに応じた tsconfig.json が生成されるので、tsc のバージョンが最新かを確認すること

### parcel-plugin-sw-precache について
- sw-precache を parcel に対応させるラッパー
[cyyyu/parcel-plugin-sw-precache: A Parcel plugin for generating a service worker that precaches resources.](https://github.com/cyyyu/parcel-plugin-sw-precache)
- sw-precache については以下
[GoogleChromeLabs/sw-precache: A node module to generate service worker code that will precache specific resources so they work offline.](https://github.com/GoogleChromeLabs/sw-precache)
- 効果
  - dist 以下に service-worker.js が追加される
  - リソース毎にハッシュがふられ、イベントハンドラが登録される
  - ローカルキャッシュ優先で動作する
```service-worker.js
"use strict";
var precacheConfig=[
  ["/index.html","565c3cf72c71e215e8b68284094f95d0"],
  ["/service-worker.js","e99adfde9146ac0afa8970e05468899c"],
  ["/src.fdbaefc1.js","85b3f01fcea9f4e24e771fc89d36ecda"]
],
...
self.addEventListener("install",function(e){...}),
self.addEventListener("activate",function(e){...}),
self.addEventListener("fetch",function(e){...});
```

### Service Worker について
- [Service Workerの基本とそれを使ってできること - Qiita](https://qiita.com/y_fujieda/items/f9e765ac9d89ba241154)

### parcel で PWA について
- [ParcelでPWA化する最速の方法 - Qiita](https://qiita.com/sKawashima/items/51682b9dad8bdc5bb17f)

### flex 指定について
- [CSSフレックスボックス(display:flex)の使い方 [無料ホームページ作成クラウドサービス　まめわざ]](https://mamewaza.com/support/blog/howto-use-flex.html)

### View Port 単位について
- [レスポンシブに便利なCSSのvh/vw/vmin/vmaxの基本と使い方とは - WPJ](https://www.webprofessional.jp/css-viewport-units-quick-start/)

### その他
- [JavaScriptで中規模開発を行うためにTypeScript3（とYarn, DefinitelyTyped, Jest, CircleCI）を導入する](https://qiita.com/yousan/items/9668c7ebbc8514d4d9cb)
