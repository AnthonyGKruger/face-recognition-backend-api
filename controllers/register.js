const handleRegister = (req, res, db, bcrypt) => {
	const { email, name, password } = req.body;
	if (!email||!name||!password){
		return res.status(400).json("Incorrect form submission")
	}
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	db.transaction((trx) =>
		trx
			.insert({
				hash: hash,
				email: email,
			})
			.into("login")
			.returning("email")
			.then((loginEmail) => {
				return trx("users")
					.returning("*")
					.insert({
						email: loginEmail[0].email,
						name: name,
						joined: new Date(),
					})
					.then((response) => {
						res.json(response[0]);
					})
					.then(trx.commit)
					.catch((error) => {
						trx.rollback;
						res.status(400).json("Unable to register.");
					});
			})
			.catch((error) => {
				res.status(400).json("Unable to register.");
			})
	);
};

export default handleRegister;
