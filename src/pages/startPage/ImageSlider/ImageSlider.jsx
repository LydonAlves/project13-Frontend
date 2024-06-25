import Slider from "react-slick";
import "./ImageSlider.css"

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    appendDots: dots => (
      <div style={{ position: 'absolute', bottom: '20px', width: '100%' }}>
        <ul style={{ margin: '0px', padding: '0px' }}> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          display: 'inline-block',
          margin: '0 5px',
        }}
      ></div>
    )
  };

  const imageList = [
    {
      img: "./assets/startPage/Image1.png",
      title: "INTERACTIVE SPEAKING EXERCISES",
      text: "with AI Corrections"
    },
    {
      img: "./assets/startPage/Image2.png",
      title: "CLASS MANAGEMENT",
      text: "Create and Manage Classes"
    },
    {
      img: "./assets/startPage/Image3.png",
      title: "LISTENING PRACTICES",
      text: "with YouTube videos chosen by you"
    }
  ];

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {imageList.map((item, index) => (
          <div className="sliderDiv" key={index}>
            <div className="sliderTextDiv">
              <p className="sliderTitle">{item.title}</p>
              <p className="sliderText">{item.text}</p>
            </div>
            <img className="sliderImg" src={item.img} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageSlider