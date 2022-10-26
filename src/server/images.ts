import axios from "axios";

const url = "http://localhost:3030/";
export const uploadImage = async (formData: FormData) => {
	try {
		const res = await axios.post(url + "upload-image", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const getImagesData = async () => {
	try {
		const res = await axios.get(url + "get-images");
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteImage = async (id: string, key: string) => {
	try {
		await axios.delete(url + "delete-image", { data: { id, key } });
		return;
	} catch (error) {
		console.log(error);
	}
};
