# export-text-from-psd

photoshop用スクリプト

文字レイヤーのテキストをテキストファイルとして出力します。
その際に以下の文字は実体参照に変換して出力します。

```
& => &amp;
< => &lt;
> => &gt;
" => &quot;
' => &apos;
® => &reg;
© => &copy;
```
