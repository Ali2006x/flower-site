
const garden = document.getElementById("garden");
const countText = document.getElementById("flowerCount");
const message = document.getElementById("message");
const continueButton = document.getElementById("continueButton");
const stars = document.getElementById("stars");

const colors = [
  ["#fff0fa", "#ff86cb", "#bd347e", "#ff70cb66"],
  ["#f7efff", "#c49aff", "#8246c8", "#b48aff66"],
  ["#fff0f4", "#ff9eae", "#d44770", "#ff829966"],
  ["#fff2dd", "#ffc4e0", "#df70aa", "#ffa6d866"]
];

let flowerCount = 0;
let messageShown = false;

// إنشاء نجوم متلألئة في السماء
for (let i = 0; i < 75; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 3 + "s";
  stars.appendChild(star);
}

// إنشاء تأثير ضوئي عند زراعة الوردة
function createSpark(x, y) {
  const spark = document.createElement("span");
  spark.className = "spark";
  spark.textContent = "✦";
  spark.style.left = x + "px";
  spark.style.top = y + "px";

  garden.appendChild(spark);

  setTimeout(() => spark.remove(), 1300);
}

// زراعة وردة جديدة
function plantFlower(x) {
  flowerCount++;
  countText.textContent = flowerCount;

  const flower = document.createElement("div");
  flower.className = "flower";

  // تحديد ارتفاع الوردة
  const height = Math.min(
    210 + Math.random() * 100 + window.innerHeight * 0.08,
    window.innerHeight * 0.65
  );

  flower.style.setProperty("--height", height + "px");

  // توزيع الورود ضمن عرض الشاشة
  const safeX = Math.max(
    50,
    Math.min(window.innerWidth - 50, x)
  );

  flower.style.left = safeX + "px";

  // الساق
  const stem = document.createElement("div");
  stem.className = "stem";

  // الأوراق
  const leftLeaf = document.createElement("div");
  leftLeaf.className = "leaf left";

  const rightLeaf = document.createElement("div");
  rightLeaf.className = "leaf right";

  // رأس الوردة
  const bloom = document.createElement("div");
  bloom.className = "bloom";

  const palette = colors[
    Math.floor(Math.random() * colors.length)
  ];

  bloom.style.setProperty("--light", palette[0]);
  bloom.style.setProperty("--color", palette[1]);
  bloom.style.setProperty("--dark", palette[2]);
  bloom.style.setProperty("--glow", palette[3]);

  // تكوين البتلات
  for (let i = 0; i < 8; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.style.transform = `rotate(${i * 45}deg)`;
    bloom.appendChild(petal);
  }

  // قلب الوردة
  const center = document.createElement("div");
  center.className = "flower-center";
  bloom.appendChild(center);

  flower.append(stem, leftLeaf, rightLeaf, bloom);
  garden.appendChild(flower);

  createSpark(safeX, window.innerHeight - 80);

  // إظهار الرسالة بعد الوردة الخامسة فقط
  if (flowerCount === 5 && !messageShown) {
    messageShown = true;

    setTimeout(() => {
      message.classList.add("show");
      message.setAttribute("aria-hidden", "false");
      continueButton.focus();
    }, 900);
  }
}

// زراعة الورود عند لمس الحديقة
garden.addEventListener("pointerdown", (event) => {
  if (event.target.closest(".ground") === null &&
      event.target !== garden) {
    return;
  }

  plantFlower(event.clientX);
});

// إغلاق الرسالة ومتابعة زراعة الورود
continueButton.addEventListener("click", () => {
  message.classList.remove("show");
  message.setAttribute("aria-hidden", "true");
});
