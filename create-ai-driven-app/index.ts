#!/usr/bin/env node

import { Command } from 'commander'
import * as fs from 'fs-extra'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import * as inquirer from 'inquirer'
import * as glob from 'glob'

// ESM対応
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const program = new Command()

program
  .name('create-ai-driven-app')
  .description('AIドリブンアプリケーション開発テンプレートを展開します')
  .version('1.0.0')

program
  .option('-pm, --package-manager <packageManager>', 'パッケージマネージャーを指定（npm, yarn, pnpm）', 'npm')
  .option('-sc, --start-command <startCommand>', '起動コマンドを指定', 'dev')
  .option('-tc, --test-command <testCommand>', 'テストコマンドを指定', 'test')

program.parse()

const options = program.opts()

async function promptOptions() {
  const answers = await inquirer.default.prompt([
    {
      type: 'list',
      name: 'packageManager',
      message: 'パッケージマネージャーを選択してください：',
      choices: ['npm', 'yarn', 'pnpm'],
      default: options.packageManager,
      when: !options.packageManager
    },
    {
      type: 'input',
      name: 'startCommand',
      message: '起動コマンドを入力してください：',
      default: options.startCommand,
      when: !options.startCommand
    },
    {
      type: 'input',
      name: 'testCommand',
      message: 'テストコマンドを入力してください：',
      default: options.testCommand,
      when: !options.testCommand
    }
  ])

  return { ...options, ...answers }
}

async function main() {
  const config = await promptOptions()
  const templateDir = path.join(__dirname, 'template')
  const targetDir = process.cwd()

  console.log('テンプレートを展開しています...')

  // テンプレートファイルを取得
  const files = glob.sync('**/*', { 
    cwd: templateDir, 
    dot: true,
    nodir: true
  })

  // 各ファイルをコピー
  for (const file of files) {
    const srcPath = path.join(templateDir, file)
    const destPath = path.join(targetDir, file)
    
    // ディレクトリの作成
    const destDir = path.dirname(destPath)
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true })
    }
    
    // ファイル内容の読み込みと変数の置換
    let content = fs.readFileSync(srcPath, 'utf8')
    
    // 変数の置換
    content = content
      .replace(/\{\{package_manager\}\}/g, config.packageManager)
      .replace(/\{\{start_command\}\}/g, config.startCommand)
      .replace(/\{\{test_command\}\}/g, config.testCommand)
    
    // ファイルの書き込み
    fs.writeFileSync(destPath, content)
    console.log(`生成: ${destPath}`)
  }

  console.log('\nテンプレートの展開が完了しました！')
  console.log(`パッケージマネージャー: ${config.packageManager}`)
  console.log(`起動コマンド: ${config.startCommand}`)
  console.log(`テストコマンド: ${config.testCommand}`)
}

main().catch(err => {
  console.error('エラーが発生しました:', err)
  process.exit(1)
})