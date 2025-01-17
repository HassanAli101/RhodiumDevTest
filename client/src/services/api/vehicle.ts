import axiosInstance from "../router/AxiosInstance";

export const SubmitVehicleInfo = async (data: {
  carModel: string;
  price: number;
  phoneNumber: number;
  numPictures: number;
  pictureURLs: File[];
  email: string;
  userLoggedIn: boolean;
}) => {

  const formData = new FormData();
  formData.append("carModel", data.carModel);
  formData.append("price", data.price.toString());
  formData.append("phoneNumber", data.phoneNumber.toString());
  formData.append("numPictures", data.numPictures.toString());
  formData.append("email", data.email);
  formData.append("userLoggedIn", data.userLoggedIn.toString());

  data.pictureURLs.forEach((file) => {
    formData.append("pictureURLs", file);
  });

  const response = await axiosInstance.post("/vehicle/addVehicle", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const GetVehiclesInfo = async () => {
  const response = await axiosInstance.get("/vehicle/getVehicles");
  return response.data;
};
