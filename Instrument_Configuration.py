import pyvisa
rm = pyvisa.ResourceManager()
rm.list_resources()
inst = rm.open_resource('ASRL/dev/ttyUSB0::INSTR')
inst.write_termination = "\n"
inst.read_termination = "\n"
