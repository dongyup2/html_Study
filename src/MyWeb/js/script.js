const loginForm = document.querySelector('form:nth-of-type(1)');
const signupForm = document.querySelector('form:nth-of-type(2)');

loginForm.addEventListener('submit', (event) => {
	event.preventDefault();

	const email = loginForm.email.value;
	const password = loginForm.password.value;

	// 여기에서 서버로 로그인 정보를 전송하는 코드를 작성합니다.
});

signupForm.addEventListener('submit', (event) => {
	event.preventDefault();

	const newemail = signupForm.newemail.value;
	const newpassword = signupForm.newpassword.value;

	// 여기에서 서버로 회원가입 정보를 전송하는 코드를 작성합니다.
});
