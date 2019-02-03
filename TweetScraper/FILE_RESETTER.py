import os
import json

#print(os.getcwd())
os.chdir("Data/tweet")

#print(os.getcwd())
#print(os.listdir())

files = os.listdir()
#print(files)


for file in files:
    if (file != '.DS_Store'): #Additional files to be ignored rn
        os.remove(file)


#DO I NEED TO WORRY ABOUT USER FILES!?