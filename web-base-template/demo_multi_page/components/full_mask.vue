<template>
  <div :class="$style['mask']"
    :style="{ zIndex }"
    v-if="visible"
    @click.stop="handleClick">
    <div :class="$style['center']"
      v-if="$slots['center']"
      @click.stop>
      <slot name="center"></slot>
    </div>
  </div>
</template>

<script>
let globalZIndex = 5000;

export default {
  props: {
    closedOnClick: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      zIndex: 5000,
    }
  },
  created() {
    this.zIndex = globalZIndex;
    globalZIndex++;
  },
  methods: {
    handleClick() {
      if (this.closedOnClick) {
        this.$emit('update:visible', false);
      }
    },
  }
}
</script>

<style module>
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
