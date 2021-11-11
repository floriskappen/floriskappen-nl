<template>
  <!-- Background -->
  <kinesis-container>
    <div class="w-screen h-screen bg-black-900 flex items-center justify-center relative text-white">
      <kinesis-element :strength="getParallaxStrength(10)">
        <div class="grid px-12 md:px-0 max-w-sm md:max-w-none md:grid-cols-3 w-screen h-screen relative gap-0 md:gap-8">
          <div tag="div" class="mt-8 md:mt-0 flex md:items-end justify-center flex-col z-10">
            <kinesis-element :strength="getParallaxStrength(15)" type="depth">
              <p class="font-bold lg:text-8xl md:text-7xl sm:text-8xl text-7xl mb-2">Hello.</p>
              <div class="flex lg:w-[265px] md:w-[201px] sm:w-[265px] w-[201px] space-x-4">
                <div class="w-[24px] h-1 bg-white flex-shrink-0 mt-[10px]"></div>
                <div>
                  <p>Floris Kappen</p>
                  <p class="opacity-40">Developer from The Netherlands. Likes creating things. Find those things here.</p>
                </div>
              </div>
            </kinesis-element>
          </div>
          <div class="flex items-center justify-center relative w-full">
            <div
              class="with-aspect w-full bg-transparent rounded-full border-white border-opacity-30 border-2 top-0 left-0 flex items-center justify-center"
              style="box-shadow: 0px 0px 10px #fff, 0px 0px 10px #fff inset"
            >
              <div class="bg-transparent rounded-full animate-shadow-big w-[75%]">
                <kinesis-element :strength="getParallaxStrength(10)">
                  <img class="w-full h-full object-contain rounded-full" src="/profile.png" style="filter: grayscale(50%), contrast(40%)" />
                </kinesis-element>
              </div>
            </div>
          </div>
          <div class="items-center justify-start z-10 hidden md:flex">
            <div class="space-y-4">
              <BaseIconLink icon="bx-chat" :style="getIndentation(0, 5)">
                Blog
              </BaseIconLink>
              <BaseIconLink icon="bxl-instagram" link="https://www.instagram.com/kadeflo/" :style="getIndentation(1, 5)">
                Photography
              </BaseIconLink>
              <BaseIconLink icon="bx-music" link="https://kadeflo.bandcamp.com/" :style="getIndentation(2, 5)">
                Music
              </BaseIconLink>
              <BaseIconLink icon="bxl-linkedin" link="https://www.linkedin.com/in/floriskappen/" :style="getIndentation(3, 5)">
                LinkedIn
              </BaseIconLink>
              <BaseIconLink icon="bx-joystick" link="https://kadeflo.itch.io/" :style="getIndentation(4, 5)">
                Games
              </BaseIconLink>
            </div>
          </div>
          <div class="md:hidden w-full flex items-center justify-center">
            <div class="grid grid-cols-2 w-fit">
              <BaseIconLink icon="bx-chat">
                Blog
              </BaseIconLink>
              <BaseIconLink icon="bxl-instagram" link="https://www.instagram.com/kadeflo/">
                Photography
              </BaseIconLink>
              <BaseIconLink icon="bx-music" link="https://kadeflo.bandcamp.com/">
                Music
              </BaseIconLink>
              <BaseIconLink icon="bxl-linkedin" link="https://www.linkedin.com/in/floriskappen/">
                LinkedIn
              </BaseIconLink>
              <BaseIconLink icon="bx-joystick" link="https://kadeflo.itch.io/">
                Games
              </BaseIconLink>
            </div>
          </div>
        </div>
      </kinesis-element>

    </div>
  </kinesis-container>
  <div :class="[ 'g-cursor', { 'g-cursor_hover': hover }, { 'g-cursor_hide': hideCursor || isTouch() } ]">
    <div :style="cursorCircle" class="g-cursor__circle"></div>
    <div class="g-cursor__point" ref="point" :style="cursorPoint"></div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { KinesisContainer, KinesisElement } from 'vue-kinesis'
import BaseIconLink from '../components/BaseIconLink.vue'
import isTouch from '../utils/isTouch.js'

export default {
  components: {
    KinesisContainer,
    KinesisElement,
    BaseIconLink
  },

  setup() {
    const xChild = ref(0)
    const yChild = ref(0)
    const xParent = ref(0)
    const yParent = ref(0)
    const hover = ref(false)
    const hideCursor = ref(true)
    const aspectDivs = ref([])

    const cursorCircle = computed(() => `transform: translateX(${xParent.value}px) translateY(${yParent.value}px) translateZ(0) translate3d(0, 0, 0);`)
    const cursorPoint = computed(() => `transform: translateX(${xChild.value - 5}px) translateY(${yChild.value - 5}px) translateZ(0) translate3d(0, 0, 0);`)
  
    const moveCursor = (e) => {
      xChild.value = e.clientX;
      yChild.value = e.clientY;
      setTimeout(() => {
        xParent.value = e.clientX - 15;
        yParent.value = e.clientY - 15;
      }, 100);
    }

    const mouseLeave = () => {
      hideCursor.value = true;
    }
    const mouseEnter = () => {
      hideCursor.value = false;
    }

    const getIndentation = (i, total) => {
      function easeInSine(x) {
        return 1 - Math.cos((x * Math.PI) / 2);
      }

      const maxIndentation = 18
      let amount = i / (total - 1) - .5
      if (amount <= 0) {
        amount *= -1
      }
      amount *= 2
      return {
        transform: `translateX(-${maxIndentation * easeInSine(amount)}px)`
      }
    }

    const getParallaxStrength = (desiredStrength) => {
      if (isTouch()) {
        return 0
      }

      return desiredStrength
    }

    const setAspect = () => {
      for (let i = 0; i < aspectDivs.value.length; i++) {
        const el = aspectDivs.value[i];
        if (!el) {
          aspectDivs.value = document.querySelectorAll('.with-aspect')
        }
        el.style.height = `${el.clientWidth}px`
      }
    }

    onMounted(() => {
      document.addEventListener('mousemove', moveCursor);
      document.addEventListener('mouseleave', mouseLeave);
      document.addEventListener('mouseenter', mouseEnter);


      aspectDivs.value = document.querySelectorAll('.with-aspect')
      window.addEventListener('resize', setAspect)

      setAspect()
    })

    onBeforeUnmount(() => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', mouseLeave);
      document.removeEventListener('mouseenter', mouseEnter);
      window.removeEventListener('resize', setAspect)
    })

    return {
      xChild,
      yChild,
      xParent,
      yParent,
      hover,
      hideCursor,
      cursorCircle,
      cursorPoint,
      moveCursor,
      getIndentation,
      setAspect,
      aspectDivs,
      getParallaxStrength,
      isTouch
    }
  },
}
</script>
