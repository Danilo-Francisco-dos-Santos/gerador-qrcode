const botaoTexto = document.getElementById('botao-texto');
const botaoWifi = document.getElementById('botao-wifi');
const gerarQRCode = document.getElementById('gerar_qrcode');
const imagemQRCode = document.getElementById('imagem-qr');
const imgGerar = document.getElementById('img-gerada');
const baixarPNG = document.getElementById('baixar-png');
const baixarSVG = document.getElementById('baixar-svg');

var options = 1;

botaoTexto.addEventListener('click', () => {
    const textoInput = document.querySelector('.form-floating');
    textoInput.classList.remove('visually-hidden');

    const wifiInput = document.querySelector('.wifi');
    wifiInput.classList.add('visually-hidden');

    options = 1;
});

botaoWifi.addEventListener('click', () => {

    const textoInput = document.querySelector('.form-floating');
    textoInput.classList.add('visually-hidden');

    const wifiInput = document.querySelector('.wifi');
    wifiInput.classList.remove('visually-hidden');

    options = 2;
});

gerarQRCode.addEventListener('click', () => {

    const wifiNome = document.getElementById('wifi-nome');
    const wifiSenha = document.getElementById('wifi-senha');
    const wifiCriptografia = document.querySelector('input[name="inlineRadioOptions"]:checked');
    const wifiOculto = document.getElementById('wifi-oculto');
    const texto = document.getElementById('texto');

    switch (options) {
        case 1:
            if (texto.value == "") {
                imagemQRCode.classList.add('visually-hidden');
            } else {
                imgGerar.src = `https://api.qrserver.com/v1/create-qr-code/?size=928x928&data=${texto.value}`;
                imagemQRCode.classList.remove('visually-hidden');
            }
            break;
        case 2:

            const wifiOcultoValor = wifiOculto.checked ? 'true' : 'false';

            if (wifiNome.value == "" || wifiSenha.value == "") {
                imagemQRCode.classList.add('visually-hidden');
            } else {
                imgGerar.src = `https://api.qrserver.com/v1/create-qr-code/?size=928x928&data=WIFI:S:${wifiNome.value};T:${wifiCriptografia.value};P:${wifiSenha.value};H:${wifiOcultoValor};;`;
                imagemQRCode.classList.remove('visually-hidden');
            }
            break;
    }

});

baixarPNG.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = imgGerar.src;
    link.download = 'qrcode.png';
    link.click();
});

baixarSVG.addEventListener('click', () => {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(imgGerar);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'qrcode.svg';
    link.click();
});