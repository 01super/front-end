<script setup lang="ts">
import { useAttrs, useSlots } from 'vue'
// 默认值props
const props = withDefaults(defineProps<{
  msg: string
}>(), {
  msg: 'hello world!'
})
console.log('props: ',props.msg);
// defineEmits和defineProps获取父组件传过来值和事件
const emit = defineEmits(['handleLog'])

// 自定义指令，必须遵循 vNameOfDirective 这样的命名规范
// 如果指令是从别处导入的，可以通过重命名来使其符合命名规范：
// import { myDirective as vMyDirective } from './MyDirective.js'
const vChangeColor = {
  beforeMount: (el: HTMLElement) => {
    el.style.color = '#0000ff';
    el.addEventListener('click', () => {
      console.log('clicked!!!');
      emit('handleLog', 'test emit')
    })
  }
}

const slots = useSlots();

const attrs = useAttrs();

console.log(122, attrs, slots);
// 使用 defineExpose 子组件传父组件
// 父组件通过 ref 拿 childRef.value.doSth();
</script>

<template>
  <div class="greetings">
    <slot name="slt"></slot>
    <h1 v-change-color class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
