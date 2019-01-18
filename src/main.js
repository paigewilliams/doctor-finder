import { DoctorFinder } from './../src/doctor-finder';
import { DoctorData } from './../src/doctor-data';
import { SymptomFinder } from './../src/symptom-promise';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

 function showDoctorInfo(doctors){
   for(let i = 0; i < doctors.length; i++) {
     $(".output").append(
       `<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title"> ${doctors[i].firstName} ${doctors[i].lastName}</h5>
          <h6 class="card-subtitle mb-2 text-muted"> ${doctors[i].street} ${doctors[i].city}, ${doctors[i].state} ${doctors[i].zip}</h6>
          <p class="card-text">Phone Number: ${doctors[i].phoneNumber}<br><p>Taking new patients? ${doctors[i].newPatient}</p>
        </div>
      </div>`)
    }
  }

 function parseData(response){
   let body = JSON.parse(response);
   let data = body.data;
   let doctorData = new DoctorData();
   doctorData.createAllDocs(data);
   let allDocs = doctorData.allDocs;
   if (allDocs.length === 0){
     $("#no-doctors").show();
   } else {
     $("#no-doctors").hide();
     showDoctorInfo(allDocs)
   }
 }

 function parseSymptomData(response){
   let body = JSON.parse(response);
   const allSymptoms = body.data;
   const allSymptomsArray = [];

   for(let i = 0; i < allSymptoms.length; i++){
     allSymptomsArray.push(`<option value="${allSymptoms[i].name}">${allSymptoms[i].name}</option>`);
   }
   $("#keyword").html(allSymptomsArray.join(''));
 }


 function errorMessage(error){
   $("#error").show();
   $(".error").html(`There was error processing your query: ${error.message}`)
 }

$(document).ready(function(){

  const symptoms = new SymptomFinder()
  let promise = symptoms.findSymptom()

  promise.then(function(response){
    parseSymptomData(response)

    const finder = new DoctorFinder();
    $(".doctor-finder-name").submit(function(event){
      event.preventDefault();
      const first = $("#doctor-first-name").val();
      const last = $("#doctor-last-name").val();
      let promise = finder.findDoctorByName(first, last);
      promise.then(function(response){
        $(".doctor-finder-name")[0].reset();
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
        $(".doctor-finder-keyword")[0].reset();
        parseData(response);
      }, function(error){
        errorMessage(error)
      })
    });
  })


});
