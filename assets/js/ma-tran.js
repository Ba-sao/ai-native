// Bảng tự chấm điểm AI Native: 4 trụ cột, mỗi trụ cột 5 mức (nguồn: slide khóa học)

window.MA_TRAN = {
  tenMuc: ["Truyền thống", "Khởi động", "Chuyển tiếp", "Tích hợp", "AI Native"],
  truCot: [
    {
      ten: "Tổ chức tinh gọn",
      tenGoc: "Thin Organization",
      bieuTuong: "tang",
      muc: [
        ["Nặng nề", "Nhiều tầng phê duyệt. Quản lý mất phần lớn thời gian để chuyển thông tin và ký giấy tờ."],
        ["Số hóa bề mặt", "Giấy tờ đã đưa lên phần mềm nhưng số cấp duyệt vẫn giữ nguyên. Quản lý vẫn kẹt trong sự vụ."],
        ["Bắt đầu ủy quyền", "Bớt các bước duyệt trung gian. Quản lý có thời gian đào tạo và xử lý ca khó."],
        ["Cơ cấu phẳng", "Nhân viên tự quyết dựa trên dữ liệu và gợi ý của AI. Quản lý chỉ duyệt các trường hợp ngoại lệ."],
        ["Siêu tinh gọn", "AI tự duyệt các việc chuẩn. Quản lý tập trung vào chiến lược và tạo giá trị mới."]
      ]
    },
    {
      ten: "Đồng bộ tức thời",
      tenGoc: "Real-time Alignment",
      bieuTuong: "dong-bo",
      muc: [
        ["Cục bộ", "Các phòng ban làm việc biệt lập. Phải chờ họp giao ban hoặc báo cáo cuối tháng mới biết vấn đề."],
        ["Rời rạc", "Cập nhật qua Zalo, email nhưng thông tin dễ trôi. Mỗi phòng ban làm dữ liệu một kiểu."],
        ["Có độ trễ", "Có báo cáo chung nhưng dữ liệu chậm 1-2 ngày, vẫn cần người tổng hợp thủ công."],
        ["Liên thông", "Mọi người nhìn chung một nguồn số liệu. Sự cố liên phòng ban được xử lý trong vài giờ."],
        ["Dự báo tức thì", "Dữ liệu cập nhật ngay. AI tự cảnh báo rủi ro giữa các phòng ban trước khi nó xảy ra."]
      ]
    },
    {
      ten: "Ưu tiên bối cảnh",
      tenGoc: "Context over SOP",
      bieuTuong: "bien-chi",
      muc: [
        ["Cứng nhắc", "\"Cứ đúng quy trình mà làm, sai đâu sếp chịu.\" Không linh hoạt với khách hàng."],
        ["Lúng túng", "Quy trình bắt đầu bất cập. Gặp tình huống mới là phải gọi hỏi sếp."],
        ["Linh hoạt có điều kiện", "Được linh hoạt trong một số giới hạn, nhưng vẫn phụ thuộc nhiều vào chỉ đạo của cấp trên."],
        ["Quản trị bằng ranh giới", "Nhân viên hiểu rõ bối cảnh và mục tiêu, chủ động giải quyết vấn đề mà không chờ lệnh."],
        ["Trao quyền", "AI cung cấp bối cảnh đầy đủ để nhân viên ra quyết định tốt ngay khi làm việc với khách hàng."]
      ]
    },
    {
      ten: "AI có mặt sẵn",
      tenGoc: "Agent-First Workflow",
      bieuTuong: "robot",
      muc: [
        ["Trang giấy trắng", "Không dùng AI. Mọi việc đều bắt đầu làm thủ công từ đầu."],
        ["Tự phát", "Vài cá nhân tự dùng ChatGPT, Claude để làm nhanh hơn, chưa có tính hệ thống."],
        ["AI là trợ lý", "Công ty cấp tài khoản. Dùng AI để viết nháp, tóm tắt, dịch. Kết quả phụ thuộc kỹ năng từng người."],
        ["AI là quy trình", "AI nằm sẵn trong các bước làm việc. AI làm bản nháp đầu tiên, người thẩm định."],
        ["AI là Agent", "AI tự nhận ra vấn đề, tự chạy chuỗi việc và báo cáo kết quả. Người giám sát."]
      ]
    }
  ]
};
