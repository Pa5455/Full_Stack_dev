export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2a$10$80xcsY7HayEZxM6cyXy76OGFAG9gQuG3kV./WGWUCGaOYMKfM6KaG"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2a$10$OgActvgF4lnAn36KLEnIG.d0pOaht7X/YiVFw4fmj2bi5tsiDVd32"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "$2a$10$d/lfnFYhB.aXduaglYobX.gtyOhDgZ0e6GGtHb9ps4gm2PhL5WiTy"
    }
  },
  placemarks: {
    _model: "Placemark",
    curranFarms: {
      title: "Curran Farms",
      userid: "->users.bart"
    }
  },
  farms: {
    _model : "Farm",
    farm_1 : {
      farmername: "Patrick Curran",
      address: "Lixnaw Kerry",
      enterprise: "tillage",
      placemarkid: "->placemarks.curranFarms"
    },
  }
};