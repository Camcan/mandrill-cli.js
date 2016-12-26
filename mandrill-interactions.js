require('dotenv').config()
var fs = require('fs')
var mandrill = require('mandrill-api/mandrill')
var mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_API_KEY)

  /* Example mandrill_client.templates.list response:

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

module.exports = 
{
	getTemplates: function (callback){
		mandrill_client.templates.list(function(result) {
			callback(result)
		}, function(e){
		 	console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message)
		 })
	},
	saveTemplatesLocal: function(templatesArr){
		fs.writeFile('./templatesObj.js', JSON.stringify(templatesArr), function(e, success){
			if (e) throw error 
				else console.log("Local templatesObj.js updated")
		})
	},
	getTemplatesLocal: function(callback){
			fs.readFile('./templatesObj.js', function(err,result){
				callback(JSON.parse(result))
			})
	},
	replaceSegment: function(code, old, nu, callback){
		if (code.indexOf(old) > -1) {
			code = code.replace(old, nu)
			console.log(["Successfully replaced '", old, "' with '", nu, "'"].join(","))
			this.replaceSegment(code, old, nu, callback)
		} else {
			console.log(["This does not contain '", old, "'"].join())
			callback(code)
		}
	},
	saveLocal: function(content, path){
		// fs.writeFile
	},
	updateTemplate: function(nu, old, callback){
		if (nu !== old){
			mandrill_client.templates.update(nu, function(res){
				console.log("Update to template " + res.name + " successful")
			}, function(e){
				console.log('Error on Mandrill end: ' + e.name + ' - ' + e.message)
			})
		} else {
			console.log("You haven't made any changes to " + nu.name + " yet.")
		}
	},
	updateTemplateLocal: function(nu, old, callback){
		if (nu != old){
			fs.writeFile("./templates/"+nu.slug+".html", nu.code, function(err){
				if (err) throw err
  				console.log('SAFE')
			})
		} else {
			console.log("You haven't made any changes to " + nu.name + " yet.")
		}
	}
}