// const User = require('../models/user')
const File = require('../models/file')
const axios = require('axios');

class FileController {
    static async findFile (req,res) {
        console.log("masuk ke method all file")
        try {
            let allfile = await File.find({})
            res.status(200).json(allfile)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    
    static upload(req, res) {
        console.log("masuk ke method upload")
        if (req.file && req.file.gcsUrl) {
          File.create({
              path:req.file.gcsUrl,
              name:req.body.name
          })
          .then((result)=>{
              res.status(201).json(result)
          })
          .catch(err=>{
              res.status(500).json(err)
          })
        }else{
            res.status(500).send('unable to upload')
        }
       


    }




}

module.exports = FileController