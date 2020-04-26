export default {
  methods: {
    scrollTop() {
      let el = this.$el.querySelector('.content-right');
      el && (el.scrollTop = 0);
    }
  }
};
