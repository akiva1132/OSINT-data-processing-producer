import json
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from gensim import corpora, models
from collections import Counter
import nltk
nltk.download('punkt')


# nltk.download('stopwords')

def preprocess_text(text):
    stop_words = set(stopwords.words('hebrew'))
    words = word_tokenize(text)
    return [word.lower() for word in words if word.isalpha() and word.lower() not in stop_words]

def get_important_words(lda_model, num_topics=5, num_words=5):
    important_words = []

    for topic_id in range(num_topics):
        topic_terms = lda_model.get_topic_terms(topic_id, topn=num_words)
        words = [lda_model.id2word[term_id] for term_id, weight in topic_terms]
        important_words.append(words)

    return important_words

def get_topics(posts, num_topics=5, num_words=5):

    processed_posts = [preprocess_text(post) for post in posts]

    dictionary = corpora.Dictionary(processed_posts)
    corpus = [dictionary.doc2bow(post) for post in processed_posts]

    lda_model = models.LdaModel(corpus, num_topics=num_topics, id2word=dictionary)

    important_words = get_important_words(lda_model, num_topics=num_topics, num_words=num_words)
    return important_words

with open("data.json", 'r', encoding='utf-8') as posts:
    posts = json.load(posts)
    print(posts)
posts2 = [
  "היום בסופש בצפון - הזמן להירגע ולהנות מהחיים 😊🌞 #WeekendVibes",
  "לפני המלחמה בצפון גאה בהשגיח על הגינה שלי ובפרחים היפים שפורחים 🌸🌼 #GreenThumb",
  "מצאתי מסלול חדש לריצה ביער הקרמל, נוף מהמם!אני  🏃‍♂️🌳 #RunningTrail",
  "ארוחת בוקר פשוטה עם קפה וטוסט - התחילה יום נהדר! ☕🍞 #BreakfastTime",
  "הופעה חיה מול הקהל בפאב המקומי הערב 🎤🎸 #LiveMusic",
  "החלטתי ללמוד פיסול - יצאו לי תחרותיים בתחום האמנות! 🎨✨ #ArtisticJourney",
  "סיור בקניון עם החברים - יום מוצלח של קניות וכיף! 🛍️😄 #ShoppingSpree",
  " מלחמה בצפון אני עם שקיעה מדהימה מעל הים התיכון היום 🌅🌊 #SunsetViews",
  "טיול יומי לטבע - פיקניק והליכה ביער מלחמה בצפון🌲🍽️ #NatureDay",
  " אני אני התחלתי לקרוא ספר חדש - עוסק באהבה ומסתרים 📖❤️ #Bookworm"
];

important_words = get_topics(posts, num_topics=5, num_words=3)
for idx, words in enumerate(important_words):
    print(f"Important Words for Topic {idx}: {words}")
