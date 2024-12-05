import cors from "cors"
import { Router, json } from "express"
import { getUsers, findUser, createUser, updateUser, deleteUser } from "../controller/UserController"

export default () => {
	const router = Router()

	router.use(json())
    router.use(
		cors({
			origin: ["*"],
			methods: ["GET", "POST", "PUT", "DELETE"],
			credentials: true,
		}),
	)

    router.get("/pessoas", getUsers)
    router.get("/pessoa/:id", findUser)
    router.post("/pessoa", createUser)
    router.put("/pessoa/:id", updateUser)
    router.delete("/pessoa/:id", deleteUser)

	return router
}