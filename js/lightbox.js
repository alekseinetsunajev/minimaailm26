(function () {
  const dialog = document.getElementById("photo-lightbox");
  if (!dialog) return;

  const lightboxImg = dialog.querySelector(".lightbox-img");
  const closeBtn = dialog.querySelector(".lightbox-close");
  let lastThumb = null;

  function openLightbox(thumb) {
    const group = thumb.closest(".thumbs");
    lightboxImg.src = thumb.src;
    lightboxImg.alt = group ? group.getAttribute("aria-label") || "" : "";
    lastThumb = thumb;
    dialog.showModal();
  }

  function closeLightbox() {
    dialog.close();
    lightboxImg.removeAttribute("src");
    lightboxImg.alt = "";
    if (lastThumb) {
      lastThumb.tabIndex = -1;
      lastThumb.focus();
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
