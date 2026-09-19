// Lấy phần tử HTML có id="evade" và lưu vào biến box để thao tác
const box = document.getElementById('evade');

// Bán kính kích hoạt của vùng ảo cố định (pixel): Chuột tiến vào vùng này box mới bắt đầu né
const triggerRadius = 120;

// Độ lệch né tối đa (pixel) khi chuột tiến sát vào chính tâm vùng ảo
const maxPush = 40;

// Khai báo biến lưu trữ tọa độ điểm TÂM CỐ ĐỊNH (vùng ảo gốc) của box
let originX = 0;
let originY = 0;

// Hàm tính toán và cập nhật tọa độ tâm gốc của box theo vị trí hiển thị ban đầu trên trang
function updateOriginalCenter() {
  // Tạm thời bỏ transform để đo vị trí thực tế chuẩn xác tuyệt đối trong luồng giao diện
  const currentTransform = box.style.transform;
  box.style.transform = 'none';

  // Lấy các thông số vị trí và kích thước gốc của box
  const rect = box.getBoundingClientRect();
  
  // Tính tọa độ tâm cố định (X, Y) của vùng ảo
  originX = rect.left + rect.width / 2;
  originY = rect.top + rect.height / 2;

  // Khôi phục lại trạng thái transform trước đó
  box.style.transform = currentTransform;
}

// Gọi hàm khởi tạo ngay khi tải trang để xác định vùng ảo gốc
updateOriginalCenter();

// Cập nhật lại tâm vùng ảo nếu người dùng co giãn hoặc thay đổi kích thước cửa sổ trình duyệt
window.addEventListener('resize', updateOriginalCenter);

// Lắng hệ di chuyển chuột trên TOÀN TRANG để so sánh với VÙNG ẢO CỐ ĐỊNH
document.addEventListener('mousemove', (e) => {
  // Lấy tọa độ hiện tại của con trỏ chuột
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Tính khoảng cách từ chuột tới TÂM GỐC CỐ ĐỊNH (vùng ảo) theo 2 trục X và Y
  const deltaX = mouseX - originX;
  const deltaY = mouseY - originY;

  // Tính khoảng cách đường chéo thực tế từ chuột đến tâm vùng ảo bằng định lý Pythagoras
  const distance = Math.hypot(deltaX, deltaY);

  // Kiểm tra xem chuột có nằm trong vùng ảo kích hoạt (triggerRadius) hay không
  if (distance < triggerRadius && distance > 0) {
    // Tỷ lệ lực đẩy: Chuột càng tiến gần tâm vùng ảo gốc, lực đẩy né càng mạnh (giá trị từ 0 đến 1)
    const power = (1 - distance / triggerRadius);

    // Tính độ lệch X và Y để đẩy box né ra xa khỏi tâm vùng ảo theo hướng ngược lại với chuột
    const pushX = -(deltaX / distance) * maxPush * power;
    const pushY = -(deltaY / distance) * maxPush * power;

    // Áp dụng vị trí né tương đối so với vị trí gốc
    box.style.transform = `translate(${pushX}px, ${pushY}px)`;
  } else {
    // Nếu chuột ra khỏi vùng ảo cố định, trả box về lại vị trí gốc ban đầu (0px, 0px)
    box.style.transform = 'translate(0px, 0px)';
  }
});