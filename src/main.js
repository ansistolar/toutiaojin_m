import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入样式文件
import './styles/index.css'

// REM适配
// 加载 amfe-flexible
import 'amfe-flexible'

// 引入 axios 请求相关文件
import '@/api/index'

// 引入 dayjs 的配置文件
import "@/utils/dayjs.js"

// 引入、注册 vant 相关组件
import {
    NavBar
} from 'vant';
import {
    Form
} from 'vant';
import {
    Field
} from 'vant';
import {
    Button
} from 'vant';
import {
    Toast
} from 'vant';
import {
    CountDown
} from 'vant'
import {
    Tabbar,
    TabbarItem
} from 'vant';
import {
    Image as VanImage
} from 'vant'
import {
    Grid,
    GridItem
} from 'vant';
import {
    Cell,
    CellGroup
} from 'vant';
import {
    Dialog
} from 'vant';
import {
    Icon
} from 'vant';
import {
    Tab,
    Tabs
} from 'vant';
import {
    List
} from 'vant';
import {
    PullRefresh
} from 'vant';
import {
    Popup
} from 'vant';
import {
    Search
} from 'vant';
import { Loading } from 'vant';
import { Divider } from 'vant';
Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Toast);
Vue.use(CountDown);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(VanImage);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Dialog);
Vue.use(Icon);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Popup);
Vue.use(Search);
Vue.use(Loading);
Vue.use(Divider);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')