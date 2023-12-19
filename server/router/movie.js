const { getMovie, createMovie, deleteMovie, getMovieById, updateMovie } = require("../controller/movieController")
const authentication = require("../middlewares/authentication")

const router = require("express").Router()

router.post("/", authentication, createMovie)
router.get("/", getMovie)
router.delete("/:id", authentication, deleteMovie)
router.get("/:id", getMovieById)
router.put("/:id", authentication, updateMovie) 




module.exports = router