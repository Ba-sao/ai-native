// CẤU HÌNH GHI DANH VÀ BẢNG XẾP HẠNG
//
//   duoiEmail  : đuôi email công ty. Chỉ email có đuôi này mới ghi danh được.
//   linkDuLieu : đường link "Web app" của Google Apps Script (xem HUONG-DAN-GOOGLE-SHEET.md).
//                Để "" thì website vẫn học được nhưng không gửi tiến độ và không có bảng xếp hạng.
//   tyLeDat    : tỷ lệ câu hỏi nhanh phải đúng để tính hoàn thành. 0.8 nghĩa là 80%.
//   phongBan   : danh sách phòng ban hiện trong ô chọn lúc ghi danh, ví dụ ["Nhân sự", "Kế toán"].
//                Để [] thì người học tự gõ tên phòng ban.

window.CAU_HINH = {
  duoiEmail: "tristarvn.com.vn",
  linkDuLieu: "https://script.google.com/macros/s/AKfycbzSPGuVzuEPw7_Zl5b0aAvRm9kJnD8aHBGA7CRAsX9_T06kiIZyC2H-cVRaXcamSDek6g/exec",
  tyLeDat: 0.8,
  phongBan: []
};
