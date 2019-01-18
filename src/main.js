import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function(){
  $(".doctor-finder").submit(function(event){
    event.preventDefault();

    const first = $("#doctor-first-name").val();
    const last = $("#doctor-last-name").val();
    const keyword = $("#keyword").val();

    

  });
});
