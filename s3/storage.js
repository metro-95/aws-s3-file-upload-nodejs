/** Import Packages */
require('dotenv').config()
const aws = require('aws-sdk')
const fs = require('fs')

/** AWS Access Credentials */
const config = {
    region: process.env.S3_REGION,
    accessKeyId: process.env.S3_ACCESSKEYID,
    secretAccessKey: process.env.S3_SECRETACCESSKEY,
    endpoint: process.env.S3_ENDPOINT
}

const storageBucket = new aws.S3(config)

/** Get File To Upload: Example Here we are using root directory file to upload */
const FILEDATA = fs.readFileSync('ast2.png')

/** Parameters to upload */
const parameters = {
    Bucket: 'metro-images',
    fileName: 'ff.png',
    Body: FILEDATA
}

/** Main Upload Process */
storageBucket.upload(parameters, function(err, response) {
    if (err) {
        throw err
    }
    /** Console the file URL */
    console.log(`FILE UPLOADED! ${response.Location}`)
        /**
        THE RESPONSE CONTAINS EACH DETAILS INCLUDING URL TO YOUR FILE IN THE BUCKET
        */
});