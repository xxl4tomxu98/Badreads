const { Book , Genre} = require('./db/models');
async function find(){
try {

    const books = await Book.findAll( 
        // {
        //     include: Genre
        //     // inlcude: Genre
        // }
        )
    const {
         id,
         author,
         title,
         description,
        //  genres
        } = books
    
        console.log(author)

} catch (e){
    console.log(e)
}
}

find()