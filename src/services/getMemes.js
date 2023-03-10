const apiUrl = "https://api.imgflip.com";

const getMemes = async () => {
  const url = `${apiUrl}/get_memes`;
  const response = await fetch(url)
    .then((data) => data.json())
    .then((json) => json.data.memes);
  return response;
};

export { getMemes };
