var express = require('express')
var router = express.Router()

const cars = {};

router.get('/:vin', function (req, res) {
  const vin = req.params.vin;
  const car = cars[vin];
  if (car) {
    res.json(car);
  } else {
    res.sendStatus(404);
  }
});

router.get('/', function (req, res) {
  res.json(Object.values(cars));
});


router.post('/', function (req, res) {
  const car = req.body;

  cars[car.vin] = car;
  res.send('OK')
});

router.patch('/:vin', function (req, res) {
  const vin = req.params.vin;
  const car = cars[vin];
  const carUpdate = req.body;

  if (car) {
    cars[car.vin] = {
      ...car,
      ...carUpdate,
      vin: car.vin
    };
    res.send('OK')
  } else {
    res.sendStatus(404);
  }
});

router.delete('/:vin', function (req, res) {
  const vin = req.params.vin;
  const car = cars[vin];
  if (car) {
    delete cars[vin]
    res.send('OK')
  } else {
    res.sendStatus(404);
  }
});

module.exports = router