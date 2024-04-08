// console.log(`Hello, ${process.argv[2]}!`);

const fs = require('fs');
const os = require('os');
const path = require('path');

// UNIX系システムとWindowsのhostsファイルのパスを定義
const HOSTS_FILE_PATHS = {
  'Linux': '/etc/hosts',
  'Darwin': '/etc/hosts',
  'Windows_NT': 'C:\\Windows\\System32\\drivers\\etc\\hosts'
};

// 現在のプラットフォームに応じたhostsファイルのパスを取得
const hostsFilePath = HOSTS_FILE_PATHS[os.type()];

if (!hostsFilePath) {
  console.error('このプラットフォームはサポートされていません。');
  process.exit(1);
}

// 引数を解析する
const args = process.argv.slice(2);

// ヘルプメッセージ
const showHelp = () => {
  console.log(`使用方法:
  node list-hosts.js [オプション]

オプション:
  --add <IP> <ホスト名>     新しいホストエントリを追加
  --remove <ホスト名>       指定したホストエントリを削除
  --help                    このヘルプメッセージを表示`);
};

// ホストエントリを削除する関数
const removeEntry = (hostname) => {
  fs.readFile(hostsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('hostsファイルの読み込み中にエラーが発生しました:', err);
      process.exit(1);
    }

    const lines = data.split(os.EOL);
    const filteredLines = lines.filter(line => !line.includes(hostname));

    fs.writeFile(hostsFilePath, filteredLines.join(os.EOL), (err) => {
      if (err) {
        console.error('hostsファイルの更新中にエラーが発生しました:', err);
        process.exit(1);
      }
      console.log(`ホストエントリが削除されました: ${hostname}`);
    });
  });
};


if (args.length === 0) {
  // hostsファイルを読み込む
  fs.readFile(hostsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('hostsファイルの読み込み中にエラーが発生しました:', err);
      process.exit(1);
    }

    // ファイルの内容を行ごとに分割
    const lines = data.split(os.EOL);

    // コメントと空行を除外して出力
    lines.forEach((line) => {
      if (line && !line.startsWith('#')) {
        console.log(line);
      }
    });
  });
} else if (args.includes('--help')) {
  showHelp();
} else if (args[0] === '--add' && args.length === 3) {
  const newEntry = `${args[1]} ${args[2]}\n`;
  fs.appendFile(hostsFilePath, newEntry, (err) => {
    if (err) {
      console.error('ホストエントリの追加中にエラーが発生しました:', err);
      process.exit(1);
    }
    console.log(`ホストエントリが追加されました: ${newEntry}`);
  });
} else if (args[0] === '--remove' && args.length === 2) {
  removeEntry(args[1]);
} else {
  showHelp()
}