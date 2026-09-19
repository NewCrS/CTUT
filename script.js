// Lấy phần tử HTML có id="evade" và lưu vào biến box để thao tác
const box = document.getElementById('evade');

// Khai báo biên độ né nhẹ quanh vị trí gốc (tính bằng pixel)
const pushDistance = 20;

// Lắng nghe sự kiện "mouseover" (xảy ra khi con trỏ chuột chạm vào box)
box.addEventListener('mouseover', (e) => {
  // Lấy các thông số về vị trí (top, left) và kích thước (width, height) thực tế của box trên màn hình
  const rect = box.getBoundingClientRect();
  
  // Tính tọa độ điểm TÂM của box theo chiều ngang (X): Lề trái + (Chiều rộng / 2)
  const boxCenterX = rect.left + rect.width / 2;
  
  // Tính tọa độ điểm TÂM của box theo chiều dọc (Y): Lề trên + (Chiều cao / 2)
  const boxCenterY = rect.top + rect.height / 2;

  // Lấy tọa độ vị trí hiện tại của con trỏ chuột theo chiều ngang (X)
  const mouseX = e.clientX;
  
  // Lấy tọa độ vị trí hiện tại của con trỏ chuột theo chiều dọc (Y)
  const mouseY = e.clientY;

  // Kiểm tra vị trí chuột so với tâm box theo trục ngang (X):
  // Nếu chuột nằm bên trái tâm box (mouseX < boxCenterX) -> dirX = 1 (đẩy box sang phải)
  // Nếu chuột nằm bên phải tâm box (mouseX >= boxCenterX) -> dirX = -1 (đẩy box sang trái)
  const dirX = mouseX < boxCenterX ? 1 : -1;

  // Kiểm tra vị trí chuột so với tâm box theo trục dọc (Y):
  // Nếu chuột nằm phía trên tâm box (mouseY < boxCenterY) -> dirY = 1 (đẩy box xuống dưới)
  // Nếu chuột nằm phía dưới tâm box (mouseY >= boxCenterY) -> dirY = -1 (đẩy box lên trên)
  const dirY = mouseY < boxCenterY ? 1 : -1;

  // Tính khoảng cách dịch chuyển tương đối theo X và Y
  const offsetX = dirX * pushDistance;
  const offsetY = dirY * pushDistance;

  // Áp dụng dịch chuyển bằng transform tương đối so với điểm gốc
  box.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

// Lắng nghe sự kiện "mouseleave" (khi con trỏ chuột rời khỏi khu vực của box)
box.addEventListener('mouseleave', () => {
  // Đưa khối box trở lại vị trí cố định ban đầu
  box.style.transform = 'translate(0px, 0px)';
});