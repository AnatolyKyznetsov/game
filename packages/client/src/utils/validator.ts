export function validator(string: string | undefined, type: string, secondString?: string) {
    let reg;
    let result;
    switch (type){
    case 'first_name':
    case 'second_name':
        reg = '^[A-ZА-Я][a-zA-ZА-Яа-я\\-]*$';
        if (string) {
            result = string.match(reg);
        }
        if (!result || result.length !== 1) return false
        break
    case 'login':
        reg = '^(?=.*[A-Za-z])(?:[a-zA-Z0-9_-]){3,20}$';
        if (string) {
            result = string.match(reg);
        }
        if (!result || result.length !== 1) return false
        break
    case 'email':
        reg = '^[a-z][a-z0-9-]*@[a-z]*.[a-z]*$';
        if (string) {
            result = string.match(reg);
        }
        if (!result || result.length !== 1) return false
        break
    case 'phone':
        reg = '^\\+?[0-9]{10,15}$';
        if (string) {
            result = string.match(reg);
        }
        if (!result || result.length !== 1) return false
        break
    case 'password':
        reg = '^(?=.*[0-9])(?=.*[a-zA-Z])(?:[a-zA-Z0-9_-]+){8,40}$';
        if (string) {
            result = string.match(reg);
        }
        if (!result || result.length !== 1 || string !== secondString) return false
        break
    case 'message':
        if (string && string.length < 1) return false
        break
    }
    return true
}
