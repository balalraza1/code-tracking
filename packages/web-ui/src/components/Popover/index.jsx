import { useEffect, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const PopoverDemo = ({ isOpen, handleClose, content }) => {
  const popoverRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClose]);

  return (
    <Popover
      open={isOpen}
      onOpenChange={(e) => {
        console.log("e", e);
      }}
    >
      <PopoverTrigger asChild>
        <span>{/* Empty Placeholder */}</span>
      </PopoverTrigger>

      <PopoverContent className="w-1/2" ref={popoverRef}>
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverDemo;
