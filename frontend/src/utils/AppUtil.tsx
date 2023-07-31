export class AppUtil {
    public static validateEmail = (email: string): boolean => {
        // Use a regular expression to validate the email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    public static validatePassword = (password: string): boolean => {
        // Password should contain at least 8 characters and at least 4 numbers
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d.*\d.*\d.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    }

    public static copyToClipBoard = (text: string | undefined): void => {
        const textField = document.createElement("textarea");
        if (typeof text === "string") {
            textField.innerText = text;
        }
        document.body.appendChild(textField)
        textField.select()
        document.execCommand("copy")
        textField.remove()
    }

}
