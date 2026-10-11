// Ghi danh người học, gửi tiến độ về Google Sheet và vẽ bảng xếp hạng.
// Cấu hình ở data/cau-hinh.js. Thông tin người học lưu trên trình duyệt (localStorage)
// và chỉ gửi tới đường link linkDuLieu trong cấu hình.

(function () {
  var CH = window.CAU_HINH || {};
  var KHOA_NGUOI = "aiNative.nguoiHoc";
  var TY_LE_DAT = CH.tyLeDat || 0.8;

  function doc(khoa, macDinh) {
    try {
      var v = localStorage.getItem(khoa);
      return v ? JSON.parse(v) : macDinh;
    } catch (e) { return macDinh; }
  }
  function ghi(khoa, giaTri) {
    try { localStorage.setItem(khoa, JSON.stringify(giaTri)); } catch (e) { /* không lưu được thì thôi */ }
  }
  function thoat(chu) {
    return String(chu == null ? "" : chu).replace(/[&<>"']/g, function (k) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[k];
    });
  }

  function nguoiHoc() {
    var n = doc(KHOA_NGUOI, null);
    return n && n.email && n.hoTen ? n : null;
  }

  function emailHopLe(email) {
    var duoi = String(CH.duoiEmail || "").toLowerCase();
    email = email.trim().toLowerCase();
    if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) return false;
    return !duoi || email.slice(-(duoi.length + 1)) === "@" + duoi;
  }

  // ---------- Tiến độ ----------

  function tienDo() {
    var tomTat = doc("aiNative.tomTat", null);
    var diem = doc("aiNative.diem", {});
    var soDung = 0;
    Object.keys(diem).forEach(function (k) { soDung += Number(diem[k]) || 0; });
    return {
      soPhan: doc("aiNative.daXem", []).length,
      tongPhan: tomTat && tomTat.tong ? tomTat.tong : 0,
      soDung: soDung,
      tongCau: doc("aiNative.tongCau", 0)
    };
  }

  function daDat(td) {
    return td.tongPhan > 0 && td.soPhan >= td.tongPhan && td.tongCau > 0 && td.soDung / td.tongCau >= TY_LE_DAT;
  }

  // Gửi tiến độ; trả về dữ liệu bảng xếp hạng (hoặc null nếu chưa cấu hình hay mất mạng)
  function gui() {
    var n = nguoiHoc();
    if (!CH.linkDuLieu || !n) return Promise.resolve(null);
    var td = tienDo();
    return fetch(CH.linkDuLieu, {
      method: "POST",
      // text/plain để trình duyệt gửi thẳng, Apps Script không nhận được yêu cầu dò trước (preflight)
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        hoTen: n.hoTen, email: n.email, phongBan: n.phongBan,
        soPhan: td.soPhan, tongPhan: td.tongPhan, soDung: td.soDung, tongCau: td.tongCau
      })
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        ghi("aiNative.chuaGui", !d.ok);
        return d.ok ? d : null;
      })
      .catch(function () {
        ghi("aiNative.chuaGui", true); // mất mạng: lần mở trang sau gửi lại
        return null;
      });
  }

  var hen = null;
  function henGui() {
    ghi("aiNative.chuaGui", true);
    clearTimeout(hen);
    hen = setTimeout(gui, 1500);
  }

  // ---------- Màn hình ghi danh ----------

  function moCong() {
    document.documentElement.classList.add("cho-ghi-danh");
    var dsPhong = Array.isArray(CH.phongBan) ? CH.phongBan : [];
    var oPhong = dsPhong.length
      ? '<select id="gd-phong" required><option value="">Chọn phòng ban</option>' +
        dsPhong.map(function (p) { return "<option>" + thoat(p) + "</option>"; }).join("") + "</select>"
      : '<input id="gd-phong" type="text" required maxlength="80" autocomplete="organization-title" placeholder="Ví dụ: Phòng Nhân sự">';

    var cong = document.createElement("div");
    cong.className = "cong-vao";
    cong.setAttribute("role", "dialog");
    cong.setAttribute("aria-modal", "true");
    cong.setAttribute("aria-labelledby", "gd-tieu-de");
    cong.innerHTML =
      '<form class="gd-the" novalidate>' +
      '<img src="assets/img/logo-basao.jpg" alt="Logo Ba Sao" width="232" height="160">' +
      '<h1 id="gd-tieu-de">Chào anh chị</h1>' +
      "<p>Trước khi vào học về AI Native Organization, anh chị cho biết mình là ai nhé.</p>" +
      '<label for="gd-ten">Họ và tên</label>' +
      '<input id="gd-ten" type="text" required maxlength="80" autocomplete="name" placeholder="Ví dụ: Nguyễn Văn An">' +
      '<label for="gd-email">Email công ty</label>' +
      '<input id="gd-email" type="email" required maxlength="120" autocomplete="email" placeholder="ten@' + thoat(CH.duoiEmail || "congty.com") + '">' +
      '<label for="gd-phong">Phòng ban</label>' + oPhong +
      '<p class="gd-loi" role="alert" hidden></p>' +
      '<button type="submit" class="nut">Vào học</button>' +
      '<p class="gd-ghi-chu">Website ghi lại họ tên, email, phòng ban và tiến độ học của anh chị để Bộ phận Đào tạo theo dõi khóa học. ' +
      "Họ tên, phòng ban và tiến độ học của anh chị sẽ hiện trên trang Xếp hạng cùng mọi người học khác. Email không hiện công khai.</p>" +
      "</form>";
    document.body.appendChild(cong);

    var oTen = cong.querySelector("#gd-ten");
    var oEmail = cong.querySelector("#gd-email");
    var oP = cong.querySelector("#gd-phong");
    var loi = cong.querySelector(".gd-loi");
    oTen.focus();

    cong.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      var hoTen = oTen.value.replace(/\s+/g, " ").trim();
      var email = oEmail.value.trim().toLowerCase();
      var phong = oP.value.replace(/\s+/g, " ").trim();
      var thongBao = "";
      var oSai = null;
      if (hoTen.length < 3 || hoTen.indexOf(" ") < 0) { thongBao = "Anh chị nhập đầy đủ họ và tên."; oSai = oTen; }
      else if (!emailHopLe(email)) { thongBao = "Email phải là email công ty, có đuôi @" + CH.duoiEmail + "."; oSai = oEmail; }
      else if (!phong) { thongBao = "Anh chị cho biết phòng ban của mình."; oSai = oP; }
      if (thongBao) {
        loi.textContent = thongBao;
        loi.hidden = false;
        oSai.focus();
        if (window.AmThanh) window.AmThanh.phat("sai");
        return;
      }
      if (window.AmThanh) window.AmThanh.phat("chao");
      ghi(KHOA_NGUOI, { hoTen: hoTen, email: email, phongBan: phong });
      cong.remove();
      document.documentElement.classList.remove("cho-ghi-danh");
      veDongNguoiHoc();
      gui().then(veXepHang);
    });
  }

  // Dòng "Đang học: ..." ở chân trang, kèm nút đổi người học
  function veDongNguoiHoc() {
    var n = nguoiHoc();
    var chan = document.querySelector(".chan-trang .khung");
    if (!n || !chan || chan.querySelector(".dang-hoc")) return;
    var p = document.createElement("p");
    p.className = "dang-hoc";
    p.innerHTML = "Đang học: <b>" + thoat(n.hoTen) + '</b> · <button type="button">Đổi người học</button>';
    chan.appendChild(p);
    p.querySelector("button").addEventListener("click", function () {
      if (!window.confirm("Đổi người học sẽ xóa tiến độ đang lưu trên máy này. Tiến độ đã gửi về công ty vẫn được giữ. Anh chị có muốn tiếp tục không?")) return;
      try {
        Object.keys(localStorage).forEach(function (k) {
          if (k.indexOf("aiNative.") === 0) localStorage.removeItem(k);
        });
      } catch (e) { /* bỏ qua */ }
      location.reload();
    });
  }

  // ---------- Trang Xếp hạng ----------

  function dinhDangNgay(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return "";
    function hai(so) { return (so < 10 ? "0" : "") + so; }
    return hai(d.getDate()) + "/" + hai(d.getMonth() + 1) + "/" + d.getFullYear() + " " + hai(d.getHours()) + ":" + hai(d.getMinutes());
  }

  // Hai chữ cái đầu của họ và tên, hiện trong vòng tròn đại diện
  function chuCaiDau(hoTen) {
    var tu = String(hoTen).trim().split(/\s+/);
    var dau = tu[0] ? tu[0].charAt(0) : "";
    var cuoi = tu.length > 1 ? tu[tu.length - 1].charAt(0) : "";
    return (dau + cuoi).toUpperCase();
  }

  var VUONG_MIEN = '<svg class="vuong-mien" viewBox="0 0 48 32" aria-hidden="true"><path d="M4 28 2 8l11 9L24 3l11 14 11-9-2 20z" fill="#f2b705" stroke="#c98a00" stroke-width="2" stroke-linejoin="round"/><circle cx="24" cy="21" r="3" fill="#fff"/></svg>';

  // Trang Xếp hạng: bục ba người đầu, hai người kế, số liệu chung và hành trình của người đang xem
  function veXepHang(duLieu, dangTai) {
    if (!document.getElementById("trang-xep-hang")) return;
    var ds = duLieu ? duLieu.xepHang : [];

    // Số liệu chung
    var soLieu = document.getElementById("xh-so-lieu");
    if (duLieu) {
      soLieu.innerHTML = "<li><b>" + thoat(duLieu.soNguoiHoc) + "</b>người đang học</li><li><b>" + thoat(duLieu.soHoanThanh) +
        "</b>người đã hoàn thành</li>";
    } else {
      soLieu.innerHTML = "";
    }

    // Thông báo khi chưa có dữ liệu
    var baoTin = document.getElementById("xh-bao-tin");
    var tin = "";
    if (!CH.linkDuLieu) tin = "Bảng xếp hạng chưa được kết nối với nơi lưu dữ liệu.";
    else if (!duLieu) tin = dangTai ? "Đang tải bảng xếp hạng…" : "Chưa tải được bảng xếp hạng. Anh chị thử tải lại trang sau ít phút.";
    else if (!ds.length) tin = "Chưa có ai hoàn thành. Bục vinh danh đang chờ người đầu tiên, có thể chính là anh chị!";
    baoTin.textContent = tin;
    baoTin.hidden = !tin;

    // Bục ba hạng đầu: chỗ nào chưa có người thì để trống mời gọi
    var buc = "";
    for (var i = 0; i < 3; i++) {
      var n = ds[i];
      buc += '<li class="buc-' + (i + 1) + (n ? "" : " cho") + '"><div class="buc-nguoi">' +
        (i === 0 && n ? VUONG_MIEN : "") +
        '<span class="buc-anh">' + (n ? thoat(chuCaiDau(n.hoTen)) : "?") + "</span>" +
        "<b>" + (n ? thoat(n.hoTen) : "Đang chờ chủ nhân") + "</b>" +
        "<small>" + (n ? thoat(n.phongBan) : "Vị trí này có thể là của anh chị") + "</small>" +
        (n ? '<span class="buc-phu">' + thoat(n.soDung) + "/" + thoat(n.tongCau) + " câu đúng<br>" + thoat(dinhDangNgay(n.hoanThanhLuc)) + "</span>" : "") +
        '</div><div class="buc-be"><span>' + (i + 1) + "</span></div></li>";
    }
    document.getElementById("xh-buc").innerHTML = buc;

    // Hạng 4 và 5
    var hang = "";
    for (var j = 3; j < 5; j++) {
      var m = ds[j];
      hang += '<li class="' + (m ? "" : "cho") + '"><span class="xh-hang">' + (j + 1) + '</span><span class="buc-anh nho">' +
        (m ? thoat(chuCaiDau(m.hoTen)) : "?") + '</span><span class="xh-ten"><b>' + (m ? thoat(m.hoTen) : "Đang chờ chủ nhân") +
        "</b><small>" + (m ? thoat(m.phongBan) : "Hoàn thành khóa học để ghi tên vào đây") + "</small></span>" +
        (m ? '<span class="xh-phu"><b>' + thoat(m.soDung) + "/" + thoat(m.tongCau) + " câu đúng</b><small>" +
          thoat(dinhDangNgay(m.hoanThanhLuc)) + "</small></span>" : "") + "</li>";
    }
    document.getElementById("xh-ds").innerHTML = hang;

    veHanhTrinh(duLieu);
    veTatCa(duLieu, dangTai);
  }

  // Danh sách toàn bộ người học: ai hoàn thành thì có hạng, ai đang học thì hiện tiến độ
  var tatCa = [];
  function veTatCa(duLieu, dangTai) {
    var khung = document.getElementById("xh-tat-ca");
    var oTim = document.getElementById("xh-tim");
    var dem = document.getElementById("xh-dem");
    if (!khung) return;
    if (duLieu) tatCa = duLieu.tatCa || [];

    if (!duLieu || !duLieu.tatCa) {
      dem.textContent = "";
      khung.innerHTML = '<li class="trong-rong">' + (dangTai ? "Đang tải danh sách người học…" : "Danh sách người học chưa sẵn sàng.") + "</li>";
      return;
    }

    var tu = boDau(oTim.value.trim());
    var hang = 0;
    var html = "";
    var soHien = 0;
    tatCa.forEach(function (n) {
      var xong = !!n.hoanThanhLuc;
      if (xong) hang += 1;
      if (tu && boDau(n.hoTen + " " + n.phongBan).indexOf(tu) < 0) return;
      soHien += 1;
      var canDung = n.tongCau ? Math.ceil(n.tongCau * TY_LE_DAT) : 0;
      var phanXem = n.tongPhan ? Math.min(n.soPhan / n.tongPhan, 1) : 0;
      var phanDung = canDung ? Math.min(n.soDung / canDung, 1) : 0;
      var phanTram = xong ? 100 : Math.round(((phanXem + phanDung) / 2) * 100);
      html += '<li class="' + (xong ? "xong" : "") + (hang <= 5 && xong ? " top" : "") + (n.laToi ? " la-toi" : "") + '">' +
        '<span class="xh-hang">' + (xong ? hang : "–") + "</span>" +
        '<span class="buc-anh nho">' + thoat(chuCaiDau(n.hoTen)) + "</span>" +
        '<span class="xh-ten"><b>' + thoat(n.hoTen) + (n.laToi ? ' <em>Anh chị</em>' : "") + "</b><small>" + thoat(n.phongBan) + "</small></span>" +
        '<span class="tc-tien-do"><span class="moc-thanh"><span style="width:' + phanTram + '%"></span></span><small>' +
        (xong
          ? "Hoàn thành " + thoat(dinhDangNgay(n.hoanThanhLuc))
          : thoat(n.soPhan) + (n.tongPhan ? "/" + thoat(n.tongPhan) : "") + " phần · " + thoat(n.soDung) + (n.tongCau ? "/" + thoat(n.tongCau) : "") + " câu đúng") +
        "</small></span>" +
        '<span class="tc-nhan ' + (xong ? "xong" : "") + '">' + (xong ? (hang <= 5 ? "Top 5" : "Hoàn thành") : "Đang học") + "</span></li>";
    });
    dem.textContent = tu ? "Tìm thấy " + soHien + "/" + tatCa.length + " người" : tatCa.length + " người đã ghi danh";
    khung.innerHTML = html || '<li class="trong-rong">Không tìm thấy ai khớp với từ khóa.</li>';
  }

  function boDau(chu) {
    return String(chu).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");
  }

  // Thẻ "Hành trình của anh chị": vòng tiến độ, hai mốc cần đạt, lời nhắn và nút đi tiếp
  function veHanhTrinh(duLieu) {
    var n = nguoiHoc();
    var td = tienDo();
    // Trang này không biết tổng số phần nếu người học chưa mở trang Kiến thức: lấy số máy chủ trả về
    if (duLieu && duLieu.tongPhan) {
      td.tongPhan = td.tongPhan || duLieu.tongPhan;
      td.soPhan = Math.max(td.soPhan, duLieu.soPhan || 0);
      td.tongCau = td.tongCau || duLieu.tongCau;
      td.soDung = Math.max(td.soDung, duLieu.soDung || 0);
    }
    var canDung = td.tongCau ? Math.ceil(td.tongCau * TY_LE_DAT) : 0;
    var phanXem = td.tongPhan ? Math.min(td.soPhan / td.tongPhan, 1) : 0;
    var phanDung = canDung ? Math.min(td.soDung / canDung, 1) : 0;
    var phanTram = Math.round(((phanXem + phanDung) / 2) * 100);
    var xong = (duLieu && duLieu.hoanThanh) || daDat(td);

    document.getElementById("ht-ten-nguoi").textContent = n ? n.hoTen : "";
    document.getElementById("ht-phan-tram").textContent = phanTram + "%";
    // Vòng tròn có chu vi 327 (bán kính 52): phần còn thiếu được ẩn bằng stroke-dashoffset
    document.getElementById("ht-vong").style.strokeDashoffset = String(327 - (327 * phanTram) / 100);

    function moc(id, daCo, can, tong, tyLe, nhan) {
      var o = document.getElementById(id);
      o.classList.toggle("dat", can > 0 && daCo >= can);
      o.querySelector("b").textContent = nhan;
      o.querySelector(".moc-so").textContent = daCo + (tong ? "/" + tong : "");
      o.querySelector(".moc-thanh span").style.width = Math.round(tyLe * 100) + "%";
    }
    moc("moc-phan", td.soPhan, td.tongPhan, td.tongPhan, phanXem, "Xem đủ các phần");
    moc("moc-cau", td.soDung, canDung, td.tongCau, phanDung,
      "Đúng từ " + (canDung || Math.round(TY_LE_DAT * 100) + "%") + " câu hỏi nhanh");

    var loi = document.getElementById("ht-loi");
    var nut = document.getElementById("ht-nut-di");
    if (xong) {
      loi.textContent = duLieu && duLieu.viTri
        ? "Chúc mừng! Anh chị đã hoàn thành khóa học, xếp thứ " + duLieu.viTri + " trong " + duLieu.soHoanThanh + " người hoàn thành."
        : "Chúc mừng! Anh chị đã hoàn thành khóa học.";
      nut.textContent = "Xem lại kiến thức";
    } else if (td.soPhan === 0) {
      loi.textContent = "Anh chị chưa bắt đầu. Mỗi phần chỉ mất vài phút, bắt đầu ngay hôm nay để giành chỗ trên bục.";
      nut.textContent = "Bắt đầu học";
    } else {
      var con = [];
      if (td.tongPhan && td.soPhan < td.tongPhan) con.push((td.tongPhan - td.soPhan) + " phần nữa");
      if (canDung && td.soDung < canDung) con.push((canDung - td.soDung) + " câu đúng nữa");
      loi.textContent = "Anh chị đang đi đúng hướng. Chỉ còn " + con.join(" và ") + " là hoàn thành.";
      nut.textContent = "Học tiếp";
    }
    document.getElementById("xh-hanh-trinh").classList.toggle("da-xong", !!xong);
  }

  function taiXepHang() {
    if (!document.getElementById("trang-xep-hang")) return;
    if (!CH.linkDuLieu) { veXepHang(null); return; }
    gui().then(function (d) {
      if (d) return d;
      // Chưa ghi danh hoặc gửi lỗi: chỉ đọc bảng xếp hạng
      return fetch(CH.linkDuLieu).then(function (r) { return r.json(); }).then(function (x) { return x.ok ? x : null; }).catch(function () { return null; });
    }).then(function (d) { veXepHang(d); });
  }

  // ---------- Khởi động ----------

  window.NguoiHoc = { lay: nguoiHoc, tienDo: tienDo, daDat: daDat, gui: gui, henGui: henGui, taiXepHang: taiXepHang, tyLeDat: TY_LE_DAT };

  var oTimNguoi = document.getElementById("xh-tim");
  if (oTimNguoi) oTimNguoi.addEventListener("input", function () { veTatCa({ tatCa: tatCa }); });

  if (!nguoiHoc()) {
    moCong();
    veXepHang(null);
  } else {
    document.documentElement.classList.remove("cho-ghi-danh");
    veDongNguoiHoc();
    if (document.getElementById("trang-xep-hang")) { veXepHang(null, true); taiXepHang(); }
    else if (doc("aiNative.chuaGui", false)) gui();
  }
})();
