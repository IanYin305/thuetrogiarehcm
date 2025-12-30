let currentIndex = 0;

function moModal(p) {
  currentIndex = 0;

  const images = p.hinh.map((img, i) =>
    `<img src="${img}" class="${i === 0 ? "active" : ""}">`
  ).join("");

  const tienIch = p.tien_ich.map(t => `<span>${t}</span>`).join("");

  document.getElementById("modal").style.display = "block";
  document.getElementById("modal-body").innerHTML = `
    <div class="slider">
      ${images}
      <button class="slider-btn left" onclick="prevImg()">‹</button>
      <button class="slider-btn right" onclick="nextImg()">›</button>
    </div>

    <h2>${p.ten}</h2>
    <div class="rating">⭐ ${p.rating}</div>

    <p><strong>Giá:</strong> ${p.gia.toLocaleString()} đ / tháng</p>
    <p><strong>Địa chỉ:</strong> ${p.dia_chi}</p>

    <div class="tien-ich">${tienIch}</div>

    <p><strong>Liên hệ:</strong> ${p.sdt}</p>

    <iframe src="${p.map_embed}" width="100%" height="250"
      style="border:0; border-radius:12px;"
      loading="lazy"></iframe>
  `;
}

function nextImg() {
  const imgs = document.querySelectorAll(".slider img");
  imgs[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % imgs.length;
  imgs[currentIndex].classList.add("active");
}

function prevImg() {
  const imgs = document.querySelectorAll(".slider img");
  imgs[currentIndex].classList.remove("active");
  currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
  imgs[currentIndex].classList.add("active");
}
