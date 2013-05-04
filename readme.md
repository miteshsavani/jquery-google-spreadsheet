# jQuery GoogleSpreadsheet

jQuery plugin to read data from google spreadsheets easily. This plugin uses Google Spreadsheets API version 3.0. [Link](https://developers.google.com/google-apps/spreadsheets/). Created by [quelicm](http://quelicoto.es) based [google-spreadsheet-javascript](https://github.com/mikeymckay/google-spreadsheet-javascript)

## Requirements:

To run your spreadsheet in google must be published to the web. To do this go to **File -> Publish to the web** in the next screen select:

- in **Sheets to publish**  you can publish all or just a specific sheet and press the button **Start publishing**
- in **Get a link to the published data** web page you must select the first selector, this will generate a url in the textarea below, this is the url that we use. [Example](https://docs.google.com/spreadsheet/pub?key=0AtIDg8Wg2JCFdGdibXdnaWd2eVRRR2xVM0RlMU55ekE&output=html)

## Installation:
Add the meta script to your web page

	<script src="js/jquery.google.spreadsheet.min.js"></script>

## Use
In your code introduces the following lines

    var url = "https://docs.google.com/spreadsheet/pub?key=0AtIDg8Wg2JCFdGdibXdnaWd2eVRRR2xVM0RlMU55ekE&output=html";
	var googleSpreadsheet = new GoogleSpreadsheet();
	googleSpreadsheet.url(url);
	googleSpreadsheet.load(function(result) {
		//result 
	});

- *var url* Indicate the url's where our spreadsheet
- *var googleSpreadsheet* instance of the class
- *googleSpreadsheet.url(url);* add to our class to process the url
- *googleSpreadsheet.load* call the function that returns all data sheet caluculo our json format.
- *result* as json object contains all the data from the spreadsheet that we have introduced.

## Support for multiple sheets
If your spreadsheet has more than one page, you can access the contents of the following adding to the url parameter **&gid=num** be 0 for first, 1 for the second ... [Example](https://docs.google.com/spreadsheet/pub?key=0AtIDg8Wg2JCFdGdibXdnaWd2eVRRR2xVM0RlMU55ekE&output=html&gid=1)

