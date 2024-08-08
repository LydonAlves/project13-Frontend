const adjustScreenSize = (setVideoData, e) => {
  console.log(e);
  if (e.matches) {
    setVideoData((prevData) => ({
      ...prevData,
      opts: {
        ...prevData.opts,
        width: "250px",
        height: "150px",
      },
    }));
  } else {
    setVideoData((prevData) => ({
      ...prevData,
      opts: {
        ...prevData.opts,
        width: "500px",
        height: "300px",
      },
    }));
  }
}

