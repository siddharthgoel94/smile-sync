from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model
from sklearn.cluster import KMeans
import warnings

app = Flask(__name__)

# Filter out specific warning messages
warnings.filterwarnings("ignore")

# Load the saved MinMaxScaler and trained models
scaler = MinMaxScaler()
scaler.fit(np.random.rand(500, 6).astype(np.float32))  # Fit with random data (ensure dtype is float32)

autoencoder_model = load_model('smilesync-mlModel/saved_model/autoencoder_clustering_model.h5')
# Load cluster assignments using KMeans
kmeans_model = KMeans(n_clusters=4, random_state=42)
kmeans_model.fit(pd.read_csv('smilesync-mlModel/cluster_assignments.csv', header=None).values.astype(np.float32))  # Ensure dtype is float32

# Define function for predicting cluster based on input parameters
def predict_cluster(input_values):
    # Convert input_values to numpy array and ensure dtype is float
    input_values = np.array(input_values, dtype=np.float32)
    
    # Preprocess input data using the scaler
    input_values_scaled = scaler.transform([input_values])
    
    # Obtain latent space representation (embedding) using the autoencoder
    encoder_model = autoencoder_model.layers[0]
    latent_space = encoder_model.predict(input_values_scaled)
    
    # Reshape latent space to match expected input for KMeans clustering
    latent_space_reshaped = latent_space.reshape(-1, 1)  # Reshape to (num_samples, 1)
    
    # Predict cluster using the K-means model
    cluster_label = kmeans_model.predict(latent_space_reshaped)[0]
    return cluster_label

@app.route('/predict_cluster', methods=['POST'])
def predict_cluster_from_frontend():
    # Get input data from the request body
    input_data = request.json['input_data']
    
    # Predict cluster for input parameters
    predicted_cluster = predict_cluster(input_data)
    
    return jsonify({'predicted_cluster': predicted_cluster})

if __name__ == '__main__':
    app.run(debug=True)
