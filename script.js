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
      <div class="card">
        <img src="${p.hinh}">
        <h3>${p.ten}</h3>
        <p>Giá: ${p.gia.toLocaleString()} đ</p>
        <p>${p.quan}</p>
        <a href="${p.map}" target="_blank">📍 Xem Google Map</a>
        <p>☎ ${p.sdt}</p>
      </div>
    `;
  });
}

function locPhong() {
  const quan = document.getElementById("quan").value;
  const gia = document.getElementById("gia").value;

  let kq = data.filter(p =>
    (!quan || p.quan === quan) &&
    (!gia || p.gia <= gia)
  );

  hienThi(kq);
}
