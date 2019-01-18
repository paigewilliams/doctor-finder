import { DoctorFinder } from './../src/doctor-finder';
import { DoctorData } from './../src/doctor-data';

import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


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
      doctorData.createDoctorObject(data)
    }, function(error){
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
      doctorData.createAllDocs(data)
    }, function(error){
      $(".error").html(`There was error processing your query: ${error.message}`)
    })
  });
});
