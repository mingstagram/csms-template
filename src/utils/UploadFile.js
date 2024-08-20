import axios from "axios";

export const UploadFile = (file, dataFunc) => {
  const formData = new FormData();
  formData.set("file", file);

  axios
    .post(process.env.PUBLIC_URL + "/image/api/upload_file", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      dataFunc(res);
    })
    .catch((e) => {
      dataFunc(e);
    });
};
