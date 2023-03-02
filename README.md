# memories
Here is the URL for the live site: 
https://jt-memories.netlify.app/

## How to Use
-Login with a gmail account to get full access to all features.

-From the homepage, you can like on other user's posts.
-To leave a comment on a memory post, click on posts picture to be redirected to that posts
unique page. You can see other comments as well as other posts with matching tags.

-You can navigate back to the home screen by clicking on the logo in the Navbar from a post's page.

-To create a post, use the form on the right side of the homepage, it is recommended to use lowercase words for the tags.
-A post can have multiple tags and I recommend using comma seperation for the backend to proerly parse out the tags.

-Once you create a post, you can edit the post by clicking the three dots on the posts picture from the home page.
The create form will now change to be an editing form, it's header will change and the entry bars will populate with the current data.
Once you have changed this information to your liking you can click the submit button and the newly edited post should appear.

-You can also delete your posts as well as like and comment on them.
-The search feature is not case sensitive and can be used to find memory posts by their titles.


## Instructions on running the project
First install node packages in both the client folder and in the server folder.
  cd client, npm install
  cd server, npm install
## Spin up the servers
Then with a split/double terminal, execute 'npm run start' in the client folder and the same command in the server folder
the website will then be accessable at localhost:3000

users can select a photo file and upload it to the database which is then fetched and rendered
