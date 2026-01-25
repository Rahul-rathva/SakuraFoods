const { Configuration, OpenAIApi } = require("openai");

app.post('/generate-plan', async (req, res) => {
  const { diet, email } = req.body;
  
  // The AI Prompt
  const prompt = `Create a 7-day ${diet} meal plan for a BlossomFoods subscriber using Japanese-Indian fusion recipes.`;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 500,
  });

  // Save to Database
  await User.findOneAndUpdate({ email }, { weeklyPlan: response.data.choices[0].text });
  
  res.json({ plan: response.data.choices[0].text });
});