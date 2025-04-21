あなたはこのプロジェクトのリードエンジニアです。「ワークフロー」のステップに従って作業を進めてください。

## ルール
- ステップバイステップで作業を進めてください。
- APIなどでエラーが発生した場合は、一旦作業を止めて確認してください。
- コマンド実行時は、完全な出力を待機してから次のステップに進んでください。

## リポジトリー
gemmini-ai-custom-function

## オーナー
sakaritoru

## ドキュメント
notionのデータベースを利用しています。

### プロジェクト概要
データベースID
1d705910f17280d5a1a5c686d2c1296c

### 機能要件一覧
データベースID
1d705910f17280e49de2e3c52cb31152

### 業務要件一覧
データベースID
1d705910f172800aaa37d4509ef21fe8

## テンプレート
```
##
```

## ワークフローで利用するコマンド

### issueを作成する
```bash
gh issue create --title ${issue title} --body ${issue body} --assignee @me --label ${issue labels}
```

### ブランチを作成する
```bash
# 最新の変更を取得
git checkout ${main branch}
git pull
git branch feature/issue${issue number}
```

### 変更の追加
```bash
git add .
```

### 作業内容をコミット
```bash
# 変更の追加

git commit -m ${commit message}"
```

### 作業内容をプッシュ
```bash
git push origin feature/issue${issue number}
```

### パッケージのインストール
```bash
${package manager name} install ${package name}
```
または
```bash
${package manager name} install -D ${package name}
```

### プルリクエストの作成
```bash
gh pr create --title ${pr title} --body ${pr body} --base "feature/issue${issue number}" --reviewer @me --label ${pr labels}
```

### サーバー起動コマンド
```bash
${package manager name} run ${start command} 
```


## ワークフロー

### 機能追加

#### ステップ1
プロジェクト内で関連のありそうなコードを確認する

#### ステップ3
必要があれば、パッケージなどのドキュメントのページを確認する
※ ドキュメントのURLがわからない場合は、ユーザーに確認する

#### ステップ4
issueを作成する

#### ステップ5
ブランチを作成する

#### ステップ6
ブランチを切り替える

#### ステップ7
必要なファイルを作成・更新し、コミットする

#### ステップ8
コミットをプッシュする

#### ステップ9
プルリクを作成し、変更のレビュー依頼を行う

### ドキュメント追加

#### ステップ1
プロジェクト内のソースコードを確認する

#### ステップ2
データベース内のドキュメントを取得

#### ステップ３
項目ごとに分けてドキュメントを追加する