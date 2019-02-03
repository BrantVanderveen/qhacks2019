from textblob import TextBlob
import os
import pandas

path2 = "C:/Users/mike_/Desktop"
file_name3 = os.path.join(path2, "data.csv")

colnames = ['number', 'ID', 'datetime', 'has_media', 'is_reply', 'is_retweet', 'medias', 'x', 'y', 'z', 'text', 'w', 's', 't']
data = pandas.read_csv(file_name3, names=colnames)
text = data.text.tolist()
avg = 0
cnt = 0
pos = 0
neg = 0
for i in range(len(text)):
    temp = TextBlob(text[i]).sentiment.polarity
    if temp != 0:
        avg += temp
        cnt += 1
    if temp > 0:
        pos += 1
    else:
        neg += 1
    print(text[i], ": ", temp)
avge = avg/cnt
print("Average: ", avge)
print("Pos: ", pos)
print("Neg: ", neg)

