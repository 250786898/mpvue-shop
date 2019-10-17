<template>
  <div v-if="shown">
    <div class="backdrop" @click="$emit('update:shown', false)"></div>
    <div class="timerange-picker">
      <div class="timerange-picker__hd">{{ title }}</div>
      <div class="timerange-picker__bd">
        <template v-if="list && list.length">
          <div class="timerange-picker__aside">
            <div v-for="(dayItem, dayIndex) in list"
              class="timerange-picker__aside__item"
              :class="{ active: dayIndex === tempSelectedDay }"
              @click="tempSelectedDay = dayIndex">
              {{ dayItem.title }}
            </div>
          </div>
          <div class="timerange-picker__mainer" v-if="list[tempSelectedDay]">
            <div class="weui-cell"
              v-for="(item, index) in list[tempSelectedDay].ranges"
              :class="{
                active: tempSelectedDay === selectedDay &&
                  selectedRange === index
              }"
              @click="select(index)"
              >
              <div class="weui-cell__bd">{{ item.startTime }}-{{ item.endTime }}</div>
              <div class="weui-cell__ft">{{ item.desc }}</div>
              <icon type="success_no_circle"
                v-if="tempSelectedDay === selectedDay && selectedRange === index"
                color="#fff"
                size="12">
              </icon>
            </div>
          </div>
        </template>
        <div v-else class="timerange-picker__empty-tip">
          {{ emptyTip }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      data: {
        type: Array,
        default: () => ([])
      },
      shown: {
        type: Boolean,
        default: false
      },
      value: {
        type: Object,
        default: () => ({})
      },
      emptyTip: String
    },

    model: {
      prop: 'value',
      event: 'change'
    },

    data() {
      return {
        selectedDay: 0,
        tempSelectedDay: 0,
        selectedRange: -1,
        list: []
      }
    },

    methods: {
      select(rangeIndex) {
        this.selectedRange = rangeIndex
        this.selectedDay = this.tempSelectedDay

        let day = this.data[this.tempSelectedDay]
        let range = day.ranges[rangeIndex]

        this.$emit('change', {
          day: day.title,
          date: range.date,
          startTime: range.startTime,
          endTime: range.endTime
        })
        this.$emit('update:shown', false)
      },
      gengxin () {
        return 1
      }
    },

    watch: {
      shown(val) {
        if (val && this.value && this.value.day) {
          this.selectedDay =
          this.tempSelectedDay = this.data
            .findIndex(item => item.title === this.value.day)

          let ranges = this.data[this.selectedDay] &&
            this.data[this.selectedDay].ranges

          if (ranges) {
            this.selectedRange = ranges.findIndex(item => {
              return item.startTime === this.value.startTime &&
                item.endTime === this.value.endTime
            })
          }
        }
      },
      data(v) {
        this.list = v.map(item => {
          let json = Object.assign({}, item)

          if(json.title.includes('-')){
            let ite = json.title.split('-')
            json.title = `${ite[1]}-${ite[2]}`
          }
          console.log('json',json)


          return json
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .timerange-picker {
    position: fixed;
    z-index: 11;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    &__hd {
      text-align: center;
      line-height: 100rpx;
      font-size: 30rpx;
      border-bottom: 1rpx solid #E7E7E7;
    }
    &__bd {
      height: 476rpx;
      display: -webkit-flex;
      display: flex;
    }
    &__aside {
      width: 200rpx;
      background-color: #F3F3F3;
      &__item {
        font-size: 30rpx;
        text-align: center;
        line-height: 100rpx;
        color: $text-gray;
        &.active {
          background-color: #fff;
          color: $text-black;
        }
      }
    }
    &__mainer {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      .weui-cell {
        position: relative;
        padding-top: 28rpx;
        padding-bottom: 28rpx;
        &__bd,
        &__ft {
          font-size: 28rpx;
          color: $text-black;
        }
        &.active {
          .weui-cell {
            &__bd,
            &__ft {
              color: $theme-color-light;
            }
          }
          &:after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 56rpx;
            height: 56rpx;
            background-image: -webkit-linear-gradient(top right, #10D4C6, #10D4C6 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0));
            background-image: linear-gradient(top right, #10D4C6, #10D4C6 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0));
          }
        }
        icon {
          position: absolute;
          right: 4rpx;
          top: 4rpx;
          z-index: 2;
        }
      }
    }
    &__empty-tip {
      line-height: 476rpx;
      text-align: center;
      font-size: 32rpx;
      color: #999;
      flex: 1;
    }
  }
</style>
