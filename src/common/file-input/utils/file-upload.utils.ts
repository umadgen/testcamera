export const ACCEPTED_FILE_TYPES =
  "image/*,application/pdf,.doc,.docx,.xls,.xlsx";

export const generateFileId = (): string =>
  `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const createFileUrl = (file: File, fileContent: string): string =>
  file.type.startsWith("image/") ? fileContent : ``;

export const readFileAsDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

export const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] ?? "image/jpeg";
  const bstr = atob(arr[arr.length - 1]);
  const u8arr = new Uint8Array(bstr.length);

  for (let n = 0; n < bstr.length; n++) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};
