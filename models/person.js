import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('connected to: ', url)

mongoose.connect(url)
  .then(() => {
    console.log('connect to MongoDB')
  })
  .catch(error => {
    console.error('error connecting to MongoDB', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 9,
    validate: {
      validator: function(val) {
          return /^\d{2,3}-\d{6,}$/.test(val)
      },
      message: num => `${num.value} is not a valid phone number!`
    },
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)
export default Person