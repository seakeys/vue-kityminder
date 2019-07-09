<template>
  <div class="breadcrumbs">
    <ul class="breadcrumblist">
      <li v-for="(item,index) in list" :key="index">
        <span @click="showNode(item, index)" class="item">{{item.data.text}}</span>
        <span v-if="index !== list.length - 1">&gt;</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return {
      root: null,
      nodes: {},
      list:[],
      beforeData:[]
    }
  },
  props:{
    minder:{
      type:Object,
      default: () => {}
    }
  },
  mounted() {
    if(this.minder){
      this.root = this.minder.getRoot();
      this.getNodes(this.root);
      this.minder.on('contentchange', (node) => {
        this.getNodes(this.root);
      });
      this.minder.on('dblclick', (node) => {
        const n = this.minder.getSelectedNode();
        this.beforeData=this.list
        if(n && !n.isLeaf() && n != this.root) {
          this.getBreadcrumb(n);
          this.importRoot(n)
        }
      });
    }
  },
  methods:{
    getNodes(node) {
      node.traverse(n => {
        var uniqueKey = n.getData('id') || n.getText();
        if(uniqueKey) this.nodes[uniqueKey] = n.clone();
      });
    },
    showNode(node, index) {
      let uid = node.getData('id') || node.getText();
      if(uid) {
        this.list = _.dropRight(this.list,this.list.length-index)
        this.importRoot(this.nodes[uid])
      }
    },
    getBreadcrumb(node) {
      var list = [];
      while(node && node.parent) {
        list.unshift(node.parent.clone());
        node = node.parent;
      }
      this.list = list;
      if(this.beforeData.length){
        this.list = _.concat(this.beforeData,list)
      }
    },
    importRoot(node) {
      if(!node) return;
      const root = this.minder.getRoot();
      while(root.getChildren().length) {
        this.minder.removeNode(root.getChildren()[0]);
      }
      if(!node.isExpanded()) node.expand();
      this.minder.importNode(root, node);
      this.minder.select(root, true);
      this.minder.refresh();
    }
  }
}
</script>
<style scoped>
  .breadcrumblist {
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    color: #777;
    font-size: 16px;
    padding: 0;
    margin: 0;
    z-index: 100;
  }

  .breadcrumblist li {
    list-style: none;
    display: flex;
    align-items: center;
  }

  .breadcrumblist .item {
    cursor: pointer;
    display: block;
    max-width: 100px;
    border-radius: 3px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

</style>

