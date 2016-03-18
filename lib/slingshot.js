Slingshot.fileRestrictions("photos", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 3 * 1024 * 1024 // 3 MB (use null for unlimited).
});