var app = new Vue({
  el: '#app',
  data: {
    greencard: {},
    guiabolso: {},
    extract: null,
    loginError: null,
  },
  methods: {
    getExtract() {
      this.loginError = false;

      axios({ method: "POST", "url": "greencards", "data": this.greencard, "headers": { "content-type": "application/json" } })
        .then(result => {
          this.extract = result.data;
        }, error => {
          this.loginError = error.response.data;
        });
    },
    sendTransactions() {
      this.guiabolso.transactions = this.extract;
      axios({ method: "POST", "url": "guiabolso", "data": this.guiabolso, "headers": { "content-type": "application/json" } })
        .then(result => {
          console.log(result);
        }, error => {
          console.error(error);
          this.loginError = error.response.data;
        });
    }
  }
});