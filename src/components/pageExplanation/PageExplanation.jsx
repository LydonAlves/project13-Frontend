import "./PageExplanation.css"

const PageExplanation = ({ setNeedHelp, info }) => {
  console.log(info[0]);
  return (
    <div className="classManagerExampleDiv">
      <p className="pageExpTitle">{info[0].title} </p>
      {info.map((text, index) => (
        <p className="pageExpText" key={index}>{text.item}</p>
      ))}
      <button
        className="closeButtonPageExp"
        onClick={() => setNeedHelp(false)}
      >GOT IT</button>
    </div>
  )
}

export default PageExplanation   