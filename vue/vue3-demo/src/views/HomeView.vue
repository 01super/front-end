<script lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
export default {
  components: {
    TheWelcome
  },
  beforeCreate() {
    console.log('Father beforeCreate')
  },
  created() {
    console.log('Father created')
  },
  mounted() {
    console.log('Father mounted')
  }
}
</script>

<template>
  <main>
    <TheWelcome />
    <details>
      <summary>总结</summary>
      <p>this is a details demo</p>
      <p>this is a details demo</p>
    </details>
    <details>
      <summary>总结</summary>
      <p>this is a details demo</p>
    </details>
    <mark>this is a mark demo</mark>
    <hr>
    <meter value="2" min="0" max="10"></meter><br>
    <meter value="0.6">60%</meter>
    <progress value="22" max="100"></progress>
    <ruby>
      汉 <rp>(</rp><rt>Han</rt><rp>)</rp>
      字 <rt>zi</rt>
    </ruby>
    <p>我们在每天早上 <time>9:00</time> 开始营业。</p>
    <p>我在 <time datetime="2016-02-14">情人节</time> 有个约会。</p>
    <p id="dataEl" data-name="hello">学习 AJAX ,您必须熟悉 <wbr>Http<wbr>Request 对象。</p>
  </main>
</template>
