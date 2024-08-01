async function uploadFiles(savedImages, input) {
  let files = input.files;
  let filesUrls = [];
  let i =savedImages.length > 0 ? savedImages.length : 0;
    for (const file of files) {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "lv63armf");
      let response = await fetch(
          "https://api.cloudinary.com/v1_1/ddlx05ofh/image/upload",
          {
              method: "POST",
              body: formData,
          }
      );
      //, imageID:data.asset_id
      await response.json().then((data)=>{ i++;
          filesUrls.push({imageFilePath: data.secure_url, imageOrder:i});
          
      });
  }
  return await [...savedImages, ...filesUrls];
}
export { uploadFiles };
