var app = new Vue({
  el: '#app',
  data: {
    greencard: {},
    extract: [{"date":"12/01/2020","value":"R$ 91,63","text":"PASTELARIA"},{"date":"30/12/2019","value":"R$ 90,14","text":"SUPERMERCADOS DO JOAO"},{"date":"21/12/2019","value":"R$ 677,63","text":"SUPERMERCADOS ANGELONI"},{"date":"20/12/2019","value":"R$ 507,10","text":"DISPONIB. BENEFICIO"},{"date":"28/11/2019","value":"R$ 484,05","text":"DISPONIB. BENEFICIO"},{"date":"23/11/2019","value":"R$ 410,76","text":"SUPERMERCADOS PEDRO"},{"date":"28/10/2019","value":"R$ 661,00","text":"DISPONIB. BENEFICIO"}],
    loginError: false
  },
  methods: {
    getExtract() {
      this.loginError = false;

      axios({ method: "POST", "url": "greencards", "data": this.greencard, "headers": { "content-type": "application/json" } })
        .then(
          result => {
            this.extract = result.data;
          }, error => {
            this.loginError = error.response.data;
          });
    }
  }
});