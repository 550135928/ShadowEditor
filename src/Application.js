import Options from './Options';

import EventDispatcher from './event/EventDispatcher';

import Menubar from './editor/Menubar';
import Toolbar from './editor/Toolbar';
import Viewport from './editor/Viewport';
import Sidebar from './editor/sidebar/Sidebar';
import StatusBar from './editor/StatusBar';
import Script from './editor/Script';
import Player from './editor/Player';

import Editor from './editor/Editor';

/**
 * 应用程序
 */
function Application(container, options) {

    // 容器
    this.container = container;
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    // 配置
    this.options = new Options(options);

    // 事件
    this.event = new EventDispatcher(this);
    this.call = this.event.call.bind(this.event);
    this.on = this.event.on.bind(this.event);

    var params = { app: this, parent: this.container };

    // 用户界面
    this.menubar = new Menubar(params); // 菜单栏
    this.menubar.render();

    this.toolbar = new Toolbar(params); // 工具栏
    this.toolbar.render();

    this.viewport = new Viewport(params); // 场景编辑区
    this.viewport.render();

    this.editor = new Editor(this); // 编辑器

    this.sidebar = new Sidebar(params); // 侧边栏
    this.sidebar.render();

    this.statusBar = new StatusBar(params); // 状态栏
    this.statusBar.render();

    this.script = new Script(params); // 脚本编辑面板
    this.script.render();

    this.player = new Player(params); // 播放器面板
    this.player.render();

    this.running = false;

    // 是否从文件中加载场景，从文件中加载场景的url格式是index.html#file=xxx
    this.isLoadingFromHash = false;
}

Application.prototype.start = function () {
    this.running = true;

    // 启动事件 - 事件要在ui创建完成后启动
    this.event.start();

    this.call('appStart', this);
    this.call('resize', this);
    this.call('initApp', this);
    this.call('appStarted', this);
};

Application.prototype.stop = function () {
    this.running = false;

    this.call('appStop', this);
    this.call('appStoped', this);

    this.event.stop();
};

export default Application;