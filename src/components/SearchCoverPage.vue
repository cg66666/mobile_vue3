<template>
  <div class="searchPage">
    <div class="headContainer">
      <SvgIcon name="left" size="14px" @click="() => emit('switchShow')" />
      <div class="searchContainer">
        <Field
          class="vantField"
          v-model="searchWord"
          :placeholder="props.defaultSearchWord"
          clearable
        />
        <div class="searchButton" @click="() => goSearch(true)">
          <div>搜索</div>
        </div>
      </div>
    </div>
    <div class="showResult">
      <div class="showContainer">
        <div v-if="searchStatus === statusText.NONE && !searchWordList" class="history">
          <div class="title">历史搜索</div>
          <div class="content">
            <div
              v-for="(item, index) in handleArray"
              :key="index"
              class="item"
              @click="
                () => {
                  if (typeof item === 'boolean') {
                    return;
                  }
                  goSearch(false);
                }
              "
            >
              <SvgIcon v-if="typeof item === 'boolean'" name="Down" size="14px" />
              <div v-else>
                {{ item }}
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="searchWordList && searchWordList.length">
          <div
            class="searchItem"
            v-for="item in searchWordList"
            :key="item.label"
            @click="() => goSearch(true)"
          >
            <SvgIcon className="itemIcon" name="sousuo" color="#aaa" size="15px" />{{ item.label }}
          </div>
        </div>
        <div v-else class="searchText">
          {{ `—— &nbsp;&nbsp;&nbsp;&nbsp; ${searchStatus} &nbsp;&nbsp;&nbsp;&nbsp; ——` }}
        </div>
      </div>
    </div>
  </div>
  <Transition name="coverPage" class="coverPage">
    <div class="container" v-if="showResultPage">
      <div class="headContainer">
        <SvgIcon
          name="left"
          size="14px"
          @click="
            () => {
              showResultPage = false;
            }
          "
        />
        <br />搜索结果页
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue';
import { Field } from 'vant';
import { getSearchWords, type wordList } from '@/service/home';
import { debounce } from '@/utils/index';
// import _ from 'lodash';
enum statusText {
  NONE = '未开始/已完成', // 未开始状态
  DOING = '搜索中', // 搜索中状态
  EMPTY = '暂无内容' // 暂无结果状态
}
const array = [
  '222222222222222222222222',
  '2222222222222222222',
  '123123123123',
  '4555人格人格5522555443214642222'
];
const props = defineProps<{
  defaultSearchWord: string;
}>();
const emit = defineEmits<{ (e: 'switchShow'): void }>();
// 当前搜索内容
const searchWord = ref('');
const searchStatus = ref(statusText.NONE);
// 后台返回的搜索数据
const searchWordList = ref<wordList[]>();
// 搜索解构页展示
const showResultPage = ref(false);
// 获取搜索结果列表
const getWordList = debounce(() => {
  searchStatus.value = statusText.DOING;
  console.log('开启加载中');
  getSearchWords(searchWord.value.trim())
    .then((res) => {
      console.log('res', res);
      searchWordList.value = res?.data;
    })
    .finally(() => {
      console.log('searchWordList', searchWordList.value, searchWordList?.value?.length);
      if (searchWordList.value && searchWordList.value.length === 0) {
        searchStatus.value = statusText.EMPTY;
      } else {
        searchStatus.value = statusText.NONE;
      }
      console.log('取消加载中');
    });
}, 500);
// 进入搜索页面
const goSearch = (needWord?: boolean) => {
  if (!searchWord.value && needWord) return;
  console.log(333);

  showResultPage.value = true;
  const tempArray = window.localStorage.getItem('searchHistory')?.split(',') || [];
  if (!tempArray.includes(searchWord.value)) tempArray.push(searchWord.value);
  window.localStorage.setItem('searchHistory', tempArray.join(','));
};
watchEffect(() => {
  if (!searchWord.value) {
    searchWordList.value = undefined;
    return;
  }
  getWordList();
});
const handleArray = computed(() => {
  let length = 0;
  let isSecondRow = false;
  let index = array.length;
  array.forEach((item, idx) => {
    const string = item.replace(/[\u0391-\uFFE5]/g, 'aa');
    length += string.length;
    if (idx > 0) length += 5;
    console.log('length', length, string);
    if (isSecondRow && length > 41) {
      index = idx;
    } else if (length > 48) {
      isSecondRow = true;
      length = string.length;
    }
  });
  console.log('index', index);
  const newArray: (string | boolean)[] = array.slice(0, index);
  if (index < array.length) {
    newArray.push(true);
  }
  return newArray;
});
</script>

<style lang="scss" scoped>
.searchPage {
  width: 100%;
  height: 100%;
  position: absolute;
  background: white;
  top: 0;
  z-index: 999;
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
.coverPage-enter-from,
.coverPage-leave-to {
  top: 100rem;
}
.coverPage-enter-active {
  transition: all 0.2s ease;
}
.coverPage-enter-to,
.coverPage-leave-from {
  top: 0;
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
