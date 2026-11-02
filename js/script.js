const chapters = [
  {
    title: "O que admiro em você",
    text: "Sabe uma das coisas que mais gosto em você? é o seu jeito de ser, gosto dessa sua personalidade, desse seu jeito de bobona mas sincera e sse precisar da uns puxada de orelha, das suas brincadeiras, mesmo sem perceber consegue arrancar sorrisos de mim, admiro a pessoa que você é, a maneira como enxerga as coisas e até o jeito que demonstra seus sentimentos, talvez você não perceba o quanto é especial, mas eu percebo, e não estou falando apenas das suas qualidades mais bonitas, mas também das suas imperfeições, porque elas fazem parte de quem você é, não quero gostar de uma versão idealizada sua, quero gostar de você, de verdade, com tudo aquilo que te faz ser a vitória"
  },
  {
    title: "detalhes que me encantam",
    text: "eu poderia passar horas falando sobre o quanto você é linda, mas existem tantas outras coisas que me encantam em você, seu jeito de falar, suas manias, suas expressões e até aquelas fotos que você me manda do nada e me deixam sem saber o que responder, gosto de reparar em cada detalhe seu até nos menores, porque são justamente essas coisinhas que ficam guardadas na minha cabeça, as vezes você faz alguma coisa sem nem perceber e eu fico pensando no quanto gosto disso em você, acho que uma das coisas mais bonitas de gostar de alguém e começar a encontrar beleza até naquilo que a própria pessoa considera comum, e com você acontece exatamente assim"
  },
  {
    title: "Coisas que gostaria de viver com você",
    text: "tem tanta coisa que ainda quero viver ao seu lado, quero conhecer seu abraço, sentir seu carinho, poder olhar nos seus olhos enquanto conversamos e finalmente não precisar imaginar como seria ter você pertinho de mim, quero viver os momentos grandes, mas também os mais bobos, quero conhecer lugares com você, descobrir suas preferências, criar nossas próprias brincadeiras e colecionar lembranças que um dia vamos recordar sorrindo, não preciso que todos os nossos momentos sejam extraordinários, porque sinceramente, acredito que até os dias mais comuns podem se tornar especiais quando estou com a pessoa certa, e é com você que quero viver tudo isso"
  },
  {
    title: "Se eu pudesse te dizer uma última coisa",
    text: "se eu pudesse deixar apenas uma coisa escrita aqui, seria que você nunca duvide do quanto é amada por mim, eu sei que nem sempre vou encontrar as palavras certas para demonstrar tudo o que sinto, mas isso nunca vai diminuir o que existe aqui dentro, não vou te prometer uma história perfeita, porque sei que teremos nossos dias difíceis, nossas diferenças e momentos em que talvez nem saibamos muito bem como lidar com as coisas, mas quero que saiba que sempre vai poder contar comigo, eu me apaixonei por você sendo exatamente quem você é, por essa sua versão bobinha, pelo seu jeitinho, pelas suas brincadeiras e por todas aquelas pequenas coisas que fazem você ser você, não quero que sinta que precisa mudar sua personalidade ou deixar de lado alguma parte de si para me agradar, eu amo seu jeito, sua voz, seus olhos, seu sorriso e cada detalhe que existe em você, não quero conhecer outra pessoa no seu lugar, quero continuar conhecendo cada vez mais a pessoa por quem me apaixonei, e quando as coisas estiverem difíceis, quando tiver problemas em casa, quando algum problema com sua mãe ou simplesmente quando estiver passando por um daqueles dias em que tudo parece estar dando errado quero que saiba que pode vir até mim, não precisa guardar tudo para si, nem ter medo de me contar o que está acontecendo, eu vou te escutar mesmo quando você não souber explicar o que sente, mesmo quando só precisar desabafar ou de alguém que fique ali com você, nunca vou achar seus problemas pequenos demais para serem ouvidos, você me faz bem de um jeito que talvez nem consiga imaginar, você é meu lar, meu motivo de sorrir em tantos momentos e uma das partes mais bonitas dos meus dias, e eu quero conseguir fazer o mesmo por você, quero te dar todo o amor que você merece, todo o carinho e cuidado que talvez em algum momento tenha sentido falta, quero que ao meu lado você se sinta amada de verdade, sem precisar ficar procurando provas disso ou se perguntando se é suficiente, e vitória se algum dia você se perguntar o que fez para ser tão importante pra mim, espero que se lembre de que não precisou fazer nada extraordinário, você simplesmente foi você, aquela menina bobinha por quem me apaixonei, e isso já foi suficiente para conquistar um espaço enorme na minha vida, eu te amo muito, e espero conseguir te fazer o quanto é especial pra mim"
  }
];

const lastChapterPageLength = 900;
const pages = [];

function splitChapterText(text, maxLength) {
  const chunks = [];
  const pageCount = Math.ceil(text.length / maxLength);
  const targetLength = Math.ceil(text.length / pageCount);
  let start = 0;

  while (start < text.length) {
    let end = Math.min(start + targetLength, text.length);
    if (end < text.length) {
      const lastSpace = text.lastIndexOf(" ", end);
      if (lastSpace > start) end = lastSpace + 1;
    }
    chunks.push(text.slice(start, end));
    start = end;
  }
  return chunks;
}

chapters.forEach((chapter, chapterIndex) => {
  const textPages = chapterIndex === 3
    ? splitChapterText(chapter.text, lastChapterPageLength)
    : [chapter.text];

  textPages.forEach((text, pageIndex) => {
    pages.push({
      chapter,
      chapterNumber: chapterIndex + 1,
      text,
      pageInChapter: pageIndex + 1,
      chapterPageCount: textPages.length
    });
  });
});

pages.push({ finalPage: true });

const book = document.querySelector("#book");
const cover = document.querySelector("#cover");
const reader = document.querySelector("#reader");
const pageArea = document.querySelector("#page-area");
const progressTrack = document.querySelector(".progress-track");
const progressFill = document.querySelector("#progress-fill");
const pageCount = document.querySelector("#page-count");
const previousButton = document.querySelector("#previous-page");
const nextButton = document.querySelector("#next-page");
let currentPage = 0;

function createNightSky() {
  const sky = document.createElement("div");
  sky.className = "night-sky";
  sky.setAttribute("aria-hidden", "true");

  const moon = document.createElement("span");
  moon.className = "moon";
  sky.append(moon);

  for (let index = 0; index < 32; index += 1) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${(index * 37 + 9) % 96}%`;
    star.style.top = `${(index * 53 + 7) % 75}%`;
    star.style.animationDelay = `${(index % 8) * -0.37}s`;
    sky.append(star);
  }

  for (let index = 0; index < 5; index += 1) {
    const heart = document.createElement("span");
    heart.className = "tiny-heart";
    heart.textContent = "♡";
    heart.style.left = `${14 + index * 17}%`;
    heart.style.top = `${58 + (index % 2) * 13}%`;
    heart.style.animationDelay = `${index * -0.6}s`;
    sky.append(heart);
  }

  return sky;
}

function renderPage() {
  const page = pages[currentPage];
  pageArea.replaceChildren();

  if (page.finalPage) {
    const closing = document.createElement("section");
    closing.className = "final-page";
    closing.append(createNightSky());
    const message = document.createElement("p");
    message.className = "closing-line";
    message.append(document.createTextNode("De TH, para Melo. "));
    const heart = document.createElement("span");
    heart.textContent = "❤️";
    message.append(heart);
    closing.append(message);
    pageArea.append(closing);
    pageCount.textContent = "";
  } else {
    const section = document.createElement("article");
    section.className = "chapter-page";

    const kicker = document.createElement("p");
    kicker.className = "chapter-kicker";
    kicker.textContent = `Capítulo ${page.chapterNumber}`;

    const title = document.createElement("h2");
    title.className = "chapter-title";
    title.textContent = page.chapter.title;

    const text = document.createElement("p");
    text.className = "chapter-text";
    if (page.chapterNumber === 4) text.classList.add("long-text");
    text.textContent = page.text;

    section.append(kicker, title, text);
    pageArea.append(section);

    pageCount.textContent = page.chapterNumber === 4
      ? `Capítulo 4 · página ${page.pageInChapter} de ${page.chapterPageCount}`
      : `Capítulo ${page.chapterNumber} de 4`;
  }

  const progress = ((currentPage + 1) / pages.length) * 100;
  progressFill.style.width = `${progress}%`;
  progressTrack.setAttribute("aria-valuenow", String(Math.round(progress)));
  previousButton.disabled = currentPage === 0;
  nextButton.disabled = currentPage === pages.length - 1;
  nextButton.innerHTML = currentPage === pages.length - 1
    ? "Fim <span aria-hidden=\"true\">♡</span>"
    : "Avançar <span aria-hidden=\"true\">→</span>";
}

function openBook() {
  book.classList.add("is-open");
  cover.setAttribute("aria-hidden", "true");
  reader.hidden = false;
  window.setTimeout(() => {
    renderPage();
    document.querySelector("#previous-page").focus({ preventScroll: true });
  }, 300);
}

function changePage(amount) {
  const destination = currentPage + amount;
  if (destination < 0 || destination >= pages.length) return;
  currentPage = destination;
  renderPage();
}

document.querySelector("#open-book").addEventListener("click", openBook);
document.querySelector("#close-book").addEventListener("click", () => {
  book.classList.remove("is-open");
  reader.hidden = true;
  cover.removeAttribute("aria-hidden");
  document.querySelector("#open-book").focus({ preventScroll: true });
});
previousButton.addEventListener("click", () => changePage(-1));
nextButton.addEventListener("click", () => changePage(1));
document.addEventListener("keydown", (event) => {
  if (!book.classList.contains("is-open")) return;
  if (event.key === "ArrowLeft") changePage(-1);
  if (event.key === "ArrowRight") changePage(1);
});
