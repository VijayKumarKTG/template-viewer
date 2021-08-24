const express = require('express');
const https = require('https');
const path = require('path');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

function filterResponseImgs(images) {
  let newImagesArr = [];
  images.map((image) => {
    newImagesArr.push({
      id: image.id,
      description: image.description,
      altDesc: image['alt_description'],
      createdOn: image['created_at'],
      username: image.user.name,
      profile: image.user.links.html,
      profileImg: image.user['profile_image'].small,
      regularImg: image.urls.regular,
      thumbImg: image.urls.thumb,
    });
  });
  return newImagesArr;
}

app.get('/images', (req, res) => {
  https
    .get(
      `https://api.unsplash.com/photos/random?client_id=xpEz-xm6x-H-fwYRDp4XTmKlCsmzg8JaHElSi_fZBuw&&count=15`,
      (response) => {
        let data = '';
        response.on('data', (d) => (data += d));
        response.on('end', () => {
          let items = JSON.parse(data);
          items = filterResponseImgs(items);
          res.json({ items: items });
        });
      }
    )
    .on('error', (e) => {
      console.error(e);
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
