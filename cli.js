var m = require('./mandrill-interactions')
var fs = require('fs')

var command = process.argv
command = command.splice(2, command.length-1)

if (command[0] == "list-local") {
	m.getTemplatesLocal(function(result) {
	    result.forEach(function(t, i){
	    	if (!command[1] || command[1] == "name"){	
	    	console.log(t.name) 
	    	} else if (command[1] == "contains"){
	    		
	    		if (t.code != null) { 
	    			(t.code.indexOf(command[2]) > -1)
		    		console.log(t.name, " : ", (t.code.indexOf(command[2]) > -1))
	    		} else console.log(t.name, " : NO CODE")
	    	}else if (command[1] == "replace") {
    		console.log("Template: ", t.slug)
	    		if (t.code) {
	    			var clone = JSON.parse(JSON.stringify(t));
		    		m.replaceSegment(t.code, command[2], command[3], function(output){
		    			result[i].code = output
			    		if (command[4] == "save") {
			    			m.saveTemplatesLocal(result)
			    			m.updateTemplateLocal(result[i], clone)
			    		}
		    		})  		
	    		}
	    	}
	    })
	})
} else if (command[0] == "list-remote"){
	m.getTemplates(function(result) {
		if (command[1] == "save-local"){
			m.saveTemplatesLocal(result)
		} else {
		    result.forEach(function(t){
		    	if (!command[1] || command[1] == "name"){	
		    	console.log(t.name)
		    	} else if (command[1] == "replace") {
	    		console.log("Template: ", t.slug)
		    		if (t.code) {
		    		var clone = JSON.parse(JSON.stringify(t));
			    		m.replaceSegment(t.code, command[2], command[3], function(output){
			    			t.code = output
				    		if (command[4] == "save") {
				    			m.updateTemplateLocal(t, clone)
				    		}
			    		})  		
		    		}
		    	}
		    })
		}
	}, function(e) {
	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	})
}