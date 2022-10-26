import { useEffect, useState } from "react";
import "./App.scss";
import { Image } from "./models/image.model";
import { deleteImage, getImagesData, uploadImage } from "./server/images";

function App() {
	// const url =
	// 	"https://photos-storage-cloud-workshop.s3.eu-west-1.amazonaws.com/";

	const url = "http://localhost:3030/get-image";
	const [images, setImages] = useState<Image[]>([]);

	useEffect(() => {
		console.log("using effect");
		getImagesData().then((newImages) => {
			console.log(newImages);
			setImages(newImages);
		});
	}, []);
	const onSubmitForm = (event: any) => {
		event.preventDefault();
		const image = event.target.children[0].files[0];
		const formData = new FormData();
		formData.append("image", image);

		uploadImage(formData).then((res) => {
			console.log(res);
			event.target.reset();
			return getImagesData().then((newImages) => {
				setImages(newImages);
			});
		});
	};

	const onClickDelete = (id: string, key: string) => {
		deleteImage(id, key).then(() => {
			alert("Image deleted");
			return getImagesData().then((newImages) => {
				setImages(newImages);
			});
		});
	};

	return (
		<div>
			<h1>Images App</h1>
			<form onSubmit={onSubmitForm}>
				<input type="file" name="image" />
				<button type="submit">Submit</button>
			</form>
			{images.map((image) => {
				return (
					<div key={image._id}>
						<h3>{image.originalName}</h3>
						<img
							src={url + `?key=${image.key}&name=${image.originalName}`}
							alt={image.originalName}
						/>
						<button
							onClick={() => {
								onClickDelete(image._id, image.key);
							}}
						>
							Delete {image.originalName}
						</button>
						<hr />
					</div>
				);
			})}
		</div>
	);
}

export default App;
