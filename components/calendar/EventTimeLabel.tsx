import { useCallback } from "react";
import { Timer } from "lucide-react";
import { Sandwich } from "lucide-react";
import { Headphones } from "lucide-react";

type PropsType = {
  time: string;
};

export default function EventTimeLabel({ time }: PropsType) {
  const renderContent = useCallback(() => {
    switch (time) {
      case "Daily Mile":
        return (
          <div className="text-opengreen flex font-bold items-center">
            <Timer />
            <div className="ml-1">Daily Mile</div>
          </div>
        );

      case "Live at Lunch":
        return (
          <div className="text-openyellow flex font-bold items-center">
            <Sandwich />
            <div className="ml-1">Live at Lunch</div>
          </div>
        );

      case "After Lunch":
        return (
          <div className="text-openblue flex font-bold items-center">
            <Headphones />
            <div className="ml-1">After Lunch</div>
          </div>
        );

      default:
        return null;
    }
  }, [time]);

  return <div>{renderContent()}</div>;
}
