import os
import json
import pandas as pd

#print(os.getcwd())
os.chdir("../Data/tweet")

#print(os.getcwd())
#print(os.listdir())

files = os.listdir()
#print(files)

dict = []


for file in files:
    if (file != '.DS_Store' and file!='data.csv'): #Additional files to be ignored rn
        json_string = open(file, 'r', encoding="latin-1").read()
        json_dict = json.loads(json_string)
        dict.append(json_dict)


df = pd.DataFrame(dict)
df = df.replace({'\n': ' '}, regex=True)  # remove linebreaks in the dataframe
df = df.replace({'\t': ' '}, regex=True)  # remove tabs in the dataframe
df = df.replace({'\r': ' '}, regex=True)  # remove carriage return in the dataframe

df

# Export to csv
df.to_csv("data.csv")
print("The tweets are now in a CSV! :D")
