import textblob
from textblob import TextBlob
import os
import pandas as pd
import numpy as np


#path = os.getcwd()
#file_name = os.path.join(path, "tweet/data.csv")
#print(file_name)

os.chdir("../Data/tweet")

colnames = ['number', 'ID', 'datetime', 'has_media', 'is_reply', 'is_retweet', 'medias', 'x', 'y', 'z', 'text', 'w', 's', 't']
data = pd.read_csv("data.csv", names=colnames)
text = data.text.tolist()
date = data.datetime.tolist()
text_and_date = np.column_stack((text, date))
score = []
avg = 0
cnt = 0
pos = 0
neg = 0
neutral = 0
for i in range(len(text)):
    temp = TextBlob(text[i]).sentiment.polarity
    score.append(temp)
    avg += temp
    cnt += 1
    if temp > 0:
        pos += 1
    elif temp == 0:
        neutral+=1
    else:
        neg += 1
    #print(text[i], ": ", temp)
text_and_date = np.column_stack((date, text, score))
avge = avg/cnt
print("Average: ", avge)
print("Positive: ", pos)
print("neutral", neutral)
print("Negative: ", neg)
