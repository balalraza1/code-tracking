import React from 'react'
import StageControlBar from '../ControlBar/StageControlBar';
const StageControls = ({
    leavingStage,
    handleLeaveStage,
    isBroadcasting,
    handleStartBroadcast,
    handleStopBroadcast,
    activeScreenSharer,
    toggleChatPanel
  }) => (
    <div className="flex w-full items-center justify-center p-1 md:p-4 bg-gray-300 fixed bottom-0 left-0 right-0 md:absolute md:bottom-0">
      <StageControlBar
        leavingStage={leavingStage}
        handleLeaveStage={handleLeaveStage}
        handleBroadcast={
          isBroadcasting ? handleStopBroadcast : handleStartBroadcast
        }
        activeScreenSharer={activeScreenSharer} 
        toggleChatPanel={toggleChatPanel}
      />
    </div>
  );

export default  StageControls;
