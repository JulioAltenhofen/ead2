const express = require("express")
const controller = require("../controllers/controllerCliente")

const routes = express.Router()

routes.get("/",controller.getAll)
routes.get("/:id",controller.getById)
routes.post("/",controller.create)
routes.put("/:id",controller.update)
routes.delete("/:id",controller.delete)

module.exports = routes