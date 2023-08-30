<template>
  <div class="page-card">
    <div class="page-card-header">
      <van-image round width="40px" height="40px" :src="item.creatorAvatar" />
      <div class="titleCommit">
        <div class="title">{{ item.creatorName }}</div>
        <div class="doce van-ellipsis">
          {{ item.creatorHospatalName }} {{ item.creatorDep }} {{ item.creatorTitles }}
        </div>
      </div>

      <van-button class="btn" round>{{ item.likeFlag == 1 ? '已关注' : '+ 关注' }}</van-button>
    </div>

    <div class="page-card-main">
      <h3 class="van-ellipsis">{{ item.title }}</h3>
      <div class="main-doce van-multi-ellipsis--l2">{{ item.content.replace(/<[^>]+>/g, '') }}</div>
      <div class="main-img">
        <img v-for="(url, i) in item.coverUrl" :key="i" :src="url" alt="" />
      </div>
    </div>

    <p class="logs">
      <span>{{ item.collectionNumber }}收藏</span>
      <span>{{ item.commentNumber }} 评论</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { KnowledgeList } from '@/types/knowledge'
defineProps<{
  item: KnowledgeList
}>()
</script>

<style lang="scss" scoped>
.page-card {
  margin-top: 10px;
  border-bottom: 1px solid var(--cp-bg);
  padding: 0 0 10px 0;
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .titleCommit {
      width: 200px;
      .doce {
        font-size: 12px;
        color: var(--cp-tip);
      }
    }
    ::v-deep() {
      .btn {
        width: 70px;
        height: 30px;
        color: var(--cp-primary);
        border-color: var(--cp-primary);
        font-size: 12px;
      }
    }
  }
  &-main {
    h3 {
      font-weight: normal;
      margin: 10px 0;
    }
    .main-doce {
      color: var(--cp-tag);
    }
    .main-img {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 106px;
        height: 106px;
        border-radius: 5px;
      }
    }
  }
  .logs {
    margin-top: 10px;
    span {
      margin-right: 10px;
      color: var(--cp-tip);
    }
  }
}
</style>
