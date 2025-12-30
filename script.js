let danhSachPhong = [];

/* ================= LOAD DATA ================= */
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    danhSachPhong = data;
    hienThi(danhSachPhong);
  });

/* ================= HIỂN THỊ DANH SÁCH ================= */
function hienThi(ds) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  if (ds.length === 0) {
    list.innerHTML = "<p>😢 Không tìm thấy phòng phù hợp</p>";
    return;
  }

  ds.forEach(p => {
    list.innerHTML += `
      <div class="card" onclick="moModal(${p.id})">
        <img src="${p.hinh[0]}" alt="${p.ten}">
        <div class="info">
          <h3>${p.ten}</h3>
          <p>${p.quan}</p>
          <p><strong>${p.gia.toLocaleString()} đ / tháng</strong></p>
        </div>
      </div>
    `;
  });
}

/* ================= LỌC PHÒNG ================= */
function locPhong() {
  const quan = document.getElementById("quan").value;
  const gia = document.getElementById("gia").value;

  let ketQua = danhSachPhong.filter(p => {
    let hopQuan = quan ? p.quan === quan : true;
    let hopGia = gia ? p.gia <= gia : true;
    return hopQuan && hopGia;
  });

  hienThi(ketQua);
}

/* ================= MODAL ================= */
function moModal(id) {
  const phong = danhSachPhong.find(p => p.id === id);
  const modal = document.getElementById("modal");
  const body = document.getElementById("modal-body");

  body.innerHTML = `
    <div class="slider">
      ${phong.hinh.map(img => `<img src="${img}">`).join("")}
    </div>

    <div class="modal-info">
      <h2>${phong.ten}</h2>
      <p><strong>Khu vực:</strong> ${phong.quan}</p>
      <p><strong>Giá:</strong> ${phong.gia.toLocaleString()} đ / tháng</p>
      <p><strong>Mô tả:</strong> ${phong.mo_ta}</p>

      <div class="price">${phong.gia.toLocaleString()} đ / tháng</div>

      <iframe
        src="${phong.map_embed}"
        width="100%"
        height="300"
        style="border-radius:16px;margin-top:10px;"
        loading="lazy">
      </iframe>
    </div>
  `;

  modal.style.display = "flex";

  // focus map chính
  focusMap(phong.map_embed);
}

function dongModal() {
  document.getElementById("modal").style.display = "none";
}

/* ================= MAP ================= */
function focusMap(embed) {
  document.getElementById("main-map").src = embed;
}

/* ================= CLICK NGOÀI MODAL ĐỂ ĐÓNG ================= */
window.onclick = function (e) {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    dongModal();
  }
};
