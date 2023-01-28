const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient();

const MongoConnect = callback => {
    MongoClient.connect('mongodb+srv://korn:Rideon71773@cluster0.v2viw.mongodb.net/?retryWrites=true&w=majority'
    ).then(client => {
        console.log("connected")
        const _db = client.db();
        callback()
    }).catch(err => {
        console.log(err)
        throw err;
    })
}

const getDb = (_db) => {
    if(_db) {
        return _db;
    }
    throw "No Database found!"
}

exports.MongoConnect = MongoConnect;
exports.getDb = getDb;