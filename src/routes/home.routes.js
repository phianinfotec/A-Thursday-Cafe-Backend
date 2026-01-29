const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
  res.json({
    success: true,
    data: {
      home__title: "COLD COFFEE",

      home__images: {
        home__splash: "http://localhost:5000/assets/img/home-splash.png",
        home__bean_1: "http://localhost:5000/assets/img/bean-img.png",
        home__bean_2: "http://localhost:5000/assets/img/bean-img.png",
        home__coffee: "http://localhost:5000/assets/img/home-coffee.png",
        home__ice_1: "http://localhost:5000/assets/img/ice-img.png",
        home__ice_2: "http://localhost:5000/assets/img/ice-img.png",
        home__leaf: "http://localhost:5000/assets/img/leaf-img.png",
        home__sticker: "http://localhost:5000/assets/img/home-sticker.svg"
      },

      home__description:
        "Find delicious hot and cold coffees with the best varieties, calm the pleasure and enjoy a good coffee, order now.",

      button: {
        text: "Learn More",
        link: "#about"
      }
    }
  });
});

module.exports = router;
