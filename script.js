// Lấy phần tử HTML có id="evade" và lưu vào biến box để thao tác
const box = document.getElementById('evade');

// Khai báo khoảng cách (tính bằng pixel) mà box sẽ né đi mỗi khi con trỏ chuột chạm vào
const pushDistance = 200;

// Lắng nghe sự kiện "mouseover" (xảy ra ngay khi con trỏ chuột chạm vào ranh giới của box)
box.addEventListener('mouseover', (e) => {
  

  box.style.position = 'fixed';  
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

  // Tính vị trí lề trái MỚI cho box = lề trái cũ + (hướng né X * khoảng cách né)
  let newLeft = rect.left + dirX * pushDistance;
  
  // Tính vị trí lề trên MỚI cho box = lề trên cũ + (hướng né Y * khoảng cách né)
  let newTop = rect.top + dirY * pushDistance;

  // Tính giới hạn lề trái tối đa (chiều rộng màn hình trừ đi chiều rộng box) để không bị văng ra ngoài mép phải
  const maxLeft = window.innerWidth - rect.width;
  
  // Tính giới hạn lề trên tối đa (chiều cao màn hình trừ đi chiều cao box) để không bị văng ra ngoài mép dưới
  const maxTop = window.innerHeight - rect.height;

  // Giữ cho tọa độ newLeft luôn nằm trong phạm vi từ 0px (mép trái) đến maxLeft (mép phải)
  newLeft = Math.max(0, Math.min(newLeft, maxLeft));
  
  // Giữ cho tọa độ newTop luôn nằm trong phạm vi từ 0px (mép trên) đến maxTop (mép dưới)
  newTop = Math.max(0, Math.min(newTop, maxTop));

  // Gỡ bỏ thuộc tính căn giữa ban đầu (transform: translate(-50%, -50%)) trong CSS để vị trí tính theo left/top chuẩn xác
  box.style.transform = 'none';

  // Cập nhật thuộc tính CSS 'left' bằng giá trị newLeft mới vừa tính toán (thêm đơn vị 'px')
  box.style.left = `${newLeft}px`;
  
  // Cập nhật thuộc tính CSS 'top' bằng giá trị newTop mới vừa tính toán (thêm đơn vị 'px')
  box.style.top = `${newTop}px`;
});