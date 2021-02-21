<template>
  <transition name="el-message-fade" @after-leave="handleAfterLeave">
    <div
      :class="[
        'el-message',
        type && !iconClass ? `el-message--${ type }` : '',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass
      ]"
      :style="positionStyle"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      role="alert">
      <i :class="iconClass" v-if="iconClass"></i>
      <i :class="typeClass" v-else></i>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="el-message__content">{{ message }}</p>
        <p v-else v-html="message" class="el-message__content"></p>
      </slot>
      <i v-if="showClose" class="el-message__closeBtn el-icon-close" @click="close"></i>
    </div>
  </transition>
</template>

<script>
  const typeMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error'
  };

  export default {
    data() {
      return {
        visible: false,
        message: '',
        duration: 3000,
        type: 'info',
        iconClass: '',
        customClass: '',
        onClose: null,
        showClose: false,
        closed: false,
        verticalOffset: 20,
        timer: null,
        dangerouslyUseHTMLString: false,
        center: false
      };
    },

    computed: {
      typeClass() {
        return this.type && !this.iconClass
          ? `el-message__icon el-icon-${ typeMap[this.type] }`
          : '';
      },
      positionStyle() {
        return {
          'top': `${ this.verticalOffset }px`
        };
      }
    },

    watch: {
      closed(newVal) {
        if (newVal) {
          this.visible = false;
        }
      }
    },

    methods: {
      handleAfterLeave() {
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },

      close() {
        this.closed = true;
        if (typeof this.onClose === 'function') {
          this.onClose(this);
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
        if (e.keyCode === 27) { // esc关闭消息
          if (!this.closed) {
            this.close();
          }
        }
      }
    },
    mounted() {
      this.startTimer();
      document.addEventListener('keydown', this.keydown);
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.keydown);
    }
  };
</script>

<style>
.el-message {
  min-width: 380px;
  box-sizing: border-box;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: #EBEEF5;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  background-color: #edf2fc;
  transition: opacity 0.3s, transform .4s, top 0.4s;
  overflow: hidden;
  padding: 15px 15px 15px 20px;
  display: flex;
  align-items: center;
}
.el-message.is-center {
    justify-content: center;
  }
.el-message.is-closable .el-message__content {
      padding-right: 16px;
    }
.el-message p {
    margin: 0;
  }
.el-message.el-message--info .el-message__content {
      color: #909399;
    }
.el-message.el-message--success {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
  }
.el-message.el-message--success .el-message__content {
      color: #67C23A;
    }
.el-message.el-message--warning {
    background-color: #fdf6ec;
    border-color: #faecd8;
  }
.el-message.el-message--warning .el-message__content {
      color: #E6A23C;
    }
.el-message.el-message--error {
    background-color: #fef0f0;
    border-color: #fde2e2;
  }
.el-message.el-message--error .el-message__content {
      color: #F56C6C;
    }
.el-message .el-message__icon {
    margin-right: 10px;
  }
.el-message .el-message__content {
    padding: 0;
    font-size: 14px;
    line-height: 1;
  }
.el-message .el-message__content:focus {
      outline-width: 0;
    }

.el-message .el-message__closeBtn {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #C0C4CC;
  font-size: 16px;
}
.el-message .el-message__closeBtn:focus {
  outline-width: 0;
}
.el-message .el-message__closeBtn:hover {
  color: #909399;
}
.el-message .el-icon-success {
    color: #67C23A;
  }
.el-message .el-icon-error {
    color: #F56C6C;
  }
.el-message .el-icon-info {
  color: #909399;
}
.el-message .el-icon-warning {
  color: #E6A23C;
}
.el-message-fade-enter,
.el-message-fade-leave-active {
  opacity: 0;
  transform: translate(-50%, -100%);
}

</style>
