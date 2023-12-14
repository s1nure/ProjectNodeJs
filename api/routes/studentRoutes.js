const {
	listOfStudents,
	student_create,
	student_delete,
	student_get_by_id,
	student_update,
	student_count_mark,
	avg_mark_by_group,
} = require('../controllers/studentController')

module.exports = app => {
	app.route('/student').get(listOfStudents).post(student_create)
	app
		.route('/student/:id')
		.delete(student_delete)
		.get(student_get_by_id)
		.patch(student_update)
	app.route('/student/getMark/:mark').get(student_count_mark)
	app.route('/student-avg-mark').get(avg_mark_by_group)
}
