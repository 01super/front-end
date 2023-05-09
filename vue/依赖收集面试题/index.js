import { createApp, ref } from "./mine";

createApp("#app", {
  refs: {
    title: ref("This is Title"),
    content: ref("This is Content"),
  },
  methods: {
    setTitle() {
      this.title.value = "这是标题";
    },
    setContent() {
      this.content.value = "这是内容";
    },
    reset() {
      this.title.$reset();
      this.content.$reset();
    },
  },
});
