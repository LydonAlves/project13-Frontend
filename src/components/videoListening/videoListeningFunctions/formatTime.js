const formatTime = (time) => {
  const [minutes, seconds] = time.split(':').map(Number)
  return minutes * 60 + seconds
}

export default formatTime