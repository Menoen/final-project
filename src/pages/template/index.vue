<template>
  <el-container>
    <el-row>
      <el-col :span="8" v-for="(o) in number" :key="o">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="imgsrc" class="image">
          <div style="padding: 14px;">
            <span>template{{o}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" @click="dialogFormVisible  = true">Edit</el-button>
              <el-button type="text" class="button" @click="open">Delete</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="Template name" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Template name" :label-width="formLabelWidth">
          <el-input v-model="form.templateid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Creater Id" :label-width="formLabelWidth">
          <el-input v-model="form.createrid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="JSON" :label-width="formLabelWidth">
          <el-input v-model="form.json" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Edit</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
// import formEdit from './components/form-edit'

export default {
  components: {
  },
  data () {
    return {
      imgsrc: '20211127112519.jpg',
      number: 8,
      dialogFormVisible: false,
      form: {
          templateid: 'Template',
          createrid: '1231231',
          json: '{ "list": [ { "type": "input", "icon": "icon-pingfen1", "options": { "defaultValue": 0, "max": 5, "disabled": false, "allowHalf": false, "required": false, "remoteFunc": "func_1637982933000_26097" }, "name": "评分", "key": "1637982933000_26097", "model": "rate_1637982933000_26097", "rules": [] } ], "config": { "labelWidth": 100, "labelPosition": "right", "size": "small" } }'
        },
        formLabelWidth: '120px'
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    deleteTemplate() {
      this.number --
    },
    open() {
        this.$confirm('Delete this template?', 'Dialog', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Delete success!'
          });
          this.deleteTemplate()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Canceled'
          });          
        });
      }
  }
}
</script>

<style>
.square {
  height: 140px;
  width: 100px;
  padding: 2px;
  border: 1px solid #666666;
}
</style>
