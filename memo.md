## 参考

### esModuleInterop について

- [TypeScript の`--esModuleInterop`は一体何をやっているのか - stone's throw](http://osamtimizer.hatenablog.com/entry/2018/06/28/122502)

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

- 一次情報、公式
  - [サービスワーカー API - Web API インターフェイス | MDN](https://developer.mozilla.org/ja/docs/Web/API/ServiceWorker_API)
  - [Service Worker の紹介  |  Web  |  Google Developers](https://developers.google.com/web/fundamentals/primers/service-workers/)
- その他
  - [Service Worker の基本とそれを使ってできること - Qiita](https://qiita.com/y_fujieda/items/f9e765ac9d89ba241154)

### parcel で PWA について

- [Parcel で PWA 化する最速の方法 - Qiita](https://qiita.com/sKawashima/items/51682b9dad8bdc5bb17f)

### flex 指定について

- 一次情報、公式
  [CSS Flexible Box Layout Module Level 1](https://www.w3.org/TR/css-flexbox-1/)
- その他
  - [CSS フレックスボックス(display:flex)の使い方 [無料ホームページ作成クラウドサービス　まめわざ]](https://mamewaza.com/support/blog/howto-use-flex.html)

### View Port 単位について

- 一次情報、公式
  [CSS Values and Units Module Level 3](https://www.w3.org/TR/css3-values/#viewport-relative-lengths)
- その他
  - [レスポンシブに便利な CSS の vh/vw/vmin/vmax の基本と使い方とは - WPJ](https://www.webprofessional.jp/css-viewport-units-quick-start/)

### remark について

- 一次情報、公式
  - [gnab/remark: A simple, in-browser, markdown-driven slideshow tool.](https://github.com/gnab/remark)
  - [remark-html-katex - npm](https://www.npmjs.com/package/remark-html-katex)
  - [remarkjs/remark-highlight.js: Highlight code blocks in Markdown files with highlight.js.](https://github.com/remarkjs/remark-highlight.js)
  - [remarkjs/remark-breaks: Breaks support, without needing spaces, for remark](https://github.com/remarkjs/remark-breaks)
- その他
  - katex は、$$ で囲んだ中に所定の書き方をすると、数式に変換されて出力される

### Worker について

- 一次情報、公式
  - [Web Workers API - Web API インターフェイス | MDN](https://developer.mozilla.org/ja/docs/Web/API/Web_Workers_API)
  - [Worker() - Web API インターフェイス | MDN](https://developer.mozilla.org/ja/docs/Web/API/Worker/Worker)
- その他
  Qiita などで WebWorker で検索

### Comlink について

- 一次情報、公式
  [GoogleChromeLabs/comlink: Comlink makes WebWorkers enjoyable.](https://github.com/GoogleChromeLabs/comlink)
- その他
  Qiita などで Comlink で検索

### requestAnimationFrame について

- 一次情報、公式
  [window.requestAnimationFrame - Web API インターフェイス | MDN](https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame)
- その他
  - いろいろなサイトで言われているのは、要は更新タイミングをブラウザに委ねるメソッドであるという点
  - setInterval/setTimeout と違い、自動的にブラウザの描画タイミングに最適化してくれるメソッドらしい

### compositionstart/compositionend について

- 一次情報、公式
  - [compositionstart - Web 技術のリファレンス | MDN](https://developer.mozilla.org/ja/docs/Web/Reference/Events/compositionstart)
  - [compositionend - Web 技術のリファレンス | MDN](https://developer.mozilla.org/ja/docs/Web/Reference/Events/compositionend)

### Dexie について

- 一次情報、公式
  - [Dexie.js - Minimalistic IndexedDB Wrapper](http://dexie.org/)
  - [IndexedDB - Web API インターフェイス | MDN](https://developer.mozilla.org/ja/docs/Web/API/IndexedDB_API)

### webkit-scrollbar について

- 一次情報、公式
  - [::-webkit-scrollbar - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/::-webkit-scrollbar)
- その他
  - 要は Chrome など Webkit 派生のブラウザでスクロールバーに CSS デザインを充てる機能

### katex について

- 一次情報、公式
  - [Khan/KaTeX: Fast math typesetting for the web.](https://github.com/Khan/KaTeX)

### @font-face について

- 一次情報、公式
  - [@font-face - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/@font-face)
- その他
  - 要は、Web やローカルにあるフォントを使って独自フォントを定義する CSS3 の機能
  - [Webにもプログラミングフォントを使おう - Qiita](https://qiita.com/RinoTsuka/items/4a4f78a41f598e0117e6)

### font-family, monospace について
- その他
  - [CSSでフォントの種類とサイズを指定する方法 | サービス | プロエンジニア](http://proengineer.internous.co.jp/content/columnfeature/3834)
  - monospace は総称ファミリー名と呼ばれるもので、特定のフォントを表すものではない(他に sans-serif, serif, cursive, fantasy がある)
    - 指定のフォント全てがブラウザで利用できない場合の選択肢、なので一番最後に書くことが推奨されている
    - 実行環境に応じて自動で選ばれる(例えば、Win 8.1、Win 10, Mac で異なるフォントが選ばれる)
    - 指定の際、ダブルクォーテーションで括らない
  - unicode-range については以下
    - [Unicode一覧 0000-0FFF - Wikipedia](https://ja.wikipedia.org/wiki/Unicode%E4%B8%80%E8%A6%A7_0000-0FFF)

### カラーネームについて
- その他
  - [カラーネーム140色－WEBカラーリファレンス](http://www.htmq.com/color/colorname.shtml)

### prettier での整形について
- 一次情報、公式
  - [Browser · Prettier](https://prettier.io/docs/en/browser.html)
- その他
  - 通常は開発時にコマンドラインで使用するが、今回は API を使って入力されたマークダウンの整形に使用

### prettier と tslint について
- 一次情報、公式
  - [alexjoverm/tslint-config-prettier: Use tslint with prettier without any conflict](https://github.com/alexjoverm/tslint-config-prettier)
  - [tslint/latest.ts at master · palantir/tslint](https://github.com/palantir/tslint/blob/master/src/configs/latest.ts)
  node_modules/tslint/lib/configs/latest.js
  latest や recommended の指定が : 区切りなのは、js だからか。
  - [palantir/tslint-react: Lint rules related to React & JSX for TSLint.](https://github.com/palantir/tslint-react)
  node_modules/tslint-react/tslint-react.json
- その他
  - [TypeScriptプロジェクトにコードフォーマッタPrettierを導入する - Qiita](https://qiita.com/akisx/items/4b90106c7faca4965852#fnref1)

### Dynamic import について
- 一次情報、公式
  - [tc39/proposal-dynamic-import: import() proposal for JavaScript](https://github.com/tc39/proposal-dynamic-import)
- その他
  - 要は、import をファイル先頭に書かず必要に応じて使える、また、Promise.all で並列化できるらしい
  - [TypeScript 2.4: Dynamic import() Expressions | Marius Schulz](https://blog.mariusschulz.com/2018/01/14/typescript-2-4-dynamic-import-expressions)
  - [Dynamic import()  |  Web  |  Google Developers](https://developers.google.com/web/updates/2017/11/dynamic-import)
  - [TypeScript 2.4 · TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-4.html)
  実は 2.4 から使えたらしいが、知らなかった。。。
  - [Chrome、Safariで使えるJavaScriptのdynamic import（動的読み込み） - Qiita](https://qiita.com/tonkotsuboy_com/items/f672de5fdd402be6f065)

### Uncontrolled なコンポーネントについて

- 契機
  - textarea の defaultValue に紐付く state を componentDidMount で更新しても、意図した値が画面表示されない原因を調査してたことから
  - 結果としては、textarea が Uncontrolled である(＝value に state が紐付けられていない)ため、componentDidMount で state の raw を更新しても re-render がかからず、initialText が表示されないということだった(Devtools でみると textarea タグの子要素として保持はされている)。
  - なお、componentDidMount で他の Controlled なステートも更新すれば、それに反応する re-render に巻き込まれる形で initialText が表示されるようになる
- 一次情報、公式
  - [Uncontrolled Components – React](https://reactjs.org/docs/uncontrolled-components.html)
  → value に state を紐付けないで、ref を使用して 生 DOM の値を操作する。
  なお、defaultValue は Uncontrolled のまま(最初の 1 回だけ) React から値をセットしたい場合に使用する用途のプロパティ
- その他
  - [javascript - ReactJS component not rendering textarea with state variable - Stack Overflow](https://stackoverflow.com/questions/30730369/reactjs-component-not-rendering-textarea-with-state-variable)
  - [Reactのuncontrolled input warningで困った時に確認するべきたった1つのこと | I am mitsuruog](https://blog.mitsuruog.info/2017/09/react-uncontrolled-input)
    → そもそも value と state が紐付けられていない場合はもちろん、紐付いている state 値が null/undefined になっても Uncontrolled になる

### dangerouslySetInnerHTML について

- 一次情報、公式
  - [DOM Elements – React](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- その他
  - 要は React 内で innerHTML する際に使用する構文
  - 適宜サニタイズして使用しろとのこと(今回は自分のデータなので不要)



### その他

- [JavaScript で中規模開発を行うために TypeScript3（と Yarn, DefinitelyTyped, Jest, CircleCI）を導入する](https://qiita.com/yousan/items/9668c7ebbc8514d4d9cb)

## 既知の問題、トラブルシューティング

### ターミナルで Ctrl + C してもサーバーが停止しない場合がある

再現性不明

### ブラウザのコンソールに以下のエラー

```
WebSocket connection to ws://localhost:[指定していないポート番号] failed: Error in connection establishment
```

- サーバーを止めた状態でローカルで F5 更新すると発生する。
- 一度でも発生したら以降はずっとエラーが出続ける(サーバーを起動したとしても)

### parcel が自動更新しても、ブラウザ側のキャッシュのせいか F5 更新で反映されないことがある

- スーパーリロード(Ctrl + F5)で更新される

### index.ts の import @babel/polyfill について

- tsconfig の target:es2017 の指定によらず出力が es5 になっている(変換後のコードで var が使われている)
  - よくわからんが、parcel が絡んだところだけ？es5 で、markdownWorker は const 宣言なので tsconfig 効いているっぽい
- 以下の現象が近いが、extends 使ってないので分からない。
  [Parcel で TypeScript を扱ったら ES5 になってしまうとき - Qiita](https://qiita.com/Hoishin/items/d4d76d478f46e42f423b)
- このため、変換後のコードに regenerateRuntime というコードが生成される
  - これが解釈できないのでエラーになる。
  - regenerateRuntime を補完するのが @babel/polyfill
- とはいえ、parcel がちゃんとしてくれればこの import は不要になる。
  - 以前 webpack で開発していた時は、target:es2015 にしてガンガン async コード書いていたが、この polifill 使った覚えはない
- そもそも、以下にあるように parcel はデフォルトで babel 使って es5 にするものらしい。
  [Javascript](https://parceljs.org/javascript.html)
  - no config でビルドできるということは、つまりそういう最大公約数てきなデフォルト動作ということ
  - 同様の疑問はたびたびあがってるみたい
    [Parcel does not respect tsconfig.json · Issue #1877 · parcel-bundler/parcel](https://github.com/parcel-bundler/parcel/issues/1877)

### ブラウザのコンソールに以下のエラー

```
Uncaught (in promise) Error: TypeError: Cannot read property 'apply' of undefined
TypeError: Cannot read property 'apply' of undefined
    at MessagePort.<anonymous> (markdownWorker.1af8da4e.js:194)
    at MessagePort.<anonymous> (markdownWorker.1af8da4e.js:194)
    at Object.deserialize (comlink.js:32)
    at unwrapValue (comlink.js:147)
    at cbProxy (comlink.js:52)
```

compiler.comppile になっていた orz
any 型にしていたので発見が遅れたのと、このエラーメッセージからそれが原因ということを想像しにくかった
