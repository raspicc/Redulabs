import numpy as np
import matplotlib.pyplot as plt
from ipywidgets import interactive, fixed
import pandas as pd

datax = [149,-133,-141,-430]
datay = [0,13.8321,14.0873,27.9193]
datax = np.array(datax)
datay = np.array(datay)

dataxy = datax*datay
datax2 = datax**2
m = (np.mean(dataxy)-np.mean(datax)*np.mean(datay))/(np.mean(datax2)-np.mean(datax)**2)
b = np.mean(datay)-m*np.mean(datax)

print("La ecuacion es ",m,"x +",b)
# plt.scatter(datax,datay)
# plt.plot(datax,m*datax+b)
# plt.show()