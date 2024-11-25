export const LLFormField = ({ label, type, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
      placeholder={placeholder}
    />
  </div>
);
