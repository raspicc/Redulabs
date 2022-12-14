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


var sensorbox2 = document.getElementById("Sensorbox2");
var motorbox2 = document.getElementById("Motorbox2");
var insertok2 = document.getElementById("Insert_Ok2");

var angulo = document.getElementById("Angulo");
var intensity = document.getElementById("Intensity");
var intensitybox = document.getElementById("Intensitybox");
var insert_angulo = document.getElementById("Insert_Angulo");

var graficar = document.getElementById("Graficar");
var ir_al_origen = document.getElementById("Ir_al_origen");

function InsertSM(){
    set(ref(db, '/Ley-de-hooke/Exp_Continuo/SM/'),{
        Sensor:parseInt(sensorbox.value),
        Motor:parseInt(motorbox.value),
    })
    set(ref(db, '/Modo-Ley-de-hooke/'),{
        Modo:"Continuo", 
    })
    set(ref(db, '/Ley-de-hooke/Exp_Continuo/Origen/'),{
        value:1,
    })
    .then(()=>{
        alert("Datos enviados correctamente");
    })
    .catch(()=>{
        alert("Error inusual" + error);
    });
}
insertok.addEventListener('click',InsertSM);

function InsertISD(){
    set(ref(db, '/Ley-de-hooke/Exp_Continuo/ISD/'),{
        E_inf:parseFloat(ang_inf.value),
        E_sup:parseFloat(ang_sup.value),
        Paso:parseFloat(ang_delta.value),
    })
    set(ref(db, '/Ley-de-hooke/Exp_Continuo/RUN/'),{
        value:0,
    })
    set(ref(db, '/Ley-de-hooke/Exp_Continuo/Origen/'),{
        value:1,
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
    set(ref(db, '/Ley-de-hooke/Exp_Continuo/RUN/'),{
        value: 1,
    })
    set(ref(db, '/Ley-de-hooke/Exp_Continuo/Origen/'),{
        value: 0,
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
    set(ref(db, '/Ley-de-hooke/Exp_Continuo/ISD/'),{
        Paso: 0,
        E_inf: 0,
        E_sup: 0,
        
    })
    set(ref(db, '/Ley-de-hooke/Exp_Continuo/Origen/'),{
        value:1,
    })
    set(ref(db, '/Ley-de-hooke/Exp_Continuo/RUN/'),{
        value:0,
    })
    remove(ref(db, '/Ley-de-hooke/Exp_Continuo/DatosElongaciones/E(cm)'),{  
    })
    remove(ref(db, '/Ley-de-hooke/Exp_Continuo/DatosTensiones/F(N)'),{  
    })
    ang_inf.value = "",
    ang_sup.value = "",
    ang_delta.value = "",
    sensorbox.value = "",
    motorbox.value = "",
  
    set(ref(db, '/Ley-de-hooke/Exp_Continuo/SM/'),{
        Motor: 0,
        Sensor: 0,
    })
    set(ref(db, '/Ley-de-hooke/Exp_Continuo/RUN/'),{
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
    get(child(dbref, "Ley-de-hooke/Exp_Continuo/DatosElongaciones/E(cm)/")).then((snapshot) => {
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
    get(child(dbref, "Ley-de-hooke/Exp_Continuo/DatosTensiones/F(N)/")).then((snapshot) => {
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
                    label: 'Fuerza(N) vs Elongación(cm)',
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

function InsertSM2(){
    set(ref(db, '/Ley-de-hooke/Exp_Discreto/SM/'),{
        Sensor2:parseInt(sensorbox2.value),
        Motor2:parseInt(motorbox2.value),
    })
    set(ref(db, '/Modo-Ley-de-hooke/'),{
        Modo:"Discreto", 
    })
    set(ref(db, '/Ley-de-hooke/Exp_Discreto/Elongación/'),{
        value:0,
    })
    .then(()=>{
        alert("Datos enviados correctamente");
    })
    .catch(()=>{
        alert("Error inusual" + error);
    });
}
insertok2.addEventListener('click',InsertSM2);

function InsertAngulo(){
    set(ref(db, '/Ley-de-hooke/Exp_Discreto/Elongación/'),{
        value:parseFloat(angulo.value),
    })
    set(ref(db, '/Ley-de-hooke/Exp_Continuo/RUN/'),{
        value:0,
    })
    set(ref(db, '/Ley-de-hooke/Exp_Discreto/Origen/'),{
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
    get(child(dbref,"Ley-de-hooke/Exp_Discreto/Fuerza/value/")).then((snapshot)=>{
        if(snapshot.exists()){
            intensitybox.value = parseFloat(snapshot.val());
            
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
    
function InsertOrigen(){
    set(ref(db, '/Ley-de-hooke/Exp_Discreto/Origen/'),{
        value:1,
    })
    set(ref(db, '/Modo-Ley-de-hooke/'),{
        Modo:"Discreto",
    })
    set(ref(db, '/Ley-de-hooke/Exp_Discreto/Elongación/'),{
        value:0,
    })
    .then(()=>{
        alert("Iniciando en el origen.");
    })
    .catch(()=>{
        alert("Error inusual" + error);
    });
}
ir_al_origen.addEventListener('click',InsertOrigen);