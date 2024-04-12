const { PythonShell } = require('python-shell');

// Define a function to call the predict_cluster function from the Python script
function predict(inputData) {
    // Convert input data to JSON format
    const inputDataJSON = JSON.stringify({ input_data: inputData });

    // Set up options for PythonShell
    const options = {
        mode: 'text',
        pythonOptions: ['-u'], // unbuffered output
        scriptPath: '', // Directory containing the prediction script
        args: [inputDataJSON]
    };

    // Call the predict_cluster function from the Python script
    PythonShell.run('assign_cluster.py', options, (err, result) => {
        if (err) throw err;
        console.log('Predicted Cluster:', result);
    });
}

// Example usage: Predict cluster for new input parameters
// const inputParameters = [0.2, 0.4, 0.5, 0.1, 0.6, 0.2];
// predictCluster(inputParameters);
module.exports={predict};