const express = require('express')
const mongoose = require('mongoose')
const routes = require('./api/routes/studentRoutes')
const hostname = '127.0.0.1'
const port = 3000
const app = express()
const middleware = require('./api/middleware/errorHandler')
mongoose.connect('mongodb://localhost:27017/studentsdb')
const swaggerUI = require('swagger-ui-express')
const swaggerJS = require('swagger-jsdoc')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	)
	next()
})

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			version: '1.0.0',
			title: 'Student API',
			description: 'Student API Information',
			contact: {
				name: 'Amazing Developer)',
			},
			servers: ['http://localhost:3000'],
		},
	},

	apis: ['./api/controllers/*.js'],
}

const swaggerDocs = swaggerJS(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))


routes(app)
app.use(middleware)


app.listen(port, hostname, () => {
  console.log(`Server running ${hostname} on ${port}`)
})

// app.get('/users', (req, res) => {
//   res.status(200).send(JSON.stringify(users))
// })