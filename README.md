-- ROUTINE --
Creating positive and healthy habits have been a hot topic lately, especially coming out of one of the most unpredictable times in our lifetime when nothing seemed normal or routine. “Routine” is an application that will help individuals track habits that will set them up for a balanced and successful life. Users will be able to create a login that will lead them to the application. Once they are logged in, they will be able to set up new habits to track as well as submit journal entries about their habit journey.

- PERN Stack Application - utilizing PostgresSql, Express, React, and Node 

DATA FLOW: 

Server Side: /user endpoint
1) /register
POST creates new user in user DB, generates token

2) /login
POST verifies user, generates token



Server side: /habit endpoint
1) /entry
POST Enters a new habit 

2) /update
PUT Edit habit entry 

3) /delete
DELETE Deletes habit

4) /profile
GET Gets user’s profile



Server side: /journal endpoint
1) /entry
POST Enters a new journal entry

2) /update
PUT Edits journal entry

3) /delete
DELETE Deletes journal entry

4) /list
GET Gets user’s list of journal entries 







