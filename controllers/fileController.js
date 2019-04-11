// const User = require('../models/user')
const File = require('../models/file')
const axios = require('axios');

class FileController {
    static upload(req, res) {
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