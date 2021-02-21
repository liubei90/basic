<template>
  <transition name="el-notification-fade">
    <div
      :class="['el-notification', customClass, horizontalClass]"
      v-show="visible"
      :style="positionStyle"
      @mouseenter="clearTimer()"
      @mouseleave="startTimer()"
      @click="click"
      role="alert"
    >
      <i
        class="el-notification__icon"
        :class="[ typeClass, iconClass ]"
        v-if="type || iconClass">
      </i>
      <div class="el-notification__group" :class="{ 'is-with-icon': typeClass || iconClass }">
        <h2 class="el-notification__title" v-text="title"></h2>
        <div class="el-notification__content" v-show="message">
          <slot>
            <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
            <p v-else v-html="message"></p>
          </slot>
        </div>
        <div
          class="el-notification__closeBtn el-icon-close"
          v-if="showClose"
          @click.stop="close"></div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  let typeMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error'
  };

  export default {
    data() {
      return {
        visible: false,
        title: '',
        message: '',
        duration: 4500,
        type: '',
        showClose: true,
        customClass: '',
        iconClass: '',
        onClose: null,
        onClick: null,
        closed: false,
        verticalOffset: 0,
        timer: null,
        dangerouslyUseHTMLString: false,
        position: 'top-right'
      };
    },

    computed: {
      typeClass() {
        return this.type && typeMap[this.type] ? `el-icon-${ typeMap[this.type] }` : '';
      },

      horizontalClass() {
        return this.position.indexOf('right') > -1 ? 'right' : 'left';
      },

      verticalProperty() {
        return /^top-/.test(this.position) ? 'top' : 'bottom';
      },

      positionStyle() {
        return {
          [this.verticalProperty]: `${ this.verticalOffset }px`
        };
      }
    },

    watch: {
      closed(newVal) {
        if (newVal) {
          this.visible = false;
          this.$el.addEventListener('transitionend', this.destroyElement);
        }
      }
    },

    methods: {
      destroyElement() {
        this.$el.removeEventListener('transitionend', this.destroyElement);
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },

      click() {
        if (typeof this.onClick === 'function') {
          this.onClick();
        }
      },

      close() {
        this.closed = true;
        if (typeof this.onClose === 'function') {
          this.onClose();
        }
      },

      clearTimer() {
        clearTimeout(this.timer);
      },

      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.close();
            }
          }, this.duration);
        }
      },
      keydown(e) {
        if (e.keyCode === 46 || e.keyCode === 8) {
          this.clearTimer(); // detele 取消倒计时
        } else if (e.keyCode === 27) { // esc关闭消息
          if (!this.closed) {
            this.close();
          }
        } else {
          this.startTimer(); // 恢复倒计时
        }
      }
    },
    mounted() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
      document.addEventListener('keydown', this.keydown);
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.keydown);
    }
  };
</script>

<style>
  /* Notification
-------------------------- */
$--notification-width: 330px !default;
/// padding||Spacing|3
$--notification-padding: 14px 26px 14px 13px !default;
$--notification-radius: 8px !default;
$--notification-shadow: $--box-shadow-light !default;
/// color||Color|0
$--notification-border-color: $--border-color-lighter !default;
$--notification-icon-size: 24px !default;
$--notification-close-font-size: $--message-close-size !default;
$--notification-group-margin-left: 13px !default;
$--notification-group-margin-right: 8px !default;
/// fontSize||Font|1
$--notification-content-font-size: $--font-size-base !default;
/// color||Color|0
$--notification-content-color: $--color-text-regular !default;
/// fontSize||Font|1
$--notification-title-font-size: 16px !default;
/// color||Color|0
$--notification-title-color: $--color-text-primary !default;

/// color||Color|0
$--notification-close-color: $--color-text-secondary !default;
/// color||Color|0
$--notification-close-hover-color: $--color-text-regular !default;

/// color||Color|0
$--notification-success-icon-color: $--color-success !default;
/// color||Color|0
$--notification-info-icon-color: $--color-info !default;
/// color||Color|0
$--notification-warning-icon-color: $--color-warning !default;
/// color||Color|0
$--notification-danger-icon-color: $--color-danger !default;
.el-notification {
  display: flex;
  width: 330px;
  padding: 14px 26px 14px 13px;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid #EBEEF5;
  position: fixed;
  background-color: #FFFFFF;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: opacity .3s, transform .3s, left .3s, right .3s, top 0.4s, bottom .3s;
  overflow: hidden;

  &.right {
    right: 16px;
  }

  &.left {
    left: 16px;
  }

  @include e(group) {
    margin-left: 13px;
    margin-right: 8px;
  }

  @include e(title) {
    font-weight: bold;
    font-size: $--notification-title-font-size;
    color: $--notification-title-color;
    margin: 0;
  }

  @include e(content) {
    font-size: $--notification-content-font-size;
    line-height: 21px;
    margin: 6px 0 0 0;
    color: $--notification-content-color;
    text-align: justify;

    p {
      margin: 0;
    }
  }

  @include e(icon) {
    height: $--notification-icon-size;
    width: $--notification-icon-size;
    font-size: $--notification-icon-size;
  }

  @include e(closeBtn) {
    position: absolute;
    top: 18px;
    right: 15px;
    cursor: pointer;
    color: $--notification-close-color;
    font-size: $--notification-close-font-size;

    &:hover {
      color: $--notification-close-hover-color;
    }
  }

  .el-icon-success {
    color: $--notification-success-icon-color;
  }

  .el-icon-error {
    color: $--notification-danger-icon-color;
  }

  .el-icon-info {
    color: $--notification-info-icon-color;
  }

  .el-icon-warning {
    color: $--notification-warning-icon-color;
  }
}

.el-notification-fade-enter {
  &.right {
    right: 0;
    transform: translateX(100%);
  }

  &.left {
    left: 0;
    transform: translateX(-100%);
  }
}

.el-notification-fade-leave-active {
  opacity: 0;
}

</style>