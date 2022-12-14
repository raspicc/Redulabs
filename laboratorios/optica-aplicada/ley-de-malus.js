// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCg27PSgkh-zFG6fNmQbk2G69k3BjZ2G1E",
  authDomain: "redulabsperu.firebaseapp.com",
  databaseURL: "https://redulabsperu-default-rtdb.firebaseio.com",
  projectId: "redulabsperu",
  storageBucket: "redulabsperu.appspot.com",
  messagingSenderId: "848155992721",
  appId: "1:848155992721:web:5c829bb73a76bfcc095530",
  measurementId: "G-QTTHWRW73S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {getDatabase, ref, get, set, child, update, remove}
from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
const db = getDatabase();

var laserbox = document.getElementById("Laserbox");
var sensorbox = document.getElementById("Sensorbox");
var motorbox = document.getElementById("Motorbox");
var insertok = document.getElementById("Insert_Ok");

var ang_inf = document.getElementById("Ang_inf");
var ang_sup = document.getElementById("Ang_sup");
var ang_delta = document.getElementById("Ang_delta");
var insertISD = document.getElementById("Insert_ISD");

var start_exp = document.getElementById("Start_Exp");
var new_exp = document.getElementById("New_Exp");
var download_data = document.getElementById("Download_Data");

var laserbox2 = document.getElementById("Laserbox2");
var sensorbox2 = document.getElementById("Sensorbox2");
var motorbox2 = document.getElementById("Motorbox2");
var insertok2 = document.getElementById("Insert_Ok2");

var angulo = document.getElementById("Angulo");
var intensity = document.getElementById("Intensity");
var intensitybox = document.getElementById("Intensitybox");
var insert_angulo = document.getElementById("Insert_Angulo");

var graficar = document.getElementById("Graficar");

function InsertLSM(){
    set(ref(db, '/Ley-de-malus/Exp_Continuo/LSM/'),{
        Laser:parseInt(laserbox.value),
        Sensor:parseInt(sensorbox.value),
        Motor:parseInt(motorbox.value),
    })
    set(ref(db, '/Modo-Ley-de-malus/'),{
        Modo:"Continuo", 
    })
    .then(()=>{
        alert("Datos enviados correctamente");
    })
    .catch(()=>{
        alert("Error inusual" + error);
    });
}
insertok.addEventListener('click',InsertLSM);

function InsertISD(){
    set(ref(db, '/Ley-de-malus/Exp_Continuo/ISD/'),{
        Ang_inf:parseFloat(ang_inf.value),
        Ang_sup:parseFloat(ang_sup.value),
        Paso:parseFloat(ang_delta.value),
    })
    set(ref(db, '/Ley-de-malus/Exp_Continuo/RUN/'),{
        value:0,
    })
    .then(()=>{
        alert("Se registró los limites y el paso correctamente.");
    })
    .catch(()=>{
        alert("Error inusual" + error);
    });
}
insertISD.addEventListener('click',InsertISD);

function InsertStart_Exp(){
    set(ref(db, '/Ley-de-malus/Exp_Continuo/RUN/'),{
        value: 1,
    })
    .then(()=>{
        alert("Experimento iniciado.");
    })
    .catch(()=>{
        alert("Error inusual" + error);
    });
}
start_exp.addEventListener('click',InsertStart_Exp);

function InsertNew_Exp(){
    set(ref(db, '/Ley-de-malus/Exp_Continuo/ISD/'),{
        Paso: 0,
        Ang_inf: 0,
        Ang_sup: 0,
        
    })
    ang_inf.value = "",
    ang_sup.value = "",
    ang_delta.value = "",
    laserbox.value = "",
    sensorbox.value = "",
    motorbox.value = "",
  
    set(ref(db, '/Exp_Continuo/LSM/'),{
        Laser: 0,
        Motor: 0,
        Sensor: 0,
    })
    set(ref(db, '/Exp_Continuo/RUN/'),{
        value:0,
    })
    .then(()=>{
        alert("Datos previos eliminados.");
    })
    .catch(()=>{
        alert("Error inusual" + error);
    });
}
new_exp.addEventListener('click',InsertNew_Exp);

function InsertDownload_Data(){


}
download_data.addEventListener('click',InsertDownload_Data);
var arreglo_valoresx = new Array()
var arreglo_valoresy = new Array()
var arreglo_valoresy2 = new Array()

function GraficarData(){
    const dbref = ref(db);
    get(child(dbref, "Ley-de-malus/Exp_Continuo/DatosAngulo/Ángulo(°)/")).then((snapshot) => {
        if (snapshot.exists()) {
            arreglo_valoresy2 = snapshot.val();
            for (var i = 0; i < arreglo_valoresy2.length; i++) {
                arreglo_valoresx[i] = i
            }      
        }
        else {
            alert("Datos no encontrados");
        }

    
    })
        .catch((error) => {
            alert("Hubo un error." + error);
        });
    get(child(dbref, "Ley-de-malus/Exp_Continuo/DatosCorriente/I(lumen/m2)/")).then((snapshot) => {
        if (snapshot.exists()) {
            arreglo_valoresy = snapshot.val();
            for (var i = 0; i < arreglo_valoresy.length; i++) {
                arreglo_valoresx[i] = i
            }      
        }
        else {
            alert("Datos no encontrados");
        }
    var table = document.getElementById('myGrafic')
    var row = `<div class="chartBox"><canvas id="myChart"></canvas></div>`
    document.getElementById("container").innerHTML = row
    const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: arreglo_valoresy2,
                datasets: [{
                    label: 'Intensidad(uA) vs Ángulo(°)',
                    data: arreglo_valoresy,
                    backgroundColor: '#FC8F49',
                    borderColor: 'white',
                    borderWidth: 1
                }]   
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
        .catch((error) => {
            alert("Hubo un error." + error);
        });

}
graficar.addEventListener('click',GraficarData);

function InsertLSM2(){
    set(ref(db, '/Ley-de-malus/Exp_Discreto/LSM/'),{
        Laser2:parseInt(laserbox2.value),
        Sensor2:parseInt(sensorbox2.value),
        Motor2:parseInt(motorbox2.value),
    })
    set(ref(db, '/Modo-Ley-de-malus/'),{
        Modo:"Discreto", 
    })
    .then(()=>{
        alert("Datos enviados correctamente");
    })
    .catch(()=>{
        alert("Error inusual" + error);
    });
}
insertok2.addEventListener('click',InsertLSM2);

function InsertAngulo(){
    set(ref(db, '/Ley-de-malus/Exp_Discreto/Ang/'),{
        value:parseFloat(angulo.value),
    })
    set(ref(db, '/Exp_Continuo/RUN/'),{
        value:0,
    })
    .then(()=>{
        alert("Ángulo ingresado correctamente.");
    })
    .catch(()=>{
        alert("Error inusual" + error);
    });
}
insert_angulo.addEventListener('click',InsertAngulo);

function SelectIntensity(){
    const dbref = ref(db);
    get(child(dbref,"Ley-de-malus/Exp_Discreto/Int/value/")).then((snapshot)=>{
        if(snapshot.exists()){
            intensitybox.value = parseInt(snapshot.val());
            
        }
        else{
            alert("Dato no encontrado");
        }
    })
    .catch((error)=>{
        alert("No se pudo por el error"+error)
    })
}
intensity.addEventListener('click',SelectIntensity);
    