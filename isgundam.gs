function IsGundam(inputText) {
  const apiKey = "your_api_key";
  const url = "https://api.openai.com/v1/chat/completions";
  
  const prompt = `次のテキスト「${inputText}」とトピック 「ガンダム」やその他「ガンダムシリーズ」の関連性と正確性を1から10のスケールで評価してください。結果は、数値のみ返とします。1 は「関連性がない、もしくは虚偽」を意味し、10 は「関連性が高く真実」ことを意味します。`;
  
  const payload = {
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 10,
  };
  
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    payload: JSON.stringify(payload)
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    const responseData = JSON.parse(response.getContentText());
    const score = responseData.choices[0].message.content.trim();
    return score;
  } catch (error) {
    console.error("Error:", error);
    return "Error in API call";
  }
}
