function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url').value

    // updating the UI with data received from the server
    if(Client.checkForURL(formText)) {
    console.log("Form Submitted")
    document.querySelector('.results').style.display = 'block';
    document.querySelector('#error').style.display = 'none';
    postData('http://localhost:8090/api', {url: formText})

    .then(function(res) {

        document.getElementById('polarity').innerHTML = `Polarity: ${polarityChecker(res.score_tag)}`;
        document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`;
        document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
        document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
        document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
        
    })
    } else {
        document.querySelector('.results').style.display = 'none';
        document.querySelector('#error').style.display = 'block';
        document.getElementById('error').innerHTML = 'Appears to be an incorrect URL. Please attempt with a valid URL.';
        
    }
}


const postData = async (url = "", data = {}) => {
    console.log('Analyzing:', data);

    // Send a POST request using fetch
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log('Data received:', newData)
        // Return the parsed data
        return newData;
    } catch (error) {
        console.error('Error in postData:', error);

        // Return an error object with a message
        return { error: true, message: 'An error occurred during the request.' };
    }
};

// API response output 
const polarityChecker = (score) => {
    const sentimentMap = {
        'P+': 'strong positive',
        'P': 'positive',
        'NEW': 'neutral',
        'N': 'negative',
        'N+': 'strong negative',
        'NONE': 'no sentiment',
    };

    return sentimentMap[score] ? sentimentMap[score].toUpperCase() : 'Unknown';
};

export { handleSubmit, polarityChecker };