import { FC, useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import TypingAnimation from "../../components/common/TypingAnimation";

interface SummarySectionProps {
  summary: string;
}

const SummarySection: FC<SummarySectionProps> = ({ summary }) => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [processStage, setProcessStage] = useState(0);
  const processingSteps = [
    "Analyzing article content...",
    "Extracting key concepts...",
    "Generating concise summary...",
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setProcessStage(1), 2000);
    const timer2 = setTimeout(() => setProcessStage(2), 4000);
    const timer3 = setTimeout(() => {
      setIsProcessing(false);
      setIsTyping(true);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 transition-all duration-300">
      <div className="flex items-center mb-4">
        <Sparkles className="w-5 h-5 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">AI Summary</h2>
      </div>

      {isProcessing && (
        <div className="animate-pulse">
          <div className="h-3 bg-blue-200 rounded mb-2 w-full max-w-[85%]"></div>
          <div className="h-3 bg-blue-200 rounded mb-2 w-full max-w-[65%]"></div>
          <div className="h-3 bg-blue-200 rounded w-full max-w-[75%]"></div>

          <div className="mt-4 flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-ping"></div>
            <p className="text-blue-600 font-medium">
              {processingSteps[processStage]}
            </p>
          </div>
        </div>
      )}

      {isTyping && (
        <div className="text-gray-700 leading-relaxed font-medium">
          <TypingAnimation
            text={summary}
            onComplete={() => setIsTyping(false)}
          />
        </div>
      )}

      {!isProcessing && !isTyping && (
        <div className="text-gray-700 leading-relaxed font-medium">
          {summary}
        </div>
      )}
    </div>
  );
};

export default SummarySection;
