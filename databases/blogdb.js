const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/yourblogspotdb', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log("connected");
    })
    .catch((err => { console.log(err) }));