<template>
  <div>
    <div class="searchPage">
      <div class="headContainer">
        <SvgIcon name="left" size="0.36rem" @click="() => emit('switchShow')" />
        <div class="searchContainer">
          <Field
            class="vantField"
            v-model="searchWord"
            :placeholder="props.defaultSearchWord"
            clearable
            @clear="
              () => {
                searchStatus = statusText.NONE;
              }
            "
          />
          <div class="searchButton" @click="() => goSearch(true)">
            <div>搜索</div>
          </div>
        </div>
      </div>
      <div class="showResult">
        <div class="showContainer">
          <div v-if="searchWordList && searchWordList.length">
            <div
              class="searchItem"
              v-for="item in searchWordList"
              :key="item.label"
              @click="() => goSearch(true)"
            >
              <SvgIcon class="itemIcon" name="sousuo" color="#aaa" size="0.385rem" />{{
                item.label
              }}
            </div>
          </div>
          <div v-else-if="searchStatus === statusText.NONE && handleArray.length" class="history">
            <div class="title">历史搜索</div>
            <div class="content">
              <div
                v-for="(item, index) in handleArray"
                :key="index"
                class="item"
                @click="
                  () => {
                    if (typeof item === 'boolean') return;
                    goSearch(false);
                  }
                "
              >
                <SvgIcon
                  v-if="typeof item === 'boolean'"
                  :name="item ? 'up' : 'Down'"
                  size="0.36rem"
                  @click.stop="
                    () => {
                      historyIsFold = !historyIsFold;
                    }
                  "
                />
                <div v-else>
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="searchStatus !== statusText.NONE" class="searchText">
            {{ `—— &nbsp;&nbsp;&nbsp;&nbsp; ${searchStatus} &nbsp;&nbsp;&nbsp;&nbsp; ——` }}
          </div>
        </div>
      </div>
    </div>
    <Transition name="coverPage">
      <div class="coverPage" v-if="showResultPage">
        <div class="container">
          <div class="headContainer">
            <SvgIcon
              name="left"
              size="0.36rem"
              @click="
                () => {
                  showResultPage = false;
                }
              "
            />
          </div>
          搜索结果页
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect, computed, onBeforeMount } from 'vue';
import { Field } from 'vant';
import { getSearchWords, type wordList } from '@/service/home';
import { debounce } from '@/utils/index';
// import _ from 'lodash';
enum statusText {
  NONE = '未开始/已完成', // 未开始状态
  DOING = '搜索中', // 搜索中状态
  EMPTY = '暂无内容', // 暂无结果状态
}

const props = defineProps<{
  defaultSearchWord: string;
}>();

// 控制搜索页显示与否
const emit = defineEmits<{ (e: 'switchShow'): void }>();
// 当前搜索内容
const searchWord = ref('');
const searchStatus = ref(statusText.NONE);
// 后台返回的搜索数据
const searchWordList = ref<wordList[]>();
// 搜索解构页展示
const showResultPage = ref(false);
// 历史搜索词
const historyList = ref<string[]>([]);
// 是否折叠
const historyIsFold = ref(true);

// 获取搜索结果列表
const getWordList = debounce(() => {
  if (!searchWord.value.trim()) return;
  searchStatus.value = statusText.DOING;
  getSearchWords(searchWord.value.trim())
    .then((res) => {
      searchWordList.value = res?.data;
    })
    .finally(() => {
      if (searchWordList.value && searchWordList.value.length === 0) {
        searchStatus.value = statusText.EMPTY;
      } else {
        searchStatus.value = statusText.NONE;
      }
    });
}, 500);
// 进入搜索页面
const goSearch = (needWord?: boolean) => {
  if (!searchWord.value && needWord) return;
  showResultPage.value = true;
  console.log(111);

  const tempArray =
    window.localStorage
      .getItem('searchHistory')
      ?.split(',')
      .filter((item) => item) || [];
  if (searchWord.value && !tempArray.includes(searchWord.value)) tempArray.push(searchWord.value);
  historyList.value = tempArray;
  window.localStorage.setItem('searchHistory', tempArray.join(','));
  console.log('333tempArray', tempArray);
};

const handleArray = computed(() => {
  let length = 0;
  let isSecondRow = false;
  let index = historyList.value.length;
  let needWrap = false;
  for (let idx in historyList.value) {
    const numIdx = Number(idx);
    const item = historyList.value[idx];
    const string = item.replace(/[\u0391-\uFFE5]/g, 'aa');
    length += string.length;
    if (numIdx > 0) length += 5;
    if (isSecondRow && length > 41) {
      needWrap = true;
      index = numIdx;
      break;
    } else if (length > 48) {
      isSecondRow = true;
      length = string.length;
    }
  }
  let newArray: (string | boolean)[] = [];
  newArray = [...historyList.value];
  // 最终判断是否超行与折叠
  if (needWrap) {
    if (historyIsFold.value) {
      newArray = historyList.value.slice(0, index);
      newArray.push(true);
      return newArray;
    }
    newArray.push(false);
  }
  return newArray;
});

// 进入页面，读取缓存中的历史记录
onBeforeMount(() => {
  const tempArray =
    window.localStorage
      .getItem('searchHistory')
      ?.split(',')
      .filter((item) => item) || [];
  historyList.value = tempArray;
});

watchEffect(() => {
  if (!searchWord.value) {
    searchWordList.value = undefined;
    searchStatus.value = statusText.NONE;
    return;
  }
  getWordList();
});
</script>

<style lang="scss" scoped>
.searchPage {
  width: 100%;
  height: 100%;
  position: absolute;
  background: white;
  top: 0;
  // z-index: 10000;
  .headContainer {
    display: flex;
    background: #f5f5f5;
    height: 40px;
    box-sizing: border-box;
    padding: 12px;
    .searchContainer {
      width: 340px;
      height: 30px;
      border-radius: 25px;
      position: relative;
      background: white;
      left: 14px;
      top: -7px;
      .vantField {
        width: 290px;
        height: 28px;
        border-radius: 25px;
        padding: 3px 10px;
        background: transparent;
        box-sizing: content-box;
      }
      .searchButton {
        font-size: 12px;
        width: 40px;
        height: 23px;
        position: absolute;
        right: 3.5px;
        top: 3.5px;
        background: $brandColor;
        border-radius: 25px;
        line-height: 23px;
        div {
          width: 100%;
          text-align: center;
        }
      }
    }
  }

  .showResult {
    height: calc(100% - 30px);
    background: rgb(245, 245, 245);
    z-index: 1000;
    .showContainer {
      background: white;
      width: 100%;
      height: 100%;
      border-radius: 13px;
      overflow: hidden;
      .history {
        // margin-top: 10px;
        padding: 12px 10px;
        .title {
          font-size: 16px;
          font-weight: 900;
        }
        .content {
          font-size: 13px;
          display: flex;
          flex-wrap: wrap;
          .item {
            background: rgb(245, 245, 245);
            margin-top: 17px;
            margin-right: 5px;
            border-radius: 16px;
            padding: 6px 11px;
            display: inline-block;
          }
        }
        .iframe {
          height: 100%;
          display: none;
        }
      }
      .searchText {
        font-size: 15px;
        width: 100%;
        text-align: center;
        margin-top: 40px;
        color: rgb(212, 212, 212);
      }
      .searchItem {
        font-size: 15px;
        margin-top: 15px;
        .itemIcon {
          margin-left: 15px;
          margin-right: 15px;
        }
      }
    }
  }
}
.coverPage {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1001;
  background: white;
  top: 0;
  .container {
    .headContainer {
      display: flex;
      background: #f5f5f5;
      height: 40px;
      box-sizing: border-box;
      padding: 12px;
      .searchContainer {
        width: 340px;
        height: 30px;
        border-radius: 25px;
        position: relative;
        background: white;
        left: 14px;
        top: -7px;
        .vantField {
          width: 290px;
          height: 28px;
          border-radius: 25px;
          padding: 3px 10px;
          background: transparent;
          box-sizing: content-box;
        }
        .searchButton {
          font-size: 12px;
          width: 40px;
          height: 23px;
          position: absolute;
          right: 3.5px;
          top: 3.5px;
          background: $brandColor;
          border-radius: 25px;
          line-height: 23px;
          div {
            width: 100%;
            text-align: center;
          }
        }
      }
    }
  }
}
.coverPage-enter-from,
.coverPage-leave-to {
  top: 100rem;
}
.coverPage-enter-active {
  transition: all 0.2s ease;
}
.coverPage-enter-to,
.coverPage-leave-from {
  top: 0rem;
}
.coverPage-leave-active {
  transition: all 1s ease;
}
</style>
<style lang="scss">
.searchContainer {
  .vantField {
    .van-icon {
      position: relative;
      left: -5px;
    }
  }
}
</style>
