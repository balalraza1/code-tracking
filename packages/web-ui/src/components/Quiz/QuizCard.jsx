import { useState, useLayoutEffect, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import {
 correctAnswerClasses,
 incorrectAnswerClasses,
 defaultSlideUpVariant,
 defaultViewerStreamActionTransition
} from "./viewerStreamActionsTheme";
import { clsm, isTextColorInverted } from "../../utils";
import { createAnimationProps } from "../../helper/animationPropsHelper";
import { PROFILE_COLORS } from "../../constants";
import { Button } from "@/components/ui/button";
import { useViewerStreamActions } from "../../providers/ViewerStreamActions";
import { Progress } from "@/components/ui/progress";
import { DialogContext } from "../../providers/ModalContext";

const defaultQuizAnswerHeight = 42;

const QuizCard = ({
 answers,
 color,
 correctAnswerIndex,
 duration,
 question,
 shouldShowStream,
 shouldRenderActionInTab,
 startTime,
 setIsQuizLive
}) => {
 const [answerHeight, setAnswerHeight] = useState(defaultQuizAnswerHeight);
 const [isAnswerSelected, setIsAnswerSelected] = useState();
 const [chosenAnswerIndex, setChosenAnswerIndex] = useState();
 const quizButtonArrRef = useRef([]);
 const shouldInvertColors = isTextColorInverted(color);
 const { closeDialog } = useContext(DialogContext);
 const [progress, setProgress] = useState(Math.ceil(100 / duration));

 useEffect(() => {
  const timer = setInterval(() => {
   setProgress((prevState) => prevState + Math.ceil(100 / duration));
  }, 1000);

  if (progress >= 100) {
   clearTimeout(timer);
   if(setIsQuizLive) {
    setIsQuizLive(false)
   } else if(closeDialog){
    closeDialog()
   };
  }
  return () => clearTimeout(timer);
 }, [progress]);

 const selectAnswer = (index) => {
  setIsAnswerSelected(true);
  setChosenAnswerIndex(index);
 };

 useLayoutEffect(() => {
  quizButtonArrRef.current.forEach((quizButton) => {
   if (quizButton.clientHeight > answerHeight) {
    setAnswerHeight(quizButton.clientHeight);
   }
  });
 }, [answerHeight]);

 return (
  <div
   className={clsm([
    "absolute",
    "flex-col",
    "flex",
    "h-full",
    "no-scrollbar",
    "overflow-x-hidden",
    "overflow-y-auto",
    "p-5",
    "supports-overlay:overflow-y-overlay",
    "transition-[margin]",
    "w-full",
    "mb-4",
    "bg-white",
    !shouldRenderActionInTab && [
     "-translate-x-2/4",
     "bottom-0",
     "h-auto",
     "justify-end",
     "left-1/2",
     "max-w-[640px]",
     "min-w-[482px]",
     "z-50"
    ]
   ])}
  >
   <div
    {...createAnimationProps({
     animations: ["fadeIn-full"],
     customVariants: defaultSlideUpVariant,
     transition: defaultViewerStreamActionTransition,
     options: { shouldAnimate: !shouldRenderActionInTab }
    })}
    className={clsm([
     `bg-profile-${color}`,
     "flex-col",
     "flex",
     "items-start",
     "rounded-3xl",
     "w-full"
    ])}
   >
    <h3
     className={clsm([
      "flex",
      "p-5",
      "w-full",
      "justify-center",
      "break-word",
      "text-black",
      'text-lg',
      'text-sky-700',
      'font-bold',
      shouldInvertColors && "text-white"
     ])}
    >
     {question}
    </h3>
    <div
     className={clsm(["flex-col", "flex", "px-5", "space-y-2.5", "w-full"])}
    >
     {answers.map((answer, index) => (
      <Button
       variant="secondary"
       key={`answer-${index}`}
       ariaLabel={`answer ${index + 1}`}
       customStyles={{
        minHeight: `${answerHeight}px`
       }}
       className={clsm([
        "whitespace-normal",
        "h-auto",
        "border",
        "border-black-700",
        "break-anywhere",
        isAnswerSelected === true && chosenAnswerIndex === index
         ? index === correctAnswerIndex
           ? correctAnswerClasses
           : incorrectAnswerClasses
         : ""
       ])}
       onClick={() => selectAnswer(index)}
       disabled={isAnswerSelected === true && chosenAnswerIndex !== index}
       ref={(el) => (quizButtonArrRef.current[index] = el)}
      >
       {answer}
      </Button>
     ))}
     <div className={clsm(["pt-2.5", "pb-5"])}>
      <Progress value={progress} />
     </div>
    </div>
   </div>
  </div>
 );
};

QuizCard.defaultProps = {
 answers: [],
 color: "default",
 correctAnswerIndex: 0,
 duration: 10,
 shouldRenderActionInTab: false,
 shouldShowStream: false
};

QuizCard.propTypes = {
 answers: PropTypes.arrayOf(PropTypes.string),
 color: PropTypes.oneOf([...PROFILE_COLORS, "default"]),
 correctAnswerIndex: PropTypes.number,
 duration: PropTypes.number,
 question: PropTypes.string.isRequired,
 shouldRenderActionInTab: PropTypes.bool,
 shouldShowStream: PropTypes.bool,
 startTime: PropTypes.number.isRequired
};

export default QuizCard;
