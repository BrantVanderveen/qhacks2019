import requests
from pprint import pprint

subscription_key = 00823108ea3944938d8d6cb6927a152e
assert subscription_key

#text analysis link
text_analytics_base_url = "https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/"


#Detect language
#language_api_url = text_analytics_base_url + "languages"
#print(language_api_url)

#https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/languages


#determine language of text
headers   = {"Ocp-Apim-Subscription-Key": subscription_key}
response  = requests.post(language_api_url, headers=headers, json=documents)
languages = response.json()
print(languages)

sentiment_api_url = text_analytics_base_url + "sentiment"
print(sentiment_api_url)

headers   = {"Ocp-Apim-Subscription-Key": subscription_key}
response  = requests.post(sentiment_api_url, headers=headers, json=documents)
sentiments = response.json()
print(sentiments)