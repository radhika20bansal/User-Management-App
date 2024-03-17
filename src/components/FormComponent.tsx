const FormComponent = ({email, password, onChangePassword, onChangeEmail, passwordError, emailError}: any) => {
  
  return (
    <div>
      <div className="container mb-10">
        <label className="block text-xl font-medium leading-6 text-blue-900 mb-5">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => onChangeEmail(e)}
          placeholder="Please enter your email"
          className="block border-1 w-full p-2 rounded outline-none"
        />
        <p className="text-sm text-red-600 px-2 py-1">{emailError}</p>
      </div>
      <div className="container mb-10">
        <label className="block text-xl font-medium leading-6 text-blue-900 mb-5">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => onChangePassword(e)}
          placeholder="Please enter your password"
          className="block border-1 w-full p-2 rounded outline-none"
        />
        <p className="text-sm text-red-600 px-2 py-1">{passwordError}</p>
      </div>
      
    </div>
  );
};

export default FormComponent;
