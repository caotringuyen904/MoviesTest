const movieModel = require("../model/movie.model")
const { uploadImage } = require("../cloudinary/index")

const createMovie = async (req, res) => {
    try {
        const data = req.body
        console.log(data);
        const user = req.user?._id // sau khi check da co user lay ra dc _id
        const resultUpload =  await uploadImage(req.files.image)
        console.log(resultUpload);
 
        const movie = await movieModel.create({
            ...data,
            user,
            image: resultUpload
        })

        return res.status(200).json({ messange: "Create movie success", movie})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const getMovie = async (req, res) => {
    try {
        const pageSize = req.query.pageSize || 10
        const pageIndex = req.query.pageIndex || 1

        // skip bo qua phan tu theo pageIndex.
        // vi du o trang 2 thi skip(10*2 - 10): bo qua 10 pt dau tien chi lay 10 product tiep theo
        const movies = await movieModel.find().skip(pageSize * pageIndex - pageSize).limit(pageSize)
        const count = await movieModel.countDocuments()  // take quantity

        const totalPage = Math.ceil(count / pageSize) // all elements: ceil lay muc tran


        return res.status(200).json({
            message: "Get movies success", result: {
                movies,
                count,
                totalPage,
                pageSize,
                pageIndex
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}


const deleteMovie = async (req,res) => {
    try {
        const id = req.params.id

        const result = await movieModel.deleteOne({
            _id: id
        })
        console.log(result);

        return res.status(200).json({ message: "Delete movie success"})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const getMovieById = async (req, res) => {
    try {
        const id = req.params.id

        const movie = await movieModel.findById(id)

        return res.status(200).json(movie)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const updateMovie = async (req, res) => {
    try {
        const id = req.params.id // lay id ra

        const result = await movieModel.findByIdAndUpdate(id,req.body)

        return res.status(200).json({message: "Success"})


    } catch (error) {
        return res.status(500).json(error) 
    }
}

module.exports = {
    createMovie,
    getMovie,
    deleteMovie,
    getMovieById,
    updateMovie
}