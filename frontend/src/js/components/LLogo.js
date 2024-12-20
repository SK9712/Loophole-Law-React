import { Scale, BookOpen } from 'lucide-react';

const LLogo = () => (
  <div className="flex items-center gap-3">
    <div className="relative w-8 h-8">
      <BookOpen className="w-8 h-8 text-blue-400 absolute" />
      <Scale className="w-5 h-5 text-green-400 absolute bottom-0 right-0" />
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-xl font-bold">
        <span className="text-blue-400">Loophole</span>
        <span className="text-green-400">Law</span>
        <span className="text-green-400">.</span>
      </span>
      <span className="text-xs text-gray-400 tracking-widest">LEGAL EXCELLENCE</span>
    </div>
  </div>
);

export default LLogo;