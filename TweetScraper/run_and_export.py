import os


import sys

            #for line in sys.stdin:
# line = "beans"
# os.system("scrapy crawl TweetScraper -a query='" + line + " since:2019-01-01 until:2019-02-02'")
# os.system("py ExportingIsFUN.py")
# os.system("py sentiment.py")
for line in sys.stdin:
    sys.stdout.write(line)
