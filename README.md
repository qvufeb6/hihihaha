# Gửi Mẹ — 20/10

Website chúc mừng Ngày Phụ nữ Việt Nam dành riêng tặng mẹ, theo phong cách điện ảnh, tinh tế và bớt sến. Phiên bản này bỏ phần hộp quà và điều ước, tập trung vào thư ngắn, hoa hồng CSS 3D và vườn hoa thực vật tương tác gồm 6 loài hoa.

## Chạy website
1. Giải nén file ZIP.
2. Mở `index.html` bằng Chrome, Edge, Firefox hoặc Safari.
3. Nhấn vào phong bì để bắt đầu.
4. Chọn các bông hoa trong vườn để đọc lời chúc.
5. Để bật nhạc nền, đặt file MP3 được phép sử dụng tại `assets/nhac-nen.mp3`, sau đó nhấn **Bật nhạc**. Trình duyệt chỉ phát nhạc sau khi người xem chủ động nhấn nút.

Không cần cài Node.js hay thư viện. Google Fonts cần Internet; nếu ngoại tuyến, font dự phòng sẽ được dùng.

## Đưa lên GitHub Pages
1. Tạo repository mới trên GitHub.
2. Upload `index.html`, `style.css`, `script.js` lên thư mục gốc.
3. Mở **Settings → Pages**.
4. Chọn **Deploy from a branch**, nhánh `main`, thư mục `/ (root)`, rồi lưu.
5. Chờ triển khai và mở đường link GitHub Pages.

## Tùy chỉnh
- Nội dung lời nhắn nằm trong `index.html`.
- Lời chúc của từng loài hoa nằm ở thuộc tính `data-title` và `data-message` của `.botanical-card`.
- Giao diện và hình minh họa hoa nằm trong `style.css`.
- Hiệu ứng, tương tác, nhạc nền nằm trong `script.js`.
- Nhạc nền lấy từ `assets/nhac-nen.mp3`; thư mục `assets` đã được tạo sẵn. Hãy dùng bản nhạc bạn có quyền sử dụng và kiểm tra điều kiện giấy phép trước khi đưa website lên mạng.


## Thêm nhạc nền từ YouTube theo cách phù hợp
1. Mở [YouTube Audio Library](https://www.youtube.com/audiolibrary) hoặc vào YouTube Studio → **Audio library**.
2. Tìm nhạc theo tâm trạng, thể loại hoặc nhạc cụ; nghe thử và kiểm tra mục giấy phép/ghi công của đúng bản nhạc.
3. Tải MP3 bằng nút **Download** nếu bản nhạc cho phép tải và sử dụng theo nhu cầu của bạn. YouTube hướng dẫn rằng một số bản nhạc yêu cầu ghi công tác giả; hãy lưu lại thông tin giấy phép và phần ghi công nếu có. [Hướng dẫn chính thức](https://support.google.com/youtube/answer/3376882?hl=vi).
4. Đổi tên file thành `nhac-nen.mp3`, đặt vào thư mục `assets` cạnh `index.html`. Đường dẫn cuối cùng phải là `assets/nhac-nen.mp3`.
5. Mở lại `index.html` và nhấn **Bật nhạc** để thử. Khi đưa lên GitHub Pages, nhớ tải cả thư mục `assets` cùng các file còn lại.

**Lưu ý:** Không phải mọi bài hát được đăng trên YouTube đều được tự do tải xuống hoặc dùng làm nhạc nền website. Đừng dùng trang chuyển đổi để trích nhạc có bản quyền khi chưa có quyền. Nếu muốn dùng một video YouTube trực tiếp, hãy dùng tính năng **Chia sẻ → Nhúng (Embed)**; cách đó hiển thị trình phát YouTube, không biến bài hát thành file nhạc nền riêng và tự phát có thể bị trình duyệt chặn.
