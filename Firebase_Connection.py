from firebase import firebase
firebase=firebase.FirebaseApplication('https://redulabsperu-default-rtdb.firebaseio.com',None)
import numpy as np
"""LEY DE HOOKE (h)"""

def h_estado_sensor():
    return firebase.get('Ley-de-hooke/Exp_Continuo/SM/Motor',None)
    
def h_estado_motor():
    return firebase.get('Ley-de-hooke/Exp_Continuo/SM/Motor',None)

def h_estado_RUN():
    return firebase.get('Ley-de-hooke/Exp_Continuo/RUN/value',None)

def h_E_inf():
    return firebase.get('Ley-de-hooke/Exp_Continuo/ISD/E_inf',None)

def h_E_sup():
    return firebase.get('Ley-de-hooke/Exp_Continuo/ISD/E_sup',None)

def h_Paso():
    return firebase.get('Ley-de-hooke/Exp_Continuo/ISD/Paso',None)

def h_estado_sensor_D():
    return firebase.get('Ley-de-hooke/Exp_Discreto/SM/Sensor2',None)

def h_estado_motor_D():
    return firebase.get('Ley-de-hooke/Exp_Discreto/SM/Motor2',None)

def h_recibir_elongacion():
    return firebase.get('Ley-de-hooke/Exp_Discreto/Elongación/value',None)

def h_enviar_fuerza(fuerza):
    firebase.patch('/Ley-de-hooke/Exp_Discreto/Fuerza',{"value":fuerza})
    
def h_ley_de_hooke_modo():
    return firebase.get('Modo-Ley-de-hooke/Modo',None)

def h_enviar_elongaciones(array_elongaciones):
    firebase.patch('/Ley-de-hooke/Exp_Continuo/DatosElongaciones',{"E(cm)":array_elongaciones})
    
def h_enviar_tensiones(array_tensiones):
    firebase.patch('/Ley-de-hooke/Exp_Continuo/DatosTensiones',{"F(N)":array_tensiones})

def h_recibir_origen():
    return firebase.get('Ley-de-hooke/Exp_Continuo/Origen/value',None)

def h_setear():
    firebase.patch('/Ley-de-hooke/Exp_Continuo/Origen',{"value":0})
    firebase.patch('/Ley-de-hooke/Exp_Continuo/ISD',{"E_inf":0})
    firebase.patch('/Ley-de-hooke/Exp_Continuo/ISD',{"E_sup":0})
    firebase.patch('/Ley-de-hooke/Exp_Continuo/ISD',{"Paso":0})
    firebase.patch('/Ley-de-hooke/Exp_Continuo/RUN',{"value":0})
    
def h_setear_modo():
    firebase.patch('/Modo-Ley-de-hooke',{"Modo":"OFF"})
    
def h_recibir_origen_D():
    return firebase.get('Ley-de-hooke/Exp_Discreto/Origen/value',None)

def h_enviar_elongacion(elongacion):
    firebase.patch('/Ley-de-hooke/Exp_Discreto/Elongación',{"value":elongacion})
    
# while True:
#     try:
#         lista_elongaciones = [2,3,5]
#         lista_tensiones = [14,28,34]
#         h_enviar_elongaciones(lista_elongaciones)
#         h_enviar_tensiones(lista_tensiones)
#     except KeyboardInterrupt: #por si ocurre error
#         break     

"""LEY DE MALUS(m)"""
def m_estado_laser():
    return firebase.get('Ley-de-malus/Exp_Continuo/LSM/Laser',None)

def m_estado_motor():
    return firebase.get('Ley-de-malus/Exp_Continuo/LSM/Motor',None)

def m_estado_sensor():
    return firebase.get('Ley-de-malus/Exp_Continuo/LSM/Sensor',None)

def m_estado_RUN():
    return firebase.get('Ley-de-malus/Exp_Continuo/RUN/value',None)

def m_Ang_inf():
    return firebase.get('Ley-de-malus/Exp_Continuo/ISD/Ang_inf',None)

def m_Ang_sup():
    return firebase.get('Ley-de-malus/Exp_Continuo/ISD/Ang_sup',None)

def m_Paso():
    return firebase.get('Ley-de-malus/Exp_Continuo/ISD/Paso',None)

def m_estado_laser_D():
    return firebase.get('Ley-de-malus/Exp_Discreto/LSM/Laser2',None)

def m_estado_motor_D():
    return firebase.get('Ley-de-malus/Exp_Discreto/LSM/Motor2',None)

def m_estado_sensor_D():
    return firebase.get('Ley-de-malus/Exp_Discreto/LSM/Sensor2',None)

def m_recibir_angulo():
    return firebase.get('Ley-de-malus/Exp_Discreto/Ang/value',None)

def m_enviar_intensidad(intensidad):
    firebase.patch('/Ley-de-malus/Exp_Discreto/Int',{"value":intensidad})
    
def m_ley_de_malus_modo():
    return firebase.get('Modo-Ley-de-malus/Modo',None)

def m_enviar_angulos(array_angulos):
    firebase.patch('/Ley-de-malus/Exp_Continuo/DatosAngulo',{"Ángulo(°)":array_angulos})
    
def m_enviar_intensidades(array_intensidades):
    firebase.patch('/Ley-de-malus/Exp_Continuo/DatosCorriente',{"I(lumen/m2)":array_intensidades})  
        
def m_recibir_origen_D():
    return firebase.get('Ley-de-malus/Exp_Discreto/Origen/value',None)

def m_recibir_origen():
    return firebase.get("Ley-de-malus/Exp_Continuo/Origen/value",None)

def m_setear():
    firebase.patch('/Ley-de-malus/Exp_Continuo/Origen',{"value":0})
    firebase.patch('/Ley-de-malus/Exp_Continuo/ISD',{"Ang_inf":0})
    firebase.patch('/Ley-de-malus/Exp_Continuo/ISD',{"Ang_sup":0})
    firebase.patch('/Ley-de-malus/Exp_Continuo/ISD',{"Paso":0})
    firebase.patch('/Ley-de-malus/Exp_Continuo/RUN',{"value":0})
    
def m_setear_modo():
    firebase.patch('/Modo-Ley-de-malus',{"Modo":"OFF"})
      