export class GlobalConstants{
    
    //Message
    public static genericError: string = "Something went wrong. Please try again later.";

    public static unauthorizedError: string = "You are not an authorized user to access this page.";

    //Regex
    public static nameRegex: string = "[a-zA-Z0-9 ]*";

    public static emailRegex: string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";

    public static contactNumberRegex: string = "^[e0-9]{10,10}$";

    //Variable
    public static error: string = "error";

    public static loggedIn: string = "Logged in Successfully!";

    public static signedUp: string = "Signup Successful!";


}