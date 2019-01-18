export class DoctorFinder {
  findDoctorByName(firstName, lastName) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?first_name=${firstName}&last_name=${lastName}&location=or-portland&user_location=45.5122%2C%20122.6587&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
      request.onload = function() {
        if(this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    })
  }
  findDoctorByKeyword(keyword) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${keyword}&location=or-portland&user_location=45.5122%2C%20122.6587&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
      request.onload = function() {
        if(this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    })
  }
}
