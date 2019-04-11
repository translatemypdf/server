require('dotenv').config()
const express = require('express')
const cors = require ('cors')
const mongoose = require ('mongoose')

const port = process.env.port || 3000

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

module.exports = app;