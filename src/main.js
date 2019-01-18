import { DoctorFinder } from './../src/doctor-finder'

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
    })
  });

  $(".doctor-finder-keyword").submit(function(event){
    event.preventDefault();
    const keyword = $("#keyword").val();
    let promise = finder.findDoctorByKeyword(keyword);

    promise.then(function(response){
      let body = JSON.parse(response);



      const name = body.data[0].practices[0].name;
      const street = body.data[0].practices[0].visit_address.street;
      const aptNum = body.data[0].practices[0].visit_address.street2;
      const city = body.data[0].practices[0].visit_address.city;
      const state = body.data[0].practices[0].visit_address.state;
      const zip = body.data[0].practices[0].visit_address.zip;
      const phoneNumber = body.data[0].practices[0].phones[0].number;
      const newPatient = body.data[0]. practices[0].accepts_new_patients;

      console.log("name: " + name + "street:" + street + "aptNum: " + aptNum + "city: " + city + "state: " + state + "zip: " + zip + "phoneNumber: " + phoneNumber + "newPatient: " + newPatient);
    })
  });
});
