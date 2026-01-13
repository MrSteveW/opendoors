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
          <div className="text-red-600 flex">
            <Timer /> Daily Mile
          </div>
        );

      case "Live at Lunch":
        return (
          <div className="text-green-600 flex">
            <Sandwich /> Live at Lunch
          </div>
        );

      case "After Lunch":
        return (
          <div className="text-blue-600 flex">
            <Headphones /> After Lunch
          </div>
        );

      default:
        return null;
    }
  }, [time]);

  return <div>{renderContent()}</div>;
}
