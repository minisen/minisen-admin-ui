<template>
  <div class="iframe-container">
    <iframe :src="src" scrolling="auto" frameborder="0" class="frame" :onload="onloaded()">
    </iframe>
  </div>
</template>

<script src="./IFrame.js" />

<style lang="scss">
.iframe-container {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;;
  bottom: 0px;
  .frame {
    width: 100%;
    height: 100%;
  }
}
</style>
