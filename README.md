# Genci-Task
This is the Server Repository for the Genci Task where I have created the requested APIs. We have made the server for authenticating a user and also enabling the authenticated user 
to create datapoints for a heatmap like datastructure. Below are some points to note.

1. Make sure to add the env variables as specified in the .env.example file.
2. The CREATE endpoint allows user to start an activity on a day. You cannot create more than one activity on a single day. The start of activity is always from 0. You can update it to any
   other value using the UPDATE endpoint.
3. The UPDATE endpoint allows user to update an activity on a particular day.
4. The GET endpoint allows user to get all the datapoints for each day as an array which can later be displayed onto the frontend efficiently.

Below is the Postman API collection.
[Postman API Collection JSON link](https://api.postman.com/collections/19298102-2f946ac9-4e98-4b51-8375-40d49581e71c?access_key=PMAT-01HBX2GQXEG8RWAG19VTYNZ32P)

