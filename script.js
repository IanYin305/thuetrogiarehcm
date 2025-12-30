let data = [];

fetch("data.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    hienThi(data);
  });

function hienThi(ds) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  ds.forEach(p => {
    list.innerHTML += `
      <div class="card" onclick='moModal(${JSON.stringify(p)})'>
        <img src="${p.hinh}">
        <div class="info">
          <h3>${p.ten}</h3>
          <p>${p.quan}</p>
          <p><strong>${p.gia.toLocaleString()} đ / tháng</strong></p>
        </div>
      </div>
    `;
  });
}

function locPhong() {
  const q = document.getElementById("quan").value;
  const g = document.getElementById("gia").value;

  let kq = data.filter(p =>
    (!q || p.quan === q) &&
    (!g || p.gia <= g)
  );

  hienThi(kq);
}

function moModal(p) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("modal-body").innerHTML = `
    <h2>${p.ten}</h2>
    <p><strong>Giá:</strong> ${p.gia.toLocaleString()} đ</p>
    <p><strong>Địa chỉ:</strong> ${p.dia_chi}</p>
    <p><strong>Liên hệ:</strong> ${p.sdt}</p>
    <iframe src="${p.map_embed}" width="100%" height="250" style="border:0;" loading="lazy"></iframe>
  `;
}

function dongModal() {
  document.getElementById("modal").style.display = "none";
}
