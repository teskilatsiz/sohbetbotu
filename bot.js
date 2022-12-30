const girdi = document.querySelector('#kullanici-mesaji');
const gonderDugme = document.querySelector('#gonder-dugme');
const mesajlarDiv = document.querySelector('#mesajlar');
const eskiMesajlarUl = document.getElementById("eski-mesajlar");

girdi.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    mesajGonder();
  }
});
gonderDugme.addEventListener('click', mesajGonder);

function mesajGonder() {
  const mesaj = girdi.value;
  if (mesaj) {
    mesajEkle(mesaj, 'kullanici');
    sohbetRobotuCevabiAl(mesaj).then((cevap) => {
      mesajEkle(cevap, 'sohbet-robotu');
    });
    girdi.value = '';
  }
}

function mesajEkle(mesaj, gonderen) {
  const mesajDiv = document.createElement('div');
  mesajDiv.classList.add('mesaj');
  mesajDiv.classList.add(gonderen);
  mesajDiv.innerText = mesaj;
  mesajlarDiv.appendChild(mesajDiv);
  mesajlarDiv.scrollTop = mesajlarDiv.scrollHeight;
}

async function sohbetRobotuCevabiAl(mesaj) {
  const cevaplar = await fetch('soruvecevaplar.txt');
  const cevaplarMetin = await cevaplar.text();
  const cevapSatirlari = cevaplarMetin.split('\n');
  for (const satir of cevapSatirlari) {
    const [soru, cevap] = satir.split('|');
    if (soru === mesaj) {
      return cevap;
    }
  }
  return 'Üzgünüm, anlamadım. Başka bir soru sormaya ne dersin?';
}

  