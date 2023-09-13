<template>
<div class="viewFramework-main-body" :class="{'viewFramework-main-navbar-full':isViewSubNav,'viewFramework-main-navbar-mini':!isViewSubNav}">
    <div class="viewFramework-main-navbar">
        <div class="main-nav-stage">
            <div class="main-nav-scene main-nav-main-scene">
                <div id="nav-title" class="main-nav-title ng-binding" v-text="router.name"></div>
                <div  class="ng-isolate-scope"></div>
                <div class="main-nav-list">
                    <ul id="subMeunwrapperid" ref="subMeunwrapperid">
                        <li :class="{active:item.index==selected}" @click="selectedMenus(item,item.index)" v-for="item in router.children">
                            <div v-if="!item.children" class="ng-isolate-scope">
                                <router-link v-show="!item.unShow" v-if="currentRoute!=''" :to="dataStructure[currentRoute].path+'/'+item.modName">
                                    <div class="nav-icon"></div>
                                  <!--<div ng-bind="item.name" class="nav-title ng-binding" >{{item}}</div>-->
                                    <div ng-bind="item.name" class="nav-title ng-binding" v-text="item.name"></div>
                                </router-link>
                            </div>
                            <div v-else>
                                <div  class="ng-isolate-scope">
                                    <a href="#/" class="ng-scope">
                                        <div class="nav-icon">
                                            <span class="icon-arrow-right"></span>
                                        </div>
                                        <div ng-bind="item.name" class="nav-title ng-binding" v-text="item.name"></div>
                                    </a>
                                </div>
                                <ul  class="ng-scope ng-hide" v-for="subItem in item.children" v-show="item.children>0">
                                    <li>
                                    <div class="ng-isolate-scope"><router-link to="router+subItem.modName"><a href="http://www.163.com" target="showMainIframe" class="ng-scope">
                                        <div class="nav-icon"></div>
                                        <div class="nav-title" v-text="subItem.name"></div>
                                        </a>
                                        </router-link></div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="viewFramework-main-navbar-collapse">
        <span v-show="!isWork" class="icon-collapse-left" @click="handleViewSubNav"></span>
    </div>
    <div class="viewFramework-main-content" id="zyyMain">
      <p
        class="crumbs">
        {{getPathName}}</p>
      <div class="layout-content" id="layout-content" style="top: 46px;">
          <iframe-view v-if="selectedObj && selectedObj.url" :url="selectedObj.url"></iframe-view>
          <router-view v-else></router-view>
        </div>
    </div>
</div>
</template>
<script>
  //todo 工作台未完待实现
  let Util = null;
  // import work from './workbench.vue'
  import iframeView from './iframeView.vue'

  export default{
      props: ['subNavs', 'subIndex', 'dataStructure', 'getPathName'],
        data(){
            return{
                selected:-1,
                selectedObj: null,
                isViewSubNav:true,
                //当为工作台是否隐藏三级菜单
                isWork:true,
                //当前的父级路由
                currentRoute:"",
            }
        },
      created(){
        Util = this.$util;
      },
        methods:{
            getSubMenusData(){
              let data = [];
              let currentRoute = this.getRouterName(2);
              if(this.subIndex!=""&&currentRoute=="workbench"){
                currentRoute = this.subIndex;
                this.isWork = true;
              }
              if(this.subIndex==""&&currentRoute=="workbench"){
                this.isViewSubNav = false;
                this.isWork = true;
              }
              if(currentRoute!="workbench"){
                this.isViewSubNav = true;
                this.isWork = false;
              }
              this.currentRoute = currentRoute;
              data = this.dataStructure[currentRoute];
              return data;
            },
            showAndHide(item){
                item.expand = !item.expand;
            },
            selectedMenus(obj,n){
                this.selectedObj = obj;
                this.selected = n;
            },
            getRouterName(n){
              let route = this.$route;
              let matched = route.matched
              let currentRoute = matched[matched.length-n].name;
              return currentRoute;
            },
            handleViewSubNav(){
              this.isViewSubNav = !this.isViewSubNav;
            },
            getRouterByIndex(arr,n){
              for(let i=0,l=arr.length;i<l;i++){
                if(arr[i].index === n){
                  return arr[i]
                }
              }
            },
        },
        computed:{
            router(){
              let currentRoute = this.getRouterName(1);
              let data = this.getSubMenusData();
              if(currentRoute!="workbench"){
                let n = this.dataStructure["structureIndex"][currentRoute].index;
                let routerObj = this.getRouterByIndex(data.children,n);
                this.selectedMenus(routerObj,n);
              }
              return data
            }
        },
      components:{
        work,
        iframeView,
      },
    }
</script>
