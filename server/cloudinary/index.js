const cloudinary = require("cloudinary").v2
          
cloudinary.config({ 
  cloud_name: 'dskqcvwok',
  api_key: '968328965275914', 
  api_secret: 'YpEpLAJZNKnQ7KP7fmxzHVmNke8' 
});

const uploadImage = async (file) => {
  const newFileName = `${new Date().getTime()}-${file.name}`
   return new Promise((resolve, reject)=>{
    cloudinary.uploader.upload_stream({resource_type: "image", filename_override: `${newFileName}`, use_filename: true, unique_filename: false}, (err) => reject(err)).end(file?.data, () => resolve(newFileName));
   })
    
  };

module.exports = {
    uploadImage
}

// const cloudinary = require("cloudinary").v2
          
// cloudinary.config({ 
//   cloud_name: 'dskqcvwok', 
//   api_key: '968328965275914', 
//   api_secret: 'YpEpLAJZNKnQ7KP7fmxzHVmNke8' 
// })

// const uploadImage = async (file) => {
//   const image = await cloudinary.uploader.upload(
//     file,
//     (result) => result
//   )
//   return image
// }

// module.exports = {
//   uploadImage
// }



