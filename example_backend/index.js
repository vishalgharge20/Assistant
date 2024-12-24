const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8080;

// Middleware to parse JSON bodies
app.use(cors({ origin: '*' }));

app.use(express.json());

app.post('/create-web-call', async (req, res) => {
    const { agent_id, metadata, retell_llm_dynamic_variables } = req.body;
  
    console.log('Received request:', req.body);  // Log incoming request
  
    const payload = { agent_id };
  
    if (metadata) {
        payload.metadata = metadata;
    }
  
    if (retell_llm_dynamic_variables) {
        payload.retell_llm_dynamic_variables = retell_llm_dynamic_variables;
    }
  
    try {
        const response = await axios.post(
            'https://api.retellai.com/v2/create-web-call',
            payload,
            {
              headers: {
                'Authorization': `Bearer key_bd0f7d3238de157b967f1f362aec`,  // Ensure 'Bearer' is included before the API key
                'Content-Type': 'application/json',
              },
            }
          );
        
        console.log('API response:', response.data);  // Log successful response from RetellAI
        res.status(201).json(response.data);  // Send response to frontend
    } catch (error) {
        console.error('Error creating web call:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to create web call', details: error.response?.data || error.message });
    }
  });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
