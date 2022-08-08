import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";

import handleRegister from "./controllers/register.js";
import handleSignIn from "./controllers/signIn.js";
import handleProfileGet from "./controllers/profile.js";
import { handleImage, handleImageApi } from "./controllers/image.js";

const db = knex({
	client: "pg",
	connection: {
		host: "127.0.0.1",
		user: "anthonykruger",
		password: "293593",
		database: "smart-brain",
	},
});

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signin", (req, res) => handleSignIn(req, res, bcrypt, db));
app.post("/register", (req, res) => handleRegister(req, res, db, bcrypt));
app.get("/profile/:id", (req, res) => handleProfileGet(req, res, db));
app.put("/image", (req, res) => handleImage(req, res, db));
app.post("/imageurl", (req, res) => handleImageApi(req, res));
app.get("/", (req, res) => {
	res.json("success");
});

app.listen(3000, () => {
	console.log("app is running on port 3000");
});