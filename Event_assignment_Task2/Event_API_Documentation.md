Nudge API Documentation
Overview
The Nudge API allows users to create, manage, and interact with nudge content. A nudge is a piece of content that can be associated with an event or article and displayed to users at a specific time.

	∎  Nudge Object Model

  {
  "id": integer,
  "user_id": integer,
  "event_id": integer,
  "title": string,                                                                        
  "cover_image_url": string,
  "send_time": datetime(),
  "description": string,
  "icon_url": string,
  "invitation": string,
  "created_at": datetime()
}

API Endpoints                           

1. POST Nudges

Description
Creates a new Nudge associated with an event.

Request
•	URL: /nudges
•	Method: POST
•	Headers: Content-Type: application/json, Authorization: Bearer <OAuth Token>

Request Body:
{
  "user_id": integer,
  "event_id": integer,
  "title": string,
  "cover_image_url": string,
  "send_time": datetime(iso 8601),
  "description": string,
  "icon_url": string,
  "invitation": string
}

Success Response:
Code: 200

{
  "user_id": integer,
  "event_id": integer,
  "title": string,
  "cover_image_url": string,
  "send_time": datetime(iso 8601),
  "description": string,
  "icon_url": string,
  "invitation": string
}


2. Get all Nudges

Description
Retrieves all Nudges created by users.

Request
•	URL: /nudges
•	URL Params :None
•	Data Params : None
•	Method: GET
•	Headers: Content-Type: application/json
Success Response:
Code: 200 OK

{
  "nudges": [
    {<nudge_object>},
    {<nudge_object>},
    {<nudge_object>}
  ]
}

3. Get a Nudge
Description
Retrieves a specific Nudge by ID.

Request
•	URL: /nudges/:id
•	Method: GET
•	URL Params: id=[integer]
•	Headers: Content-Type: application/json
Success Response:
Code: 200 OK
Content: {<nudge_object>}
Error Responses:
Code: 404 Not Found
Content: { "error": "Nudge doesn't exist" }



4. Update a Nudge
Description
Updates specific fields of an existing Nudge.

Endpoint: /nudges/{nudgeId}
Method: PUT

Request Body:
Same as the create nudge request body, but without the eventId field.

Response:

JSON
{
  "status": "success",
  "message": "Nudge updated successfully"
}

5. DELETE A Nudge
Description
Deletes a Nudge by ID.

•	Request
•	URL: /nudges/:id
•	Method: DELETE
•	URL Params: id=[integer]
•	Headers: Content-Type: application/json
Success Response:
Code: 200
{
  "status": "success",
  "message": "Nudge deleted successfully"
}
Error Responses:
Code: 404 Not Found
Content: { "error": "Nudge doesn't exist" }
Code: 401 Unauthorized
Content: { "error": "You are unauthorized to make this request." }

