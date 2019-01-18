import { DoctorFinder } from './../src/doctor-finder';
import { DoctorData } from './../src/doctor-data';

import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'


 function showDoctorInfo(doctors){
   doctors.forEach(function(doctor){
     $(".output").append(`<p>Name: ${doctor.firstName} ${doctor.lastName}</p><br><p>Address: ${doctor.street}</p><br><p>${doctor.city}, ${doctor.state} ${doctor.zip}</p><br><p>Phone Number: ${doctor.phoneNumber}</p><br><p>Taking new patients? ${doctor.newPatient}</p><br>` )
   })


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
      let data = body.data;
      let doctorData = new DoctorData();
      showDoctorInfo(doctorData.createAllDocs(data))

    }, function(error){
      $("#error").show();
      $(".error").html(`There was error processing your query: ${error.message}`)
    })
  });

  $(".doctor-finder-keyword").submit(function(event){
    event.preventDefault();
    const keyword = $("#keyword").val();
    let promise = finder.findDoctorByKeyword(keyword);

    promise.then(function(response){
      let body = JSON.parse(response);
      let data = body.data;
      let doctorData = new DoctorData();
      doctorData.createAllDocs(data);
      let allDocs = doctorData.allDocs;
      showDoctorInfo(allDocs);
    }, function(error){
      $("#error").show();
      $(".error").html(`There was error processing your query: ${error.message}`)
    })
  });
});
