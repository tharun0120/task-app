//CRUD OPERATIONS CREATE READ UPDATE AND DELETE

// const mongodb =  require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require('mongodb')

const connenctionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connenctionURL, {useUnifiedTopology: true, useNewUrlParser: true}, (error, client) => {
    if(error)
        return console.log('Unable to connect to database')
        
    const db = client.db(databaseName)

    // db.collection('users').deleteOne({
    //     name: 'Kumar'
    // }).then((result) => {
    //      console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('users').deleteMany({
        name: 'hello'
    }).then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log(error)
    })

})