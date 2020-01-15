var app = new Vue({
  el: '#app',
  data: {
    greencard: {},
    extract: []
  },
  methods: {
    getExtract() {
      axios({ method: "POST", "url": "greencards", "data": this.greencard, "headers": { "content-type": "application/json" } })
        .then(
          result => {
            this.extract = result.data;
          }, error => {
            console.error(error);
          });
    }
  }
});