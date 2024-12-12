import { useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

import { useStreamManagerActions } from "../../providers/StreamManagerActions";
import { streamManager as $streamManagerContent } from "../../content";
import {
 QUIZ_DATA_KEYS,
 STREAM_ACTION_NAME,
 STREAM_MANAGER_ACTION_LIMITS
} from "../../constants";
import { Input } from "@/components/ui/input";
import RangeSelector from "../../components/InputRange/RangeSelector";
import RadioTextGroup from "../RadioTextGroup";
import { clsm } from "../../utils";
import { Button } from "@/components/ui/button";
import { useModal } from "../../providers/ModalContext";
import { getSessionDetails } from "../../api/session";
import { useParams } from "react-router-dom";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import { sendChatEvent } from "../../api/channel";

const $streamManagerActions = $streamManagerContent.stream_manager_actions;
const { quiz: $quizContent } = $streamManagerActions;

const QuizOrPollQuestionsComponent = (quizOrPollQuestionsComponentProps) => {
 const formType = "quiz";
 const {
  currentStreamManagerActionErrors,
  getStreamManagerActionData,
  updateStreamManagerActionData,
  sendStreamAction
 } = useStreamManagerActions();

 const { isLive, isBroadcasting} = quizOrPollQuestionsComponentProps

 const { sessionId } = useContext(UserSettingsContext);
 const [sessionDetails, setSessionDetails] = useState(null);

 const params = useParams();
 const currentSessionId = params?.sessionId || sessionId;

 useEffect(() => {
  const getSessionInfo = async () => {
    const result = await getSessionDetails(currentSessionId); 
    setSessionDetails(result?.result);
  }
  getSessionInfo()
}, [])

console.log(isLive, isBroadcasting, 'isLive, isBroadcasting')
 const quizData = getStreamManagerActionData(formType);
 const {
  question,
  answers,
  correctAnswerIndex = undefined,
  duration
 } = quizData;

 const { closeDialog } = useModal();

 const LIMITS = useMemo(
  () => STREAM_MANAGER_ACTION_LIMITS[formType],
  [formType]
 );
 const contentMapper = useMemo(
  () => ({
   [STREAM_ACTION_NAME.QUIZ]: {
    content: $streamManagerContent.stream_manager_actions.quiz,
    dataKey: QUIZ_DATA_KEYS.QUESTION,
    rangeSelector: {
     label: $streamManagerContent.stream_manager_actions.quiz.duration,
     dataKey: QUIZ_DATA_KEYS.DURATION,
     min: LIMITS[QUIZ_DATA_KEYS.DURATION].min,
     max: LIMITS[QUIZ_DATA_KEYS.DURATION].max
    },
    inputGroup: {
     label: $streamManagerContent.stream_manager_actions.quiz.answers,
     type: "radio",
     dataKey: QUIZ_DATA_KEYS.ANSWERS,
     min: LIMITS[QUIZ_DATA_KEYS.ANSWERS].min,
     max: LIMITS[QUIZ_DATA_KEYS.ANSWERS].max
    }
   }
  }),
  [LIMITS]
 );

 const radioGroupSelectedAnswerProps =
  formType === STREAM_ACTION_NAME.QUIZ
   ? {
      selectedDataKey: QUIZ_DATA_KEYS.CORRECT_ANSWER_INDEX,
      selectedOptionIndex: correctAnswerIndex
     }
   : {};

 const {
  content: {
   question: questionLabel,
   answers_input_name_attribute: streamManagerActionFormAnswers,
   question_input_name_attribute: streamManagerActionFormQuestion,
   duration_input_name_attribute: streamManagerActionFormDuration
  },
  dataKey,
  rangeSelector: {
   label: rangeSelectorLabel,
   dataKey: rangeSelectorDataKey,
   min: rangeSelectorMin,
   max: rangeSelectorMax
  },
  inputGroup: {
   type: inputGroupInputType,
   dataKey: inputGroupDataKey,
   min: inputGroupMin,
   max: inputGroupMax
  }
 } = contentMapper[formType];

 const updateQuizAnswer = (data) => {
  updateStreamManagerActionData({
   dataOrFn: data,
   actionName: formType
  });
 };


const sendChatNoticeEvent = async (actionData) => {
  try {
    const eventPayload = {
      roomId: sessionDetails?.chatRoomArn,
      eventName: "app:QUIZ",
      eventAttributes: {...actionData, sessionId: currentSessionId},
    };

    const { result } = await sendChatEvent(eventPayload); // get from session ID
    console.info("SendEvent Success:", result);
    closeDialog();
    // return response;
  } catch (error) {
    console.error("SendEvent Error:", error);
    closeDialog();
    return error;
  }
}


 const submitOnButtonClick = async (evt) => {
  evt.preventDefault();
  if(isLive || isBroadcasting){
    await sendStreamAction(formType, {
      [formType]: quizData
     });
  }
  const quizDataPayload = {
      ...quizData,
      answers: JSON.stringify(quizData.answers),
      correctAnswerIndex: quizData.correctAnswerIndex.toString(),
      duration: quizData.duration.toString(), 
  }
  sendChatNoticeEvent({ ...quizDataPayload, messageType: 'video' })
  closeDialog();
 };

 return (
  <>
   <form
    className={clsm(
     "max-h-[calc(100vh_-_2*24px)]",
     "md:h-full",
     "md:max-h-screen",
     "h-[85vh]"
    )}
   >
    <Input
     label={questionLabel}
     name={streamManagerActionFormQuestion}
     dataKey={dataKey}
     value={question}
     onChange={(evt) => updateQuizAnswer({ [dataKey]: evt.target.value })}
     placeholder={contentMapper[formType].content.question}
     error={currentStreamManagerActionErrors[dataKey]}
    />
    <RadioTextGroup
     inputType={inputGroupInputType}
     addOptionButtonText={$quizContent.add_answer}
     dataKey={inputGroupDataKey}
     optionErrors={currentStreamManagerActionErrors[QUIZ_DATA_KEYS.ANSWERS]}
     label={contentMapper[formType].content.answers}
     minOptions={inputGroupMin}
     maxOptions={inputGroupMax}
     name={streamManagerActionFormAnswers}
     options={answers}
     placeholder={$quizContent.answer}
     updateData={updateQuizAnswer}
     formType={formType}
     {...radioGroupSelectedAnswerProps}
    />
    <RangeSelector
     label={rangeSelectorLabel}
     name={streamManagerActionFormDuration}
     dataKey={rangeSelectorDataKey}
     updateData={updateQuizAnswer}
     value={duration}
     min={rangeSelectorMin}
     max={rangeSelectorMax}
    />
    <footer className="mt-4">
     <div className={clsm(["flex", "space-x-3", "sm:w-full"])}>
      <Button className="w-full" type="submit" onClick={submitOnButtonClick}>
       <p>{$quizContent.confirm_text}</p>
      </Button>
     </div>
    </footer>
   </form>
  </>
 );
};

QuizOrPollQuestionsComponent.propTypes = {
 formType: PropTypes.string.isRequired
};

export default QuizOrPollQuestionsComponent;
