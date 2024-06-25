import "./CreateGapFillExplanation.css"

const CreateGapFillExplanation = ({ activitySetupStage, setNeedHelp, needHelp }) => {

  return (
    <>

      {activitySetupStage === "AIfillGapText" && needHelp === true && (
        <div className="gapFillExampleDiv">
          <h1 className="titleCreateExExplanation">How to create a gap fill exercise by AI</h1>
          <div>
            <p className="aiExampleText">All you need to do here is to add a word or short phrase to indicate what topic you'd like the text to be about</p>
            <p>Then click send message, wait and see how your fill gap activity is automatically created</p>
          </div>
          <button className="closeButtonCreateExp" onClick={() => setNeedHelp(false)}>GOT IT</button>
        </div>
      )}


      {activitySetupStage === "youTubeFillGap" && needHelp === true && (
        <div className="gapFillExampleDiv">
          <h1 className="titleCreateExExplanation">How to add a YouTube video</h1>
          <p className="youtubeExampleText">Begin by adding a link to a video from YouTube</p>
          <p className="youtubeExampleText">Then add time to indicate when at which point you'd like the video to start and stop</p>
          <p className="youtubeExampleText">After you click submit you will be able to see the video you've chosen and test play it, if your happy with it you can continue with the next step</p>
          <button className="closeButtonCreateExp" onClick={() => setNeedHelp(false)}>GOT IT</button>
        </div>
      )}

      {activitySetupStage === "fillGapText" && needHelp === true && (
        <div className="gapFillExampleDiv">
          <h1 className="titleCreateExExplanation">How to create a Gap Fill exercise</h1>
          <div className="fillGapExplanationDiv">
            <p className="fillGapExplanationTitle">Begin by adding a text like this:</p>
            <p>Lobsters are fascinating marine creatures that have intrigued humans for centuries. Known for their distinctive appearance, these crustaceans possess a hard exoskeleton, large claws, and a long, muscular tail. They primarily inhabit the ocean floor, where they seek refuge in crevices and burrows. </p>
          </div>
          <div className="fillGapExplanationDiv">
            <p className="fillGapExplanationTitle">Then remove the words you want to be blanks and replace them with a number and three lines like this: 1 --- </p>
            <p>Lobsters are fascinating 1. --- creatures that have intrigued humans for centuries. Known for their 2.--- appearance, these crustaceans possess a hard exoskeleton, large claws, and a long, muscular tail. They primarily inhabit the ocean 3. ---, where they seek refuge in crevices and burrows. </p>
          </div>
          <div className="fillGapExplanationDiv">
            <p className="fillGapExplanationTitle">Once you have submitted the text you need to add the words you have removed to the gaps, you will see the text you've created below</p>
          </div>
          <button className="closeButtonCreateExp" onClick={() => setNeedHelp(false)}>GOT IT</button>
        </div>
      )}

      {activitySetupStage === "gapAndRules" && needHelp === true && (
        <div className="gapFillExampleDiv">
          <h1 className="titleCreateExExplanation">How to add answers and rules to gaps</h1>
          <p className="youtubeExampleText">The list of Gaps respond to the gaps you see in the text below. Add the missing word to each.</p>
          <p className="youtubeExampleText">Add an explanation to each for each gap. You can either choose from one from the list or create your own</p>
          <p className="youtubeExampleText">If you create a rule, you will then be able to search for it in the Search rule section</p>
          <p className="youtubeExampleText">Once you have finished and are happy with the information click submit and the task will be saved</p>
          <p className="youtubeExampleText">If you want to change the text or title, use the button "Fill gap text" to go back to the first step</p>
          <button className="closeButtonCreateExp" onClick={() => setNeedHelp(false)}>GOT IT</button>
        </div>
      )}
    </>
  )
}

export default CreateGapFillExplanation