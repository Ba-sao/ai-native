// HÒM THƯ VÀ CÁC CÂU HỎI ĐÃ TRẢ LỜI CỦA TRANG HỎI ĐÁP
//
// 1) Đường link biểu mẫu Microsoft Forms để mọi người gửi câu hỏi.
//    Trong Forms bấm "Thu thập câu trả lời" (Collect responses), chép link rồi dán vào giữa hai dấu "".
//    Để "" thì trang hiện chữ "Hòm thư sắp mở".

window.HOM_THU = {
  linkForms: ""
};

// 2) Danh sách câu hỏi đã trả lời.
//    Thêm một câu: chép nguyên một khối { ... }, dán lên ĐẦU danh sách (câu mới nằm trên), sửa nội dung.
//    Giữa hai khối phải có dấu phẩy.
//
//   hoi       : câu hỏi
//   dap       : câu trả lời
//   chuDe     : "Khái niệm", "Công việc của tôi", "An toàn" hoặc "Bắt đầu" (viết đúng chữ để bộ lọc gom nhóm)
//   ngay      : ngày trả lời, ví dụ "15/10/2026". Không cần thì để "".
//   tuHomThu  : true nếu là câu hỏi nhân viên gửi qua hòm thư (thẻ sẽ có nhãn "Từ hòm thư").
//               Không ghi tên người hỏi.

window.HOI_DAP = [
  {
    hoi: "AI Native Organization là gì, nói ngắn gọn?",
    dap: "Là công ty được thiết kế từ đầu để máy (AI) làm việc lặp lại, người làm việc cần suy nghĩ và chịu trách nhiệm.",
    chuDe: "Khái niệm",
    ngay: ""
  },
  {
    hoi: "Khác gì với công ty \"có dùng AI\"?",
    dap: "Công ty có dùng AI vẫn làm như cũ, thêm AI cho nhanh. Công ty AI Native vẽ lại cách làm quanh AI. Giống nồi cơm điện trong bếp cũ so với bếp mới thiết kế quanh máy.",
    chuDe: "Khái niệm",
    ngay: ""
  },
  {
    hoi: "AI có lấy mất việc của tôi không?",
    dap: "Mục tiêu của AI Native là giao việc lặp lại cho máy để người làm việc quan trọng hơn. Nhưng công việc sẽ thay đổi, nên mỗi người cần học thêm cách làm việc cùng AI. Công ty nên đào tạo và trao đổi rõ với nhân viên.",
    chuDe: "Công việc của tôi",
    ngay: ""
  },
  {
    hoi: "Tôi không rành máy tính thì sao?",
    dap: "Dùng AI chủ yếu bằng cách nói hoặc gõ câu bình thường. Chỉ cần được hướng dẫn từng bước với ví dụ quen thuộc là làm được.",
    chuDe: "Công việc của tôi",
    ngay: ""
  },
  {
    hoi: "AI có đáng tin không?",
    dap: "AI giúp được nhiều nhưng đôi khi sai. Vì vậy phải kiểm tra kết quả, nhất là các việc liên quan đến an toàn, số liệu, quy định.",
    chuDe: "An toàn",
    ngay: ""
  },
  {
    hoi: "Nên bắt đầu từ đâu?",
    dap: "Chọn một việc lặp lại, ít rủi ro (ví dụ viết thông báo, tóm tắt họp), thử trong nhóm nhỏ, kiểm tra kết quả rồi mở rộng.",
    chuDe: "Bắt đầu",
    ngay: ""
  },
  {
    hoi: "Công ty tôi nhỏ, có làm được không?",
    dap: "Có. Có thể bắt đầu từ một việc nhỏ, ít rủi ro rồi mở rộng dần.",
    chuDe: "Bắt đầu",
    ngay: ""
  },
  {
    hoi: "Cần mua gì để thành AI Native?",
    dap: "Công cụ chỉ là một phần. Phần quan trọng hơn là cách sắp xếp lại việc làm, thông tin gọn gàng, luật rõ ràng và con người được đào tạo.",
    chuDe: "Bắt đầu",
    ngay: ""
  }
];
