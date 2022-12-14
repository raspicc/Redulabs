import numpy as np
import matplotlib.pyplot as plt
from ipywidgets import interactive, fixed
import pandas as pd
from time import sleep
import time
import threading
from Firebase_Connection import *
import pyvisa
rm = pyvisa.ResourceManager()
rm.list_resources()
inst = rm.open_resource('ASRL/dev/ttyUSB0::INSTR')
inst.write_termination = "\n"
inst.read_termination = "\n"



n = 1
g = 9.81

def acercarse():
    var = "ON"
    inst.write("OUTPut:Giro0 {}".format(var))
    
def alejarse():
    var = "ON"
    inst.write("OUTPut:Giro1 {}".format(var))
    
def detener():
    var = "OFF"
    inst.write("OUTPut:Giro0 {}".format(var))
    inst.write("OUTPut:Giro1 {}".format(var))

def desplazarse_izq(N):
    # desplazamiento de Ncm hacia la izquierda
    N = int(N*3920)
    for i in range(N):
        alejarse()


def desplazarse_der(N):
    # desplazamiento de Ncm hacia la derecha
    N = int(N*3920)
    for i in range(N):
        acercarse()
 
    
def obtener_tension():
            # Ajuste minimos cuadrados para el sensor
        """Ajuste minimos cuadrados para el sensor
        La idea es realizar el ajuste de Tension vs Numero
        Para ello necesitamos los valores de tension que serán proporcionados por m*g
        para distintas masas
        Luego los valores Numero serán proporcionados por el propio sensor
        """
        # Numeros (Eje x)
        N_masa1 = -1410
        N_masa2 = -1474
        N_masa_t = -4376
        numeros = [N_masa1,N_masa2,N_masa_t]
        # Tension (Eje Y)
        masa1 = 1.412	#Kg
        masa2 = 1.436
        masa_t = masa1+masa2
        tension1 = masa1*g
        tension2 = masa2*g
        tension_t = (masa1+masa2)*g
        tension = [tension1,tension2,tension_t]
        
        # Ajuste minimos cuadrados
        datax = np.array(numeros)
        datay = np.array(tension)
        dataxy = datax*datay
        datax2 = datax**2
        m = (np.mean(dataxy)-np.mean(datax)*np.mean(datay))/(np.mean(datax2)-np.mean(datax)**2)
        b = np.mean(datay)-m*np.mean(datax)
        
        # Consultamos los valores del sensor
        sleep(2)	# leer cada 2seg o más
        number = float(inst.query("MEASure:Number0?"))    
        # La ecuacion que convierte el numero del sensor en su correspondiente valor de tension es: y = m*x + b
        #print("La ecuacion es: ",m,"x +",b)
        tension = number*m + b
        return tension      

def ir_origen():
    tension_cero = 0.05 #cm
    paso = 0.1 #cm
    tension_actual = round(obtener_tension(),3)
    if(tension_actual>tension_cero):
        if((tension_actual/tension_cero)>1):
            desplazarse_izq(paso*10)
            print(tension_actual)
        desplazarse_izq(paso)	
        print(tension_actual)
    if(tension_actual<0):
        desplazarse_der(paso)
        print(tension_actual)
        
lista_tension = list()
lista_elongacion = list()
paso = 0.1
elongacion = 0

var2 =0
while True:
    try:
        if(h_ley_de_hooke_modo()=="Continuo"):
            if(h_recibir_origen()==1):
                # empezar el experimento, yendo al origen
                ir_origen()
                print("Esta yendo al origen")
            # determinar que el sensor y el motor esten encendidos
            if((h_estado_sensor()==1) and (h_estado_motor()==1)):
                if(h_estado_RUN()==1):
                    # recibir el valor de E_inf,E_sup,Paso y guardarlo en una variable 
                    array_elongaciones = list(np.arange(h_E_inf(),h_E_sup()+h_Paso(),h_Paso()))
                    print(array_elongaciones)
                    lista_tensiones = list()
                    for i in np.arange(h_E_inf(),h_E_sup()+h_Paso(),h_Paso()):
                        #se desplaza el paso
                        desplazarse_der(h_Paso())
                        print("Se desplazo",h_Paso())
                        # una vez desplazado, se guardara la tension en un array
                        lista_tensiones.append(obtener_tension())
                        
                   
                    # una vez obtenido los valores de elongaciones y tensiones, se envia a Realtime
                    h_enviar_elongaciones(np.array(array_elongaciones))
                    print(np.round(array_elongaciones))
                    h_enviar_tensiones(lista_tensiones)
                    print(lista_tensiones)
                    h_setear()
                    h_setear_modo()
                    
        if(h_ley_de_hooke_modo()=="Discreto"):
            if(h_recibir_origen_D()==1):
                # consultar el origen
                ir_origen()
                h_enviar_fuerza(round(obtener_tension(),3))
                if(obtener_tension()<0):
                    ir_origen()
            # determinar que el sensor y el motor esten encendidos
            if((h_estado_sensor_D()==1) and (h_estado_motor_D()==1)):
                # leer el valor de elongacion y ordenar el desplazamiento
                if(h_recibir_elongacion()!=var2):
                    var1 = h_recibir_elongacion()
                    print("El valor recibido es ",var1)	
                    dif_var = var1-var2
                    print("La diferencia desplazada es ",dif_var)	#diferencia
                    if(dif_var>0):
                        desplazarse_der(dif_var)
                    if(dif_var<0):
                        desplazarse_izq(abs(dif_var2))
                    # despues de leer se enviará el valor de la fuerza a Realtime
                    h_enviar_fuerza(round(obtener_tension(),3))
                    var2 = var1
                    print("Se guardo el valor ",var2)
#         ir_origen()
#         print(obtener_tension())
        
#         desplazarse_der(paso)
#         elongacion += paso
#         lista_elongacion.append(elongacion)
#         
#         tension = obtener_tension()
#         lista_tension.append(tension)
#         
#         datax = np.array(lista_elongacion)
#         datay = np.array(lista_tension)
#         dataxy = datax*datay
#         datax2 = datax**2
#         m = (np.mean(dataxy)-np.mean(datax)*np.mean(datay))/(np.mean(datax2)-np.mean(datax)**2)
#         b = np.mean(datay)-m*np.mean(datax)
# 
#         #print("La ecuacion es ",m,"x +",b)
#         plt.scatter(datax,datay)
#         plt.plot(datax,m*datax+b)
#         plt.show()
#         print(lista_elongacion,lista_tension)
#         
#         if(elongacion>1):
#             print(lista_elongacion,lista_tension)
#             break
        

    except KeyboardInterrupt: #por si ocurre error
        break   
