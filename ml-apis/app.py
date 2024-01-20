from flask import Flask,jsonify,request
import joblib
from flask_cors import CORS
import numpy as np
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer


app = Flask(__name__)
CORS(app)


all_stopwords = ""
with open("english_stopwords.txt", 'r') as file:
    all_stopwords = set(file.read().splitlines())

model_tree = joblib.load('text_filter_svc.h5')
vectorizer_text = joblib.load('vectorizer.joblib')
dementia = joblib.load('dementialModel.joblib')
diabete= joblib.load('diabetes.joblib')
sc = joblib.load('scaler.joblib')


def convert_to_standard_types(value):
    if isinstance(value, (np.int64, np.int32, np.int16, np.int8)):
        return int(value)
    elif isinstance(value, (np.float64, np.float32)):
        return float(value)
    else:
        return value

@app.route('/dementia-api', methods=['POST'])
def predict():
    try:
        
        input_data = request.get_json()

        
        input_array = [[
            input_data['M/F'],
            input_data['Age'],
            input_data['EDUC'],
            input_data['SES'],
            input_data['MMSE'],
            input_data['eTIV'],
            input_data['nWBV'],
            input_data['ASF']
        ]]

        
        prediction = dementia.predict(input_array)[0]
        probability = dementia.predict_proba(input_array)[:, 1][0]

       
        prediction = convert_to_standard_types(prediction)
        probability = convert_to_standard_types(probability)

        # Return the results as JSON
        result = {'prediction': prediction, 'probability': probability}
        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/diabete_api',methods=['POST'])
def api():
    try:
        data = request.get_json()

        data_val = [list(data.values())]
        print(data_val)
        
        data_val = sc.transform(data_val)
        print(data_val)

        predict = diabete.predict(data_val)[0]
        print(predict)

        return jsonify({'class' : str(predict)})

    except Exception as e:
        return jsonify({'error': str(e)})



@app.route('/text_api', methods=['POST'])
def simple():
    if request.method == 'OPTIONS':
        response = make_response()
    else:
        # Your route logic here
        text = request.get_json()
        text = text['description']
        text_data= []
        
        
        text_array = text.split('.')    
        length = len(text_array)
        for text in text_array:
    
          text = re.sub('[^a-zA-Z]', ' ', text)
          text = text.lower()
          text = text.split()
          ps = PorterStemmer()
          text = [ps.stem(word) for word in text if not word in set(all_stopwords)]
          text = ' '.join(text)
          text_data.append(text)
        




        text_pro = vectorizer_text.transform(text_data).toarray()
        lines = []
        for i in range(0, len(text_pro)):
            y_p = model_tree.predict([text_pro[i]])
            
            if y_p[0] == 1 or y_p[0] == 0:
                lines.append(i)
        response = jsonify({'message': lines})

    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')

    return response

if __name__ == '__main__':
    app.run(debug=True)
