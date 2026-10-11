// Mã chạy chung cho mọi trang

// Mở/đóng menu trên điện thoại
(function () {
  var nut = document.querySelector(".nut-menu");
  var menu = document.getElementById("menu");
  if (!nut || !menu) return;

  nut.addEventListener("click", function () {
    var dangMo = menu.classList.toggle("mo");
    nut.setAttribute("aria-expanded", dangMo ? "true" : "false");
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("mo")) {
      menu.classList.remove("mo");
      nut.setAttribute("aria-expanded", "false");
      nut.focus();
    }
  });
})();

// Trang chủ: câu hỏi tự kiểm tra, bấm một nút thì hiện kết quả tương ứng
(function () {
  var khoi = document.querySelector(".tu-kiem");
  if (!khoi) return;
  var cacNut = khoi.querySelectorAll("[data-tk]");
  var cacKetQua = khoi.querySelectorAll(".tk-kq");
  cacKetQua.forEach(function (k) { k.hidden = true; });

  cacNut.forEach(function (nut) {
    nut.setAttribute("aria-pressed", "false");
    nut.addEventListener("click", function () {
      cacNut.forEach(function (n) { n.setAttribute("aria-pressed", n === nut ? "true" : "false"); });
      cacKetQua.forEach(function (k) { k.hidden = k.id !== nut.dataset.tk; });
    });
  });
})();

// Trang chủ: thẻ "Học tiếp", đọc tiến độ mà trang Kiến thức đã lưu trên trình duyệt này
(function () {
  var the = document.getElementById("hoc-tiep");
  if (!the) return;
  var tt;
  try { tt = JSON.parse(localStorage.getItem("aiNative.tomTat")); } catch (e) { return; }
  if (!tt || !tt.daXem || !tt.tong) return;

  var xong = tt.daXem >= tt.tong;
  document.getElementById("ht-nhan").textContent = xong ? "Anh chị đã xem hết các phần" : "Anh chị đang học dở";
  document.getElementById("ht-ten").textContent = xong ? "Kiến thức về AI Native Organization" : tt.ten;
  document.getElementById("ht-dem").textContent = "Đã xem " + tt.daXem + "/" + tt.tong + " phần";
  document.getElementById("ht-muc").style.width = Math.round((tt.daXem / tt.tong) * 100) + "%";
  var nut = document.getElementById("ht-nut");
  nut.textContent = xong ? "Xem lại" : "Học tiếp";
  nut.href = "kien-thuc.html" + (xong ? "" : "#" + encodeURIComponent(tt.id));
  the.hidden = false;
})();

function boDau(chu) {
  return String(chu).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");
}
function thoat(chu) {
  return String(chu == null ? "" : chu).replace(/[&<>"']/g, function (k) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[k];
  });
}
// Chỉ nhận link http(s) hoặc đường dẫn file trong website
function linkAnToan(link) {
  link = String(link || "").trim();
  if (/^https?:\/\//i.test(link)) return link;
  return /^[a-z][a-z0-9+.-]*:/i.test(link) ? "" : link;
}

// Trang Thư viện (dữ liệu ở data/thu-vien.js)
(function () {
  var khung = document.getElementById("ds-thu-vien");
  var ds = window.THU_VIEN;
  if (!khung || !ds) return;

  var HINH = { "Slide": "trinh-chieu", "Tài liệu": "tai-lieu", "Biểu mẫu": "bang" };
  var loaiChon = "Tất cả";
  var cacLoai = ["Tất cả"];
  ds.forEach(function (t) { if (t.loai && cacLoai.indexOf(t.loai) < 0) cacLoai.push(t.loai); });

  var khungLoc = document.getElementById("loc-loai");
  var oTim = document.getElementById("tim-thu-vien");
  var dem = document.getElementById("dem-thu-vien");

  function veLoc() {
    khungLoc.innerHTML = cacLoai.map(function (l) {
      return '<button type="button" class="chip" aria-pressed="' + (l === loaiChon) + '">' + thoat(l) + "</button>";
    }).join("");
  }

  function ve() {
    var tu = boDau(oTim.value.trim());
    var loc = ds.filter(function (t) {
      if (loaiChon !== "Tất cả" && t.loai !== loaiChon) return false;
      return !tu || boDau(t.tieuDe + " " + t.moTa + " " + t.loai).indexOf(tu) >= 0;
    });
    dem.textContent = loc.length + " tài liệu";
    if (!loc.length) {
      khung.innerHTML = '<li class="trong-rong">Không tìm thấy tài liệu phù hợp. Anh chị thử từ khóa khác hoặc chọn "Tất cả".</li>';
      return;
    }
    khung.innerHTML = loc.map(function (t) {
      var xem = linkAnToan(t.link);
      var tai = linkAnToan(t.taiVe);
      var nut = "";
      if (xem) nut += '<a class="nut" href="' + thoat(xem) + '" target="_blank" rel="noopener">Xem</a>';
      if (tai) nut += '<a class="nut phu" href="' + thoat(tai) + '" target="_blank" rel="noopener" download>Tải về</a>';
      if (!nut) nut = '<span class="sap-co">Sắp có</span>';
      return '<li class="the-tl"><div class="the-dau"><span class="ic">' + veBieuTuong(HINH[t.loai] || "tai-lieu") + "</span>" +
        '<span class="nhan-loai">' + thoat(t.loai) + "</span>" + (t.mau ? '<span class="nhan-mau">Mẫu</span>' : "") + "</div>" +
        "<h3>" + thoat(t.tieuDe) + '</h3><p class="nho-chu">' + thoat(t.moTa) + "</p>" +
        (t.ngay ? '<p class="tl-ngay">Cập nhật ' + thoat(t.ngay) + "</p>" : "") +
        '<div class="tl-nut">' + nut + "</div></li>";
    }).join("");
  }

  khungLoc.addEventListener("click", function (e) {
    var nut = e.target.closest(".chip");
    if (!nut) return;
    loaiChon = nut.textContent;
    veLoc();
    ve();
  });
  oTim.addEventListener("input", ve);
  veLoc();
  ve();
})();

// Trang Video (dữ liệu ở data/video.js)
(function () {
  var khung = document.getElementById("ds-video");
  var ds = window.VIDEO;
  if (!khung || !ds) return;

  function maYouTube(link) {
    var m = String(link).match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
    return m ? m[1] : "";
  }

  khung.innerHTML = ds.map(function (v, i) {
    var link = linkAnToan(v.link);
    var ma = link ? maYouTube(link) : "";
    var laFile = /\.(mp4|webm|ogv)(\?.*)?$/i.test(link);
    var khungHinh;
    if (laFile) {
      khungHinh = '<div class="khung-video"><video controls preload="metadata" src="' + thoat(link) + '">' +
        'Trình duyệt này không phát được video. <a href="' + thoat(link) + '">Tải video về</a>.</video></div>';
    } else if (ma) {
      khungHinh = '<button type="button" class="khung-video phat" data-ma="' + ma + '" aria-label="Phát video: ' + thoat(v.tieuDe) + '">' +
        "<b>" + (i + 1) + '</b><span class="ic to">' + veBieuTuong("phat") + "</span></button>";
    } else {
      khungHinh = '<div class="khung-video"><b>' + (i + 1) + "</b>" +
        (link ? "" : '<span class="sap-co">Sắp có</span>') + "</div>";
    }
    var nut = "";
    if (link && !ma && !laFile) nut += '<a class="nut" href="' + thoat(link) + '" target="_blank" rel="noopener">Mở video</a>';
    if (v.lienQuan) nut += '<a class="nut phu" href="kien-thuc.html#' + encodeURIComponent(v.lienQuan) + '">Đọc phần kiến thức đi kèm</a>';
    return '<li class="the-video">' + khungHinh + '<div class="tv-chu"><h3>' + thoat(v.tieuDe) +
      (v.mau ? ' <span class="nhan-mau">Mẫu</span>' : "") + "</h3>" +
      '<p class="nho-chu">' + thoat(v.moTa) + "</p>" +
      (v.thoiLuong ? '<p class="tl-ngay">' + veBieuTuongNho("dong-ho") + thoat(v.thoiLuong) + "</p>" : "") +
      '<div class="tl-nut">' + nut + "</div></div></li>";
  }).join("");

  // Bấm vào khung hình thì mới tải trình phát, để trang mở nhanh
  khung.addEventListener("click", function (e) {
    var nut = e.target.closest(".khung-video.phat");
    if (!nut) return;
    var o = document.createElement("div");
    o.className = "khung-video";
    o.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + nut.dataset.ma +
      '?autoplay=1" title="Trình phát video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    nut.replaceWith(o);
  });
})();

// Trang Hỏi đáp (dữ liệu ở data/hoi-dap.js)
(function () {
  var khungThu = document.getElementById("hom-thu");
  var homThu = window.HOM_THU;
  if (khungThu && homThu) {
    var link = linkAnToan(homThu.linkForms);
    if (/^https:\/\//i.test(link)) {
      khungThu.innerHTML = '<a class="nut" href="' + thoat(link) + '" target="_blank" rel="noopener">Gửi câu hỏi</a>' +
        '<p class="nho-chu">Biểu mẫu mở ở một thẻ mới.</p>';
    } else {
      khungThu.innerHTML = '<span class="sap-co">Hòm thư sắp mở</span>';
    }
  }

  var khung = document.getElementById("ds-hoi-dap");
  var ds = window.HOI_DAP;
  if (!khung || !ds) return;

  var chuDeChon = "Tất cả";
  var cacChuDe = ["Tất cả"];
  ds.forEach(function (c) { if (c.chuDe && cacChuDe.indexOf(c.chuDe) < 0) cacChuDe.push(c.chuDe); });
  var khungLoc = document.getElementById("loc-chu-de");
  var oTim = document.getElementById("tim-hoi-dap");
  var dem = document.getElementById("dem-hoi-dap");

  function veLoc() {
    khungLoc.innerHTML = cacChuDe.map(function (c) {
      return '<button type="button" class="chip" aria-pressed="' + (c === chuDeChon) + '">' + thoat(c) + "</button>";
    }).join("");
  }

  function ve() {
    var tu = boDau(oTim.value.trim());
    var loc = ds.filter(function (c) {
      if (chuDeChon !== "Tất cả" && c.chuDe !== chuDeChon) return false;
      return !tu || boDau(c.hoi + " " + c.dap).indexOf(tu) >= 0;
    });
    dem.textContent = loc.length + " câu hỏi";
    if (!loc.length) {
      khung.innerHTML = '<p class="trong-rong">Chưa có câu hỏi nào khớp. Anh chị gửi câu hỏi vào hòm thư nhé.</p>';
      return;
    }
    khung.innerHTML = loc.map(function (c) {
      return "<details><summary>" + thoat(c.hoi) + "</summary><p>" + thoat(c.dap) + '</p><p class="hd-nhan">' +
        '<span class="nhan-loai">' + thoat(c.chuDe) + "</span>" +
        (c.tuHomThu ? '<span class="nhan-mau">Từ hòm thư</span>' : "") +
        (c.ngay ? "<span>Trả lời ngày " + thoat(c.ngay) + "</span>" : "") + "</p></details>";
    }).join("");
  }

  khungLoc.addEventListener("click", function (e) {
    var nut = e.target.closest(".chip");
    if (!nut) return;
    chuDeChon = nut.textContent;
    veLoc();
    ve();
  });
  oTim.addEventListener("input", ve);
  veLoc();
  ve();
})();

// Trang Thử ngay (dữ liệu ở data/thu-ngay.js)
(function () {
  var khung = document.getElementById("ds-thu-ngay");
  var ds = window.THU_NGAY;
  if (!khung || !ds) return;

  var HINH = { "Viết": "but", "Tóm tắt": "tai-lieu", "Số liệu": "bang", "Lên kế hoạch": "lich" };
  var nhomChon = "Tất cả";
  var cacNhom = ["Tất cả"];
  ds.forEach(function (c) { if (c.nhom && cacNhom.indexOf(c.nhom) < 0) cacNhom.push(c.nhom); });
  var khungLoc = document.getElementById("loc-nhom");

  function ve() {
    khungLoc.innerHTML = cacNhom.map(function (n) {
      return '<button type="button" class="chip" aria-pressed="' + (n === nhomChon) + '">' + thoat(n) + "</button>";
    }).join("");
    khung.innerHTML = ds.map(function (c, i) {
      if (nhomChon !== "Tất cả" && c.nhom !== nhomChon) return "";
      // Chỗ cần tự điền [trong ngoặc vuông] được tô nổi
      var chu = thoat(c.cauLenh).replace(/\[[^\]]+\]/g, "<mark>$&</mark>");
      return '<li class="the-lenh"><div class="the-dau"><span class="ic">' + veBieuTuong(HINH[c.nhom] || "sao") + "</span>" +
        "<h3>" + thoat(c.ten) + "<small>" + thoat(c.khi) + "</small></h3></div>" +
        '<div class="cau-lenh"><b>Câu lệnh mẫu</b><p>' + chu + "</p>" +
        '<button type="button" class="nut-chep" data-i="' + i + '">Sao chép</button></div>' +
        (c.kiemTra ? '<p class="nho-kiem-tra"><span class="ic nho vang">' + veBieuTuong("mat") + "</span><span><b>Nhớ kiểm tra:</b> " + thoat(c.kiemTra) + "</span></p>" : "") +
        "</li>";
    }).join("");
  }

  function chep(chu) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(chu);
    return new Promise(function (xong, loi) {
      var o = document.createElement("textarea");
      o.value = chu;
      o.style.position = "fixed";
      o.style.opacity = "0";
      document.body.appendChild(o);
      o.select();
      var ok = document.execCommand("copy");
      o.remove();
      ok ? xong() : loi();
    });
  }

  khungLoc.addEventListener("click", function (e) {
    var nut = e.target.closest(".chip");
    if (!nut) return;
    nhomChon = nut.textContent;
    ve();
  });
  khung.addEventListener("click", function (e) {
    var nut = e.target.closest(".nut-chep");
    if (!nut) return;
    chep(ds[Number(nut.dataset.i)].cauLenh).then(
      function () { nut.textContent = "Đã chép ✓"; if (window.AmThanh) window.AmThanh.phat("dung"); },
      function () { nut.textContent = "Không chép được, anh chị bôi đen để chép"; if (window.AmThanh) window.AmThanh.phat("sai"); }
    );
    setTimeout(function () { nut.textContent = "Sao chép"; }, 2500);
  });
  ve();
})();

// Câu hỏi nhanh cuối mỗi chặng ở trang Kiến thức (dữ liệu ở data/cau-hoi-nhanh.js)
(function () {
  var tatCa = window.CAU_HOI_NHANH;
  if (!tatCa) return;
  var CHU = ["A", "B", "C", "D", "E"];

  function docDiem() {
    try { return JSON.parse(localStorage.getItem("aiNative.diem")) || {}; } catch (e) { return {}; }
  }
  // Tổng số câu của mọi chặng, dùng để tính tỷ lệ đúng
  var tongCau = 0;
  Object.keys(tatCa).forEach(function (k) { tongCau += tatCa[k].length; });
  try { localStorage.setItem("aiNative.tongCau", JSON.stringify(tongCau)); } catch (e) { /* bỏ qua */ }

  // Lưu điểm cao nhất của từng bài rồi gửi tiến độ
  function luuDiem(bo, soDung) {
    var diem = docDiem();
    if (soDung > (Number(diem[bo]) || 0)) {
      diem[bo] = soDung;
      try { localStorage.setItem("aiNative.diem", JSON.stringify(diem)); } catch (e) { /* bỏ qua */ }
      if (window.NguoiHoc) window.NguoiHoc.henGui();
    }
    document.dispatchEvent(new Event("diem-cau-hoi"));
  }

  document.querySelectorAll(".trac-nghiem[data-bo]").forEach(function (khung) {
    var ds = tatCa[khung.dataset.bo];
    if (!ds) return;

    function ve() {
      khung.innerHTML = ds.map(function (c, i) {
        return '<fieldset class="cau" data-i="' + i + '"><legend><span class="nhan-loai">' + thoat(c.muc) + "</span> Câu " + (i + 1) + ". " + thoat(c.hoi) + "</legend>" +
          '<div class="lua-chon">' + c.luaChon.map(function (l, j) {
            return '<button type="button" data-j="' + j + '"><b>' + CHU[j] + "</b><span>" + thoat(l) + "</span></button>";
          }).join("") + '</div><p class="giai-thich" aria-live="polite" hidden></p></fieldset>';
      }).join("") + '<div class="tn-ket-qua" aria-live="polite"><p></p><button type="button" class="nut phu" hidden>Làm lại</button></div>';
      tomTat();
    }

    function tomTat() {
      var daLam = khung.querySelectorAll(".cau.xong").length;
      var dung = khung.querySelectorAll(".cau.tra-loi-dung").length;
      var chu = khung.querySelector(".tn-ket-qua p");
      var nutLai = khung.querySelector(".tn-ket-qua button");
      if (daLam < ds.length) {
        var diemCu = docDiem()[khung.dataset.bo];
        chu.textContent = "Đã trả lời " + daLam + "/" + ds.length + " câu." +
          (daLam === 0 && diemCu != null ? " Điểm cao nhất lần trước: " + diemCu + "/" + ds.length + "." : "");
      } else {
        chu.textContent = "Anh chị trả lời đúng " + dung + "/" + ds.length + " câu." +
          (dung === ds.length ? " Tuyệt vời!" : " Xem lại phần giải thích rồi thử lại nhé.");
      }
      nutLai.hidden = daLam === 0;
    }

    khung.addEventListener("click", function (e) {
      if (e.target.closest(".tn-ket-qua button")) { ve(); return; }
      var nut = e.target.closest(".lua-chon button");
      if (!nut) return;
      var cau = nut.closest(".cau");
      if (cau.classList.contains("xong")) return;
      var c = ds[Number(cau.dataset.i)];
      var chon = Number(nut.dataset.j);
      cau.classList.add("xong");
      cau.classList.toggle("tra-loi-dung", chon === c.dung);
      cau.querySelectorAll(".lua-chon button").forEach(function (b, j) {
        b.disabled = true;
        if (j === c.dung) b.classList.add("dung");
        else if (j === chon) b.classList.add("sai");
      });
      var gt = cau.querySelector(".giai-thich");
      gt.textContent = (chon === c.dung ? "Đúng rồi. " : "Chưa đúng, đáp án là " + CHU[c.dung] + ". ") + c.giaiThich;
      gt.hidden = false;
      tomTat();
      if (window.AmThanh) window.AmThanh.phat(chon === c.dung ? "dung" : "sai");
      if (khung.querySelectorAll(".cau.xong").length === ds.length) {
        var soDung = khung.querySelectorAll(".cau.tra-loi-dung").length;
        // Đúng hết cả bài thì thưởng một tiếng nhạc ngắn
        if (soDung === ds.length && window.AmThanh) setTimeout(function () { window.AmThanh.phat("hoan-thanh"); }, 350);
        luuDiem(khung.dataset.bo, soDung);
      }
    });
    ve();
  });
})();

// Tìm kiếm chung: nút kính lúp trên thanh menu, tìm trong kiến thức, từ điển, thư viện, video, hỏi đáp, câu lệnh mẫu
(function () {
  var dauTrang = document.querySelector(".dau-trang");
  var nav = dauTrang ? dauTrang.querySelector("nav") : null;
  if (!nav) return;

  var nutMo = document.createElement("button");
  nutMo.type = "button";
  nutMo.className = "nut-tim";
  nutMo.setAttribute("aria-label", "Tìm kiếm");
  nutMo.setAttribute("aria-expanded", "false");
  nutMo.innerHTML = veBieuTuong("tim-kiem");
  nav.insertBefore(nutMo, nav.firstChild);

  var bang = document.createElement("div");
  bang.className = "tim-chung";
  bang.hidden = true;
  bang.innerHTML = '<div class="khung"><input type="search" class="o-tim" placeholder="Tìm trong toàn bộ website…" aria-label="Tìm trong toàn bộ website">' +
    '<p class="dem-kq" aria-live="polite"></p><ul></ul></div>';
  dauTrang.appendChild(bang);
  var oTim = bang.querySelector("input");
  var dem = bang.querySelector(".dem-kq");
  var khungKq = bang.querySelector("ul");

  var chiMuc = null;
  function them(loai, ten, moTa, url) {
    chiMuc.push({ loai: loai, ten: ten, moTa: moTa, url: url, tenTim: boDau(ten), chuTim: boDau(ten + " " + moTa) });
  }
  function napFile(duongDan, bien) {
    if (window[bien]) return Promise.resolve();
    return new Promise(function (xong) {
      var s = document.createElement("script");
      s.src = duongDan;
      s.onload = s.onerror = xong;
      document.head.appendChild(s);
    });
  }
  function layTrangKienThuc() {
    if (document.querySelector(".bai .chang")) return Promise.resolve(document);
    return fetch("kien-thuc.html")
      .then(function (r) { return r.text(); })
      .then(function (html) { return new DOMParser().parseFromString(html, "text/html"); })
      .catch(function () { return null; }); // mở file trực tiếp trên máy thì không đọc được trang khác
  }

  function lapChiMuc() {
    if (chiMuc) return Promise.resolve();
    chiMuc = [];
    return Promise.all([
      layTrangKienThuc(),
      napFile("data/thu-vien.js", "THU_VIEN"),
      napFile("data/video.js", "VIDEO"),
      napFile("data/hoi-dap.js", "HOI_DAP"),
      napFile("data/thu-ngay.js", "THU_NGAY")
    ]).then(function (kq) {
      var trang = kq[0];
      if (trang) {
        trang.querySelectorAll(".chang > section[id]").forEach(function (p) {
          if (p.querySelector(".trac-nghiem")) return;
          var ban = p.cloneNode(true);
          ban.querySelectorAll("h2, .ma-tran, .tu-dien").forEach(function (o) { o.remove(); });
          them("Kiến thức", p.querySelector("h2").textContent, ban.textContent.replace(/\s+/g, " ").trim(), "kien-thuc.html#" + p.id);
        });
        trang.querySelectorAll(".tu-dien > div[id]").forEach(function (t) {
          them("Từ điển", t.querySelector("dt").textContent.replace(/\s+/g, " ").trim(), t.querySelector("dd").textContent, "kien-thuc.html#" + t.id);
        });
      }
      (window.THU_VIEN || []).forEach(function (t) { them("Thư viện", t.tieuDe, t.moTa, "thu-vien.html"); });
      (window.VIDEO || []).forEach(function (v) { them("Video", v.tieuDe, v.moTa, "video.html"); });
      (window.HOI_DAP || []).forEach(function (c) { them("Hỏi đáp", c.hoi, c.dap, "hoi-dap.html"); });
      (window.THU_NGAY || []).forEach(function (c) { them("Câu lệnh mẫu", c.ten, c.khi, "thu-ngay.html"); });
    });
  }

  function tim() {
    var tu = boDau(oTim.value.trim()).split(/\s+/).filter(Boolean);
    if (!tu.length) { khungKq.innerHTML = ""; dem.textContent = "Gõ từ cần tìm, ví dụ: agent, bảo mật, biên bản."; return; }
    // Ưu tiên khớp nguyên cụm từ; không có thì mới tìm theo từng chữ rời
    var cum = tu.join(" ");
    var kq = chiMuc.filter(function (m) { return m.chuTim.indexOf(cum) >= 0; });
    if (!kq.length) {
      kq = chiMuc.filter(function (m) {
        return tu.every(function (t) { return m.chuTim.indexOf(t) >= 0; });
      });
    }
    // Khớp ngay ở tên thì xếp lên trước
    kq.sort(function (a, b) {
      var da = tu.every(function (t) { return a.tenTim.indexOf(t) >= 0; }) ? 0 : 1;
      var db = tu.every(function (t) { return b.tenTim.indexOf(t) >= 0; }) ? 0 : 1;
      return da - db;
    });
    dem.textContent = kq.length ? "Tìm thấy " + kq.length + " kết quả" : "Không tìm thấy. Anh chị thử từ khác, hoặc gửi câu hỏi vào hòm thư.";
    khungKq.innerHTML = kq.slice(0, 12).map(function (m) {
      var moTa = m.moTa.length > 120 ? m.moTa.slice(0, 120) + "…" : m.moTa;
      return '<li><a href="' + thoat(m.url) + '"><span class="nhan-loai">' + thoat(m.loai) + "</span><b>" + thoat(m.ten) +
        "</b><span>" + thoat(moTa) + "</span></a></li>";
    }).join("");
  }

  function dong() {
    bang.hidden = true;
    nutMo.setAttribute("aria-expanded", "false");
  }
  nutMo.addEventListener("click", function () {
    if (!bang.hidden) { dong(); return; }
    bang.hidden = false;
    nutMo.setAttribute("aria-expanded", "true");
    oTim.focus();
    lapChiMuc().then(tim);
  });
  oTim.addEventListener("input", function () { lapChiMuc().then(tim); });
  khungKq.addEventListener("click", function (e) { if (e.target.closest("a")) dong(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !bang.hidden) { dong(); nutMo.focus(); }
  });
  document.addEventListener("click", function (e) {
    if (!bang.hidden && !bang.contains(e.target) && !nutMo.contains(e.target)) dong();
  });
})();

function veBieuTuongNho(ten) {
  return '<span class="ic nho">' + veBieuTuong(ten) + "</span>";
}

function veBieuTuong(ten) {
  var hinh = (window.BIEU_TUONG || {})[ten] || "";
  return '<svg viewBox="0 0 24 24" aria-hidden="true">' + hinh + "</svg>";
}

// Bảng tự chấm điểm AI Native (dữ liệu ở assets/js/ma-tran.js)
(function () {
  var khung = document.getElementById("ma-tran");
  var duLieu = window.MA_TRAN;
  if (!khung || !duLieu) return;

  var goiY = "Chọn mức giống bộ phận mình nhất.";
  var html = "";
  duLieu.truCot.forEach(function (tc, i) {
    html += '<fieldset class="tru-cot"><legend><span class="ic" data-ic="' + tc.bieuTuong + '"></span>' +
      "<span><b>" + tc.ten + "</b><small>" + tc.tenGoc + "</small></span></legend>" +
      '<div class="muc-chon">';
    tc.muc.forEach(function (m, j) {
      html += '<label><input type="radio" name="tc' + i + '" value="' + (j + 1) + '">' +
        "<span><b>" + (j + 1) + "</b>" + m[0] + "</span></label>";
    });
    html += '</div><p class="mo-ta-muc" aria-live="polite">' + goiY + "</p></fieldset>";
  });
  html += '<div class="ket-qua" aria-live="polite"><div class="diem"><b id="tong-diem">0</b><span>/20</span></div>' +
    '<p id="nhan-xet">Chọn đủ 4 trụ cột để xem tổng điểm.</p>' +
    '<button type="button" class="nut phu" id="lam-lai">Làm lại</button></div>';
  khung.innerHTML = html;

  function capNhat() {
    var tong = 0;
    var daChon = 0;
    khung.querySelectorAll(".tru-cot").forEach(function (o, i) {
      var chon = o.querySelector("input:checked");
      var moTa = o.querySelector(".mo-ta-muc");
      if (!chon) { moTa.textContent = goiY; moTa.classList.remove("co"); return; }
      var muc = Number(chon.value);
      tong += muc;
      daChon += 1;
      moTa.textContent = duLieu.truCot[i].muc[muc - 1][1];
      moTa.classList.add("co");
    });
    document.getElementById("tong-diem").textContent = tong;
    var nhanXet = document.getElementById("nhan-xet");
    if (daChon < duLieu.truCot.length) {
      nhanXet.textContent = "Đã chọn " + daChon + "/4 trụ cột. Chọn đủ để xem kết quả.";
    } else {
      var mucChung = Math.round(tong / duLieu.truCot.length);
      nhanXet.textContent = "Nhìn chung bộ phận mình đang ở mức " + mucChung + "/5: " +
        duLieu.tenMuc[mucChung - 1] + ". Kết quả chỉ để tự tham khảo, không được lưu lại.";
    }
  }

  khung.addEventListener("change", capNhat);
  document.getElementById("lam-lai").addEventListener("click", function () {
    khung.querySelectorAll("input:checked").forEach(function (o) { o.checked = false; });
    capNhat();
  });
})();

// Thay <span data-ic="..."> bằng hình biểu tượng
document.querySelectorAll("[data-ic]").forEach(function (o) {
  o.innerHTML = veBieuTuong(o.dataset.ic);
});

// Trang Kiến thức: học theo từng phần như slide, có thanh tiến độ và mục lục tô đậm phần đang xem.
// Tiến độ lưu trên trình duyệt của từng người (localStorage), không gửi đi đâu.
(function () {
  var bai = document.querySelector(".bai");
  var cacPhan = bai ? Array.prototype.slice.call(bai.querySelectorAll(".chang > section[id]")) : [];
  if (!cacPhan.length) return;

  var KHOA_DA_XEM = "aiNative.daXem";
  var KHOA_KIEU = "aiNative.kieuXem";
  var KHOA_VI_TRI = "aiNative.dangO";

  function doc(khoa, macDinh) {
    try {
      var v = localStorage.getItem(khoa);
      return v ? JSON.parse(v) : macDinh;
    } catch (e) { return macDinh; }
  }
  function ghi(khoa, giaTri) {
    try { localStorage.setItem(khoa, JSON.stringify(giaTri)); } catch (e) { /* không lưu được thì thôi */ }
  }

  var tong = cacPhan.length;
  var cacId = cacPhan.map(function (p) { return p.id; });
  var daXem = doc(KHOA_DA_XEM, []).filter(function (id) { return cacId.indexOf(id) >= 0; });
  var tungPhan = doc(KHOA_KIEU, "tung-phan") !== "tat-ca";
  var viTri = 0;

  // Tên ngắn của từng phần lấy từ mục lục
  var lienKet = {};
  document.querySelectorAll(".muc-luc ol ol a").forEach(function (a) {
    lienKet[a.getAttribute("href").slice(1)] = a;
  });
  var cacNhom = document.querySelectorAll(".muc-luc .nhom");
  function tenPhan(i) {
    var a = lienKet[cacId[i]];
    return a ? a.textContent : cacPhan[i].querySelector("h2").textContent;
  }
  cacPhan.forEach(function (p, i) { p.dataset.so = "Phần " + (i + 1) + "/" + tong; });

  // Thanh tiến độ: mỗi ô là một phần, gom theo chặng
  var thanh = document.createElement("div");
  thanh.className = "tien-do";
  thanh.setAttribute("role", "region");
  thanh.setAttribute("aria-label", "Tiến độ học");
  var htmlO = "";
  bai.querySelectorAll(".chang").forEach(function (chang) {
    var cacPhanCon = chang.querySelectorAll(":scope > section[id]");
    htmlO += '<span class="td-nhom" style="flex-grow:' + cacPhanCon.length + '">';
    cacPhanCon.forEach(function (p) {
      var i = cacId.indexOf(p.id);
      htmlO += '<a class="td-o" href="#' + p.id + '" title="' + tenPhan(i) + '" aria-label="Phần ' + (i + 1) + ": " + tenPhan(i) + '"></a>';
    });
    htmlO += "</span>";
  });
  thanh.innerHTML = '<div class="khung"><div class="td-chu"><b id="td-ten"></b><span id="td-dem" aria-live="polite"></span>' +
    '<button type="button" class="td-kieu"></button></div><div class="td-thanh">' + htmlO + "</div></div>";
  var boCuc = document.querySelector(".bo-cuc-bai");
  boCuc.parentNode.insertBefore(thanh, boCuc);
  document.body.classList.add("co-tien-do");
  var cacO = thanh.querySelectorAll(".td-o");
  var nutKieu = thanh.querySelector(".td-kieu");

  // Nút Trước / Tiếp và lời chúc khi xem hết
  var xong = document.createElement("div");
  xong.className = "xong-roi hop";
  xong.innerHTML = '<p class="loi-ket"></p><p>Muốn ôn lại thì xem <a href="video.html">video khóa học</a>, ' +
    'còn thắc mắc thì <a href="hoi-dap.html">gửi câu hỏi vào hòm thư</a>.</p>';
  // Bài câu hỏi nhanh vừa làm xong thì cập nhật lại lời nhắn
  document.addEventListener("diem-cau-hoi", function () { veLoiKet(); });
  bai.appendChild(xong);
  var dieuHuong = document.createElement("nav");
  dieuHuong.className = "dieu-huong";
  dieuHuong.setAttribute("aria-label", "Chuyển phần");
  dieuHuong.innerHTML = '<a class="nut phu truoc"></a><a class="nut sau"></a>';
  bai.appendChild(dieuHuong);
  var nutTruoc = dieuHuong.querySelector(".truoc");
  var nutSau = dieuHuong.querySelector(".sau");

  function datDangXem(i) {
    viTri = i;
    var id = cacId[i];
    var phanMoi = daXem.indexOf(id) < 0;
    if (phanMoi) { daXem.push(id); ghi(KHOA_DA_XEM, daXem); }
    ghi(KHOA_VI_TRI, id);

    Object.keys(lienKet).forEach(function (k) {
      lienKet[k].classList.toggle("dang-xem", k === id);
      lienKet[k].classList.toggle("da-xem", daXem.indexOf(k) >= 0);
    });
    var nhom = lienKet[id] ? lienKet[id].closest(".nhom") : null;
    cacNhom.forEach(function (n) { n.classList.toggle("dang-xem-nhom", n === nhom); });
    // Trên điện thoại mục lục là một hàng ngang: cuộn tới chặng đang xem
    var khung = document.querySelector(".muc-luc");
    if (nhom && khung.scrollWidth > khung.clientWidth) {
      khung.scrollTo({ left: nhom.offsetLeft - 20, behavior: "smooth" });
    }

    cacO.forEach(function (o, j) {
      o.classList.toggle("dang-xem", j === i);
      o.classList.toggle("da-xem", daXem.indexOf(cacId[j]) >= 0);
    });
    var chang = cacPhan[i].closest(".chang");
    var tenDayDu = chang.querySelector(".dau-chang small").textContent + " · " + tenPhan(i);
    document.getElementById("td-ten").textContent = tenDayDu;
    // Trang chủ dùng bản tóm tắt này cho thẻ "Học tiếp"
    ghi("aiNative.tomTat", { daXem: daXem.length, tong: tong, id: id, ten: tenDayDu });
    // Mở một phần mới thì gửi tiến độ về nơi lưu chung (assets/js/nguoi-hoc.js)
    if (phanMoi && window.NguoiHoc) window.NguoiHoc.henGui();
    veLoiKet();
  }

  // Lời nhắn ở phần cuối: đã đủ điều kiện hoàn thành chưa
  function veLoiKet() {
    var loi = "Anh chị đã đi tới phần cuối.";
    if (window.NguoiHoc) {
      var td = window.NguoiHoc.tienDo();
      var canDung = Math.ceil(td.tongCau * window.NguoiHoc.tyLeDat);
      if (window.NguoiHoc.daDat(td)) {
        loi = "Chúc mừng, anh chị đã hoàn thành khóa học: xem đủ " + td.tongPhan + " phần và đúng " + td.soDung + "/" + td.tongCau + " câu hỏi nhanh.";
        // Lần đầu đạt điều kiện hoàn thành thì phát nhạc mừng (chỉ một lần)
        if (!doc("aiNative.daMung", false)) {
          ghi("aiNative.daMung", true);
          if (window.AmThanh) setTimeout(function () { window.AmThanh.phat("hoan-thanh"); }, 500);
        }
      } else {
        var thieu = [];
        if (td.soPhan < td.tongPhan) thieu.push("còn " + (td.tongPhan - td.soPhan) + " phần chưa mở (các ô màu xám trên thanh tiến độ)");
        if (td.soDung < canDung) thieu.push("cần đúng ít nhất " + canDung + "/" + td.tongCau + " câu hỏi nhanh, hiện đúng " + td.soDung);
        loi = "Anh chị đã đi tới phần cuối. Để được tính hoàn thành: " + thieu.join("; ") + ".";
      }
    }
    xong.querySelector(".loi-ket").textContent = loi;
    document.getElementById("td-dem").innerHTML = "<i>Đã xem </i>" + daXem.length + "/" + tong + "<i> phần</i>";
  }

  function hien(i, cuon) {
    cacPhan.forEach(function (p, j) { p.classList.toggle("hien", j === i); });
    bai.querySelectorAll(".chang").forEach(function (c) {
      c.classList.toggle("hien", c.contains(cacPhan[i]));
    });
    bai.classList.toggle("o-cuoi", i === tong - 1);
    datDangXem(i);

    nutTruoc.hidden = i === 0;
    nutSau.hidden = i === tong - 1;
    if (i > 0) { nutTruoc.href = "#" + cacId[i - 1]; nutTruoc.textContent = "← Trước"; }
    if (i < tong - 1) { nutSau.href = "#" + cacId[i + 1]; nutSau.textContent = "Tiếp: " + tenPhan(i + 1) + " →"; }

    if (cuon) {
      var dau = document.querySelector(".dau-trang").offsetHeight + thanh.offsetHeight + 20;
      var dich = tungPhan ? cacPhan[i].closest(".chang") : cacPhan[i];
      window.scrollTo({ top: dich.getBoundingClientRect().top + window.scrollY - dau, behavior: "instant" });
    }
  }

  function datKieu(kieuTungPhan) {
    tungPhan = kieuTungPhan;
    bai.classList.toggle("tung-phan", tungPhan);
    nutKieu.textContent = tungPhan ? "Xem tất cả" : "Xem từng phần";
    nutKieu.title = tungPhan ? "Hiện toàn bộ nội dung trên một trang để cuộn" : "Hiện từng phần một như slide";
    ghi(KHOA_KIEU, tungPhan ? "tung-phan" : "tat-ca");
  }
  nutKieu.addEventListener("click", function () {
    datKieu(!tungPhan);
    hien(viTri, true);
  });

  // Tìm phần ứng với #... trên thanh địa chỉ (id của phần, của chặng, hoặc của một từ trong từ điển)
  function viTriTuHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) return -1;
    var o = document.getElementById(id);
    if (!o || !bai.contains(o)) return -1;
    var phan = o.matches(".chang") ? o.querySelector("section[id]") : o.closest("section[id]");
    return phan ? cacId.indexOf(phan.id) : -1;
  }
  window.addEventListener("hashchange", function () {
    var i = viTriTuHash();
    if (i >= 0) hien(i, true);
  });

  // Phím mũi tên trái/phải để chuyển phần
  document.addEventListener("keydown", function (e) {
    if (!tungPhan || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target.closest && e.target.closest("input, textarea, select, button, summary, [contenteditable]")) return;
    var i = e.key === "ArrowRight" ? viTri + 1 : e.key === "ArrowLeft" ? viTri - 1 : -1;
    if (i >= 0 && i < tong && i !== viTri) location.hash = cacId[i];
  });

  // Khi xem tất cả trên một trang: cuộn tới đâu đánh dấu tới đó
  if ("IntersectionObserver" in window) {
    var quanSat = new IntersectionObserver(
      function (cacMuc) {
        if (tungPhan) return;
        cacMuc.forEach(function (muc) {
          if (muc.isIntersecting) datDangXem(cacId.indexOf(muc.target.id));
        });
      },
      { rootMargin: "-160px 0px -60% 0px" }
    );
    cacPhan.forEach(function (p) { quanSat.observe(p); });
  }

  // Mở trang: theo #... nếu có, không thì quay lại phần đang xem dở
  datKieu(tungPhan);
  var batDau = viTriTuHash();
  var coHash = batDau >= 0;
  if (!coHash) batDau = Math.max(0, cacId.indexOf(doc(KHOA_VI_TRI, cacId[0])));
  hien(batDau, coHash);
})();

// Thuật ngữ: bấm vào từ gạch chấm là hiện nghĩa, lấy từ mục Từ điển trên cùng trang
(function () {
  var cacTu = document.querySelectorAll(".tn[data-tn]");
  if (!cacTu.length) return;

  var hop = document.createElement("div");
  hop.className = "nghia-noi";
  hop.setAttribute("role", "tooltip");
  hop.id = "nghia-noi";
  hop.hidden = true;
  document.body.appendChild(hop);
  var dangMo = null;

  function dong() {
    hop.hidden = true;
    if (dangMo) dangMo.removeAttribute("aria-describedby");
    dangMo = null;
  }

  function mo(nut) {
    var muc = document.getElementById("tn-" + nut.dataset.tn);
    if (!muc) return;
    hop.innerHTML = "";
    var ten = document.createElement("b");
    ten.textContent = muc.querySelector("dt").firstChild.textContent.trim();
    hop.appendChild(ten);
    hop.appendChild(document.createTextNode(muc.querySelector("dd").textContent));
    hop.hidden = false;

    var o = nut.getBoundingClientRect();
    var trai = Math.min(o.left, window.innerWidth - hop.offsetWidth - 12);
    hop.style.left = Math.max(12, trai) + window.scrollX + "px";
    hop.style.top = o.bottom + window.scrollY + 8 + "px";
    nut.setAttribute("aria-describedby", hop.id);
    dangMo = nut;
  }

  cacTu.forEach(function (nut) {
    nut.addEventListener("click", function (e) {
      e.stopPropagation();
      if (dangMo === nut) dong();
      else { dong(); mo(nut); }
    });
  });

  document.addEventListener("click", dong);
  window.addEventListener("resize", dong);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") dong();
  });
})();
