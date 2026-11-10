// 引入 ToolB 类，相对于src目录的路径
let ToolB = require('com/example/tool/ToolB');
// 创建 ToolB 实例
const toolBInstance = new ToolB();
// 调用 methodB 方法
toolBInstance.methodB($logger);
$composeView.create((slot) => {
    // 1. 创建一个状态
    let state = slot.remember(() => slot.mutableStateOf(0))
    // 创建一个垂直布局
    slot.Column((column) => {
        // 设置垂直布局修饰器
        column.setModifier((m) => {
            // 设置垂直布局填充满屏幕
            return m.fillMaxSize(1.0)
        })
        // 水平居中对齐元素
        column.setHorizontalAlignment((alignments) => { return alignments.getCenterHorizontally() })
        // 垂直居中排列元素
        column.setVerticalArrangement((arrangements) => { return arrangements.getCenter() })
        column.setContent((columnSlot) => {
            columnSlot.Text((text) => {
                // 使用状态值设置文本内容；Compose 绑定会在读取状态时自动追踪重组
                text.setText($stringResources.getString("demo.counter.label") + state.getValue())
            })
            columnSlot.TextButton((button) => {
                // 设置按钮显示的内容
                button.setContent((buttonSlot) => {
                    // 设置按钮文本
                    buttonSlot.Text((text) => {
                        text.setText($stringResources.getString("demo.counter.button"))
                    })
                })
                button.setOnClick(() => {
                    // 点击按钮时，更新状态值
                    state.setValue(state.getValue() + 1)
                })
            })
            columnSlot.Text((text) => {
                text.setText($stringResources.getString("demo.language"))
            })
        })
    })
})
// 启动 android 活动用于展示脚本UI
$activity.start()
