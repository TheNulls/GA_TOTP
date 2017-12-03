README
Google Authenticator Time Based One Time Password (RFC 6238)

# INSTRUCTIONS TO RUN:

	1. 	Open a Bash shell and navigate to the project root.
	2. 	Run 'submission'
			- Should this fail at any point, type the following commands
				a. 	'npm install' (This will install dependencies)
				b. 	'npm start' (This will launch the webserver)
				c.		'python3 -mwebbrowser http://localhost:3000' (This will open the web browser automatically)
					- If this last one fails, simply open a web browser and navigate to 'localhost:3000'
	3.		Once the webpage loads, scan the QRCODE with your phone's app.
	4.		This will give you a key in your authenticator app, enter this code in the 'code' box and hit enter.
	5.		Back on the original bash shell, there will be a message displayed if you were successful or not.
	6.		Wait for a second code to verify it works correctly and changes every 30 seconds.
			- Try entering a correct code to get the 'success' and then re-enter that same code once it changes to get a 'failure'.


			
# ASSUMPTIONS MADE USING ASSIGNMENT DESCRIPTION:
```
	( "You can use any programminglanguage to complete this assignment.")
		node is installed
		python3 is installed
		some form of bash shell is accessible
```
# EXTERNAL RESOURCES USED:
```
	node/express
	
		- speakeasy (https://www.npmjs.com/package/speakeasy)
		
		- qrcode (https://www.npmjs.com/package/qrcode)
		
```
# EXPLANATION OF TOTP(The way TOTP works in regards to Google Authenticator is as follows):

```	
		1. 	HMAC-SHA1 is calculated with the shared key and message as parameters.
		2. 	This generates a 40 bit hexidecimal string. However, it would be entirely unreasonable to ask the user to enter this within 30 seconds.
		3.		To make it easier for the user, while still remaining secure, we need to dynamically truncate this string.
		4.		To dynamically truncate, we take the last hexidecimal value of the string and take its decimal value.
		5.		This decimal value will be used as an "offset" for our truncated bits. (see example below for better explanation)
		6.		From this offset, we read the next 31-bits in the string.
		7.		We then take this truncated string and convert it to decimal.
		8.		Finally, to get our authenticator code, we simply use the last 6-digits of this decimal value.
```		
# EXAMPLE:
```
	1.		Let's take the generated hex value of 97 19 a1 0c d5 69 a8 fa 09 f3 c1 a5 82 da b3 1f b9 ac da a6  (taken from random.org)
	2. 	For simplicity sake, we can split this into 20 individual 1-byte sized strings.
	3. 	Formatted
			Index:	00-01-02-03-04-05-06-07-08-09-10-11-12-13-14-15-16-17-18-19
			Vallue:	97-19-a1-0c-d5-69-a8-fa-09-f3-c1-a5-82-da-b3-1f-b9-ac-da-a6
	4. 	Now we take the last character of the hex string, which is '6' under index 19.
	5. 	We convert this to the decimal value, which in this case is still just 6.
	6.		Now, using our new decimal (6), we start our truncation from the (6th) index and read 31bits. (index 6-9)
	7.		This will result the truncated hex string being "a8fa09f3"
	8.		Now we convert this to decimal, which in this case is "2834958835"
	9.		Finally, we take the last 6 digits of this number and we have our generated authenticator code for 30 seconds. In this example,
			The code is "958835".
```