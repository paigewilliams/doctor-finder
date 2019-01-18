import { DoctorFinder } from './../src/doctor-finder';
import { DoctorData } from './../src/doctor-data';

import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'


 function showDoctorInfo(doctors){
   for(let i = 0; i < doctors.length; i++) {
     $(".output").append(`<p>Name: ${doctors[i].firstName} ${doctors[i].lastName}</p><br><p>Address: ${doctors[i].street}</p><br><p>${doctors[i].city}, ${doctors[i].state} ${doctors[i].zip}</p><br><p>Phone Number: ${doctors[i].phoneNumber}</p><br><p>Taking new patients? ${doctors[i].newPatient}</p><br>`)
   }
 }

 function parseData(response){
   let body = JSON.parse(response);
   let data = body.data;
   let doctorData = new DoctorData();
   doctorData.createAllDocs(data);
   let allDocs = doctorData.allDocs;
   showDoctorInfo(allDocs)
 }

 function errorMessage(error){
   $("#error").show();
   $(".error").html(`There was error processing your query: ${error.message}`)
 }

$(document).ready(function(){
  const finder = new DoctorFinder();

  $(".doctor-finder-name").submit(function(event){
    event.preventDefault();
    const first = $("#doctor-first-name").val();
    const last = $("#doctor-last-name").val();
    let promise = finder.findDoctorByName(first, last);

    promise.then(function(response){
      parseData(response);
    }, function(error){
      errorMessage(error)
    })
  });

  $(".doctor-finder-keyword").submit(function(event){
    event.preventDefault();
    const keyword = $("#keyword").val();
    let promise = finder.findDoctorByKeyword(keyword);

    promise.then(function(response){
      parseData(response);
    }, function(error){
      errorMessage(error)
    })
  });
});
