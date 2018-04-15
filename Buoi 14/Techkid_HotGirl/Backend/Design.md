

### 1.Collection 

- Users
    - Avatar
    - Username
    - Password
    - Email

- GirlImage
    - ImageUrl
    - Title
    - Description
    - Createat
    - Createby
    - View
    - Like
    - Active
    - Comment
        - Createby
        - Content

### 2.Controller
CRUD
 - Create
 - Read - Get items with Active = true
 - Update
 - Delete - Never really delete item: action = set Active to false

 ### 3. Route / RESTful
 Modern day: 
  - Backend remdering is not popular
  - Backend return data instead of HTML
    - node: JSON
    - C#/Java: XML
 - API: RESTful

 URI: /api/images/
 POST: -> /api/images/ = create new girlImage
 GET: -> /api/images/ = read all girlImage

 GET -> /api/images/:id = read one girlImage
 PUT -> /api/images/:id = update one girlImage
 DELETE -> /api/images/:id = delete oone girlImage

 POST -> /api/images/:id/like = like image
 DELTE -> /api/images/:id/like = unlike image

 POST -> /api/images/:id/comment = comment image
 DELETE -> /api/images/:id/comment/:commentid = delete comment

 URI: /api/users/

 ### 4.Cooked Data

- /api/images/
    - _id
    - ImageUrl
    - Title
    - Description
    - Createat
    - Createby
    - View
    - Like
- /api/images/:id
    - _id
    - ImageUrl
    - Title
    - Description
    - Createat
    - Createby
    - View
    - Like
    - Comment
        - Createby
        - Content