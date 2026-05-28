(function () {
  const dialog = document.getElementById("photo-lightbox");
  if (!dialog) return;

  const lightboxImg = dialog.querySelector(".lightbox-img");
  const closeBtn = dialog.querySelector(".lightbox-close");
  let lastThumb = null;
  let scrollY = 0;

  function lockScroll() {
    scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
  }

  function unlockScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollY);
  }

  function openLightbox(thumb) {
    const group = thumb.closest(".thumbs");
    lightboxImg.src = thumb.src;
    lightboxImg.alt = group ? group.getAttribute("aria-label") || "" : "";
    lastThumb = thumb;
    lockScroll();
    dialog.showModal();
  }

  function closeLightbox() {
    dialog.close();
    lightboxImg.removeAttribute("src");
    lightboxImg.alt = "";
    unlockScroll();
    if (lastThumb) {
      lastThumb.tabIndex = -1;
      try {
        lastThumb.focus({ preventScroll: true });
      } catch {
        lastThumb.focus();
      }
      lastThumb = null;
    }
  }

  document.addEventListener("click", function (event) {
    const thumb = event.target.closest(".thumb");
    if (!thumb || dialog.contains(thumb)) return;
    openLightbox(thumb);
  });

  closeBtn.addEventListener("click", closeLightbox);

  dialog.addEventListener("cancel", function (event) {
    event.preventDefault();
    closeLightbox();
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      closeLightbox();
    }
  });
})();
