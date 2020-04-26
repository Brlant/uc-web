import locale from 'element-ui/lib/locale';
import {
  Alert,
  Autocomplete,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Card,
  Carousel,
  CarouselItem,
  Cascader,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  CollapseTransition,
  ColorPicker,
  DatePicker,
  Dialog,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  FormItem,
  Icon,
  Input,
  InputNumber,
  Loading,
  Menu,
  MenuItem,
  MenuItemGroup,
  Message,
  MessageBox,
  Notification,
  Option,
  OptionGroup,
  Pagination,
  Popover,
  Progress,
  Radio,
  RadioButton,
  RadioGroup,
  Rate,
  Row,
  Select,
  Slider,
  Spinner,
  Step,
  Steps,
  Submenu,
  Switch,
  Table,
  TableColumn,
  TabPane,
  Tabs,
  Tag,
  TimePicker,
  TimeSelect,
  Tooltip,
  Transfer,
  Tree
} from 'element-ui';

import {
  compressedImg,
  CuPagination,
  Dict,
  FA,
  Forbid,
  FormRow,
  goodsSelect,
  InputSingle,
  LoadingBottom,
  Nl2br,
  orgGoodsSelect,
  orgSelect,
  PageRight,
  Remove,
  Scrollbar,
  statusList,
  TimeLine,
  TimeLineItem,
  TinyCol,
  TinyInput,
  TinyLoading,
  TinyRow,
  TnInputAutoComplete
} from '@dtop/dtop-web-common';

import upload from '../components/common/upload/upload.vue';
import uploadRelation from '../components/common/upload/upload.relation.vue';
import perm from '../components/common/perm.vue';
import ElForm from '../components/common/form/src/form.vue';

import DialogTemplate from '@/components/common/dialog-template';
import SearchTemplate from '@/components/common/search-template';
import DesBtn from '@/components/common/descriptive-btn';
import ManageGoodsOption from '@/components/common/select/option-manage-goods.vue';
import FormShowPart from '@/components/common/form-show-part';
// import Scrollbar from '@/components/common/scrollbar/index';
const tinyVue = [
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Progress,
  Spinner,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  Scrollbar,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  CollapseTransition,
  upload,
  uploadRelation,
  perm,
  ElForm,

  DesBtn,
  DialogTemplate,
  SearchTemplate,
  FormShowPart,
  ManageGoodsOption,
  // 公共部分
  CuPagination,
  TinyInput,
  FA,
  InputSingle,
  PageRight,
  TimeLine,
  TimeLineItem,
  TinyLoading,
  Remove,
  Forbid,
  LoadingBottom,
  TinyRow,
  TinyCol,
  FormRow,
  Dict,
  statusList,
  Nl2br,
  orgGoodsSelect,
  orgSelect,
  goodsSelect,
  compressedImg,
  TnInputAutoComplete
];

const install = function (Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return;
  locale.use(opts.locale);
  locale.i18n(opts.i18n);

  tinyVue.map(component => {
    Vue.component(component.name, component);
  });

  Vue.use(Loading.directive);

  Vue.prototype.$loading = Loading.service;
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$message = Message;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default Object.assign(tinyVue, {install});
