import {jwtDecode} from "jwt-decode";

export const extractRole = (lang: string = "en") => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decoded = jwtDecode<{ role: string }>(token);
    if (lang === "cn") {
        const dict: { [key: string]: string } = {"user": "用户", "admin": "管理员", "superadmin": "超级管理员"}
        return dict[decoded.role] || decoded.role;
    }
    return decoded.role;
}