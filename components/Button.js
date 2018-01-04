const Button = ({children, onMouseDown, className, type}) => (
  <button 
    className={"button " + className}
    onMouseDown={onMouseDown}
    type={type}
  >
    <style jsx>
      {`
        .button {
          padding: .5rem;
          background-color: transparent;
          border: 1px solid #870069;
          font-weight: bold;
          color: #870069;
          font-size: 1rem;
          font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
        }
        .button + .button {
          margin-left: 6px;
        }
        .button.active {
          background-color: #870069;
          color: #fff;
        }
      `}
      </style>
    {children}
  </button>
);

export default Button;