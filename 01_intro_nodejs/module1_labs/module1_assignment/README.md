## Assignment Instructions
Imagine you work at a Bitcoin exchange and you have customer information coming from another source: SSN, credit card and their bitcoin numbers. However, the file format is CSV and your exchange can only support JSON. Your task is to write a Node script to convert CSV into JSON.

You can download the customer information CSV file here: Link to download: customer-data.csv

Your assignment is to write a node script that will convert the customer-data.csv file into a JSON file. The 1st row of the CSV file acts as the keys/properties of the JSON object and the rest of the fields act as values. The JSON file must have an array with 1000 items. Output the JSON file in the same directory and name the file customer-data.json.

Hint: you can create your own function which maps the CSV fields into a JSON object, or you can leverage any of the npm modules (e.g., csvtojson). The choice is up to you. Learning how to find, evaluate, install and use an npm module is a necessary skill in any Node development.

## Submission

To submit the assignment for feedback, put all the program files into GitHub and post a link to your code repository in the Assignment 1 Submissions section of the forums.

In addition to providing the GitHub link, please also answer the following questions about your project:

1. Walk us through the design of your project. Why did you design your project the way you did? What difficulties did you overcome?
    * The project is designed to simply fulfill the requirements using the csvtojson module and is written based on the api documentation. The only thing that was left to consider was the spacings of the json format.

2. How did you test your project to verify that it works? 
    * I ran the project in node and received the correct json file. This file is located above: customer-data.json.

3. Let us know if anything doesn't work as intended so your reviewer will know ahead of time.
    * None. Please let me know if you see any problems or have any suggestions.

\
**Please Note**\
If you would like to download individual labs, it may be easiest to use svn:

`svn checkout <url> <path>`

In the url you will need to replace the 'tree/master/' name section with 'trunk/':

`svn checkout https://github.com/username/repo/trunk/lab_folder <path>`