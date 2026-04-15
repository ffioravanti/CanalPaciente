import React from 'react'

export default function InputField(props) {
  const { id, type, placeholder, label, value, onChange } = props

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} placeholder={placeholder} value={value} onChange={onChange} />
      <span className="error-message"></span>
    </div>
  )
}

