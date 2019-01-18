import { DoctorFinder } from './../src/doctor-finder';
import { DoctorData } from './../src/doctor-data';
import { Doctor } from './../src/doctor';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function parseDoctors(data){
  console.log(data)
  let doctorData = new DoctorData();
  data.forEach(function(doctor){
    const firstName = doctor.profile.first_name;
    const lastName = doctor.profile.last_name;
    const street = doctor.practices[0].visit_address.street;
    const aptNum = doctor.practices[0].visit_address.street2;
    const city = doctor.practices[0].visit_address.city;
    const state = doctor.practices[0].visit_address.state;
    const zip = doctor.practices[0].visit_address.zip;
    const phoneNumber = doctor.practices[0].phones[0].number;
    const newPatient = doctor. practices[0].accepts_new_patients;
    const lat = doctor.practices[0].lat;
    const long = doctor.practices[0].lon;
    doctor = new Doctor(firstName, lastName, street, aptNum, city, state, zip, phoneNumber, newPatient, lat, long);
    doctorData.createAllDocs(doctor);
  })
  console.log(doctorData)
}


$(document).ready(function(){
  const finder = new DoctorFinder();

  $(".doctor-finder-name").submit(function(event){
    event.preventDefault();
    const first = $("#doctor-first-name").val();
    const last = $("#doctor-last-name").val();
    let promise = finder.findDoctorByName(first, last);

    promise.then(function(response){
      let body = JSON.parse(response);
      parseDoctors(body);
    })
  });

  $(".doctor-finder-keyword").submit(function(event){
    event.preventDefault();
    const keyword = $("#keyword").val();
    let promise = finder.findDoctorByKeyword(keyword);

    promise.then(function(response){
      let body = JSON.parse(response);
      let data = body.data;
      parseDoctors(data)





    })
  });
});
