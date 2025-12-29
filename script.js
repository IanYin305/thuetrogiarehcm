let data = [];

fetch("data.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    hienThi(data);
  });

<div class="card">
  <img src="${p.hinh}">
  <div class="content">
    <h3>${p.ten}</h3>
    <p><strong>Giá:</strong> ${p.gia.toLocaleString()} đ</p>
    <p><strong>Khu vực:</strong> ${p.quan}</p>
    <p><strong>Địa chỉ:</strong> ${p.dia_chi}</p>
    <a href="${p.map}" target="_blank">📍 Xem vị trí phòng</a>
    <p><strong>☎</strong> ${p.sdt}</p>
  </div>
</div>


function locPhong() {
  const quan = document.getElementById("quan").value;
  const gia = document.getElementById("gia").value;

  let kq = data.filter(p =>
    (!quan || p.quan === quan) &&
    (!gia || p.gia <= gia)
  );

  hienThi(kq);
}
