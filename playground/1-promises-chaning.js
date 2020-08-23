// require ('../src/db/mongoose.js')
// const User =require('../src/models/users.js')
//
// // User.findByIdAndUpdate('5f33cc4414367e112c68830b' ,{ age:29 }).then((user) => {
// //     console.log(user)
// //     return User.countDocuments({ age:29 })
// // }).then((total) => {
// //     console.log(total)
// // }).catch((e) =>{
// //     console.log(e)
// // })
//
// const updateAndCount = async (id, age) =>{
//     const user = await User.findByIdAndUpdate(id, { age: age })
//     const count = await User.countDocuments({ age })
//     return ({
//         user,
//         count
//     })
// }
//
// updateAndCount('5f33cc4414367e112c68830b' , 35).then(({ user,count }) =>{
//     console.log(user)
//     console.log(count)
// }).catch((err) => {
//     console.log(err)
// })


// --------- hashing passwords -------------
// const bcrypt = require('bcryptjs')
//
// const securePassword = async () =>{
//     const password = 'red12345!'
//     const securedPassword = await bcrypt.hash(password, 8)
//
//     console.log(password)
//     console.log(securePassword)
//
//     const isMatch = await bcrypt.compare('Red12345!',securedPassword)
//     console.log(isMatch)
// }
//
// securePassword()

// JavaScript Web Token(JWT)

const jwt = require('jsonwebtoken')

const myfunction = async () => {
    const token = await jwt.sign({ _id : 'abc123' } , 'qwerty',
                                    {expiresIn: '3 seconds'})
    console.log(token)

    const data = jwt.verify(token, 'qwerty')
    console.log(data)

    await setTimeout(() =>{
        const data1 = jwt.verify(token, 'qwerty')
        console.log(data1)
    },5000)
}

myfunction()
