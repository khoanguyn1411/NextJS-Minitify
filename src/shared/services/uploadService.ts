export function convertFileToFormData(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return formData;
}
