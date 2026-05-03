import { useAppContext } from '../context/AppContext';

export default function Toast() {
  const { toastMsg } = useAppContext();
  
  return (
    <div className={`fixed bottom-5 right-5 bg-[var(--text)] text-[var(--bg)] text-[13px] font-medium py-3 px-4 rounded-[var(--r)] shadow-[var(--shadow-lg)] flex items-center gap-2 transition-all duration-200 pointer-events-none z-[999] ${toastMsg ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}>
      <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
      {toastMsg}
    </div>
  );
}
