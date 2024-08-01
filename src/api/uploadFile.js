async function uploadFile(input) {
  let formData = new FormData();
  //const input = document.getElementById("uploadInput");
  let file = input.files[0];
  formData.append("file", file);
  formData.append("upload_preset", "lv63armf");
  let response = await fetch(
    "https://api.cloudinary.com/v1_1/ddlx05ofh/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );
  return response.json();
}
export { uploadFile };
