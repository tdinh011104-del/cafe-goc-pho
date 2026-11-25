// Danh sách món — sửa ở đây để cập nhật thực đơn
const menuItems = [
  { name: "Cà phê đen", price: 20000 },
  { name: "Cà phê sữa", price: 25000 },
  { name: "Bạc xỉu", price: 28000 },
  { name: "Cà phê muối", price: 32000 },
  { name: "Trà đào", price: 35000 },
  { name: "Trà sữa", price: 30000 },
  { name: "Nước cam", price: 30000 },
  { name: "Sinh tố bơ", price: 40000 },
];

const formatPrice = (n) => n.toLocaleString("vi-VN") + "đ";

const menuEl = document.getElementById("menu");
menuEl.innerHTML = menuItems
  .map(
    (item) =>
      `<li><span>${item.name}</span><span class="price">${formatPrice(item.price)}</span></li>`
  )
  .join("");

document.getElementById("year").textContent = new Date().getFullYear();
