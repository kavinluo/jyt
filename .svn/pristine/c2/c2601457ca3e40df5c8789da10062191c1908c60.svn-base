// 第一，特殊符号  菜单 class ，Button 菜单继承 DropListMenu class
import E from 'wangeditor'

const {$,BtnMenu,DropListMenu} = E

class Symbol extends DropListMenu {
  constructor (editor) {
    // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
    const $elem = E.$('<div class="w-e-menu" data-title="符号/字母"><i>Ω</i></div>')
    // 要插入的符号（可自行添加）
    const symbols = ['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩','⒈','⒉','⒊','⒋','⒌','⒍','⒎','⒏','⒐','⒑','⒒','⒓','⒔','⒕','⒖','⒗','⒘','⒙','⒚','⒛',
      '⑴','⑵','⑶','⑷','⑸','⑹','⑺','⑻','⑼','⑽','⑾','⑿','⒀','⒁','⒂','⒃','⒄','⒅','⒆','⒇',
      '㈠','㈡','㈢','㈣','㈤','㈥','㈦','㈧','㈨','㈩','Ⅰ','Ⅱ','Ⅲ','Ⅳ','Ⅴ','Ⅵ','Ⅶ','Ⅷ','Ⅸ','Ⅹ','Ⅺ','Ⅻ','ⅰ','ⅱ','ⅲ','ⅳ','ⅴ','ⅵ','ⅶ','ⅷ','ⅸ','ⅹ',
      'α','β','γ','δ','ε','ζ','η','θ','ι','κ','λ','μ','ν','ξ','ο','π','ρ','σ','π','ρ','σ','τ','υ','φ','χ','ψ','ω']
    let lists = []
    for (let i = 0; i < symbols.length; i++) {
      lists.push({$elem: $('<span style="margin:5px;">' + symbols[i] + '</span>'),value: symbols[i]})
    }
    const dropListConf = {
      width: 370,
      title: '',
      type: 'table',
      list: lists,

      // droplist 每个 item 的点击事件
      clickHandler: (value) => {
        // value 参数即 dropListConf.list 中配置的 value
        console.log(this,value)
        this.command(value)
      }
    }

    super($elem,editor,dropListConf)
  }

  command (value) {
    // 添加符号
    // this.editor.cmd.do('insertHTML', '<span style="font-size: 14px;line-height: 1.5;vertical-align: top">' + value + '</span>', value)
    this.editor.cmd.do('insertHTML',value,value)
  }

  // 菜单是否被激活（如果不需要，这个函数可以空着）
  // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
  // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
  tryChangeActive () {
    // const reg = /^h/i
    // const cmdValue = this.editor.cmd.queryCommandValue('formatBlock')
    // if (reg.test(cmdValue)) {
    //   // 选区处于标题内，激活菜单
    //   this.active()
    // } else {
    //   // 否则，取消激活
    //   this.unActive()
    // }
  }
}

// 第一，菜单 class ，Button 菜单继承 BtnMenu class
class Sub extends BtnMenu {
  constructor (editor) {
    // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
    const $elem = E.$(
      '<div class="w-e-menu" data-title="下标"><i>↓</i></div>'
    )
    super($elem,editor)
  }

  // 菜单点击事件
  clickHandler () {
    // 做任何你想做的事情
    // 可参考【常用 API】文档，来操作编辑器
    let editor = this.editor
    let isSeleEmpty = editor.selection.isSelectionEmpty()
    if (isSeleEmpty) {
      // 选区是空的，插入并选中一个“空白”
      editor.selection.createEmptyRange()
      // 加空格符&ZeroWidthSpace;  防止生成span加样式标签(行末不生成sub标签)  加p标签  防止末尾默认为span标签 字号小
      editor.cmd.do('insertHTML','<p>&ZeroWidthSpace;</p>')
    }else {
      // 加空格符&ZeroWidthSpace;  防止生成span加样式标签(行末不生成sub标签)
      editor.cmd.do('insertHTML','<sub>' + editor.selection.getSelectionText() + '</sub><span style="font-size: 16px">&ZeroWidthSpace;</span>')
    }

    if (isSeleEmpty) {
      // 需要将选取折叠起来
      editor.selection.collapseRange()
      editor.selection.restoreSelection()
    }
  }

  // 菜单是否被激活（如果不需要，这个函数可以空着）
  // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
  // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
  tryChangeActive () {
  }
}

// 第一，菜单 class ，Button 菜单继承 BtnMenu class
class Sup extends BtnMenu {
  constructor (editor) {
    // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
    const $elem = E.$(
      '<div class="w-e-menu" data-title="上标"><i>↑</i></div>'
    )

    super($elem,editor)
  }

  // 菜单点击事件
  clickHandler () {
    // 做任何你想做的事情
    // 可参考【常用 API】文档，来操作编辑器
    let editor = this.editor
    let isSeleEmpty = editor.selection.isSelectionEmpty()
    if (isSeleEmpty) {
      // 选区是空的，插入并选中一个“空白”
      editor.selection.createEmptyRange()
      // 加空格符&ZeroWidthSpace;  防止生成span加样式标签(行末不生成sub标签)  加p标签  防止末尾默认为span标签 字号小
      editor.cmd.do('insertHTML','<p>&ZeroWidthSpace;</p>')
    }else {
      console.log(editor.selection.getSelectionContainerElem())
      // 执行 bold 命令
      // 加空格符&ZeroWidthSpace;  防止生成span加样式标签(行末不生成sub标签)
      editor.cmd.do('insertHTML','<sup>' + editor.selection.getSelectionText() + '</sup><span style="font-size: 16px">&ZeroWidthSpace;</span>')
    }

    if (isSeleEmpty) {
      // 需要将选取折叠起来
      editor.selection.collapseRange()
      editor.selection.restoreSelection()
    }
  }

  // 菜单是否被激活（如果不需要，这个函数可以空着）
  // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
  // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
  tryChangeActive () {

  }
}

export {
  Symbol,
  Sub,
  Sup
}
