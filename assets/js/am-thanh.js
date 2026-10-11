// Âm thanh nhỏ khi rê chuột và bấm. Tiếng được tạo bằng Web Audio, không cần file âm thanh.
// Nơi khác gọi: window.AmThanh.phat("dung"). Nút loa trên thanh menu để tắt/bật, lựa chọn lưu trên trình duyệt.

(function () {
  var KHOA = "aiNative.amThanh";
  var AC = window.AudioContext || window.webkitAudioContext;
  var nguCanh = null;
  var tat = false;
  try { tat = localStorage.getItem(KHOA) === "tat"; } catch (e) { /* bỏ qua */ }

  // Mỗi tiếng là một chuỗi nốt: [tần số đầu, tần số cuối, bắt đầu (giây), dài (giây), âm lượng, dạng sóng]
  var TIENG = {
    "re":         [[900, 900, 0, 0.035, 0.025, "sine"]],
    "bam":        [[520, 340, 0, 0.07, 0.07, "triangle"]],
    "mo":         [[440, 660, 0, 0.12, 0.07, "sine"]],
    "dung":       [[660, 660, 0, 0.09, 0.09, "sine"], [880, 880, 0.09, 0.14, 0.09, "sine"]],
    "sai":        [[210, 150, 0, 0.2, 0.07, "triangle"]],
    "chao":       [[523, 523, 0, 0.1, 0.08, "sine"], [784, 784, 0.1, 0.18, 0.08, "sine"]],
    "hoan-thanh": [[523, 523, 0, 0.11, 0.1, "sine"], [659, 659, 0.11, 0.11, 0.1, "sine"], [784, 784, 0.22, 0.11, 0.1, "sine"], [1047, 1047, 0.33, 0.3, 0.1, "sine"]]
  };

  function layNguCanh() {
    if (!AC) return null;
    if (!nguCanh) nguCanh = new AC();
    if (nguCanh.state === "suspended") nguCanh.resume();
    return nguCanh;
  }

  function phat(ten) {
    if (tat || !TIENG[ten]) return;
    var nc = layNguCanh();
    // Trình duyệt chỉ cho phát tiếng sau khi người dùng đã bấm hoặc gõ ít nhất một lần
    if (!nc || nc.state !== "running") return;
    var goc = nc.currentTime;
    TIENG[ten].forEach(function (n) {
      var dao = nc.createOscillator();
      var am = nc.createGain();
      dao.type = n[5];
      dao.frequency.setValueAtTime(n[0], goc + n[2]);
      if (n[1] !== n[0]) dao.frequency.exponentialRampToValueAtTime(n[1], goc + n[2] + n[3]);
      am.gain.setValueAtTime(0.0001, goc + n[2]);
      am.gain.exponentialRampToValueAtTime(n[4], goc + n[2] + 0.01);
      am.gain.exponentialRampToValueAtTime(0.0001, goc + n[2] + n[3]);
      dao.connect(am);
      am.connect(nc.destination);
      dao.start(goc + n[2]);
      dao.stop(goc + n[2] + n[3] + 0.02);
    });
  }

  // Đánh thức âm thanh ở lần bấm hoặc gõ đầu tiên
  function danhThuc() { if (!tat) layNguCanh(); }
  document.addEventListener("pointerdown", danhThuc, true);
  document.addEventListener("keydown", danhThuc, true);

  // Những chỗ bấm được: rê chuột qua có tiếng "tích" nhẹ, bấm có tiếng "bấm"
  var BAM_DUOC = "a.nut, button.nut, .the, .chip, .menu a, .td-o, .muc-luc a, .lo-trinh-hoc a, .lua-chon button, " +
    ".muc-chon label, .tk-nut button, .nut-chep, .td-kieu, .nut-tim, .nut-menu, .tn, summary, .khung-video.phat, " +
    ".dieu-huong a, .tim-chung li a, .dang-hoc button, .thuong-hieu";
  // Những chỗ đã có tiếng riêng (đúng, sai, chào...), không phát thêm tiếng "bấm"
  var CO_TIENG_RIENG = ".lua-chon button, .gd-the .nut, .nut-chep, .nut-am";

  var coChuot = window.matchMedia && window.matchMedia("(hover: hover)").matches;
  var lanReCuoi = 0;
  if (coChuot) {
    document.addEventListener("mouseover", function (e) {
      var o = e.target.closest ? e.target.closest(BAM_DUOC) : null;
      if (!o || o.disabled) return;
      if (e.relatedTarget && o.contains(e.relatedTarget)) return; // vẫn đang ở trong cùng một nút
      var bayGio = Date.now();
      if (bayGio - lanReCuoi < 60) return; // rê nhanh qua nhiều nút thì không kêu dồn dập
      lanReCuoi = bayGio;
      phat("re");
    });
  }
  document.addEventListener("click", function (e) {
    var o = e.target.closest ? e.target.closest(BAM_DUOC) : null;
    if (!o || o.disabled || o.closest(CO_TIENG_RIENG)) return;
    phat(o.matches("summary, .tn, .tk-nut button") ? "mo" : "bam");
  });

  // Nút loa trên thanh menu
  var LOA_BAT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.500v5h3.500l4.500 4v-13l-4.500 4z"/><path d="M15.500 9a4 4 0 0 1 0 6M18 6.500a7.500 7.500 0 0 1 0 11"/></svg>';
  var LOA_TAT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.500v5h3.500l4.500 4v-13l-4.500 4z"/><path d="M16 9.500l5 5M21 9.500l-5 5"/></svg>';
  var nav = document.querySelector(".dau-trang nav");
  if (nav && AC) {
    var nut = document.createElement("button");
    nut.type = "button";
    nut.className = "nut-tim nut-am";
    function veNut() {
      nut.innerHTML = tat ? LOA_TAT : LOA_BAT;
      nut.setAttribute("aria-pressed", tat ? "false" : "true");
      nut.setAttribute("aria-label", tat ? "Bật âm thanh" : "Tắt âm thanh");
      nut.title = tat ? "Âm thanh đang tắt. Bấm để bật." : "Âm thanh đang bật. Bấm để tắt.";
    }
    nut.addEventListener("click", function () {
      tat = !tat;
      try { localStorage.setItem(KHOA, tat ? "tat" : "bat"); } catch (e) { /* bỏ qua */ }
      veNut();
      if (!tat) phat("mo");
    });
    veNut();
    nav.insertBefore(nut, nav.firstChild);
  }

  window.AmThanh = { phat: phat };
})();
