import { DoctorFinder } from './../src/doctor-finder';
import { DoctorData } from './../src/doctor-data';
import { Doctor } from './../src/doctor';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function parseDoctors(body){
  console.log(body)
  body.data.forEach(function(doctor){
    const name = doctor.data[0].practices[0].name;
    const street = doctor.data[0].practices[0].visit_address.street;
    const aptNum = doctor.data[0].practices[0].visit_address.street2;
    const city = doctor.data[0].practices[0].visit_address.city;
    const state = doctor.data[0].practices[0].visit_address.state;
    const zip = doctor.data[0].practices[0].visit_address.zip;
    const phoneNumber = doctor.data[0].practices[0].phones[0].number;
    const newPatient = doctor.data[0]. practices[0].accepts_new_patients;
    const lat = doctor.data[0].practices[0].lat;
    const long = doctor.data[0].practices[0].long;
    doctor = new Doctor(name, street, aptNum, city, state, zip, phoneNumber, newPatient, lat, long);
    doctorData.createAllDocs(doctor);
  })
  console.log(doctorData)
}


$(document).ready(function(){
  const finder = new DoctorFinder();
  const doctorData = new DoctorData();
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

      parseDoctors(body);





    })
  });
});
