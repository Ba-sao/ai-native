// DANH SÁCH SLIDE VÀ TÀI LIỆU CỦA TRANG THƯ VIỆN
//
// Thêm một tài liệu: chép nguyên một khối { ... }, dán xuống dưới, sửa nội dung trong dấu "".
// Giữa hai khối phải có dấu phẩy. Lưu file rồi mở lại trang Thư viện là thấy.
//
//   tieuDe : tên hiện trên thẻ
//   loai   : "Slide", "Tài liệu" hoặc "Biểu mẫu" (viết đúng chữ để bộ lọc gom nhóm)
//   moTa   : một hai câu mô tả
//   ngay   : tháng/năm, ví dụ "10/2026"
//   link   : đường link để XEM (OneDrive, SharePoint, Canva...). Để "" thì thẻ hiện chữ "Sắp có".
//   taiVe  : đường link để TẢI VỀ. Không có thì để "".
//            File nhỏ có thể chép vào thư mục tai-lieu/ của website rồi ghi "tai-lieu/ten-file.pptx"
//            (tên file không dấu, không khoảng trắng). File đặt ở đó thì ai có link website cũng tải được.
//   mau    : true nghĩa là dữ liệu mẫu, thẻ sẽ có nhãn "Mẫu". Tài liệu thật thì xóa dòng này.

window.THU_VIEN = [
  {
    tieuDe: "Slide khóa học AI Native Organization",
    loai: "Slide",
    moTa: "Bộ slide của khóa đào tạo, gồm 5 phần: tổng quan, năng lực cốt lõi và chu trình AI, đạo đức AI, lộ trình, đo lường.",
    ngay: "10/2026",
    link: "",
    taiVe: "tai-lieu/AI-Native-Organization-slide.pptx"
  },
  {
    tieuDe: "Tóm tắt một trang: AI Native là gì?",
    loai: "Tài liệu",
    moTa: "Một trang A4 gom các ý chính của khóa học: câu chuyện cái bếp, máy làm gì người làm gì, bốn dấu hiệu, ba cấp độ, chu trình bốn bước, bốn mức thông tin.",
    ngay: "10/2026",
    link: "tai-lieu/tom-tat-mot-trang-ai-native.pdf",
    taiVe: "tai-lieu/tom-tat-mot-trang-ai-native.pdf"
  },
  {
    tieuDe: "Bảng tự chấm điểm AI Native (bản in)",
    loai: "Biểu mẫu",
    moTa: "Một trang A4 ngang: bốn trụ cột, năm mức, có chỗ ghi điểm và ba câu hỏi để cả nhóm thảo luận.",
    ngay: "10/2026",
    link: "tai-lieu/bang-tu-cham-diem-ai-native.pdf",
    taiVe: "tai-lieu/bang-tu-cham-diem-ai-native.pdf"
  }
];
