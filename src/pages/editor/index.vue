<template>
  <div class="page-editor editor-wrapper" v-loading="loading">
    <div class="editor-page-edit-wrapper">
      <componentList></componentList>
    </div>
    <!--editor-->
    <el-container>
      <el-header height="45px;">
        <el-button size="small" icon="el-icon-delete" @click="handleClear">Cleara</el-button>
        <el-button size="small" icon="el-icon-view" @click="handlePreview">Preview</el-button>
        <el-button size="small" icon="el-icon-tickets" @click="handleGenerateJson">generateJson</el-button>
        <el-button size="small" icon="el-icon-document" @click="handleGenerateCode">generateCode</el-button>
      </el-header>
      <el-main :class="{'widget-empty': widgetForm.list.length == 0}">
        <widget-form ref="widgetForm" :data="widgetForm" :select.sync="canvasForm"></widget-form>
      </el-main>
    </el-container>
    <el-aside class="widget-config-container">
      <el-container>
        <el-header height="45px">
          <div class="config-tab" :class="{active: activeConfig=='widget'}" @click="handleConfigSelect('widget')">{{$t('fm.config.widget.title')}}</div>
          <div class="config-tab" :class="{active: activeConfig=='form'}" @click="handleConfigSelect('form')">{{$t('fm.config.form.title')}}</div>
        </el-header>
        <el-main class="config-content">
          <attr-edit v-show="activeConfig=='widget'" :data="canvasForm"></attr-edit>
          <form-edit v-show="activeConfig=='form'" :data="widgetForm.config"></form-edit>
        </el-main>
      </el-container>
    </el-aside>
  </div>
</template>

<script>
import componentList from './components/componentList'
import draggable from 'vuedraggable'
import WidgetForm from './components/WidgetForm'
import attrEdit from './components/attrEdit'
import formEdit from './components/formEdit'

export default {
  components: {
    componentList,
    draggable,
    formEdit,
    attrEdit,
    WidgetForm
  },
  props: ['data', 'select'],
  data () {
    return {
      loading: false,
      showPreview: false,
      activeAttr: 'field',
      canvasConfig: {
        scale: 1
      },
      activeConfig: 'widget',
      canvasForm: null,
      activeClass: -1,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small'
        },
      },
      previewVisible: false,
      jsonVisible: false,
      codeVisible: false,
      uploadVisible: false,
      widgetModels: {},
      blank: '',
      htmlTemplate: '',
      vueTemplate: '',
      jsonTemplate: '',
      uploadEditor: null,
      jsonCopyValue: '',
      jsonClipboard: null,
      jsonEg: `{
        "list": [],
        "config": {
          "labelWidth": 100,
          "labelPosition": "top",
          "size": "small"
        }
      }`,
      codeActiveName: 'vue',
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    getItem (index) {
      this.activeClass = index
    },
    handleMoveEnd (evt) {
    },
    handleMoveStart (evt) {
    },
    handleMove () {
      return true
    },
    handleClear () {
      this.widgetForm = {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small',
          customClass: ''
        },
      }

      this.canvasForm = {}
    },
    handlePreview () {
      console.log(this.widgetForm)
      this.previewVisible = true
    },
    handleGenerateJson () {
      this.jsonVisible = true
      this.jsonTemplate = this.widgetForm
      console.log(JSON.stringify(this.widgetForm))
      this.$nextTick(() => {

        const editor = ace.edit('jsoneditor')
        editor.session.setMode("ace/mode/json")

        if (!this.jsonClipboard) {
          this.jsonClipboard = new Clipboard('.json-btn')
          this.jsonClipboard.on('success', (e) => {
            this.$message.success(this.$t('fm.message.copySuccess'))
          })
        }
        this.jsonCopyValue = JSON.stringify(this.widgetForm)
      })
    },
    handleGenerateCode () {

      this.codeVisible = true
      this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm), 'html')
      this.vueTemplate = generateCode(JSON.stringify(this.widgetForm), 'vue')
      this.$nextTick(() => {
        const editor = ace.edit('codeeditor')
        editor.session.setMode("ace/mode/html")

        const vueeditor = ace.edit('vuecodeeditor')
        vueeditor.session.setMode("ace/mode/html")
      })
    },
  }
}
</script>

<style>
.editor-wrapper {
  display: flex;
  height: 80%;
  position: relative;
}
.editor-wrapper .editor-side-bar {
  width: 55px;
}
.editor-wrapper .editor-page-edit-wrapper {
  width: 210px;
  padding: 0 1px;
}
.editor-wrapper .editor-main {
  flex: 1;
  background-image: linear-gradient(90deg, rgba(100, 100, 100, 0.15) 10%, rgba(0, 0, 0, 0) 10%),linear-gradient(rgba(100, 100, 100, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
  background-size: 10px 10px;
  position: relative;
}
.editor-wrapper .el-attr-edit-wrapper {
  width: 380px;
  padding: 0;
}

.control-bar-wrapper {
  position: relative;
  left: 0;
  width: 100%;
  height: 75%;
  text-align: center;
  z-index: 1000;
}
.editor-side-bar .el-tabs__item.is-active {
  background: rgba(37, 165, 137, 0.09);
}

.el-attr-edit-wrapper .el-tabs {
  height: 100%;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 10px;
}
.el-attr-edit-wrapper .el-tabs__content {
  height: calc(100% - 55px);
}
.el-attr-edit-wrapper .el-tabs__content > div {
  height: 100%;
}
.el-attr-edit-wrapper .el-tabs__content .attr-edit-inner {
  padding-left: 16px;
  padding-right: 16px;
}
.item-class {
  box-sizing: border-box;
  padding: 2px;
  position: relative;
}
.item-class:hover {
  border: 2px dashed #ddd;
}
.active-item {
  border: 2px dashed #999;
}

.active-item:hover {
  border: 2px dashed #999;
}
.active-item::before{
  content: 'x';
  cursor: pointer;
  float: right;
  width: 20px;
  height: 20px;
  margin: -14px;
  background-color: rgb(145 184 174);
  border-radius: 50%;
}
.active-item .border-corner{
        z-index: 100;
        position: absolute;
        width: 19px;
        height: 19px;
        background: rgba(0,0,0,0);
        border: 4px solid #1fa5f1;
      }
    .active-item .border-corner-left-top{
        top: -2px;
        left: -2px;
        border-right: none;
        border-bottom: none;
        border-top-left-radius: 6px;
      }
    .active-item .border-corner-right-top{
        top: -2px;
        right: -2px;
        border-left: none;
        border-bottom: none;
        border-top-right-radius: 6px;
      }
    .active-item .border-corner-left-bottom{
        bottom: -2px;
        left: -2px;
        border-right: none;
        border-top: none;
        border-bottom-left-radius: 6px;
      }
    .active-item .border-corner-right-bottom{
        bottom: -2px;
        right: -2px;
        border-left: none;
        border-top: none;
        border-bottom-right-radius: 6px;
      }
</style>
