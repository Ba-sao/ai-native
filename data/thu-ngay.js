// CÂU LỆNH MẪU CỦA TRANG THỬ NGAY
//
// Thêm một câu lệnh: chép nguyên một khối { ... }, dán xuống dưới, sửa nội dung trong dấu "".
// Giữa hai khối phải có dấu phẩy.
//
//   ten      : tên việc
//   nhom     : "Viết", "Tóm tắt", "Số liệu" hoặc "Lên kế hoạch" (viết đúng chữ để bộ lọc gom nhóm)
//   khi      : dùng khi nào (một câu)
//   cauLenh  : câu lệnh mẫu. Chỗ người dùng cần tự điền đặt trong [ngoặc vuông].
//              Muốn xuống dòng thì gõ \n
//   kiemTra  : nhắc người dùng kiểm tra gì trước khi dùng kết quả

window.THU_NGAY = [
  {
    ten: "Soạn thông báo nội bộ",
    nhom: "Viết",
    khi: "Cần báo cho cả phòng về một lịch họp, lịch nghỉ, thay đổi quy định.",
    cauLenh: "Bạn là trợ lý hành chính. Hãy soạn một thông báo nội bộ gửi [người nhận] về việc [nội dung chính].\nThời gian: [ngày, giờ]. Địa điểm: [nơi].\nGiọng văn lịch sự, ngắn gọn, dưới 150 chữ, có dòng tiêu đề rõ ràng.",
    kiemTra: "Ngày giờ, địa điểm và tên người có đúng không."
  },
  {
    ten: "Viết lại email cho rõ và lịch sự hơn",
    nhom: "Viết",
    khi: "Đã có bản nháp nhưng đọc còn lủng củng hoặc hơi cộc.",
    cauLenh: "Hãy viết lại email dưới đây cho lịch sự, rõ ý và ngắn hơn, giữ nguyên các thông tin chính. Người nhận là [vai trò người nhận].\nEmail: [dán nội dung]",
    kiemTra: "Các ý chính còn đủ không. Bỏ thông tin mật ra trước khi dán email vào."
  },
  {
    ten: "Soát lỗi một văn bản",
    nhom: "Viết",
    khi: "Trước khi gửi báo cáo, tờ trình, thông báo quan trọng.",
    cauLenh: "Hãy đọc văn bản dưới đây và chỉ ra: lỗi chính tả, câu khó hiểu, chỗ còn thiếu thông tin. Chưa sửa vội, chỉ liệt kê để tôi xem.\nVăn bản: [dán nội dung]",
    kiemTra: "AI có thể bắt nhầm tên riêng, từ chuyên ngành thành lỗi. Anh chị là người quyết định sửa hay giữ."
  },
  {
    ten: "Tóm tắt biên bản họp",
    nhom: "Tóm tắt",
    khi: "Họp xong có một trang ghi chép dài, cần gửi lại cho mọi người.",
    cauLenh: "Dưới đây là ghi chép cuộc họp. Hãy tóm tắt thành 3 phần:\n1. Các quyết định đã chốt.\n2. Việc cần làm, kèm người phụ trách và hạn.\n3. Vấn đề còn bỏ ngỏ.\nTrình bày dạng gạch đầu dòng.\nGhi chép: [dán nội dung]",
    kiemTra: "Tên người phụ trách và hạn hoàn thành. AI dễ gán nhầm việc cho người khác."
  },
  {
    ten: "Tóm tắt một tài liệu dài",
    nhom: "Tóm tắt",
    khi: "Cần nắm nhanh một tài liệu trước khi đọc kỹ.",
    cauLenh: "Hãy tóm tắt tài liệu dưới đây thành 5 ý chính, mỗi ý một câu, dành cho người chưa đọc tài liệu. Cuối cùng nêu 2 chỗ tôi nên đọc kỹ trong bản gốc.\nTài liệu: [dán nội dung]",
    kiemTra: "Số liệu và quy định trong bản tóm tắt phải đối chiếu lại với bản gốc."
  },
  {
    ten: "Tổng hợp một bảng số liệu",
    nhom: "Số liệu",
    khi: "Có bảng số hằng tháng cần kiểm tra và viết nhận xét.",
    cauLenh: "Đây là bảng số liệu [tên bảng] tháng [tháng]. Hãy làm đúng 3 bước:\nBước 1: Kiểm tra và chỉ ra các dòng thiếu hoặc bất thường.\nBước 2: Tính tổng và so sánh với tháng trước.\nBước 3: Viết nhận xét 3 câu, nêu điểm cần chú ý.\nBảng: [dán số liệu]",
    kiemTra: "Tự tính lại vài con số. Nếu bảng có tên người hoặc lương thưởng thì che đi trước khi dán."
  },
  {
    ten: "Nhờ viết công thức Excel",
    nhom: "Số liệu",
    khi: "Biết mình muốn tính gì nhưng không nhớ công thức.",
    cauLenh: "Tôi có bảng Excel với các cột: [tên các cột]. Tôi muốn [kết quả cần tính]. Hãy viết công thức và giải thích từng phần bằng lời đơn giản.",
    kiemTra: "Thử công thức trên vài dòng mà anh chị đã biết trước kết quả."
  },
  {
    ten: "Sắp xếp việc trong tuần",
    nhom: "Lên kế hoạch",
    khi: "Đầu tuần có nhiều việc, chưa biết làm gì trước.",
    cauLenh: "Tôi là [chức danh]. Tuần này tôi có các việc sau: [liệt kê việc, kèm hạn nếu có]. Hãy sắp xếp theo mức ưu tiên, gợi ý việc nào làm trước và giải thích ngắn lý do.",
    kiemTra: "AI không biết hết hoàn cảnh của anh chị. Thứ tự cuối cùng vẫn do anh chị quyết."
  }
];
