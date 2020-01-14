import Crawler from "crawler";

var crawler = new Crawler({
    rateLimit: 2000,
    maxConnections: 1
});

function iniciar(cpf, pwd) {

    crawler.direct({
        uri: "https://www.grupogreencard.com.br/sysweb/site/loginUsuario",
        callback: function(err, res, done){
            if(err) {
                console.log(error);
                return;
            }
            console.log('Grabbed', res.statusCode, res.body.length, 'bytes');
            
            const captcha = res.$(".eL-captcha strong").text();
            console.log('Captcha', captcha);
            
            const captchaOptions = {};
            res.$(".eL-possibilities img").each(function(i, e) {
                const img = res.$(e);
                captchaOptions[img.attr("alt")] = img.attr("data-value");
            });

            console.info('Options', captchaOptions);

            const captchaValue = captchaOptions[captcha];
            console.info('Captcha value', captchaValue);

            login(cpf, pwd, captchaValue);
        }
    });
    
}
 
function login(cpf, pwd, captchaValue) {
        
        
    crawler.direct({
        uri: "https://www.grupogreencard.com.br/sysweb/site/loga_usuario",
        cpf: cpf,
        senha: pwd,
        'captcha-value': captchaValue,
        callback: function (error, res, done) {
            if(error){
                console.log(error);
                return;
            }
            console.log('Grabbed', res.statusCode,  res.body.length, 'bytes');
            console.log('Error:', res.$("#erro p").text());
        }
    });   
    
}

iniciar(1, 2);