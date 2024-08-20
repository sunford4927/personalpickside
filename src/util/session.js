// 로그인 정보 저장
export function LoginSession(username) {
// function LoginSession(username, token) {
    // token : 보안용
    // print('로그인 성공');
    sessionStorage.setItem('username', username);
    // sessionStorage.setItem('token', token);
}

// 로그인 정보 삭제
export function LogoutSession() {
    sessionStorage.removeItem('username');
    // sessionStorage.removeItem('token');
}

// get
export function getLoginSession() {
    return {
        username: sessionStorage.getItem('username'),
        // token: sessionStorage.getItem('token')
    };
}