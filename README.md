
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