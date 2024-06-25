export const editYouTubeLink = (url) => {
  const extractVideoID = (url) => url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1];
  const videoID = extractVideoID(url)
  return videoID
}
