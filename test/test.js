var m = require("../mandrill-interactions")
var test = require("tape")
var store

test('can list templates', function (t) {
	m.getTemplates(function(templates){
	store = templates
		t.equal(typeof templates, 'object')
		t.equal(typeof templates[0], 'object')
		t.equal(
			Object.keys(templates[0]).includes("slug","name","code")), 
			true
		})
})

test('replaceSegment replaces content', function (t) {
	var code = "<html><p>Dear *|FNAME|*,<p></html>"
	var target = "Dear *|FNAME|*,"
	var nu = "*|IF:FNAME|* Hi *|FNAME|*,*|ELSE:|* Hi, *|END:IF|*"
	m.replaceSegment(code, target, nu, function(output){
		t.equal(typeof output, 'string')
		t.equal(output, "<html><p>*|IF:FNAME|* Hi *|FNAME|*,*|ELSE:|* Hi, *|END:IF|*<p></html>")
		t.end()
	})
})

test('updateTemplate successful #POST', function (t) {
	// m.updateTemplate(function(nu, old){
	// 	t.equal(typeof templates, 'object')
	// 	t.equal(typeof templates[0], 'object')
	// 	t.equal(
	// 		Object.keys(templates[0]).includes("slug","name","code")), 
	// 		true
	// 	})
})