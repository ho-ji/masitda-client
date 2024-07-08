const regex = {
  account: /^[a-zA-Z][a-zA-Z0-9]{4,15}$/,
  password: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/,
  phoneNumber: /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  name: /^[가-힣]{2,6}$/,
}

export default regex
