# Booke Project

Booke is a mobile application where people save the books they are reading
and follow other readers. This project backend is written with Java Spring Boot and Mobile application
was generated with React Native.

## Brief Description of Project

Booke is a mobile application where users can save the books they want to read or
store the books they have read. Readers must be registered this app for these actions.
In this app, readers can search books and they can view book's page number, author, book's rating and 
reviews. Users can mark the book with the following 3 options:
Currently Reading, Want to Read, Read. Books marked by the reader can be displayed on the profile screen.
Also, readers can start Reading challenges and they can set a goal based on how many books they want to read this year.
If user finishes a book, the user can rate this book or the reader can write what he thinks about the book.
Users can search other readers and can follow them. Thus, they can view the books read by these users
and they can view the posts of these users. Also, they can like and comment on these posts.

## Technologies

#### Backend
<ul>
    <li>Java 17</li>
    <li>Spring Boot 3.2.0</li>
    <li>Spring Security</li>
    <li>Spring Data Elasticsearch</li>
    <li>Spring Data Redis</li>
    <li>Elasticsearch</li>
    <li>Redis</li>
    <li>Docker</li>
    <li>Jwt</li>
    <li>Cloudinary</li>
    <li>Kibana</li>
</ul>

#### Mobile
<ul>
    <li>JavaScript</li>
    <li>React Native</li>
    <li>Tailwind CSS</li>
    <li>Axios Interceptors</li>
    <li>React Hook Form</li>
</ul>

## Usage of Technologies

#### Backend

Rest api was generated with Java Spring Boot. For database and search operations,
Elasticsearch was used. The book and user search process in the app was performed with the 
elasticsearch autocomplete function. In data access layer, ElasticsearchOperations and
ElasticsearchRepository were used to access data.
Spring Security and Jwt were used for authorization and authentication processes.
In this app, 2 tokens are generated: Access Token and Refresh Token.
Refresh token was stored in Redis and the purpose of this token is to renew the access token
when it expires. Access token is used for authorization. Redis was also used for caching genres. 
Cloudinary was used to store book images. Kibana was used to visualize the data stored in elasticsearch.
For working with elasticsearch, kibana and redis, docker was used.

#### Mobile

Mobile app was generated React Native with Expo. Written by JavaScript.
Jwt token was stored in Expo Secure Store. In HomeScreen, posts are brought with pagination.
When you scroll to the bottom of the screen, the posts of the next page are listed automatically.
Also, posts refresh if you swipe to the top of the screen.
In login and register screen, react hook form was used for validation.
Axios was used to get and post data from Backend Rest APIs. 
Axios Interceptor was used to add a jwt token to the requests. It 
was also used to refresh access token automatically when it expired. 
Tailwind CSS was used for App UI design. 

## Architecture of the Project

<img src="app_images/project_diagram.png" />

## Schema Modals of the Project

<img src="app_images/modals.png" />
