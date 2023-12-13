# beginners-web

/_
TODO: media queries
move css external
inline js at first, then move external  
 swap headers with js loop to display headers  
 _/

npm install express
npm install nodemon -g
npm install reload

then add to bottom of index.html

<script src="reload/reload.js"></script>

modify package.json and add

"scripts": {
"start": "nodemon -e \* server.js"
}

then

npm run start
