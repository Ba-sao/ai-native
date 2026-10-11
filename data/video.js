// DANH SÁCH VIDEO ÔN TẬP CỦA TRANG VIDEO
//
// Thêm một video: chép nguyên một khối { ... }, dán xuống dưới, sửa nội dung trong dấu "".
// Giữa hai khối phải có dấu phẩy. Lưu file rồi mở lại trang Video là thấy.
//
//   tieuDe    : tên video
//   moTa      : một hai câu nói video giảng gì
//   thoiLuong : ví dụ "12 phút". Chưa biết thì để "".
//   link      : đường link video.
//               - File video nhỏ chép vào thư mục video/ của website: ghi "video/ten-file.mp4"
//                 (tên file không dấu, không khoảng trắng). Video phát ngay trên trang.
//               - Link YouTube: video phát ngay trên trang.
//               - Link khác (SharePoint, Stream, OneDrive...): hiện nút "Mở video" sang trang đó.
//               - Để "" thì thẻ hiện chữ "Sắp có".
//   lienQuan  : phần kiến thức đi kèm, ghi mã sau dấu # của trang Kiến thức
//               (chang-1 ... chang-6, hoặc mã một phần như lo-trinh). Không có thì để "".
//   mau       : true nghĩa là dữ liệu mẫu. Video thật thì không có dòng này.

window.VIDEO = [
  {
    tieuDe: "Ôn tập AI-Native Organization",
    moTa: "Video ngắn ôn lại nội dung chính của khóa đào tạo AI Native Organization.",
    thoiLuong: "2 phút 47 giây",
    link: "video/on-tap-ai-native-organization.mp4",
    lienQuan: "chang-1"
  }
];
