<template>
  <el-header>
    <div class="l-content">
      <!-- 图标的展示 -->
      <el-button size="small" plain @click="handleCollapse">
        <el-icon :size="20"><Menu /></el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{
          current.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-button class="theme" color="#626aef" @click="switchThemes">暗黑模式</el-button>
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" :src="getImgSrc('user')" alt="" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLoginout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {useDark, useToggle} from '@vueuse/core'

export default {
  setup() {
    let store = useStore();
    // const imgSrc=require('../assets/images/user.png')
    const getImgSrc = (img) => {
      // console.log(import.meta.url);// 基准url（原生JS）
      return new URL(`../assets/images/${img}.png`, import.meta.url).href;
    };
    let handleCollapse = () => {
      // 调用vuex中的mutations
      store.commit("updateIsCollapse", "123");
    };
    // 计算属性
    const current = computed(() => {
      return store.state.currentMenu;
    });
    const router=useRouter()
    const handleLoginout = () => {
      store.commit('cleanMenu');
      router.push({
        name:'login',
      })
    };

    const switchThemes=()=>{
      const isDark=useDark()
      const toggleDark=useToggle(isDark)
      toggleDark()
    }

    return {
      // imgSrc
      getImgSrc,
      handleCollapse,
      current,
      handleLoginout,
      switchThemes,
    };
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #333;
}
.bread /deep/ span {
  color: #fff !important;
  cursor: pointer;
}
.l-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  h3 {
    color: #fff;
  }
}
.r-content {
  .theme{
    margin:5px 20px 0 20px;
  }
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
