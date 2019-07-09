<template>
  <div class="hello">
    <div class="tools" @click="minder.enable()">
      <button @click="exportHandle(0)">导出png图片</button>
      <button @click="exportHandle(1)">导出pdf格式</button>
      <button @click="minder.execCommand('camera', minder.getRoot(), 600);">重新定位</button>
      <button @click="minder.execCommand('zoomIn')">放大</button>
      <button @click="minder.execCommand('zoomOut');">缩小</button>
      <select @change="minder.execCommand('template', rootData.template);" v-model="rootData.template">
        <option v-for="(item, index) in templateList" :key="index" :value="index">{{item}}</option>
      </select>
      <select @change="minder.execCommand('theme', rootData.theme);" v-model="rootData.theme">
        <option v-for="(item, index) in themeList" :key="index" :value="index">{{item}}</option>
      </select>
    </div>
    <div class="tabBar">
      <button v-for="(item, index) in importDate" :key="index" :class="{active:navIndex == index}" @click="selectHandle(index)">{{item.data.text}}</button>
    </div>
    <BreadCrumbs :minder="minder"/>
    <div id="minder-container"></div>
  </div>
</template>

<script>
import '../../static/kityminder.min.css'
import '../../static/kity.min.js'
import '../../static/kityminder.core.js'
import jsPDF from 'jspdf';
import _ from 'lodash'
import BreadCrumbs from './BreadCrumbs/index'
export default {
  name: 'KityMinder',
  data () {
    return {
      minder: null,
      imgUrl:null,
      navIndex:0,
      rootData:{
        root:{},
        template:'default',
        theme:'snow'
      },
      templateList:{
        'default': '思维导图',
        'tianpan': '天盘图',
        'structure': '组织结构图',
        'filetree': '目录组织图',
        'right': '逻辑结构图',
        'fish-bone': '鱼骨头图'
      },
      themeList: {
					'classic': '脑图经典',
					'classic-compact': '紧凑经典',
					'snow': '温柔冷光',
					'snow-compact': '紧凑冷光',
					'fish': '鱼骨图',
					'wire': '线框',
					'fresh-red': '清新红',
					'fresh-soil': '泥土黄',
					'fresh-green': '文艺绿',
					'fresh-blue': '天空蓝',
					'fresh-purple': '浪漫紫',
					'fresh-pink': '脑残粉',
					'fresh-red-compat': '紧凑红',
					'fresh-soil-compat': '紧凑黄',
					'fresh-green-compat': '紧凑绿',
					'fresh-blue-compat': '紧凑蓝',
					'fresh-purple-compat': '紧凑紫',
					'fresh-pink-compat': '紧凑粉',
					'tianpan':'经典天盘',
					'tianpan-compact': '紧凑天盘'
				},
    }
  },
  props:{
    importDate:{
      type:Array,
      default:() => []
    }
  },
  mounted() { this.initMinder() },
  methods:{
    initMinder() {
      this.minder = new kityminder.Minder({
        enableKeyReceiver: false
      });
      this.minder.renderTo('#minder-container');
      this.selectHandle(0)
      this.minder.disable()
    },
    exportHandle(n) {
      if(n == 0){
        this.minder.exportData('png').then((content) => {
          const ele = document.createElement('a')
          const evt = document.createEvent('HTMLEvents')
          evt.initEvent("click", true, true)
          ele.download = this.rootData.root.data.text || '无标题'
          ele.href = content
          ele.click()
        })
      }else if(n == 1) {
        this.minder.exportData('png').then((content) => {
          var doc = new jsPDF()
          doc.addImage(content, 'PNG', 0, 0, 0, 0);
          doc.save(`${this.rootData.root.data.text || '无标题'}.pdf`);
        })
      }
    },
    selectHandle(index) {
      this.navIndex = index
      this.rootData.root = this.importDate[index]
      this.minder.importJson(this.rootData)
    }
  },
  components:{
    BreadCrumbs
  }
}
</script>

<style scoped>

.tabBar{
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translate(0,-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.tabBar button {
  margin-bottom: 10px;
  cursor: pointer;
}

.active {
  background: red;
  outline: none;
}

.tools{
  position: fixed;
  top: 20px;
  right: 20px;
  color: red;
  z-index: 100;
}
  #minder-container{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      z-index: 2;
  }
</style>
