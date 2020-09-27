import 'chance';


let fires = []


for (let index = 0; index <= 10; index++) {
  fires.push({
    id: 0,
    coordinates: [
      chance.floating({min: 53.775, max: 57.172, fixed: 3}),
      chance.floating({min: 74.816, max: 85.206, fixed: 3})
    ],
    owner: chance.first(),
    land_type: chance.first(),
    fuel: chance.first(),
    wind_direction: chance.first(),
    wind_speed: chance.first(),
    wind_gust: chance.first(),
    humidity: chance.first(),
    precipitation: chance.first(),
    description: chance.first(),
    area: chance.first(),
    status: chance.first(),
  })
}


export default fires
