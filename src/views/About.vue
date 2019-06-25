<template>
  <div class="about wave">
    <div class="wave-1"></div>
    <div class="wave-2"></div>
    <div class="wave-3"></div>
    <div class="wave-4"></div>
    <div class="wave-5"></div>
    <div class="wave-6"></div>
    <div class="wave-7"></div>
    <div class="wave-8"></div>
    <div class="wave-9"></div>
  </div>
</template>

<style scoped lang="less">
  .about {
    text-align: center;
    height: 500px;
    width: 100%;
  }

  .wave-1 {
    .wave-base(rgba(185, 219, 228, 0.7), 9%, -60%);
    .wave-animation(7s, 0s, wave-1-anim);
  }

  .wave-2 {
    .wave-base(rgba(167, 218, 228, 0.8), 8%, -50%);
    .wave-animation(8s, -3s, wave-2-anim);
  }

  .wave-3 {
    .wave-base(rgba(70, 178, 200, 0.8), 7%, -35%);
    .wave-animation(9s, -5s, wave-3-anim);
  }

  .wave-4 {
    .wave-base(rgba(50, 130, 162, 0.8), 6%, -30%);
    .wave-animation(10s, 0s, wave-4-anim);
  }

  .wave-5 {
    .wave-base(rgba(40, 112, 140, 0.8), 5%, -20%);
    .wave-animation(12s, -5s, wave-5-anim);
  }

  .wave-6 {
    .wave-base(rgba(27, 77, 107, 0.8), 4%, -10%);
    .wave-animation(12s, 0s, wave-6-anim);
  }

  .wave-7 {
    .wave-base(rgba(8, 56, 81, 0.8), 0%, 5%);
    .wave-animation(15s, -5s, wave-7-anim);
  }

  .wave-8 {
    .wave-base(rgba(3, 40, 64, 0.8), 0%, 8%);
    .wave-animation(18s, 0s, wave-8-anim);
  }

  .wave-9 {
    .wave-base(rgba(0, 34, 56, 0.7), 0%, 10%);
    .wave-animation(20s, 0s, wave-9-anim);
  }

  .wave-base(@color,@radius,@top) {
    position: absolute;
    width: 5000px;
    height: 5000px;
    top: @top - 10%;
    left: 50%;
    background-color: @color;
    border-radius: 43%;
    transform: translate(-50%, 10%) rotate(0);
  }

  .wave {
    position: relative;
    background-color: rgb(227, 227, 227);
    overflow: hidden;
    transform: scaleX(5);
  }

  .wave-animation(@period, @delay, @name) {
    @keyframes @name {
      0% {
        transform: translate(-50%, 10%) rotate(180deg);
      }
      50% {
        transform: translate(-50%, 8%) rotate(180deg);
      }
      100% {
        transform: translate(-50%, 10%) rotate(360deg);
      }
    }
    animation: @name @period linear @delay infinite;
  }


</style>
