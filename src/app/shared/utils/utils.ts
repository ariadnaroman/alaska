export function isValidUsername(username: string): boolean {
    if (username == null || username.length < 8 || username.length > 15) return false;
    return true;
}

export function isValidPassword(password: string): boolean {
    if (password == null || !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) return false;
    return true;
}