export class DoctorFinder {
  findDoctor(firstName, lastName){
    return new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${keyword}&location=or-portland&skip=0&limit=10&user_key=${exports.apiKey}`

    })

  }
}
