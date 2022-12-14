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

def obtener_intensidad():
    return inst.query(":MEASure:Intensity0?")
    
def estado_laser(estado):
    inst.write(":OUTPut:Laser0 {}".format(estado))

def giro_horario():
    inst.write(":OUTPut:Giro0 ON")	#suponiendo que gira 1° en sentido horario
    
def giro_antihorario():
    inst.write(":OUTPut:Giro1 ON")	#suponiendo que gira 1° en sentido antihorario

def giro_horario_decimal():
    inst.write("OUTPut:Giro_decimal0 ON")	#suponiendo que gira 0.1° en sentido horario
    
def giro_antihorario_decimal():
    inst.write("OUTPut:Giro_decimal1 ON")	#suponiendo que gira 0.1° en sentido antihorario
    
def girar_angulo(angulo):
    factor = 1
    angulo = int(angulo*factor)
    decimal = round((var%(int(var)))*10)
    if(angulo>0):
        for i in range(angulo):	# si es angulo flotante se debe hacer un cambio
            giro_horario()
        for i in range(decimal):
            giro_horario_decimal()
            
    if(angulo<0):
        for i in range(abs(angulo)):
            giro_antihorario()
        for i in range(abs(decimal)):
            giro_antihorario_decimal()
            
def ir_origen():
    intensidad_minima = 1
    while True:
        if(obtener_intensidad()>intensidad_minima):
            girar_horario()
        else
            break



while True:
    try:
        if(m_ley_de_malus_modo()=="Continuo"):
            if(m_recibir_origen()==1):
                # empezar el experimento, yendo al origen
                ir_origen()
                print("Esta yendo al origen")
            # determinar que el laser, sensor y el motor esten encendidos
            if((m_estado_laser()==1) and (m_estado_sensor()==1) and (m_estado_motor()==1)):
                if(m_estado_RUN()==1):
                    # recibir el valor de Ang_inf,Ang_sup,Paso y guardarlo en una variable 
                    array_angulos = list(np.arange(m_Ang_inf(),m_Ang_sup()+m_Paso(),m_Paso()))
                    print(array_angulos)
                    lista_intensidades = list()
                    for i in np.arange(m_Ang_inf(),m_Ang_sup()+m_Paso(),m_Paso()):
                        #gira el angulo paso
                        girar_angulo(m_Paso())
                        print("Giro ",m_Paso())
                        # una vez girado, se guardara la intensidad en un array
                        lista_intensidades.append(obtener_intensidad())
                        
                   
                    # una vez obtenido los valores de elongaciones y tensiones, se envia a Realtime
                    m_enviar_angulos(np.array(array_angulos))
                    print(np.round(array_elongaciones))
                    m_enviar_intensidades(lista_intensidades)
                    print(lista_intensidades)
                    m_setear()
                    m_setear_modo()    
            
        if(m_ley_de_malus_modo()=="Discreto"):
            if(m_recibir_origen_D()==1):
                ir_origen()
                m_enviar_intensidad(obtener_intensidad())
        if((m_estado_laser_D()==1) and (m_estado_sensor_D()==1) and (h_estado_motor_D()==1)):
            girar_angulo(m_recibir_angulo())
            m_enviar_intensidad(obtener_intensidad())
            
    except KeyboardInterrupt: #por si ocurre error
        break 