# mandrill-cli.js
((An exercise for practicing TDD))
Bulk interactions with Mandrill email templates using Mandrill's Node.js API
-------

Disclaimer: This should be used in conjunction with tight version-control practices as this has the strong potential to really mess up your email campaigns. It's also one of the first useful things I've made, so approach with caution. 
--------

Getting Started
===

You will need your Mandrill API key, and introduced this to a .env in the root of the working directory (see ./.envSample)


MANDRILL_API_KEY=yourMandrillApiKey


To test:
------
$ npm run test


To run:
------
$ node cli.js *arguments*


- List remote templates
$ node  cli.js  list-remote 

- Save remote templates (to JSON object in templatesObj.js)
$ node cli.js  list-remote  save-local


- Bulk update remote templates  //UNTESTED
$ node  cli.js  list-remote  replace  "<p>example target code</p>"  "<p>example replacement code</p>"


- List local templates
$ node  cli.js  list-local 

- Check content of local templates
$ node  cli.js  list-local contains "<p>example target</p>"


- Update and save local templates to 
$ node  cli.js  list-local  replace  "<p>example target code</p>"  "<p>example replacement code</p>" save


- Ship ALL local images of templates //Not yet implimented
$ node cli.js  ship-local






