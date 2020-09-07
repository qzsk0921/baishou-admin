<template>
  <div class="class-container">
    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
@import '~@/style/mixin.scss';

.class-container {
  @include scrollbar-none;
  padding: 25px 20px;
  height: calc(100vh - 50px);
  overflow: auto;
}
</style>
