import Clarifai from "clarifai";

const app = new Clarifai.App({
	apiKey: "af08289df73c42b1bb550ee6c3d9a1d6",
});

export const handleImageApi = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then((data) => res.json(data))
		.catch((error) => res.status(400).json("failed to fetch data!"));
};

export const handleImage = (req, res, db) => {
	const { id } = req.body;
	db("users")
		.where("id", "=", id)
		.increment("entries", 1)
		.returning("entries")
		.then((entries) => {
			res.json(entries[0].entries);
		})
		.catch((error) => {
			res.status(400).json("Unable to get entries");
		});
};
