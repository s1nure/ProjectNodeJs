const Student = require('../models/studentModels')

/**
 * @swagger
 * /student:
 *  get:
 *   summary: return listOfStudents
 *   tags: [student]
 *   responses:
 *       200:
 *        description: "success"
 *        schema:
 *         type: array
 *         items:
 *          properties:
 *           name:
 *            type: string
 *            example: Olya
 *           group:
 *            type: string
 *            example: RPZ 20 1/9
 *           mark:
 *            type: number
 *            example: 5
 *           isDonePr:
 *            type: boolean
 *            example: false
 *       400:
 *         description: "Bad Request"
 *       500:
 *         description: "Internal Server Error"
 */

module.exports.listOfStudents = async (req, res) => {
	const students = await Student.find({})
	res.status(200).send(students)
}

/**
 * @swagger
 * /student:
 *  post:
 *   summary: Add a student
 *   tags: [student]
 *   parameters:
 *     - name: "name"
 *       in: "formData"
 *       description: "name of student"
 *       required: true
 *       type: "string"
 *     - name: "group"
 *       in: "formData"
 *       description: "group of student"
 *       required: false
 *       type: "string"
 *     - name: "mark"
 *       in: "formData"
 *       description: "group of student"
 *       required: false
 *       type: "integer"
 *     - name: "isDonePr"
 *       in: "formData"
 *       description: "view of done pr or not"
 *       required: false
 *       type: "boolean"
 *   responses:
 *       200:
 *        description: "success"
 *        schema:
 *          properties:
 *           name:
 *            type: string
 *            example: Olya
 *           group:
 *            type: string
 *            example: RPZ 20 1/9
 *           mark:
 *            type: number
 *            example: 5
 *           isDonePr:
 *            type: boolean
 *            example: false
 *       400:
 *         description: "Bad Request"
 *       500:
 *         description: "Internal Server Error"
 */
module.exports.student_create = (req, res, next) => {
	const student = new Student(req.body)
	student
		.save()
		.then(student => {
			res.status(200).send(student)
		})
		.catch(error => {
			next(error)
		})
}

module.exports.student_delete = (req, res, next) => {
	Student.findByIdAndDelete(req.params.id)
		.then(student => {
			console.log(student)
			res.status(200).json(student)
		})
		.catch(error => {
			next(error)
		})
}

module.exports.student_get_by_id = (req, res, next) => {
	Student.findById(req.params.id)
		.then(student => {
			console.log(student)
			res.status(200).send(student)
		})
		.catch(error => {
			next(error)
		})
}
/**
 * @swagger
 * /student/{id}:
 *  patch:
 *   summary: update student
 *   tags: [student]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: "string"
 *       required: true
 *       description: Id of the student
 *     - name: "name"
 *       in: "formData"
 *       description: "name of student"
 *       required: false
 *       type: "string"
 *     - name: "group"
 *       in: "formData"
 *       description: "group of student"
 *       required: false
 *       type: "string"
 *     - name: "mark"
 *       in: "formData"
 *       description: "group of student"
 *       required: false
 *       type: "integer"
 *     - name: "isDonePr"
 *       type: "boolean"
 *       in: "formData"
 *       description: "Flag for view is done Pr or not"
 *       required: false
 *
 *   responses:
 *       200:
 *        description: "success"
 *        schema:
 *          properties:
 *           name:
 *            type: string
 *            example: Olya
 *           group:
 *            type: string
 *            example: RPZ 20 1/9
 *           mark:
 *            type: number
 *            example: 5
 *           isDonePr:
 *            type: boolean
 *            example: false
 *       400:
 *         description: "Bad Request"
 *       404:
 *         description: "Not Found"
 *       500:
 *         description: "Internal Server Error"
 */

module.exports.student_update = (req, res, next) => {
	Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then(student => {
			if (!student) {
				throw new Error('Student not found')
			}
			console.log(student)
			res.status(200).send(student)
		})
		.catch(error => {
			next(error)
		})
}

/**
 * @swagger
 * /student-avg-mark:
 *  get:
 *   summary: return avg mark of groups
 *   tags: [student]
 *   responses:
 *       200:
 *        description: "success"
 *        schema:
 *         type: array
 *         items:
 *          properties:
 *           group:
 *            type: string
 *            example: RPZ 20 1/9
 *           averageMark:
 *            type: number
 *            example: 5
 *       400:
 *         description: "Bad Request"
 *       500:
 *         description: "Internal Server Error"
 */

module.exports.student_count_mark = (req, res, next) => {
	Student.find({ mark: req.params.mark })
		.then(student => {
			console.log(student)

			res.send(200, student.length)
		})
		.catch(error => {
			next(error)
		})
}

exports.avg_mark_by_group = async function (req, res) {
	Student.aggregate([
		{
			$match: {
				group: {
					$ne: null,
				},
			},
		},
		{
			$group: {
				_id: '$group',
				averageMark: { $avg: '$mark' },
			},
		},
		{
			$project: {
				_id: 0,
				group: '$_id',
				averageMark: '$averageMark',
			},
		},
	])
		.then(students => {
			res.send(students)
		})
		.catch(error => {
			next(error)
		})
}
