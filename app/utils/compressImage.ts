export async function compressImage(file: File, maxWidth = 512): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = Math.min(maxWidth / img.width, 1); // shrink if bigger than maxWidth
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return resolve(file);
          const newFile = new File([blob], file.name, { type: "image/jpeg" });
          resolve(newFile);
        },
        "image/jpeg",
        0.8 // quality (0–1)
      );
    };

    reader.readAsDataURL(file);
  });
}
