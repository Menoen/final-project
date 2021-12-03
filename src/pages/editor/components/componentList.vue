<template>
  <div class="components-libs-wrapper">
    <p class="page-title text-center">Components</p>
    <div>
      <h3>Basic</h3>
      <draggable tag="ul" :list="basicComponents" 
        v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
        @end="handleMoveEnd"
        @start="handleMoveStart"
        :move="handleMove"
      >
        <template v-for="(element, index) in basicComponents">
          <li :key="index">
            <a>
              <i :class="[element.icon]"></i>
              <span>{{element.title}}</span>
            </a>
          </li>
        </template>                
      </draggable>
    </div>
    <div>
      <h3 class="cages">Advanced</h3>
      <draggable tag="ul" :list="advanceComponents" 
        v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
        @end="handleMoveEnd"
        @start="handleMoveStart"
        :move="handleMove"
      >
        <template v-for="(element, index) in advanceComponents">
          <li :key="index">
            <a>
              <i :class="[element.icon]"></i>
              <span>{{element.title}}</span>
            </a>
          </li>
        </template>                
      </draggable>
    </div>
    <div>
      <h3 class="cages">Layout</h3>
      <draggable tag="ul" :list="layoutComponents" 
        v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
        @end="handleMoveEnd"
        @start="handleMoveStart"
        :move="handleMove"
      >
        <template v-for="(element, index) in layoutComponents">
          <li :key="index">
            <a>
              <i :class="[element.icon]"></i>
              <span>{{element.title}}</span>
            </a>
          </li>
        </template>                
      </draggable>
    </div>
    <!-- <el-scrollbar style="height: 100%;">
      <draggable tag="ul" :list="basicComponents" 
        v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
        @end="handleMoveEnd"
        @start="handleMoveStart"
        :move="handleMove"
      >
        <div class="scrollbar-wrapper">
          <div v-for="(item, index) in componentsList" :key="index" class="clearfix paddingB30">
            <div class="components-libs-title">
              <p>{{item.title}}</p>
            </div>
            <el-row>
              <el-col :span="12" @click="clickItem($event)" v-for="element in item.components" :key="element.elName" style="border: 1px solid #233; padding: 5px;">
                <a>
                  <i :class="[element.icon]"></i>
                  <span>{{element.title}}</span>
                </a>
              </el-col>
            </el-row>
          </div>
        </div>               
      </draggable>
      
    </el-scrollbar> -->
  </div>
</template>

<script>
import {basicComponents, layoutComponents, advanceComponents} from '../ele-config'
import draggable from 'vuedraggable'
export default {
  name: 'component-libs',
  components: {
    draggable
  },
  data () {
    return {
      basicComponents,
      layoutComponents,
      advanceComponents,
      list1: [
        {title: 1, elName: 'rrrrr'},
        {title: 2, elName: 'dddddd'}
      ]
    }
  },
  methods: {
    /**
     * click a component list's item
     * @param item
     */
    handleClick (item) {
      console.log(item)
      // let props = this.getComponentProps(item.elName)
      // this.$store.dispatch('addElement', {...item, needProps: props})
    },
    /**
       * get prop by elname
       * @param elName
       */
    getComponentProps (elName) {
      // let elComponentData
      // for (let key in registerComponentsObject) {
      //   if (key.toLowerCase() === camelCase(elName).toLowerCase()) {
      //     elComponentData = registerComponentsObject[key]
      //     break
      //   }
      // }
      // if (!elComponentData) return {}

      // let props = {}
      // for (let key in elComponentData.props) {
      //   props[key] = [Object, Array].includes(elComponentData.props[key].type) ? elComponentData.props[key].default() : elComponentData.props[key].default
      // }
      // return props
    },
    handleMoveEnd (evt) {
      console.log('end', evt)
    },
    handleMoveStart ({oldIndex}) {
      console.log('start', oldIndex, this.basicComponents)
    },
    handleMove () {
      return true
    },
    clickItem (event) {

    }
  }
}
</script>

<style>
  .components-libs-wrapper .cages {
    font-size: 300;
  }
  .components-libs-wrapper li {
    display: inline-block;
    width: 50%;
    padding: 5px;
    border: 1px solid #dddddd;
    border-radius: 2px;
  }
  .components-libs-wrapper {
    user-select: none;
    height: 90%;
    padding-top: 60px;
    position: relative;
  }
  .components-libs-wrapper ul {
    padding: 10px;
  }
  .page-title {
    position: absolute;
    top: 16px;
    left: 0;
    width: 100%;
  }

  .components-libs-title {
    margin-bottom: 16px;
  }
  .components-lib-item {
    color: #424242;
    text-align: center;
    background: #f4f4f4;
    width: 80px;
    float: left;
    padding: 6px 0;
    margin: 5px;
    border: 1px solid #dddddd;
    font-size: 12px;
    cursor: pointer;
    transition: All 0.3s ease-in-out;
  }
  .components-lib-item:hover {
    background: #fff;
    border: 1px solid #0c6b6b;
    color: #0c6b6b;
  }
</style>
