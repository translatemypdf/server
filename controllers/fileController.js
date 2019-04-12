// const User = require('../models/user')
require('dotenv').config()
const File = require('../models/file')
const axios = require('axios');
const vision = require('@google-cloud/vision')

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

    static getTranslate(req, res) {
        const googleTranslate = require('google-translate')(`${process.env.apitranslatekey}`);
        console.log("masuk ke googletransalte", req.body)
        try {
          console.log("try googletranslate")
            googleTranslate
            .translate(req.body.text, 'en',
              function (err, translation) {
                if (err) {
                  res.status(500).json(err)
                } else {
                  console.log(translation.translatedText);
    
                  res.status(200).json({data: translation.translatedText})
                }
              })
        } catch (err) {
          console.log(err);
        }
    }

    static async translateplease (req,res) {
        // Imports the Google Cloud client library
        const {Translate} = require('@google-cloud/translate');

        // Creates a client
        const translate = new Translate();

        /**
         * TODO(developer): Uncomment the following lines before running the sample.
         */
        const text = 'Hello, world!';
        const target = 'ru';
        const model = 'base';

        const options = {
        // The target language, e.g. "ru"
        to: target,
        // Make sure your project is whitelisted.
        // Possible values are "base" and "nmt"
        model: model,
        };

        // Translates the text into the target language. "text" can be a string for
        // translating a single piece of text, or an array of strings for translating
        // multiple texts.
        let [translations] = await translate.translate(text, options);
        translations = Array.isArray(translations) ? translations : [translations];
        console.log('Translations:');
        translations.forEach((translation, i) => {
        console.log(`${text[i]} => (${target}) ${translation}`);
        });
    }

    static async scanme(req, res) {
        console.log("masuk ke scan me", req.body.url)
        const dataURL = req.body.url.split('/');
        // Creates a client
        const client = new vision.ImageAnnotatorClient({
          // projectId: 'mini-wp-storage-multer',
          keyFilename: '../keyfile.json'
        });
        const bucketName = 'translate-my-pdf-cloud';
        const fileName = dataURL[dataURL.length - 1];
        console.log("input scan me: ", bucketName, fileName)
        /**
         * TODO(developer): Uncomment the following lines before running the sample.
         */
    // Bucket where the file resides
    // const bucketName = 'my-bucket';
    // Path to PDF file within bucket
    // const fileName = 'path/to/document.pdf';
    
        const gcsSourceUri = `gs://${bucketName}/${fileName}`;
        const gcsDestinationUri = `gs://${bucketName}/${fileName}.json`;
    
        const inputConfig = {
          // Supported mime_types are: 'application/pdf' and 'image/tiff'
          mimeType: 'application/pdf',
          gcsSource: {
            uri: gcsSourceUri,
          },
        };

        
        const outputConfig = {
          gcsDestination: {
            uri: gcsDestinationUri,
          },
        };

        console.log("masuk sini: ", inputConfig, outputConfig)
        
        const features = [{type: 'DOCUMENT_TEXT_DETECTION'}];
        const request = {
          requests: [
            {
              inputConfig: inputConfig,
              features: features,
              outputConfig: outputConfig,
            },
          ],
        };
    
        const [operation] = await client.asyncBatchAnnotateFiles(request);
        const [filesResponse] = await operation.promise();
        console.log(filesResponse.responses[0].fullTextAnnotation);
        const destinationUri =
          filesResponse.responses[0].outputConfig.gcsDestination.uri;
        res.status(200).json({
          url: `https://storage.googleapis.com/${destinationUri.replace('gs://', '')}output-1-to-2.json`
        })
      }
}

module.exports = FileController