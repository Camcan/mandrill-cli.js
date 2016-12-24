require('dotenv').config()

var mandrill = require('mandrill-api/mandrill')
var mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_API_KEY)


var command = process.argv
command = command.splice(2, command.length)

if (command[0] == "list") {
	mandrill_client.templates.list(function(result) {
	    result.forEach(function(t){
	    	if (!command[1] || command[1] == "name"){	
	    	console.log(t.name)
	    	} else if (command[1] == "replace") {

	    		replaceSegment(result, command[2], command[3])	
	    	}
	    })
	    /*console.log(result)
	    [{
	            "slug": "example-template",
	            "name": "Example Template",
	            "labels": [
	                "example-label"
	            ],
	            "code": "<div mc:edit=\"editable\">editable content</div>",
	            "subject": "example subject",
	            "from_email": "from.email@example.com",
	            "from_name": "Example Name",
	            "text": "Example text",
	            "publish_name": "Example Template",
	            "publish_code": "<div mc:edit=\"editable\">different than draft content</div>",
	            "publish_subject": "example publish_subject",
	            "publish_from_email": "from.email.published@example.com",
	            "publish_from_name": "Example Published Name",
	            "publish_text": "Example published text",
	            "published_at": "2013-01-01 15:30:40",
	            "created_at": "2013-01-01 15:30:27",
	            "updated_at": "2013-01-01 15:30:49"
	        }]
	    */
	}, function(e) {
	    // Mandrill returns the error as an object with name and message keys
	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	    // A mandrill error occurred: Invalid_Key - Invalid API key
	})
} else if (command[0] == "get")

function replaceSegment(template, old, nu){
	if (template.code.indexOf(old) !== -1) {
		template.code.replace(old, nu)
		console.log("Successfully replaced '", old, "' with '", nu, "'"].join())
		replaceSegment(template,old, nu)
	} else {
		console.log([template.name, " doesn't contain '", old, "'"].join())
	}
}