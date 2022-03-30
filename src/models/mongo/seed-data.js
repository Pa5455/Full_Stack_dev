export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
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