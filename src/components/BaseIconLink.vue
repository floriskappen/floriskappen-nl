<template>
  <a class="transition-all duration-700 opacity-60 hover:opacity-100 flex items-center cursor-none ml-0 hover:ml-3 hover:text-red-500" :href="link" target="_blank">
    <i class="bx w-5 h-5 inline mr-1 mt-1" :class="icon"></i>
    <slot />
  </a>
</template>

<script>

export default {
  props: {
    icon: String,
    link: String
  }
}
</script>
