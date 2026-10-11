// CÂU HỎI NHANH CUỐI MỖI CHẶNG CỦA TRANG KIẾN THỨC
//
// Mỗi chặng có một nhóm câu hỏi. Sửa câu hỏi: đổi nội dung trong dấu "".
//
//   muc        : "Nhớ", "Hiểu" hoặc "Vận dụng"
//   hoi        : câu hỏi
//   luaChon    : các đáp án, mỗi đáp án trong một cặp dấu "", cách nhau bằng dấu phẩy
//   dung       : số thứ tự đáp án đúng, ĐẾM TỪ 0 (đáp án đầu tiên là 0, thứ hai là 1, thứ ba là 2)
//   giaiThich  : giải thích ngắn vì sao

window.CAU_HOI_NHANH = {
  "chang-1": [
    {
      muc: "Nhớ",
      hoi: "Điều quan trọng nhất cần nhớ về AI là gì?",
      luaChon: [
        "AI luôn đúng nên không cần kiểm tra lại",
        "AI là công cụ, người giao việc vẫn chịu trách nhiệm cuối cùng",
        "AI chịu trách nhiệm thay cho người dùng"
      ],
      dung: 1,
      giaiThich: "AI làm nhanh nhưng đôi khi sai mà vẫn nói rất tự tin. Người giao việc là người chịu trách nhiệm cuối cùng."
    },
    {
      muc: "Hiểu",
      hoi: "Trong câu chuyện cái bếp, \"thêm nồi cơm điện vào bếp cũ\" giống kiểu tổ chức nào?",
      luaChon: [
        "Chưa dùng AI",
        "AI Native",
        "Có dùng AI (AI-enabled)"
      ],
      dung: 2,
      giaiThich: "Cách làm vẫn như cũ, chỉ thêm một cái máy cho nhanh hơn. AI Native là khi cả cái bếp được vẽ lại từ đầu quanh máy."
    },
    {
      muc: "Vận dụng",
      hoi: "Phòng anh chị vừa cấp tài khoản AI cho mọi người, nhưng cách báo cáo và duyệt việc vẫn y như trước. Phòng đang ở đâu?",
      luaChon: [
        "Có công cụ AI",
        "Tổ chức AI Native",
        "Chưa dùng AI"
      ],
      dung: 0,
      giaiThich: "Có tài khoản AI mới là có công cụ. Khoảng cách tới AI Native nằm ở cách thiết kế tổ chức: quyền quyết định, cách báo cáo, cách ra quyết định hằng ngày."
    }
  ],

  "chang-2": [
    {
      muc: "Nhớ",
      hoi: "Trong ba nền tảng, khóa học khuyên nên bắt đầu từ đâu?",
      luaChon: [
        "Năng lực",
        "Quản trị",
        "Văn hóa"
      ],
      dung: 0,
      giaiThich: "Bắt đầu từ Năng lực, không bắt đầu từ Quản trị: giúp mọi người biết làm việc với AI trước, rồi mới dựng hàng rào."
    },
    {
      muc: "Hiểu",
      hoi: "\"Hiểu bối cảnh hơn thuộc quy trình\" nghĩa là gì?",
      luaChon: [
        "Bỏ hết quy trình, ai muốn làm gì thì làm",
        "Việc gì cũng hỏi sếp cho chắc",
        "Nhân viên hiểu mục tiêu và ranh giới nên tự xử lý được tình huống mới"
      ],
      dung: 2,
      giaiThich: "Quy trình cứng hợp với môi trường ổn định. Khi có AI, nhân viên cần hiểu mục tiêu và ranh giới để tự phán đoán."
    },
    {
      muc: "Vận dụng",
      hoi: "Một sáng kiến AI ở phòng anh chị chạy thử rất tốt, nhưng nhiều tháng sau vẫn chỉ là thử nghiệm vì không ai chịu trách nhiệm nhân rộng. Đây là sai lầm nào?",
      luaChon: [
        "Giao nhầm chủ",
        "Thử mãi không nhân rộng",
        "Thiếu bối cảnh"
      ],
      dung: 1,
      giaiThich: "Sáng kiến dừng ở mức thử nghiệm vì không có người \"sở hữu\" bài toán và chịu trách nhiệm kết quả cuối cùng."
    }
  ],

  "chang-3": [
    {
      muc: "Nhớ",
      hoi: "Đâu là năng lực AI không thay thế được?",
      luaChon: [
        "Gõ văn bản nhanh",
        "Tổng hợp số liệu",
        "Tư duy phản biện"
      ],
      dung: 2,
      giaiThich: "Ba năng lực AI không thay thế được: tư duy phản biện, trí tuệ cảm xúc, đánh giá chiến lược."
    },
    {
      muc: "Hiểu",
      hoi: "Ở cấp độ Agent, mình giao cho AI cái gì?",
      luaChon: [
        "Mục tiêu cần đạt",
        "Từng việc một",
        "Chuỗi bước đã thiết kế sẵn"
      ],
      dung: 0,
      giaiThich: "Trợ lý: giao từng việc. Quy trình: giao chuỗi bước. Agent: giao đích đến, AI tự tìm đường, người giám sát."
    },
    {
      muc: "Vận dụng",
      hoi: "AI vừa soạn xong báo cáo tháng cho anh chị. Việc tiếp theo nên làm là gì?",
      luaChon: [
        "Gửi ngay cho sếp để kịp hạn",
        "Kiểm tra lại số liệu và nội dung, góp ý để AI chỉnh",
        "Xóa đi và tự làm lại từ đầu"
      ],
      dung: 1,
      giaiThich: "Sau bước Tạo lập là Đánh giá và Tinh chỉnh. Người kiểm chứng độ chính xác rồi góp ý để AI hoàn thiện."
    }
  ],

  "chang-4": [
    {
      muc: "Nhớ",
      hoi: "Trong bốn mức thông tin, mức nào dùng được với AI mà không cần xử lý thêm?",
      luaChon: [
        "Bảo mật",
        "Công khai",
        "Tuyệt mật"
      ],
      dung: 1,
      giaiThich: "Thông tin công khai là thông tin đã công bố, như website hay tin tuyển dụng. Các mức còn lại đều cần cẩn thận hơn."
    },
    {
      muc: "Hiểu",
      hoi: "Vì sao cấm hẳn nhân viên dùng AI không phải là cách an toàn?",
      luaChon: [
        "Vì nhân viên sẽ dùng \"chui\" các công cụ không an toàn",
        "Vì AI không bao giờ làm lộ thông tin",
        "Vì cấm thì tốn nhiều tiền hơn"
      ],
      dung: 0,
      giaiThich: "Cấm thay vì hướng dẫn khiến nhân viên dùng lén công cụ ngoài tầm kiểm soát. Hướng dẫn rõ thông tin nào được đưa thì an toàn hơn."
    },
    {
      muc: "Vận dụng",
      hoi: "Anh chị muốn nhờ AI phân tích bảng lương của phòng. Nên làm gì trước?",
      luaChon: [
        "Dán nguyên bảng vào cho nhanh",
        "Nhờ đồng nghiệp dán hộ",
        "Che hoặc bỏ tên và thông tin nhận diện, chưa chắc thì hỏi quản lý"
      ],
      dung: 2,
      giaiThich: "Lương thưởng thuộc mức Bảo mật: phải che hoặc bỏ thông tin nhận diện trước khi dùng. Chưa chắc thì hỏi quản lý trực tiếp."
    }
  ],

  "chang-5": [
    {
      muc: "Nhớ",
      hoi: "Giai đoạn đầu tiên trong lộ trình ba giai đoạn là gì?",
      luaChon: [
        "Tái cấu trúc",
        "Mở rộng",
        "Khởi động: thử ở 1-2 phòng ban"
      ],
      dung: 2,
      giaiThich: "Khởi động, rồi Mở rộng, rồi Tái cấu trúc. Thử nhỏ trước để chứng minh hiệu quả."
    },
    {
      muc: "Hiểu",
      hoi: "\"An toàn để thất bại\" nghĩa là gì?",
      luaChon: [
        "Giai đoạn đầu được phép thử và sai để học",
        "Làm sai cũng không ai quan tâm",
        "Không cần kiểm tra kết quả của AI"
      ],
      dung: 0,
      giaiThich: "Giai đoạn đầu cần môi trường cho phép thử nghiệm. Kết quả của AI thì vẫn phải có người kiểm tra."
    },
    {
      muc: "Vận dụng",
      hoi: "Nhóm anh chị muốn thử dùng AI lần đầu. Nên chọn việc nào?",
      luaChon: [
        "Soạn hợp đồng quan trọng với khách hàng",
        "Tóm tắt biên bản họp nội bộ",
        "Tính lương cho cả công ty"
      ],
      dung: 1,
      giaiThich: "Nên chọn việc lặp đi lặp lại và ít rủi ro. Hợp đồng và lương là việc rủi ro cao, không hợp để thử lần đầu."
    }
  ]
};
