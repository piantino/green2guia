import crawler from "crawler";

crawler.direct({
    uri: "https://www.grupogreencard.com.br/sysweb/site/loginUsuario",
    callback: function(err, res, done){
        if(err) {
            console.log(error);
        } else {
            console.log('Grabbed', res.statusCode, res.body.length, 'bytes');

            const captcha = res.$(".eL-captcha strong").text();
            console.log('Captcha', res.$(".eL-captcha strong").text());

            login(captcha);
        }
        done();
    }
});

function login(captchaValue) {
    
    
    crawler.direct({
        uri: "https://www.grupogreencard.com.br/sysweb/site/loga_usuario",
        cpf: "045.614.349-43",
        senha: "6472932",
        'captcha-value': captchaValue,
        callback: function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                console.log('Grabbed', res.statusCode,  res.body.length, 'bytes');
            }
            done();
        }
    });   
    
}