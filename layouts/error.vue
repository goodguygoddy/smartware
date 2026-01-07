<template>
  <div class="max-w-7xl m-auto px-4 sm:px-6 lg:px-8">
    <!-- We've used 3xl here, but feel free to try other max-widths based on your needs -->
    <div class="max-w-3xl m-auto">
      <!-- Content goes here -->
      <div>
        <lottie-animation
          ref="animation"
          :animation-data="require('@/assets/lottie/page-not-found-404.json')"
          :loop="true"
          :speed="1"
        />
      </div>

      <div class="p-2 w-full">
        <button
          type="button"
          class="
            flex
            mx-auto
            text-white text-xs
            sm:text-base
            border-0
            px-2.5
            py-1.5
            sm:px-4 sm:py-2
            focus:outline-none
            bg-indigo-500
            hover:bg-indigo-600
            rounded
          "
        >
          <NuxtLink to="/">Go Back</NuxtLink>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import LottieAnimation from 'lottie-web-vue';

export default {
  components: {
    LottieAnimation,
  },
  layout: 'error-layout',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
};
</script>
