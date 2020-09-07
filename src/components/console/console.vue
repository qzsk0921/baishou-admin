<template>
  <div class="console-container" ref="console" :style="customStyle">
    <div class="dragable" ref="head" @mousedown="mousedownHandle" @click.stop="clickHandle">
      <div class="drag-handle"></div>
      <div class="close"></div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bDrag: null,
      disY: null,
      consoleDom: null,
      customStyle: {
        top: '50%'
      },
      innerHeight: window.innerHeight
    }
  },
  mounted() {
    document.addEventListener('mouseup', this.mouseupHandle)
    document.addEventListener('mousemove', this.dragHandle)
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.mouseupHandle)
    document.removeEventListener('mousemove', this.dragHandle)
  },
  methods: {
    mousedownHandle(event) {
      const e = event || window.event
      this.bDrag = true
      // disX = e.clientX - this.refs.console.offsetTop
      this.consoleDom = this.$refs.console
      this.disY = e.clientY - this.consoleDom.offsetTop
      this.consoleDom.setCapture && this.consoleDom.setCapture()
      // return false
    },
    dragHandle(event) {
      if (!this.bDrag) return
      const e = event || window.event
      e.preventDefault()
      let iT = e.clientY - this.disY
      // let maxT = document.documentElement.clientHeight - this.consoleDom.offsetHeight
      // iT = iT < 0 ? 0 : iT
      iT = iT < 0 ? 0 : iT > this.innerHeight - 86 ? this.innerHeight - 86 : iT
      // iT = iT > maxT ? maxT : iT
      // console.log(iT)
      // oWin.style.marginTop = oWin.style.marginLeft = 0
      // oWin.style.top = iT + 'px'
      // return false
      this.customStyle.top = iT + 'px'
    },
    mouseupHandle(event) {
      // console.log('mouseupHandle')
      this.bDrag = false
      const headDom = this.$refs.head
      // document.onmouseup = window.onblur = consoleDom.onlosecapture =
      headDom.releaseCapture && headDom.releaseCapture()
    },
    clickHandle(e) {
      if (e.target.className === 'close') {
        this.$emit('console', 'close')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.console-container {
  .dragable {
    margin-bottom: 20px;
    border-top: 1px solid #d3d3d3;
    border-bottom: 1px solid #d3d3d3;
    background-color: #f6f6f6;
    cursor: ns-resize;
    display: flex;
    justify-content: flex-end;
    position: relative;
    .drag-handle {
      box-sizing: content-box;
      width: 20px;
      height: 5px;
      position: absolute;
      left: 50%;
      top: 60%;
      transform: translate(-50%, -50%);
      &::before,
      &::after {
        position: absolute;
        left: 0;
        content: '';
        height: 1px;
        width: 100%;
        background-color: #5b5b5b;
        transform-origin: center;
      }
      &::before {
        bottom: 0;
      }
      &::after {
        top: 0;
      }
    }
    .close {
      box-sizing: content-box;
      padding: 10px;
      width: 14px;
      height: 14px;
      position: relative;
      overflow: hidden;
      &::before,
      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        content: '';
        height: 1px;
        width: 13px;
        background-color: #5b5b5b;
        transform-origin: center;
      }
      &::before {
        transform: translate(-50%, -50%) rotateZ(45deg);
      }
      &::after {
        transform: translate(-50%, -50%) rotateZ(-45deg);
      }
      &:hover {
        cursor: default;
      }
      &:hover:before,
      &:hover:after {
        background-color: #000;
      }
    }
  }
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  // height: 50%;
  top: 50%;
  background-color: #fff;
  z-index: 999;
}
</style>