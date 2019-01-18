import { Doctor } from './../src/doctor';

export class DoctorData {
  constructor(){
    this.allDocs = []
  }

  createDoctorObject(firstName, lastName, street, aptNum, city, state, zip, phoneNumber, newPatient, lat, long){
    let newDoctor = new Doctor(firstName, lastName, street, aptNum, city, state, zip, phoneNumber, newPatient, lat, long);
    this.allDocs.push(newDoctor);
  }

  createAllDocs(data)  {
    for(let i = 0; i < data.length; i++){
      const firstName = data[i].profile.first_name;
      const lastName = data[i].profile.last_name;
      const street = data[i].practices[0].visit_address.street;
      const aptNum = data[i].practices[0].visit_address.street2;
      const city = data[i].practices[0].visit_address.city;
      const state = data[i].practices[0].visit_address.state;
      const zip = data[i].practices[0].visit_address.zip;
      const phoneNumber = data[i].practices[0].phones[0].number;
      const newPatient = data[i]. practices[0].accepts_new_patients;
      const lat = data[i].practices[0].lat;
      const long = data[i].practices[0].lon;
      this.createDoctorObject(firstName, lastName, street, aptNum, city, state, zip, phoneNumber, newPatient, lat, long);
    }
  }
}
