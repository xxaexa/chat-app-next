const FormRow = ({ name, type, placeholder, value, onChange, error }) => {
  return (
    <div className="my-8">
      <input
        className="px-1 py-2 border-b-2 w-full focus:outline-0 text-black placeholder-black rounded-lg"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <p className="text-red-500 absolute">{error}</p>
    </div>
  )
}
export default FormRow
