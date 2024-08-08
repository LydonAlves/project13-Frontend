export const checkScreenSize = (video, setVideoScreenSize) => {
  const mediaQuery = window.matchMedia('(max-width: 600px)');
  const handleMediaChange = (e) => adjustScreenSize(setVideoScreenSize, e);

  mediaQuery.addEventListener('change', handleMediaChange);

  if (mediaQuery.matches && video.opts.width === "500px") {
    adjustScreenSize(setVideoScreenSize, mediaQuery)
  } else if (!mediaQuery.matches && video.opts.width === "250px") {
    adjustScreenSize(setVideoScreenSize, mediaQuery)
  }

  return () => {
    mediaQuery.removeEventListener('change', handleMediaChange);
  }
}