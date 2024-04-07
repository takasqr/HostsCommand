# hosts コマンド

hosts コマンドはクロスプラットフォームで統一的な hosts を管理するインターフェースを提供することを目指して作られました。

Node.js の`Single executable applications`を使用して作られています。

__⚠️注意⚠️__

Node.js の`Single executable applications`は実験的機能という位置付けで本番環境での使用を推奨していません。したがって本プロジェクトも本番環境での使用を推奨しません。


## ビルド方法

現在 Linex で使用することができます。

### Docker の Remote Container　で開く

Docker をインストールしているが必要があります。

### Generate the blob to be injected

```bash
node --experimental-sea-config sea-config.json 
```

### Create a copy of the node executable and name it according to your needs

```bash
cp $(command -v node) hosts 
```

### Inject the blob into the copied binary by running postject with the following options

```bash
npx postject hosts NODE_SEA_BLOB sea-prep.blob \
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 
```